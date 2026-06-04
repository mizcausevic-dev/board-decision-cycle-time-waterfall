import { describe, expect, it } from "vitest";
import {
  renderCycleOverview,
  renderCycleRegister,
  renderDelayWaterfall,
  renderDocs,
  renderTimingPosture,
  renderVerification
} from "./render.js";

describe("render", () => {
  it("includes the product title in the overview", () => {
    expect(renderCycleOverview()).toContain("Board Decision Cycle-Time Waterfall");
  });

  it("renders the cycle register route", () => {
    expect(renderCycleRegister()).toContain("/cycle-register");
  });

  it("renders the delay waterfall route", () => {
    expect(renderDelayWaterfall()).toContain("/delay-waterfall");
  });

  it("renders the timing posture route", () => {
    expect(renderTimingPosture()).toContain("/timing-posture");
  });

  it("renders verification notes", () => {
    expect(renderVerification()).toContain("Synthetic cycle-time waterfall data only");
  });

  it("renders docs payload guidance", () => {
    expect(renderDocs()).toContain("/api/payload");
  });
});
