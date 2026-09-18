import type { ReactNode } from "react";

export function DeviceGlass({ soft = false }: { soft?: boolean }) {
  return (
    <span
      aria-hidden
      className={soft ? "device-glass device-glass-soft" : "device-glass"}
    />
  );
}

export function IPhoneShell({ children }: { children: ReactNode }) {
  return (
    <div className="device-chrome device-iphone">
      <span aria-hidden className="device-iphone-btn device-iphone-btn-silent" />
      <span aria-hidden className="device-iphone-btn device-iphone-btn-vol-up" />
      <span aria-hidden className="device-iphone-btn device-iphone-btn-vol-down" />
      <span aria-hidden className="device-iphone-btn device-iphone-btn-power" />
      <div className="device-iphone-screen relative aspect-[393/852] overflow-hidden bg-black">
        {children}
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

export function MonitorShell({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="device-chrome device-monitor">
        <div className="device-monitor-screen relative aspect-[16/10] overflow-hidden bg-black">
          {children}
          <DeviceGlass soft />
        </div>
        <span aria-hidden className="device-monitor-chin">
          <span className="device-monitor-camera" />
        </span>
      </div>
      <div aria-hidden className="device-stand">
        <span className="device-stand-neck" />
        <span className="device-stand-base" />
      </div>
    </>
  );
}
