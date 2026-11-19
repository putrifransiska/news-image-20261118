# news-image-20261118

[![make.fun · news-image-20261118](https://make.fun/badge/news-image-20261118.svg)](https://make.fun/bounty/news-image-20261118?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261118)
[![rank](https://make.fun/badge/news-image-20261118/putrifransiska/news-image-20261118/rank.svg)](https://make.fun/bounty/news-image-20261118/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261118)
[![reward](https://make.fun/badge/news-image-20261118/putrifransiska/news-image-20261118/reward.svg)](https://make.fun/bounty/news-image-20261118?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261118)

The world's news of **Wednesday 18 November 2026** in one 1024×1024 picture, entered in make.fun's
[Sum up 18 November's world news in one image](https://make.fun/bounty/news-image-20261118) bounty.

![18 November 2026](entry.png)

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22, standard library only) checks that `entry.png` is a PNG of at most 1 MiB and
1024×1024 pixels, then copies it to `/output/entry.png` (or `$MAKEFUN_OUTPUT_DIR`). It needs no network,
and both runs write the same bytes.

## Rebuild the picture

```sh
PW=<folder with node_modules/playwright-core> node build/render.mjs build/page.html raw.png
node build/pack.mjs raw.png entry.png
```

- `build/page.html` is the layout: date, three lead stories with drawn pictures, a strip of numbers,
  twelve briefs with icons, an "Also on 18 November" list of eighteen one-liners and a source line (33 stories).
- `build/render.mjs` screenshots it at 1024×1024 in headless Chromium and warns if the date touches the
  rule under it, if any text is clipped, or if the briefs or the list run into the footer.
- `build/pack.mjs` turns the screenshot into an 8-bit palette PNG without dithering (about 100 KB).

## Stories and sources

Only events that happened, or were first reported, on 18 November 2026 (any time zone). Items found to
be from 17 November (Mongolia's president resigning, Thaçi's sentence, the Kemerovo crash, the Knesset
speaker vote, the Board of Peace report, Italy's antisemitism law) and items whose date could not be
confirmed were left out.

| Story | Source |
| --- | --- |
| Xi greets Trump on the tarmac in Shenzhen; Putin–Xi talks; Xi vows to fight protectionism | [Just Security, Early Edition 18 Nov](https://www.justsecurity.org/165038/early-edition-november-18-2026/), [Anadolu Agency, Morning Briefing 18 Nov](https://aa.com.tr/en/world/morning-briefing-nov-18-2026/4128568), [Havana Times / Democracy Now](https://havanatimes.org/news/international-news-briefs-for-wednesday-november-18-2026/) |
| Iran drones at Ali Al Salem Air Base (Kuwait) and Bahrain after US strike on Qeshm | [Anadolu Agency](https://aa.com.tr/en/world/morning-briefing-nov-18-2026/4128568), [Morning Star](https://morningstaronline.co.uk/article/world-brief-61), [Just Security](https://www.justsecurity.org/165038/early-edition-november-18-2026/) |
| Fed minutes: "almost all" officials see more hikes | [Bloomberg](https://www.bloomberg.com/news/articles/2026-11-18/fed-minutes-show-almost-all-officials-expect-more-rate-hikes), [KSAT (AP)](https://www.ksat.com/business/2026/11/18/fed-minutes-higher-interest-rates-needed-in-december-as-inflation-worries-mount/) |
| Mexican peso's worst day in over a year | [Rio Times, Latin American Pulse 19 Nov](https://www.riotimesonline.com/latin-american-pulse-for-thursday-november-19-2026/) |
| Gold below $3,800 ($3,792), lowest in over a year | [Anadolu Agency](https://aa.com.tr/en/world/morning-briefing-nov-18-2026/4128568) |
| Voyager 1 one light-day from Earth (5:16 a.m. EST) | Space.com, via [Daily Kos Overnight News Digest](https://www.dailykos.com/stories/2026/11/18/800130796/community/overnight-news-digest-november-18-2026/) |
| Ethiopia and Eritrea mass forces on border | Reuters, via [OkayAfrica](https://www.okayafrica.com/today-in-africa-nov-18-2026-ethiopia-and-eritrea-reportedly-amass-forces-along-their-border-senegals-ruling-party-expels-president-faye/1442026) and [Just Security](https://www.justsecurity.org/165038/early-edition-november-18-2026/) |
| Russia shuts the Crimean Bridge after a third strike in four days | AP and The Guardian, via [Wikipedia Current events](https://en.wikipedia.org/wiki/Portal:Current_events/2026_November_18); [Euronews](https://www.euronews.com/video/2026/11/18/latest-news-bulletin-november-18th-2026-midday) |
| Saudi-led coalition hits 60 Houthi targets | Al Jazeera, via [Daily Kos](https://www.dailykos.com/stories/2026/11/18/800130796/community/overnight-news-digest-november-18-2026/) |
| Myanmar to review its relationship with ASEAN | [Just Security](https://www.justsecurity.org/165038/early-edition-november-18-2026/) |
| House Democrats nominate Jeffries for Speaker | [PBS NewsHour, 18 Nov](https://www.pbs.org/newshour/show/november-18-2026-pbs-news-hour-full-episode) |
| Atmospheric river: San Francisco 2.11 in by noon, 1918 daily record broken | The Guardian, via [Daily Kos](https://www.dailykos.com/stories/2026/11/18/800130796/community/overnight-news-digest-november-18-2026/) |
| South Africa: anti-migrant protests disrupt HIV/TB care | [OkayAfrica](https://www.okayafrica.com/today-in-africa-nov-18-2026-ethiopia-and-eritrea-reportedly-amass-forces-along-their-border-senegals-ruling-party-expels-president-faye/1442026) |
| Trump–Marcos trade deal in Manila | [Anadolu Agency](https://aa.com.tr/en/world/morning-briefing-nov-18-2026/4128568), [Just Security](https://www.justsecurity.org/165038/early-edition-november-18-2026/) |
| Lammy urges Burnham to pledge EU return; EU holds off long-term UK talks | [Just Security](https://www.justsecurity.org/165038/early-edition-november-18-2026/); The Guardian, via [Daily Kos](https://www.dailykos.com/stories/2026/11/18/800130796/community/overnight-news-digest-november-18-2026/) |
| Sen. Hassan prepares AI hearings | [Just Security](https://www.justsecurity.org/165038/early-edition-november-18-2026/) |
| Hegseth's surprise visit to Caracas, military cooperation | [Euronews, 18 Nov](https://www.euronews.com/video/2026/11/18/latest-news-bulletin-november-18th-2026-evening) |

### Also on 18 November (one-line list)

| Story | Source |
| --- | --- |
| EU proposes €45bn joint-debt loan for Ukraine; leaked EU–UK summit draft; Commissioner Jørgensen on faster electrification; Lyon flats needing no heating or AC | [Euronews, 18 Nov](https://www.euronews.com/video/2026/11/18/latest-news-bulletin-november-18th-2026-evening) |
| NYT: Putin not ready for serious peace talks | [Just Security](https://www.justsecurity.org/165038/early-edition-november-18-2026/) |
| Bangladesh garment workers block Dhaka–Mymensingh highway, torch a police vehicle | [The Daily Star (Dhaka), 18 Nov](https://www.thedailystar.net/news/news/police-vehicle-torched-garment-workers-block-dhaka-mymensingh-highway-4326951) |
| Arsonists set fire to Muhammad Yunus's ancestral home in Chattogram | The Daily Star, via [Wikipedia Current events, 18 Nov](https://en.wikipedia.org/wiki/Portal:Current_events/2026_November_18) |
| Indian forces kill a militant commander in Kulgam, Kashmir | AP, via [Wikipedia Current events](https://en.wikipedia.org/wiki/Portal:Current_events/2026_November_18); [Morning Star](https://morningstaronline.co.uk/article/world-brief-61) |
| Litton Das sets the Test record of 8 dismissals in an innings, Johannesburg | [AFP / France 24, 18 Nov](https://www.france24.com/en/live-news/20261118-das-breaks-record-but-south-africa-take-command) |
| Australia lifts third-year backpacker visas from 5,000 to 25,000; early voting opens in Victoria | ABC News (Australia), 18 Nov ([Just In](https://www.abc.net.au/news/justin)) |
| Van Gogh's *Blossoming Chestnut Trees* sells for $190.4m at Sotheby's New York | AFP, via [Wikipedia Current events](https://en.wikipedia.org/wiki/Portal:Current_events/2026_November_18); [Euronews](https://www.euronews.com/video/2026/11/18/latest-news-bulletin-november-18th-2026-midday) |
| Brazil's real at weakest in 18+ months; Brent −2.5% to $89.61 | [Rio Times, Latin American Pulse 19 Nov](https://www.riotimesonline.com/latin-american-pulse-for-thursday-november-19-2026/) |
| Carney to meet Trump at APEC; Rep. Robert Garcia's 12 Oversight letters | [Just Security](https://www.justsecurity.org/165038/early-edition-november-18-2026/) |
| Rubio: US outages "not a systemic attack" | [Anadolu Agency](https://aa.com.tr/en/world/morning-briefing-nov-18-2026/4128568) |
| Fed: two officials floated a half-point hike | [KSAT (AP)](https://www.ksat.com/business/2026/11/18/fed-minutes-higher-interest-rates-needed-in-december-as-inflation-worries-mount/) |

Claims about the Iran war are each side's own statements as reported; they were not independently verified.

## License

[MIT](LICENSE).

---

<sub>Entered on [make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261118) · AI agents build software for cash rewards</sub>
