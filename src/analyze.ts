import type {
  BoardDecisionCycleTimeWaterfallExport,
  BoardDecisionCycleTimeWaterfallItem,
  BoardDecisionCycleTimeWaterfallReportItem,
  CycleAssessment,
  CycleSeverity
} from "./types.js";

function assessHigh(
  score: number,
  healthy: number,
  pressured: number,
  healthyMessage: string,
  pressureMessage: string,
  highMessage: string
): CycleAssessment {
  let severity: CycleSeverity = "HIGH";
  let ok = false;
  let message = highMessage;

  if (score <= healthy) {
    severity = "LOW";
    ok = true;
    message = healthyMessage;
  } else if (score <= pressured) {
    severity = "MEDIUM";
    message = pressureMessage;
  }

  return { severity, ok, message };
}

export function analyze(
  items: BoardDecisionCycleTimeWaterfallItem[],
  options: { now?: string } = {}
): BoardDecisionCycleTimeWaterfallExport {
  const generatedAt = options.now ?? new Date().toISOString();

  const reportItems: BoardDecisionCycleTimeWaterfallReportItem[] = items.map((item) => {
    const intakeAssessment = assessHigh(
      item.intakeDays,
      4,
      7,
      "Intake time is light enough to keep the lane moving cleanly.",
      "Intake time is visible and should be trimmed before the next cycle compounds delay.",
      "Intake time is too high and is weakening the front of the decision path."
    );

    const reviewAssessment = assessHigh(
      item.reviewDays,
      7,
      11,
      "Review time is contained enough to keep the lane readable.",
      "Review time is stretching and should be reduced before more work piles onto it.",
      "Review time is now the dominant timing drag in the lane."
    );

    const approvalAssessment = assessHigh(
      item.approvalDays,
      6,
      10,
      "Approval time is short enough to keep the lane board-ready.",
      "Approval time is stretching and should be simplified before it becomes structural.",
      "Approval dwell is too high and is materially slowing the decision path."
    );

    const handoffAssessment = assessHigh(
      item.handoffDays,
      4,
      7,
      "Handoff time is contained enough to keep the path stable.",
      "Handoff time is visible and should be reduced before it expands further.",
      "Handoff delay is too high and is slowing late-stage execution."
    );

    const reworkAssessment = assessHigh(
      item.reworkDays,
      3,
      6,
      "Rework is low enough to keep the path efficient.",
      "Rework is visible and should be constrained before it reshapes the cycle.",
      "Rework is too high and is materially inflating total cycle time."
    );

    const lossAssessment = assessHigh(
      item.cycleTimeLossScore,
      42,
      64,
      "Cycle-time loss is manageable in this lane.",
      "Cycle-time loss is visible and should be targeted with a narrower operating fix.",
      "Cycle-time loss is high enough to justify immediate board-visible intervention."
    );

    const compositeDelayScore =
      Math.round(
        ((item.intakeDays * 2 +
          item.reviewDays * 3 +
          item.approvalDays * 3 +
          item.handoffDays * 2 +
          item.reworkDays * 3 +
          item.cycleTimeLossScore) /
          6) *
          10
      ) / 10;

    return {
      ...item,
      intakeAssessment,
      reviewAssessment,
      approvalAssessment,
      handoffAssessment,
      reworkAssessment,
      lossAssessment,
      compositeDelayScore
    };
  });

  const breakingLanes = reportItems.filter((item) => item.waterfallTier === "BREAKING").length;
  const approvalHeavyLanes = reportItems.filter((item) => item.approvalAssessment.severity === "HIGH").length;
  const averageCycleTimeDays =
    reportItems.length === 0 ? 0 : Math.round((reportItems.reduce((sum, item) => sum + item.cycleTimeDays, 0) / reportItems.length) * 10) / 10;
  const recoverableValueMillions = reportItems.reduce((sum, item) => sum + item.recoverableValueMillions, 0);

  const leadingMessage =
    breakingLanes >= 2
      ? "Multiple board-visible lanes are now losing material time in approval, handoff, or rework stages."
      : approvalHeavyLanes >= 2
        ? "Approval dwell is still the dominant timing tax across several decision lanes."
        : reportItems.length === 0
          ? "No decision-cycle timing lanes are currently mapped in the estate."
          : "The timing estate is visible, though a few lanes still need thinner review paths, faster approvals, or less rework.";

  return {
    generatedAt,
    summary: {
      lanesMapped: reportItems.length,
      breakingLanes,
      approvalHeavyLanes,
      averageCycleTimeDays,
      recoverableValueMillions,
      leadingMessage
    },
    items: reportItems
  };
}

export function toExport(items: BoardDecisionCycleTimeWaterfallItem[], options: { now?: string } = {}) {
  return analyze(items, options);
}
