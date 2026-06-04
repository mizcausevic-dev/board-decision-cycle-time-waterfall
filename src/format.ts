import type { BoardDecisionCycleTimeWaterfallSummary } from "./types.js";

export function formatSummary(
  summary: BoardDecisionCycleTimeWaterfallSummary,
  title = "Board Decision Cycle-Time Waterfall"
) {
  return [
    title,
    `Lanes mapped: ${summary.lanesMapped}`,
    `Breaking lanes: ${summary.breakingLanes}`,
    `Approval-heavy lanes: ${summary.approvalHeavyLanes}`,
    `Average cycle time: ${summary.averageCycleTimeDays} days`,
    `Recoverable value: $${summary.recoverableValueMillions}M`,
    `Lead: ${summary.leadingMessage}`
  ].join("\n");
}
