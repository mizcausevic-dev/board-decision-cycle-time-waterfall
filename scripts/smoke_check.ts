import assert from "node:assert/strict";
import { createApp } from "../src/app.js";

const port = 4318;
const baseUrl = `http://127.0.0.1:${port}`;
const app = createApp();
const server = app.listen(port);

async function check(pathname: string) {
  const response = await fetch(`${baseUrl}${pathname}`);
  assert.equal(response.status, 200, `${pathname} should return 200`);
  return response;
}

try {
  const htmlRoutes = ["/", "/cycle-register", "/delay-waterfall", "/timing-posture", "/verification", "/docs"];
  const apiRoutes = [
    "/api/dashboard/summary",
    "/api/cycle-register",
    "/api/delay-waterfall",
    "/api/timing-posture",
    "/api/timing-pressure",
    "/api/verification",
    "/api/sample",
    "/api/payload"
  ];

  for (const route of htmlRoutes) {
    const response = await check(route);
    const body = await response.text();
    assert.match(body, /Board Decision Cycle-Time Waterfall|Cycle register|Delay waterfall|Timing posture/);
  }

  for (const route of apiRoutes) {
    const response = await check(route);
    assert.match(response.headers.get("content-type") ?? "", /application\/json/);
  }
} finally {
  await new Promise<void>((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
}
