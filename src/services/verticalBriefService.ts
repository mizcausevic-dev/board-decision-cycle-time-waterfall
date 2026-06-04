import { analyze } from "../analyze.js";
import { sampleBoardDecisionCycleTimeWaterfall } from "../data/sampleVerticalBrief.js";

const report = analyze(sampleBoardDecisionCycleTimeWaterfall, { now: "2026-06-04T00:00:00Z" });

export function summary() {
  return {
    ...report.summary,
    generatedAt: report.generatedAt,
    boardMessage:
      "Collapse AI approval dwell, stop procurement review rework loops, remove biotech closeout handoff delay, thin the FinTech review waterfall, enforce a platform cutover freeze boundary, and keep nonprofit refresh lag under light automation."
  };
}

export function cycleRegister() {
  return sampleBoardDecisionCycleTimeWaterfall.map((item) => ({
    lane: item.lane,
    waterfallTier: item.waterfallTier,
    dominantStage: item.dominantStage,
    owner: item.owner,
    audience: item.audience,
    delayTheme: item.delayTheme,
    cycleNarrative: item.cycleNarrative,
    cycleTimeDays: item.cycleTimeDays,
    nextMove: item.nextMove
  }));
}

export function delayWaterfall() {
  return report.items.map((item) => ({
    lane: item.lane,
    waterfallTier: item.waterfallTier,
    dominantStage: item.dominantStage,
    riskHeadline: item.riskHeadline,
    blockingIssue: item.blockingIssue,
    intakeDays: item.intakeDays,
    reviewDays: item.reviewDays,
    approvalDays: item.approvalDays,
    handoffDays: item.handoffDays,
    reworkDays: item.reworkDays,
    cycleTimeDays: item.cycleTimeDays,
    cycleTimeLossScore: item.cycleTimeLossScore
  }));
}

export function timingPosture() {
  return report.items.map((item) => ({
    lane: item.lane,
    owner: item.owner,
    dominantStage: item.dominantStage,
    compositeDelayScore: item.compositeDelayScore,
    recoverableValueMillions: item.recoverableValueMillions,
    nextMove: item.nextMove
  }));
}

export function timingPressure() {
  return report.items.map((item) => ({
    lane: item.lane,
    cycleTimeDays: item.cycleTimeDays,
    intakeDays: item.intakeDays,
    reviewDays: item.reviewDays,
    approvalDays: item.approvalDays,
    handoffDays: item.handoffDays,
    reworkDays: item.reworkDays,
    companyTags: item.companyTags
  }));
}

export function verification() {
  return [
    "Synthetic cycle-time waterfall data only - no live board calendars, internal workflow telemetry, or confidential committee records are included.",
    "Scores are modeled to show how Kinetic Gain can expose stage dwell, approval wait, handoff delay, rework load, and total cycle-time loss in one board-readable surface.",
    "All routes are read-only and demonstrate executive timing analysis, not legal advice, fiduciary guidance, or live board instruction."
  ];
}

export function payload() {
  return {
    report,
    cycleRegister: cycleRegister(),
    delayWaterfall: delayWaterfall(),
    timingPosture: timingPosture(),
    timingPressure: timingPressure(),
    verification: verification(),
    sample: sampleBoardDecisionCycleTimeWaterfall
  };
}
