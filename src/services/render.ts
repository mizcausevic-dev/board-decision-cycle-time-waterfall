import { cycleRegister, delayWaterfall, payload, summary, timingPosture, timingPressure, verification } from "./verticalBriefService.js";

const productTitle = "Board Decision Cycle-Time Waterfall";
const domain = "https://waterfall.kineticgain.com";

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function shell(title: string, body: string, description: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)} · Kinetic Gain</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <style>
      :root { color-scheme: dark; --bg:#07111d; --panel:#0d1a2b; --panel-2:#102032; --border:rgba(103,224,190,.22); --text:#edf2ff; --muted:#9fb0cf; --accent:#67e0be; --accent-2:#7dc4ff; }
      * { box-sizing:border-box; }
      body { margin:0; font-family:"Segoe UI",system-ui,sans-serif; background:radial-gradient(circle at top left, rgba(125,196,255,.12), transparent 30%), linear-gradient(180deg,#050c16 0%,var(--bg) 100%); color:var(--text); }
      a { color:var(--accent-2); text-decoration:none; }
      .wrap { max-width:1180px; margin:0 auto; padding:32px 24px 64px; }
      .hero,.section { background:linear-gradient(180deg, rgba(14,28,45,.95), rgba(10,19,33,.98)); border:1px solid var(--border); border-radius:28px; padding:28px; box-shadow:0 18px 60px rgba(2,7,16,.35); }
      .hero { margin-bottom:24px; }
      .eyebrow { display:inline-block; padding:10px 16px; border-radius:999px; border:1px solid var(--border); background:rgba(103,224,190,.08); color:var(--accent); font-size:12px; text-transform:uppercase; letter-spacing:.28em; }
      h1,h2 { margin:18px 0 12px; font-family:Georgia,serif; line-height:.95; }
      h1 { font-size:clamp(54px,8vw,90px); max-width:980px; }
      h2 { font-size:clamp(36px,4vw,54px); }
      .lede { color:var(--muted); font-size:20px; line-height:1.6; max-width:920px; }
      .nav { display:flex; gap:10px; flex-wrap:wrap; margin-top:22px; }
      .nav a { padding:10px 14px; border:1px solid rgba(125,196,255,.18); border-radius:999px; color:var(--muted); }
      .nav a.active { color:var(--text); border-color:var(--accent); background:rgba(103,224,190,.08); }
      .metrics,.grid { display:grid; gap:18px; }
      .metrics { grid-template-columns:repeat(auto-fit, minmax(180px,1fr)); margin-top:26px; }
      .metric,.card,.table-wrap,.aside { background:rgba(16,32,50,.76); border:1px solid rgba(125,196,255,.12); border-radius:22px; padding:18px; }
      .hero-grid { display:grid; grid-template-columns:minmax(0,1.45fr) minmax(320px,.95fr); gap:22px; align-items:start; }
      .metric-label,.chip { color:var(--accent); text-transform:uppercase; letter-spacing:.18em; font-size:12px; }
      .metric-value { display:block; font-size:40px; font-weight:700; margin-top:10px; }
      .metric-copy { margin-top:10px; color:var(--muted); line-height:1.5; }
      .section { margin-top:24px; }
      .grid { grid-template-columns:repeat(auto-fit, minmax(280px,1fr)); }
      .card h3,.aside h3 { margin:12px 0 10px; font-size:30px; line-height:1.05; }
      .card p,.aside p, li { color:var(--muted); line-height:1.6; }
      .table-wrap { overflow-x:auto; }
      table { width:100%; border-collapse:collapse; }
      th,td { text-align:left; padding:12px; border-bottom:1px solid rgba(125,196,255,.12); vertical-align:top; }
      th { color:var(--accent); font-size:12px; text-transform:uppercase; letter-spacing:.18em; }
      ul { padding-left:20px; }
      pre { white-space:pre-wrap; overflow-wrap:anywhere; color:var(--muted); background:rgba(7,17,29,.75); border:1px solid rgba(125,196,255,.12); border-radius:18px; padding:18px; }
      .footer { margin-top:24px; color:var(--muted); font-size:14px; display:flex; gap:18px; flex-wrap:wrap; }
      @media (max-width: 960px) { .hero-grid { grid-template-columns:1fr; } }
    </style>
  </head>
  <body>
    <div class="wrap">
      ${body}
      <div class="footer">
        <span>${productTitle}</span>
        <a href="${domain}">${domain.replace("https://", "")}</a>
        <a href="https://github.com/mizcausevic-dev/">GitHub</a>
        <a href="https://www.linkedin.com/in/mirzacausevic/">LinkedIn</a>
        <a href="https://kineticgain.com/">Kinetic Gain</a>
      </div>
    </div>
  </body>
</html>`;
}

function navLinks(path: string) {
  return [
    ["/", "Overview"],
    ["/cycle-register", "Cycle register"],
    ["/delay-waterfall", "Delay waterfall"],
    ["/timing-posture", "Timing posture"],
    ["/verification", "Verification"],
    ["/docs", "Docs"]
  ]
    .map(([href, label]) => `<a${href === path ? ' class="active"' : ""} href="${href}">${label}</a>`)
    .join("");
}

export function renderCycleOverview() {
  const executiveSummary = summary();
  const lanes = cycleRegister().slice(0, 4);
  const findings = timingPressure().slice(0, 5);
  const cards = lanes
    .map(
      (item) => `<article class="card">
        <div class="chip">${escapeHtml(item.waterfallTier)}</div>
        <h3>${escapeHtml(item.lane)}</h3>
        <p><strong>Dominant stage:</strong> ${escapeHtml(item.dominantStage)}</p>
        <p><strong>Owner:</strong> ${escapeHtml(item.owner)}</p>
        <p><strong>Audience:</strong> ${escapeHtml(item.audience)}</p>
        <p><strong>Theme:</strong> ${escapeHtml(item.delayTheme)}</p>
        <p><strong>Cycle time:</strong> ${item.cycleTimeDays} days</p>
        <p>${escapeHtml(item.nextMove)}</p>
      </article>`
    )
    .join("");

  const risks = findings
    .map(
      (item) =>
        `<li><strong>${escapeHtml(item.lane)}</strong> · cycle ${item.cycleTimeDays}d · intake ${item.intakeDays}d · review ${item.reviewDays}d · approval ${item.approvalDays}d · handoff ${item.handoffDays}d · rework ${item.reworkDays}d</li>`
    )
    .join("");

  return shell(
    productTitle,
    `<section class="hero">
      <span class="eyebrow">Cycle-time waterfall</span>
      <div class="hero-grid">
        <div>
          <h1>Which stages are really extending decision cycle time before the next board review: intake, review, approval, handoff, or rework?</h1>
          <p class="lede">Board Decision Cycle-Time Waterfall turns stage dwell, approval wait, handoff delay, and rework load into one reusable board-facing timing surface.</p>
          <div class="nav">${navLinks("/")}</div>
        </div>
        <aside class="aside">
          <div class="chip">Board takeaway</div>
          <h3>Shorten the path where the days are actually leaking.</h3>
          <p>${escapeHtml(executiveSummary.boardMessage)}</p>
          <p><strong>Lead:</strong> ${escapeHtml(executiveSummary.leadingMessage)}</p>
        </aside>
      </div>
      <div class="metrics">
        <div class="metric"><span class="metric-label">Lanes mapped</span><span class="metric-value">${executiveSummary.lanesMapped}</span><div class="metric-copy">Modeled decision lanes in the current timing estate.</div></div>
        <div class="metric"><span class="metric-label">Breaking lanes</span><span class="metric-value">${executiveSummary.breakingLanes}</span><div class="metric-copy">Lanes where timing loss is already material enough to justify immediate intervention.</div></div>
        <div class="metric"><span class="metric-label">Approval-heavy lanes</span><span class="metric-value">${executiveSummary.approvalHeavyLanes}</span><div class="metric-copy">Lanes where approval dwell is still the dominant timing tax.</div></div>
        <div class="metric"><span class="metric-label">Recoverable value</span><span class="metric-value">$${executiveSummary.recoverableValueMillions}M</span><div class="metric-copy">Modeled value still trapped behind stage delays and avoidable rework.</div></div>
      </div>
    </section>
    <section class="section">
      <h2>Cycle register</h2>
      <p class="lede">${escapeHtml(executiveSummary.boardMessage)}</p>
      <div class="grid">${cards}</div>
    </section>
    <section class="section">
      <h2>Board-visible timing pressure</h2>
      <ul>${risks}</ul>
    </section>`,
    "Board-ready timing surface for exposing decision-cycle stage dwell, approval wait, handoff delay, and rework loss."
  );
}

export function renderCycleRegister() {
  const rows = cycleRegister()
    .map(
      (item) =>
        `<tr><td>${escapeHtml(item.lane)}</td><td>${escapeHtml(item.waterfallTier)}</td><td>${escapeHtml(item.owner)}</td><td>${escapeHtml(item.audience)}</td><td>${escapeHtml(item.dominantStage)}</td><td>${escapeHtml(item.delayTheme)}</td><td>${item.cycleTimeDays}</td></tr>`
    )
    .join("");

  return shell(
    "Cycle register",
    `<section class="hero"><span class="eyebrow">Cycle register</span><h1>Each lane keeps one dominant stage, one owner, one audience, and one next move tied to the same timing path.</h1><p class="lede">The register keeps cycle-time loss visible before it turns into another generic complaint about slow execution.</p><div class="nav">${navLinks("/cycle-register")}</div></section><section class="section table-wrap"><table><thead><tr><th>Lane</th><th>Tier</th><th>Owner</th><th>Audience</th><th>Dominant stage</th><th>Theme</th><th>Cycle days</th></tr></thead><tbody>${rows}</tbody></table></section>`,
    "Register view showing which decision lanes are taking the longest and why."
  );
}

export function renderDelayWaterfall() {
  const rows = delayWaterfall()
    .map(
      (item) =>
        `<tr><td>${escapeHtml(item.lane)}</td><td>${escapeHtml(item.waterfallTier)}</td><td>${escapeHtml(item.dominantStage)}</td><td>${escapeHtml(item.riskHeadline)}</td><td>${escapeHtml(item.blockingIssue)}</td><td>${item.intakeDays}</td><td>${item.reviewDays}</td><td>${item.approvalDays}</td><td>${item.handoffDays}</td><td>${item.reworkDays}</td><td>${item.cycleTimeDays}</td><td>${item.cycleTimeLossScore}</td></tr>`
    )
    .join("");

  return shell(
    "Delay waterfall",
    `<section class="hero"><span class="eyebrow">Delay waterfall</span><h1>The timing loss stays explicit: intake, review, approval, handoff, and rework all remain visible in one waterfall.</h1><p class="lede">This route keeps the actual time buckets visible so leadership can intervene in the right stage instead of treating all cycle-time loss the same.</p><div class="nav">${navLinks("/delay-waterfall")}</div></section><section class="section table-wrap"><table><thead><tr><th>Lane</th><th>Tier</th><th>Dominant stage</th><th>Risk headline</th><th>Blocking issue</th><th>Intake</th><th>Review</th><th>Approval</th><th>Handoff</th><th>Rework</th><th>Cycle time</th><th>Loss score</th></tr></thead><tbody>${rows}</tbody></table></section>`,
    "Delay-waterfall view showing where cycle-time loss is actually accumulating."
  );
}

export function renderTimingPosture() {
  const rows = timingPosture()
    .map(
      (item) =>
        `<tr><td>${escapeHtml(item.lane)}</td><td>${escapeHtml(item.owner)}</td><td>${escapeHtml(item.dominantStage)}</td><td>${item.compositeDelayScore}</td><td>$${item.recoverableValueMillions}M</td><td>${escapeHtml(item.nextMove)}</td></tr>`
    )
    .join("");

  return shell(
    "Timing posture",
    `<section class="hero"><span class="eyebrow">Timing posture</span><h1>Cycle-time intervention stays tied to one owner, one dominant stage, and one next operating move.</h1><p class="lede">This route keeps timing loss grounded in the same operating view so the board can decide what to shorten first.</p><div class="nav">${navLinks("/timing-posture")}</div></section><section class="section table-wrap"><table><thead><tr><th>Lane</th><th>Owner</th><th>Dominant stage</th><th>Composite delay</th><th>Recoverable value</th><th>Next move</th></tr></thead><tbody>${rows}</tbody></table></section>`,
    "Timing-posture view for sequencing cycle-time interventions and recoverable value."
  );
}

export function renderVerification() {
  const notes = verification().map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  return shell(
    "Verification",
    `<section class="hero"><span class="eyebrow">Verification</span><h1>How this cycle-time waterfall is modeled and what it is safe to infer from it.</h1><p class="lede">The verification layer keeps synthetic assumptions and safe-use boundaries visible before anyone treats the sample like live fiduciary or legal guidance.</p><div class="nav">${navLinks("/verification")}</div></section><section class="section"><ul>${notes}</ul><pre>${escapeHtml(JSON.stringify(payload().report.summary, null, 2))}</pre></section>`,
    "Verification notes for the Board Decision Cycle-Time Waterfall sample and modeled outputs."
  );
}

export function renderDocs() {
  return shell(
    "Docs",
    `<section class="hero"><span class="eyebrow">Docs</span><h1>Board Decision Cycle-Time Waterfall docs</h1><p class="lede">This surface packages stage dwell, approval wait, handoff delay, rework load, and total cycle time into reproducible routes and JSON outputs for board and investor reviews.</p><div class="nav">${navLinks("/docs")}</div></section><section class="section"><ul><li><code>/cycle-register</code> keeps timing tiers, owners, audiences, and next moves tied to one decision lane.</li><li><code>/delay-waterfall</code> compares intake, review, approval, handoff, rework, and total cycle time across lanes.</li><li><code>/timing-posture</code> isolates the timing intervention that should move first in each lane.</li><li><code>/api/payload</code> exposes the reproducible timing packet.</li></ul></section>`,
    "Product documentation for Board Decision Cycle-Time Waterfall and its board-facing timing routes."
  );
}
