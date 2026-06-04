import { describe, expect, it } from "vitest";
import { formatSummary } from "./format.js";

describe("formatSummary", () => {
  it("renders the cycle-time summary lines", () => {
    const output = formatSummary({
      lanesMapped: 6,
      breakingLanes: 2,
      approvalHeavyLanes: 1,
      averageCycleTimeDays: 32.8,
      recoverableValueMillions: 75,
      leadingMessage: "Approval dwell is distorting multiple decision lanes."
    });

    expect(output).toContain("Board Decision Cycle-Time Waterfall");
    expect(output).toContain("Lanes mapped: 6");
    expect(output).toContain("Breaking lanes: 2");
  });
});
