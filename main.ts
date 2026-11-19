// news-image-20261118: the world's news of Wednesday 18 November 2026 as one picture.
// entry.png is drawn ahead of time from build/page.html (build/render.mjs, then build/pack.mjs) and kept here,
// so the run needs no network: it checks the bytes and copies them to the output folder.
// Locally: mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const image = new URL('./entry.png', import.meta.url);
const bytes = readFileSync(image);

// Refuse to copy anything the gate would reject: a PNG of at most 1 MiB and 1024x1024 pixels.
const stop = (why: string) => { console.error(`main.ts: entry.png ${why}`); process.exit(1); };
const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!bytes.subarray(0, 8).equals(signature)) stop('is not a PNG');
if (bytes.length > 1024 * 1024) stop(`is ${bytes.length} bytes, over 1 MiB`);
const width = bytes.readUInt32BE(16), height = bytes.readUInt32BE(20);
if (width > 1024 || height > 1024) stop(`is ${width}x${height}, over 1024x1024`);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
copyFileSync(image, join(outDir, 'entry.png'));
