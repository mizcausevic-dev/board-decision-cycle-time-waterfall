export type CycleTrack =
  | "AI_GOVERNANCE"
  | "PROCUREMENT_TRUST"
  | "BIOTECH_DIAGNOSTICS"
  | "FINTECH_CONTROLS"
  | "PLATFORM_ENGINEERING"
  | "NONPROFIT_OPERATIONS";

export type CycleStage =
  | "INTAKE"
  | "REVIEW"
  | "APPROVAL"
  | "HANDOFF"
  | "CLOSEOUT"
  | "REFRESH"
  | "REWORK";

export type WaterfallTier = "BREAKING" | "PRESSURED" | "ELEVATED" | "STABLE";

export type CycleSeverity = "LOW" | "MEDIUM" | "HIGH";

export interface BoardDecisionCycleTimeWaterfallItem {
  id: string;
  lane: string;
  track: CycleTrack;
  dominantStage: CycleStage;
  waterfallTier: WaterfallTier;
  delayTheme: string;
  boardQuestion: string;
  owner: string;
  audience: string;
  currentPosture: string;
  cycleNarrative: string;
  operatingReality: string;
  riskHeadline: string;
  blockingIssue: string;
  evidenceArtifacts: string[];
  dependencyMoves: string[];
  relatedSurfaces: string[];
  companyTags: string[];
  intakeDays: number;
  reviewDays: number;
  approvalDays: number;
  handoffDays: number;
  reworkDays: number;
  cycleTimeDays: number;
  cycleTimeLossScore: number;
  recoverableValueMillions: number;
  headline: string;
  narrative: string;
  nextMove: string;
}

export interface CycleAssessment {
  severity: CycleSeverity;
  ok: boolean;
  message: string;
}

export interface BoardDecisionCycleTimeWaterfallReportItem extends BoardDecisionCycleTimeWaterfallItem {
  intakeAssessment: CycleAssessment;
  reviewAssessment: CycleAssessment;
  approvalAssessment: CycleAssessment;
  handoffAssessment: CycleAssessment;
  reworkAssessment: CycleAssessment;
  lossAssessment: CycleAssessment;
  compositeDelayScore: number;
}

export interface BoardDecisionCycleTimeWaterfallSummary {
  lanesMapped: number;
  breakingLanes: number;
  approvalHeavyLanes: number;
  averageCycleTimeDays: number;
  recoverableValueMillions: number;
  leadingMessage: string;
}

export interface BoardDecisionCycleTimeWaterfallExport {
  generatedAt: string;
  summary: BoardDecisionCycleTimeWaterfallSummary;
  items: BoardDecisionCycleTimeWaterfallReportItem[];
}

export interface BoardDecisionCycleTimeWaterfallPayload {
  report: BoardDecisionCycleTimeWaterfallExport;
  cycleRegister: ReturnType<typeof import("./services/verticalBriefService.js").cycleRegister>;
  delayWaterfall: ReturnType<typeof import("./services/verticalBriefService.js").delayWaterfall>;
  timingPosture: ReturnType<typeof import("./services/verticalBriefService.js").timingPosture>;
  timingPressure: ReturnType<typeof import("./services/verticalBriefService.js").timingPressure>;
  verification: string[];
  sample: BoardDecisionCycleTimeWaterfallItem[];
}
