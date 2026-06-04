import express from "express";
import { cycleRegister, delayWaterfall, payload, summary, timingPosture, timingPressure, verification } from "./services/verticalBriefService.js";
import {
  renderCycleOverview,
  renderCycleRegister,
  renderDelayWaterfall,
  renderDocs,
  renderTimingPosture,
  renderVerification
} from "./services/render.js";

export function createApp() {
  const app = express();

  app.get("/", (_req, res) => res.type("html").send(renderCycleOverview()));
  app.get("/cycle-register", (_req, res) => res.type("html").send(renderCycleRegister()));
  app.get("/delay-waterfall", (_req, res) => res.type("html").send(renderDelayWaterfall()));
  app.get("/timing-posture", (_req, res) => res.type("html").send(renderTimingPosture()));
  app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
  app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

  app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
  app.get("/api/cycle-register", (_req, res) => res.json(cycleRegister()));
  app.get("/api/delay-waterfall", (_req, res) => res.json(delayWaterfall()));
  app.get("/api/timing-posture", (_req, res) => res.json(timingPosture()));
  app.get("/api/timing-pressure", (_req, res) => res.json(timingPressure()));
  app.get("/api/verification", (_req, res) => res.json(verification()));
  app.get("/api/sample", (_req, res) => res.json(payload().sample));
  app.get("/api/payload", (_req, res) => res.json(payload()));

  return app;
}

/* c8 ignore next 5 */
if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1].replace(/\\/g, "/")}`).href) {
  const port = Number(process.env.PORT ?? 4318);
  createApp().listen(port, () => {
    console.log(`board-decision-cycle-time-waterfall listening on http://127.0.0.1:${port}`);
  });
}
