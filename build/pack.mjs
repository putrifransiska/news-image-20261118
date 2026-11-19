// Turn the Chromium screenshot into a small 8-bit palette PNG (no dithering, so text edges stay clean).
// Palette: the 256 most used exact colours, every other pixel mapped to its nearest entry.
// Usage: node build/pack.mjs raw.png entry.png
import { readFileSync, writeFileSync } from 'node:fs';
import { inflateSync, deflateSync, crc32 } from 'node:zlib';

const [src, dst] = process.argv.slice(2);

function readPng(buf) {
  let pos = 8, width = 0, height = 0, channels = 0;
  const parts = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos), type = buf.toString('latin1', pos + 4, pos + 8), body = buf.subarray(pos + 8, pos + 8 + len);
    if (type === 'IHDR') {
      width = body.readUInt32BE(0); height = body.readUInt32BE(4);
      if (body[8] !== 8 || body[12] !== 0) throw new Error('expects 8-bit, non-interlaced input');
      channels = { 2: 3, 6: 4 }[body[9]];
      if (!channels) throw new Error('expects RGB or RGBA input');
    } else if (type === 'IDAT') parts.push(body);
    pos += 12 + len;
  }
  const data = inflateSync(Buffer.concat(parts)), rowLen = width * channels;
  const rgb = new Uint8Array(width * height * 3);
  let above = new Uint8Array(rowLen), row = new Uint8Array(rowLen);
  for (let y = 0; y < height; y++) {
    const base = y * (rowLen + 1), filter = data[base];
    for (let i = 0; i < rowLen; i++) {
      const left = i >= channels ? row[i - channels] : 0, up = above[i], diag = i >= channels ? above[i - channels] : 0;
      let pred = 0;
      if (filter === 1) pred = left;
      else if (filter === 2) pred = up;
      else if (filter === 3) pred = (left + up) >> 1;
      else if (filter === 4) {
        const p = left + up - diag, pl = Math.abs(p - left), pu = Math.abs(p - up), pd = Math.abs(p - diag);
        pred = pl <= pu && pl <= pd ? left : pu <= pd ? up : diag;
      }
      row[i] = (data[base + 1 + i] + pred) & 255;
    }
    for (let x = 0; x < width; x++) rgb.set(row.subarray(x * channels, x * channels + 3), (y * width + x) * 3);
    [above, row] = [row, above];
  }
  return { width, height, rgb };
}

const { width, height, rgb } = readPng(readFileSync(src));
const n = width * height;
const keyAt = (i) => (rgb[i * 3] << 16) | (rgb[i * 3 + 1] << 8) | rgb[i * 3 + 2];

const counts = new Map();
for (let i = 0; i < n; i++) { const k = keyAt(i); counts.set(k, (counts.get(k) ?? 0) + 1); }
const palette = [...counts].sort((a, b) => b[1] - a[1]).slice(0, 256).map(([k]) => [k >> 16, (k >> 8) & 255, k & 255]);

// perceptual-ish weighting: green errors show most, blue least
const dist = (p, r, g, b) => 3 * (p[0] - r) ** 2 + 4 * (p[1] - g) ** 2 + 2 * (p[2] - b) ** 2;
const lookup = new Map();
function indexOf(k) {
  let hit = lookup.get(k);
  if (hit !== undefined) return hit;
  const r = k >> 16, g = (k >> 8) & 255, b = k & 255;
  let best = 0, bestD = Infinity;
  for (let j = 0; j < palette.length; j++) { const d = dist(palette[j], r, g, b); if (d < bestD) { bestD = d; best = j; } }
  lookup.set(k, best);
  return best;
}

// filter 0 rows: one index byte per pixel, which deflate compresses well for flat artwork
const raw = Buffer.alloc(height * (width + 1));
let err = 0;
for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
  const i = y * width + x, j = indexOf(keyAt(i)), p = palette[j];
  raw[y * (width + 1) + 1 + x] = j;
  err += Math.abs(p[0] - rgb[i * 3]) + Math.abs(p[1] - rgb[i * 3 + 1]) + Math.abs(p[2] - rgb[i * 3 + 2]);
}

const chunk = (type, body) => {
  const head = Buffer.alloc(4); head.writeUInt32BE(body.length);
  const tb = Buffer.concat([Buffer.from(type, 'latin1'), body]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(tb) >>> 0);
  return Buffer.concat([head, tb, crc]);
};
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(width, 0); ihdr.writeUInt32BE(height, 4); ihdr[8] = 8; ihdr[9] = 3;
const png = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  chunk('IHDR', ihdr),
  chunk('PLTE', Buffer.from(palette.flat())),
  chunk('IDAT', deflateSync(raw, { level: 9, memLevel: 9 })),
  chunk('IEND', Buffer.alloc(0)),
]);
writeFileSync(dst, png);
console.log(`${dst}: ${width}x${height}, ${png.length} bytes, ${palette.length} colours, mean error ${(err / n / 3).toFixed(2)}`);
