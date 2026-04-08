function Navbar({ onToggleSidebar, sidebarOpen }) {
  return (
    <nav className="navbar">
      <button
        className={`navbar-hamburger hamburger${sidebarOpen ? "" : " hamburger--active"}`}
        onClick={onToggleSidebar}
        aria-label="Toggle sidebar"
        aria-expanded={sidebarOpen}
      >
        <span className="hamburger-line" />
        <span className="hamburger-line" />
        <span className="hamburger-line" />
      </button>
      <span className="navbar-title">Game Master's Notes</span>
      <div className="navbar-spacer" />
    </nav>
  );
}

export default Navbar;
