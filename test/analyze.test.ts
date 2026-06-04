import { describe, expect, it } from "vitest";
import { analyze, toExport } from "../src/analyze.js";
import { sampleBoardDecisionCycleTimeWaterfall } from "../src/data/sampleVerticalBrief.js";
import type { BoardDecisionCycleTimeWaterfallItem } from "../src/types.js";

describe("analyze", () => {
  it("preserves the item count", () => {
    const report = analyze(sampleBoardDecisionCycleTimeWaterfall, { now: "2026-06-04T00:00:00Z" });
    expect(report.items.length).toBe(sampleBoardDecisionCycleTimeWaterfall.length);
  });

  it("counts breaking lanes", () => {
    const report = analyze(sampleBoardDecisionCycleTimeWaterfall, { now: "2026-06-04T00:00:00Z" });
    expect(report.summary.breakingLanes).toBeGreaterThan(0);
  });

  it("counts approval-heavy lanes", () => {
    const report = analyze(sampleBoardDecisionCycleTimeWaterfall, { now: "2026-06-04T00:00:00Z" });
    expect(report.summary.approvalHeavyLanes).toBeGreaterThan(0);
  });

  it("sums recoverable value", () => {
    const report = analyze(sampleBoardDecisionCycleTimeWaterfall, { now: "2026-06-04T00:00:00Z" });
    expect(report.summary.recoverableValueMillions).toBe(75);
  });

  it("calculates a leading board message", () => {
    const report = analyze(sampleBoardDecisionCycleTimeWaterfall, { now: "2026-06-04T00:00:00Z" });
    expect(report.summary.leadingMessage.length).toBeGreaterThan(20);
  });

  it("handles an empty estate", () => {
    const report = analyze([], { now: "2026-06-04T00:00:00Z" });
    expect(report.summary.lanesMapped).toBe(0);
    expect(report.summary.averageCycleTimeDays).toBe(0);
    expect(report.summary.leadingMessage).toContain("No decision-cycle timing lanes");
  });

  it("hits low and medium branches explicitly", () => {
    const fixtures: BoardDecisionCycleTimeWaterfallItem[] = [
      {
        id: "low-branch",
        lane: "Stable timing lane",
        track: "PLATFORM_ENGINEERING",
        dominantStage: "REVIEW",
        waterfallTier: "STABLE",
        delayTheme: "Light review dwell",
        boardQuestion: "Is the lane stable?",
        owner: "Platform engineering lead",
        audience: "Board operating committee",
        currentPosture: "Stable.",
        cycleNarrative: "Controlled.",
        operatingReality: "Healthy.",
        riskHeadline: "Low cycle loss.",
        blockingIssue: "None",
        evidenceArtifacts: ["memo"],
        dependencyMoves: ["keep it stable"],
        relatedSurfaces: ["waterfall.kineticgain.com"],
        companyTags: ["Azure"],
        intakeDays: 2,
        reviewDays: 4,
        approvalDays: 3,
        handoffDays: 2,
        reworkDays: 1,
        cycleTimeDays: 12,
        cycleTimeLossScore: 32,
        recoverableValueMillions: 3,
        headline: "Stable lane.",
        narrative: "Low branch test.",
        nextMove: "Keep the lane stable."
      },
      {
        id: "medium-branch",
        lane: "Pressured timing lane",
        track: "AI_GOVERNANCE",
        dominantStage: "APPROVAL",
        waterfallTier: "ELEVATED",
        delayTheme: "Approval dwell",
        boardQuestion: "Where is timing visible but not yet catastrophic?",
        owner: "Chief AI Officer",
        audience: "Board technology committee",
        currentPosture: "Watch state.",
        cycleNarrative: "Pressured.",
        operatingReality: "Mixed.",
        riskHeadline: "Moderate cycle loss.",
        blockingIssue: "Split approvals",
        evidenceArtifacts: ["control audit"],
        dependencyMoves: ["align the approver group"],
        relatedSurfaces: ["governance.kineticgain.com"],
        companyTags: ["OpenAI"],
        intakeDays: 5,
        reviewDays: 9,
        approvalDays: 9,
        handoffDays: 5,
        reworkDays: 4,
        cycleTimeDays: 32,
        cycleTimeLossScore: 59,
        recoverableValueMillions: 7,
        headline: "Pressured lane.",
        narrative: "Medium branch test.",
        nextMove: "Align approvals."
      }
    ];

    const report = analyze(fixtures, { now: "2026-06-04T00:00:00Z" });
    expect(report.items[0].intakeAssessment.severity).toBe("LOW");
    expect(report.items[0].lossAssessment.severity).toBe("LOW");
    expect(report.items[1].intakeAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].reviewAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].approvalAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].handoffAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].reworkAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].lossAssessment.severity).toBe("MEDIUM");
  });

  it("exports through toExport", () => {
    const report = toExport(sampleBoardDecisionCycleTimeWaterfall, { now: "2026-06-04T00:00:00Z" });
    expect(report.summary.lanesMapped).toBe(sampleBoardDecisionCycleTimeWaterfall.length);
  });
});
