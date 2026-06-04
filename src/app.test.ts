import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./app.js";

describe("board-decision-cycle-time-waterfall app", () => {
  const app = createApp();

  it("serves the overview route", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toContain("Board Decision Cycle-Time Waterfall");
  });

  it("serves the cycle register route", async () => {
    const response = await request(app).get("/cycle-register");
    expect(response.status).toBe(200);
  });

  it("serves the delay waterfall route", async () => {
    const response = await request(app).get("/delay-waterfall");
    expect(response.status).toBe(200);
  });

  it("serves the timing posture route", async () => {
    const response = await request(app).get("/timing-posture");
    expect(response.status).toBe(200);
  });

  it("serves the verification route", async () => {
    const response = await request(app).get("/verification");
    expect(response.status).toBe(200);
  });

  it("serves the docs route", async () => {
    const response = await request(app).get("/docs");
    expect(response.status).toBe(200);
  });

  it("serves the payload API", async () => {
    const response = await request(app).get("/api/payload");
    expect(response.status).toBe(200);
    expect(response.body.report.summary.lanesMapped).toBeGreaterThan(0);
  });
});
