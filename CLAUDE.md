# SmartShot — project notes for Claude

SmartShot is Top Shot Prep's free adaptive math practice site, built on the open-source
[OATutor](https://github.com/CAHLR/OATutor) system from UC Berkeley's CAHL Research Lab.
Owner: Top Shot Prep (GitHub `TopShotDan`). The owner is new to coding: explain in plain
language, give exact click paths, and do the technical work rather than handing over commands.

## Branches and deployment — read first

| Branch | Purpose | Where it goes |
|---|---|---|
| `main` | The live free version (4 courses). Keep it stable: only small, verified fixes. | Vercel project `smart-shot` → https://smartshot.topshotprep.com (auto-deploys on push) |
| `next` | The bigger "real" SmartShot. Big or experimental work goes here (or on feature branches off `next`). | Vercel preview URL per push (not the live site) |

- Remotes: `origin` = `TopShotDan/SmartShot` (the fork), `upstream` = `CAHLR/OATutor` (the lab).
- Never force-push, and never push to `main` without the owner's OK.
- Plan / roadmap for the bigger version: `docs/ROADMAP.md` (create it with the owner if missing).

## Running it locally (Windows)

- Repo folder: `C:\Users\danny\Github\OATutor`. The folder name is `Github` (lowercase h).
  Run commands from exactly that spelling, or the dev server fails with
  "does not match the corresponding name on disk".
- Node.js: `C:\Program Files\nodejs` (may need `$env:Path = "C:\Program Files\nodejs;$env:Path"` in PowerShell).
- git is GitHub Desktop's bundled copy (not on PATH):
  `C:\Users\danny\AppData\Local\GitHubDesktop\app-*\resources\app\git\cmd\git.exe`.
- Install: `npm ci` · Dev server: `npm start` → http://localhost:3001 · Production build: `npm run build`
  (set `CI=false`; the lab's code has lint warnings that Vercel would otherwise treat as errors —
  `vercel.json` already does this).
- Content is the git submodule `src/content-sources/oatutor` (CAHLR/OATutor-Content). Four of its files
  have `|` in their names, which Windows can't store; the local submodule uses sparse-checkout to skip
  them (`core.protectNTFS=false` in that submodule only). Vercel builds on Linux and gets all files.

## What SmartShot changed from OATutor

- Only 4 courses exist in the app: Algebra Fundamentals, Pre-Calculus, Statistics, Calculus.
  The list, friendly names, descriptions and card colors are in `src/config/smartshotCourses.js`;
  `src/config/config.js` filters `coursePlans` to them (other courses can't be reached even by URL).
- Branding: `common/global-config.js` (`SITE_NAME`), `src/assets/LogoCrest.png`, `public/favicon.png`,
  `src/components/BrandLogoNav.js` (top-bar logo, "Powered by Top Shot Prep"), `src/theme.js`,
  card styles in `src/components/problem-layout/common-styles.js` (`smartCard*`),
  home/course pages in `src/components/problem-layout/LessonSelection.js`.
- Brand colors: forest #124D36, muted teal #1F7580, gold #FFD900, cream #FFF7D8, deep teal #034455,
  emerald #028D72, ink #0A1F17, soft green #E4F0DD, soft blue #DCEEF0.
- No login in this version: the "Not logged in" badge and user icon were removed.
- Firebase data logging is off (`ENABLE_FIREBASE = false`; the lab's private `firebaseConfig.js` is not used).
- The lab's AI server is not used. `REACT_APP_AI_AGENT_URL` is empty in `.env`, and when it's empty
  `config.js` turns the AI Tutor off and drops chat-only lessons. Set our own URL to bring AI back.
- Unknown/hidden lesson URLs redirect to the home page (`Platform.js` componentDidMount).

## Licensing — keep this intact

- OATutor code is MIT: keep `LICENSE` and the lab's copyright notice.
- Problems and hints are CC BY 4.0 (OpenStax + OATutor Project): keep visible credit. It currently lives
  on the About page (`src/pages/Posts/About.js`, opened by the ? button) and in the home page footer
  (`LessonSelection.js`). Don't imply endorsement by UC Berkeley or the CAHL lab.

## Checking UI changes

The owner reviews design by screenshots. With the dev server running, headless Edge works:
`msedge --headless --screenshot=<file> --window-size=1440,900 --virtual-time-budget=20000 <url>`
(lesson pages need a longer budget, ~45000, before problems appear). For phone width, put the page in a
390px-wide iframe — headless Edge can't make a window that narrow.
