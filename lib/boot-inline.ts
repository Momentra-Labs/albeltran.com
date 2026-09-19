import { BOOT_MAX_MS, BOOT_STORAGE_KEY } from "@/lib/boot";

/** Runs in <head> before first paint so the portfolio never flashes uncovered. */
export const BOOT_HEAD_SCRIPT = `(function(){try{var d=document.documentElement;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)d.classList.add("boot-reduce");if(sessionStorage.getItem("${BOOT_STORAGE_KEY}")==="1")d.classList.add("boot-done");else d.classList.add("boot-pending");var s=document.createElement("style");s.id="boot-vars";document.head.appendChild(s)}catch(e){document.documentElement.classList.add("boot-pending")}})()`;

/** Critical overlay paint — does not wait for globals.css. */
export const BOOT_HEAD_STYLE =
  "html.boot-pending{overflow:hidden}html.boot-pending #site-root{pointer-events:none;visibility:hidden}html.boot-leaving #site-root{visibility:visible;pointer-events:auto}#portfolio-boot{display:none;position:fixed;inset:0;z-index:200;background:#050507;color:#f0f0f5}html.boot-pending #portfolio-boot{display:flex}";

function bootEngine() {
  var KEY = "albeltran-boot";
  var MAX = 6500;
  var h = document.documentElement;
  if (!h.classList.contains("boot-pending")) {
    window.__alBoot = { hydrate: function () {}, skip: function () {} };
    return;
  }

  var vars = document.getElementById("boot-vars");
  var reduce = h.classList.contains("boot-reduce");
  var state = { core: 0, ui: 0, projects: 0, experience: 0, load: 0 };
  var weights = { core: 22, ui: 22, projects: 18, experience: 28, load: 10 };
  var display = 0;
  var target = 0;
  var done = 0;
  var raf = 0;
  var started = Date.now();
  var labels = {
    core: "Initializing portfolio...",
    ui: "Loading interface...",
    projects: "Preparing projects...",
    experience: "Connecting components...",
    load: "Almost ready...",
    ready: "Welcome.",
  };

  function score() {
    return (
      state.core * weights.core +
      state.ui * weights.ui +
      state.projects * weights.projects +
      state.experience * weights.experience +
      state.load * weights.load
    );
  }

  function line() {
    if (!state.core) return labels.core;
    if (!state.ui) return labels.ui;
    if (!state.projects) return labels.projects;
    if (!state.experience) return labels.experience;
    if (!state.load) return labels.load;
    return labels.ready;
  }

  function lanesCss() {
    var css = "";
    var names = ["core", "ui", "projects", "experience"];
    for (var i = 0; i < names.length; i++) {
      var laneName = names[i];
      if (!state[laneName as keyof typeof state]) continue;
      css +=
        "#boot-lane-" +
        laneName +
        "{color:var(--foreground)}#boot-lane-" +
        laneName +
        " i{border-color:var(--accent);background:var(--accent);box-shadow:0 0 0 3px var(--accent-soft)}";
    }
    return css;
  }

  function paint(n: number) {
    if (!vars) return;
    vars.textContent =
      ':root{--boot-p:' +
      (n / 100).toFixed(4) +
      ';--boot-pct:"' +
      Math.round(n) +
      '%";--boot-line:"' +
      line() +
      '"}' +
      lanesCss();
  }

  function tick() {
    raf = 0;
    if (done) return;
    display += (target - display) * (reduce ? 1 : 0.2);
    if (Math.abs(target - display) < 0.4) display = target;
    paint(display);
    if (display < target) raf = requestAnimationFrame(tick);
  }

  function setTarget() {
    target = score();
    if (!raf) raf = requestAnimationFrame(tick);
  }

  function mark(name: keyof typeof state) {
    if (state[name]) return;
    state[name] = 1;
    setTarget();
    maybe();
  }

  function maybe() {
    if (done) return;
    var enough = state.core && state.ui && state.projects && state.experience;
    if (enough && (state.load || Date.now() - started > 240)) finish();
  }

  function finish() {
    if (done) return;
    done = 1;
    if (raf) cancelAnimationFrame(raf);
    state.core = state.ui = state.projects = state.experience = state.load = 1;
    paint(100);
    try {
      sessionStorage.setItem(KEY, "1");
    } catch (e) {
      /* private mode */
    }
    h.classList.add("boot-leaving");
    setTimeout(function () {
      h.classList.remove("boot-pending", "boot-leaving");
      h.classList.add("boot-done");
    }, reduce ? 80 : 420);
  }

  function images() {
    var imgs = document.querySelectorAll("img.boot-asset");
    if (!imgs.length) {
      mark("projects");
      return;
    }
    var left = imgs.length;
    function one() {
      left -= 1;
      if (left <= 0) mark("projects");
    }
    for (var i = 0; i < imgs.length; i++) {
      var img = imgs[i] as HTMLImageElement;
      if (img.complete) one();
      else {
        img.addEventListener("load", one, { once: true });
        img.addEventListener("error", one, { once: true });
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { mark("core"); }, { once: true });
  } else {
    mark("core");
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { mark("ui"); }).catch(function () { mark("ui"); });
  } else {
    mark("ui");
  }

  images();

  if (document.readyState === "complete") mark("load");
  else window.addEventListener("load", function () { mark("load"); }, { once: true });

  document.addEventListener("keydown", function (event: KeyboardEvent) {
    if (event.key === "Escape") finish();
  });

  document.addEventListener("click", function (event: MouseEvent) {
    var node = event.target as Node | null;
    if (node && node.nodeType === 3) node = node.parentElement;
    var el = node as HTMLElement | null;
    if (el && el.closest && el.closest("#boot-skip")) finish();
  });

  window.__alBoot = {
    hydrate: function () {
      mark("experience");
    },
    skip: finish,
  };

  setTimeout(finish, MAX);
}

const engineSource = bootEngine
  .toString()
  .replace("albeltran-boot", BOOT_STORAGE_KEY)
  .replace("6500", String(BOOT_MAX_MS));

export const BOOT_ENGINE_SCRIPT = "(" + engineSource + ")()";
