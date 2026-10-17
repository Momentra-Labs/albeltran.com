import type { ReactNode } from "react";

export function DeviceGlass({ soft = false }: { soft?: boolean }) {
  return (
    <span
      aria-hidden
      className={soft ? "device-glass device-glass-soft" : "device-glass"}
    />
  );
}

/** Pick white or black status-bar glyphs for a background colour (#rrggbb). */
function statusTone(color: string) {
  const hex = color.replace("#", "");
  if (hex.length !== 6) return "dark";
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 0.55 ? "dark" : "light";
}

/** iOS status bar: 9:41, signal, Wi-Fi and battery, drawn around the Dynamic Island. */
function IPhoneStatusBar({ color }: { color: string }) {
  return (
    <span
      aria-hidden
      className="device-iphone-statusbar"
      data-tone={statusTone(color)}
      style={{ background: color }}
    >
      <span className="device-iphone-time">9:41</span>
      <svg className="device-iphone-indicators" viewBox="0 0 68 12" fill="currentColor">
        <rect x="0" y="8" width="3" height="4" rx="0.8" />
        <rect x="4.5" y="6" width="3" height="6" rx="0.8" />
        <rect x="9" y="3.5" width="3" height="8.5" rx="0.8" />
        <rect x="13.5" y="1" width="3" height="11" rx="0.8" />
        <path d="M29 3.2a10.6 10.6 0 0 1 7.4 3l1.3-1.4A12.6 12.6 0 0 0 29 1.2a12.6 12.6 0 0 0-8.7 3.6l1.3 1.4a10.6 10.6 0 0 1 7.4-3Zm0 3.7a6.9 6.9 0 0 1 4.8 1.9l1.3-1.4A8.9 8.9 0 0 0 29 4.9a8.9 8.9 0 0 0-6.1 2.5l1.3 1.4A6.9 6.9 0 0 1 29 6.9Zm0 3.6a3.2 3.2 0 0 1 2.2.9L29 13.6l-2.2-2.2a3.2 3.2 0 0 1 2.2-.9Z" />
        <rect x="43.5" y="1.5" width="21" height="10" rx="3" fill="none" stroke="currentColor" strokeOpacity="0.4" />
        <rect x="45.5" y="3.5" width="15.5" height="6" rx="1.6" />
        <path d="M66 5v3.2c.7-.3 1.2-1 1.2-1.6S66.7 5.3 66 5Z" fillOpacity="0.45" />
      </svg>
    </span>
  );
}

export function IPhoneShell({
  children,
  statusBar,
}: {
  children: ReactNode;
  /** When set, draw an iOS status bar in this colour and start the screenshot below it. */
  statusBar?: string;
}) {
  return (
    <div className="device-chrome device-iphone">
      <span aria-hidden className="device-iphone-btn device-iphone-btn-silent" />
      <span aria-hidden className="device-iphone-btn device-iphone-btn-vol-up" />
      <span aria-hidden className="device-iphone-btn device-iphone-btn-vol-down" />
      <span aria-hidden className="device-iphone-btn device-iphone-btn-power" />
      <div className="device-iphone-screen relative aspect-[393/852] overflow-hidden bg-black">
        {statusBar ? (
          <>
            <IPhoneStatusBar color={statusBar} />
            <div className="device-iphone-viewport">{children}</div>
          </>
        ) : (
          children
        )}
        <span aria-hidden className="device-iphone-island">
          <span className="device-iphone-lens device-iphone-lens-cam" />
          <span className="device-iphone-lens device-iphone-lens-sensor" />
        </span>
        <span aria-hidden className="device-iphone-home" />
        <span aria-hidden className="device-iphone-sheen" />
        <DeviceGlass />
      </div>
    </div>
  );
}

export function IPadShell({ children }: { children: ReactNode }) {
  return (
    <div className="device-chrome device-ipad">
      <span aria-hidden className="device-ipad-camera" />
      <div className="device-ipad-screen relative aspect-[4/3] overflow-hidden bg-black">
        {children}
        <span aria-hidden className="device-ipad-home" />
        <DeviceGlass />
      </div>
    </div>
  );
}

const DOCK_APPS = ["finder", "safari", "mail", "maps", "photos", "notes", "code", "terminal"] as const;

/**
 * macOS desktop for the MacBook screen: menu bar, a Safari window showing the whole page
 * screenshot (wide captures fit without cropping), and the Dock underneath.
 */
export function MacDesktop({ url, children }: { url?: string; children: ReactNode }) {
  const host = url ? url.replace(/^https?:\/\//, "").replace(/\/$/, "") : "albeltran.com";
  return (
    <div className="mac-desktop">
      <span aria-hidden className="mac-wallpaper" />
      <div aria-hidden className="mac-menubar">
        <span className="mac-menubar-apple" />
        <span className="mac-menubar-app">Safari</span>
        <span className="mac-menubar-item">File</span>
        <span className="mac-menubar-item">Edit</span>
        <span className="mac-menubar-item">View</span>
        <span className="mac-menubar-spacer" />
        <span className="mac-menubar-item">Thu 9:41 AM</span>
      </div>
      <div className="mac-window">
        <div aria-hidden className="mac-toolbar">
          <span className="mac-lights">
            <i />
            <i />
            <i />
          </span>
          <span className="mac-address">
            <span className="mac-lock" />
            {host}
          </span>
        </div>
        <div className="mac-page">{children}</div>
      </div>
      <div aria-hidden className="mac-dock">
        {DOCK_APPS.map((app) => (
          <span key={app} className="mac-dock-icon" data-app={app} />
        ))}
      </div>
    </div>
  );
}

/** MacBook Pro: space-black lid with camera notch, hinge, and an aluminium deck. */
export function LaptopShell({ children }: { children: ReactNode }) {
  return (
    <div className="device-laptop">
      <div className="device-laptop-lid">
        <div className="device-laptop-bezel">
          <span aria-hidden className="device-laptop-notch">
            <span className="device-laptop-camera" />
          </span>
          <div className="device-laptop-screen relative aspect-[16/10] overflow-hidden bg-black">
            {children}
            <DeviceGlass soft />
          </div>
        </div>
      </div>
      <div aria-hidden className="device-laptop-base">
        <span className="device-laptop-hinge" />
        <span className="device-laptop-groove" />
      </div>
    </div>
  );
}
