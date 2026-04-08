function Header({ noteCount, totalCount, theme, onToggleTheme }) {
  return (
    <header className="header" role="banner">
      <div className="header-title">
        <span className="header-icon" aria-hidden="true">
          ⚔
        </span>
        <div>
          <h1 className="header-h1">Game Master´s Notes</h1>
        </div>
      </div>

      <div className="header-right">
        <div className="header-stats" aria-live="polite" aria-atomic="true">
          <span className="stat-number">{noteCount}</span>
          <span className="stat-label">
            {noteCount !== totalCount
              ? `of ${totalCount} notes`
              : `note${totalCount !== 1 ? "s" : ""}`}
          </span>
        </div>

        <button
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={
            theme === "light" ? "Switch to night mode" : "Switch to day mode"
          }
        >
          {theme === "light" ? "🌙" : "☀"}
        </button>
      </div>
    </header>
  );
}

export default Header;
