import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sampleBoardDecisionCycleTimeWaterfall } from "../src/data/sampleVerticalBrief.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.join(__dirname, "..", "fixtures");

mkdirSync(fixturesDir, { recursive: true });

writeFileSync(
  path.join(fixturesDir, "board-decision-cycle-time-waterfall.json"),
  JSON.stringify(sampleBoardDecisionCycleTimeWaterfall, null, 2)
);

writeFileSync(
  path.join(fixturesDir, "board-decision-cycle-time-waterfall-clean.json"),
  JSON.stringify(
    sampleBoardDecisionCycleTimeWaterfall.map(({ narrative: _narrative, currentPosture: _currentPosture, ...item }) => item),
    null,
    2
  )
);
