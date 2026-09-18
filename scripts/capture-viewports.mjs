import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUT_DIR = path.resolve("public/covers");

const JOBS = [
  { slug: "rentarah", url: "https://rentahub2026.github.io/" },
  { slug: "skyrealm", url: "https://skyrealm-ruby.vercel.app/" },
  { slug: "lumina", url: "https://lumina-momentra-labs.vercel.app/" },
];

const VIEWPORTS = [
  {
    name: "desktop",
    width: 1280,
    height: 800,
    mobile: false,
    ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  },
  {
    name: "tablet",
    width: 1024,
    height: 768,
    mobile: true,
    ua: "Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1",
  },
  {
    name: "phone",
    width: 393,
    height: 852,
    mobile: true,
    ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1",
  },
];

const FIND_CLICK_TARGET = `(() => {
  const textOf = (el) =>
    (el.innerText || el.textContent || el.getAttribute("aria-label") || "")
      .replace(/\\s+/g, " ")
      .trim();
  const visible = (el) => {
    const r = el.getBoundingClientRect();
    const style = window.getComputedStyle(el);
    return r.width > 2 && r.height > 2 && style.visibility !== "hidden" && style.display !== "none";
  };
  const box = (el) => {
    const r = el.getBoundingClientRect();
    return { x: r.x + r.width / 2, y: r.y + r.height / 2, text: textOf(el).slice(0, 80) };
  };
  const nodes = [];
  const collect = (root) => {
    root.querySelectorAll("button, a, [role='button'], input[type='button']").forEach((el) => nodes.push(el));
    root.querySelectorAll("*").forEach((el) => {
      if (el.shadowRoot) collect(el.shadowRoot);
    });
  };
  collect(document);
  const byText = (re) => nodes.find((el) => visible(el) && re.test(textOf(el)) && textOf(el).length < 48);
  const skip = byText(/^skip$/i);
  if (skip) return box(skip);
  const notNow = byText(/^not now$/i);
  if (notNow) return box(notNow);
  const necessary = byText(/necessary only/i);
  if (necessary) return box(necessary);
  const reject = byText(/reject all|decline/i);
  if (reject) return box(reject);
  const cookie = document.querySelector(
    ".cky-btn-reject, [data-cky-tag='reject-button'], #onetrust-reject-all-handler"
  );
  if (cookie && visible(cookie)) return box(cookie);
  const labeledClose = nodes.find((el) => {
    const label = (el.getAttribute("aria-label") || "").toLowerCase();
    const t = textOf(el);
    return visible(el) && (label.includes("close") || label.includes("dismiss") || t === "×" || t === "✕" || t === "x");
  });
  if (labeledClose) return box(labeledClose);
  const dialog = document.querySelector("[role='dialog'], [class*='modal'], [class*='Modal'], [class*='popup']");
  if (dialog) {
    const closers = [...dialog.querySelectorAll("button")].filter(visible);
    const icon = closers.find((el) => {
      const r = el.getBoundingClientRect();
      return r.width <= 44 && r.height <= 44 && textOf(el).length <= 1;
    });
    if (icon) return box(icon);
  }
  return null;
})()`;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForJson(url, attempts = 40) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const res = await fetch(url);
      if (res.ok) return res.json();
    } catch {
      // Chrome is still booting.
    }
    await sleep(250);
  }
  throw new Error(`Timed out waiting for ${url}`);
}

function openCdp(wsUrl) {
  const ws = new WebSocket(wsUrl);
  let nextId = 0;
  const pending = new Map();
  const listeners = new Map();

  const ready = new Promise((resolve, reject) => {
    ws.addEventListener("open", resolve, { once: true });
    ws.addEventListener("error", reject, { once: true });
  });

  ws.addEventListener("message", (event) => {
    const message = JSON.parse(String(event.data));
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(new Error(message.error.message));
      else resolve(message.result);
    }
    if (message.method && listeners.has(message.method)) {
      for (const fn of listeners.get(message.method)) fn(message.params);
    }
  });

  return {
    ready,
    send(method, params = {}) {
      const id = (nextId += 1);
      ws.send(JSON.stringify({ id, method, params }));
      return new Promise((resolve, reject) => {
        pending.set(id, { resolve, reject });
      });
    },
    once(method) {
      return new Promise((resolve) => {
        const fn = (params) => {
          const list = listeners.get(method) ?? [];
          listeners.set(
            method,
            list.filter((item) => item !== fn),
          );
          resolve(params);
        };
        const list = listeners.get(method) ?? [];
        list.push(fn);
        listeners.set(method, list);
      });
    },
    close() {
      ws.close();
    },
  };
}

function startChrome(port, userDataDir) {
  const child = spawn(
    CHROME,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-extensions",
      "--force-device-scale-factor=1",
      `--remote-debugging-port=${port}`,
      "--remote-allow-origins=*",
      `--user-data-dir=${userDataDir}`,
      "about:blank",
    ],
    { stdio: "ignore" },
  );
  return child;
}

async function clickTarget(cdp, target) {
  if (!target) return;
  await cdp.send("Input.dispatchMouseEvent", {
    type: "mousePressed",
    x: target.x,
    y: target.y,
    button: "left",
    clickCount: 1,
  });
  await cdp.send("Input.dispatchMouseEvent", {
    type: "mouseReleased",
    x: target.x,
    y: target.y,
    button: "left",
    clickCount: 1,
  });
}

async function dismissOverlays(cdp) {
  let misses = 0;
  let hits = 0;
  for (let i = 0; i < 8; i += 1) {
    const found = await cdp.send("Runtime.evaluate", {
      expression: FIND_CLICK_TARGET,
      returnByValue: true,
    });
    const target = found.result?.value;
    if (!target) {
      misses += 1;
      if (misses >= 2) break;
      await sleep(450);
      continue;
    }
    misses = 0;
    hits += 1;
    console.log(`  click "${target.text || "icon"}"`);
    await clickTarget(cdp, target);
    await sleep(800);
    if (hits >= 3) break;
  }
}

async function captureOne(cdp, job, viewport) {
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: 1,
    mobile: viewport.mobile,
    screenWidth: viewport.width,
    screenHeight: viewport.height,
  });
  await cdp.send("Emulation.setUserAgentOverride", {
    userAgent: viewport.ua,
  });
  await cdp.send("Emulation.setTouchEmulationEnabled", {
    enabled: viewport.mobile,
  });

  const loaded = cdp.once("Page.loadEventFired");
  await cdp.send("Page.navigate", { url: job.url });
  await Promise.race([loaded, sleep(20000)]);
  await sleep(2500);
  await dismissOverlays(cdp);
  await cdp.send("Runtime.evaluate", {
    expression: `window.scrollTo(0, 0); document.body && (document.body.style.caretColor = 'transparent');`,
  });
  await sleep(500);

  const shot = await cdp.send("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
    captureBeyondViewport: false,
  });
  const dest = path.join(OUT_DIR, `${job.slug}-${viewport.name}.png`);
  await writeFile(dest, Buffer.from(shot.data, "base64"));
  console.log(`wrote ${path.basename(dest)}`);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const port = 9222 + Math.floor(Math.random() * 400);
  const userDataDir = await mkdir(
    path.join(os.tmpdir(), `portfolio-viewport-${process.pid}-${port}`),
    { recursive: true },
  ).then(() =>
    path.join(os.tmpdir(), `portfolio-viewport-${process.pid}-${port}`),
  );

  const chrome = startChrome(port, userDataDir);
  const kill = () => {
    try {
      chrome.kill();
    } catch {
      // ignore
    }
  };
  process.on("exit", kill);

  try {
    const version = await waitForJson(`http://127.0.0.1:${port}/json/version`);
    const browser = openCdp(version.webSocketDebuggerUrl);
    await browser.ready;
    const { targetId } = await browser.send("Target.createTarget", {
      url: "about:blank",
    });
    const { sessionId } = await browser.send("Target.attachToTarget", {
      targetId,
      flatten: true,
    });
    browser.close();

    const pageInfo = await waitForJson(`http://127.0.0.1:${port}/json/list`);
    const page = pageInfo.find((item) => item.id === targetId) ?? pageInfo[0];
    const cdp = openCdp(page.webSocketDebuggerUrl);
    await cdp.ready;
    await cdp.send("Page.enable");
    await cdp.send("Runtime.enable");
    void sessionId;

    for (const job of JOBS) {
      for (const viewport of VIEWPORTS) {
        await captureOne(cdp, job, viewport);
      }
    }
    cdp.close();
  } finally {
    kill();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
