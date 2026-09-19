export function PortfolioBootFrame() {
  return (
    <div
      id="portfolio-boot"
      className="boot-overlay"
      suppressHydrationWarning
      aria-busy="true"
      aria-label="Loading Al Beltran's portfolio"
    >
      <div className="boot-motes" aria-hidden>
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="boot-shell">
        <p className="boot-kicker">
          <span>01</span>
          <span>Boot</span>
        </p>
        <p id="boot-title" className="boot-name">
          Al Beltran
        </p>
        <p className="boot-role">Software engineer</p>

        <div className="boot-panel">
          <div className="boot-panel-head">
            <span>albeltran.com</span>
            <span>sys / init</span>
          </div>
          <div
            id="boot-meter"
            className="boot-meter"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={0}
            aria-labelledby="boot-title"
          >
            <div className="boot-track">
              <div id="boot-fill" className="boot-fill" />
            </div>
            <span id="boot-pct" className="boot-pct" />
          </div>
          <ul className="boot-lanes">
            <li id="boot-lane-core">
              <i />
              Core
            </li>
            <li id="boot-lane-ui">
              <i />
              UI
            </li>
            <li id="boot-lane-projects">
              <i />
              Projects
            </li>
            <li id="boot-lane-experience">
              <i />
              Experience
            </li>
          </ul>
          <p className="boot-line">
            <span aria-hidden>&gt;</span>
            <span id="boot-status" className="boot-status" aria-live="polite" />
            <span className="boot-caret" aria-hidden />
          </p>
        </div>

        <button id="boot-skip" type="button" className="boot-skip">
          Skip
        </button>
      </div>
    </div>
  );
}
