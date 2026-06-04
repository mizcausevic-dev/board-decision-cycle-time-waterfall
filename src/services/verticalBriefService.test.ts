import { describe, expect, it } from "vitest";
import { cycleRegister, delayWaterfall, payload, summary, timingPosture, timingPressure, verification } from "./verticalBriefService.js";

describe("verticalBriefService", () => {
  it("returns the timing summary", () => {
    expect(summary().lanesMapped).toBeGreaterThan(0);
  });

  it("returns the cycle register view", () => {
    expect(cycleRegister().length).toBeGreaterThan(0);
  });

  it("returns the delay waterfall view", () => {
    expect(delayWaterfall().length).toBeGreaterThan(0);
  });

  it("returns the timing posture view", () => {
    expect(timingPosture().length).toBeGreaterThan(0);
  });

  it("returns the timing pressure view", () => {
    expect(timingPressure().length).toBeGreaterThan(0);
  });

  it("returns verification notes", () => {
    expect(verification().length).toBeGreaterThan(0);
  });

  it("returns the payload", () => {
    expect(payload().report.summary.lanesMapped).toBeGreaterThan(0);
  });
});
