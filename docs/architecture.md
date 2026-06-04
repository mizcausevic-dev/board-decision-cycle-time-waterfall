# Architecture

Board Decision Cycle-Time Waterfall is a static-friendly TypeScript executive-intelligence surface for mapping stage dwell, approval wait, handoff delay, rework load, and total cycle-time loss across the broader Kinetic Gain suite.

## Routes

- `/`
- `/cycle-register`
- `/delay-waterfall`
- `/timing-posture`
- `/verification`
- `/docs`

## Core Flow

1. `src/data/sampleVerticalBrief.ts`
   - contains the modeled cycle-time estate
2. `src/analyze.ts`
   - converts stage dwell, approval wait, handoff delay, rework load, and timing loss into one report
3. `src/services/verticalBriefService.ts`
   - shapes route-specific views for the register, waterfall, posture, and timing-pressure surfaces
4. `src/services/render.ts`
   - renders the static board-facing HTML routes
5. `scripts/prerender.ts`
   - writes the static site, robots, sitemap, and JSON payloads into `dist-static/`
