import { readFileSync } from "node:fs";
import { analyze } from "./analyze.js";
import { formatSummary } from "./format.js";
import type { BoardDecisionCycleTimeWaterfallItem } from "./types.js";

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error("Usage: board-decision-cycle-time-waterfall <input.json> [--format summary|json]");
  process.exit(1);
}

const inputPath = args[0] ?? "fixtures/board-decision-cycle-time-waterfall.json";
const format = args.includes("--format") ? args[args.indexOf("--format") + 1] ?? "summary" : "summary";
const items = JSON.parse(readFileSync(inputPath, "utf8")) as BoardDecisionCycleTimeWaterfallItem[];
const report = analyze(items);

if (format === "json") {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log(formatSummary(report.summary, "Board Decision Cycle-Time Waterfall"));
}
