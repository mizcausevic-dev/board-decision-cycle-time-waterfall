import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { cycleRegister, delayWaterfall, payload, summary, timingPosture, timingPressure, verification } from "../src/services/verticalBriefService.js";
import {
  renderCycleOverview,
  renderCycleRegister,
  renderDelayWaterfall,
  renderDocs,
  renderTimingPosture,
  renderVerification
} from "../src/services/render.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "dist-static");

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const pages = new Map<string, [string, string]>([
  ["/", ["index.html", renderCycleOverview()]],
  ["/cycle-register", ["cycle-register/index.html", renderCycleRegister()]],
  ["/delay-waterfall", ["delay-waterfall/index.html", renderDelayWaterfall()]],
  ["/timing-posture", ["timing-posture/index.html", renderTimingPosture()]],
  ["/verification", ["verification/index.html", renderVerification()]],
  ["/docs", ["docs/index.html", renderDocs()]]
]);

for (const [, [relativePath, html]] of pages) {
  const fullPath = path.join(outDir, relativePath);
  mkdirSync(path.dirname(fullPath), { recursive: true });
  writeFileSync(fullPath, html);
}

writeFileSync(path.join(outDir, "robots.txt"), "User-agent: *\nAllow: /\nSitemap: https://waterfall.kineticgain.com/sitemap.xml\n");
writeFileSync(
  path.join(outDir, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://waterfall.kineticgain.com/</loc></url><url><loc>https://waterfall.kineticgain.com/cycle-register/</loc></url><url><loc>https://waterfall.kineticgain.com/delay-waterfall/</loc></url><url><loc>https://waterfall.kineticgain.com/timing-posture/</loc></url><url><loc>https://waterfall.kineticgain.com/verification/</loc></url><url><loc>https://waterfall.kineticgain.com/docs/</loc></url></urlset>`
);

const apiDir = path.join(outDir, "api");
mkdirSync(apiDir, { recursive: true });
const jsonPayloads = {
  "dashboard-summary.json": summary(),
  "cycle-register.json": cycleRegister(),
  "delay-waterfall.json": delayWaterfall(),
  "timing-posture.json": timingPosture(),
  "timing-pressure.json": timingPressure(),
  "verification.json": verification(),
  "payload.json": payload()
};

for (const [name, body] of Object.entries(jsonPayloads)) {
  writeFileSync(path.join(apiDir, name), JSON.stringify(body, null, 2));
}
