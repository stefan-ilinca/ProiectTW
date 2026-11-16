import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

// Starting theme: the one set in the operating system
function initialTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

// NavLink tells us whether its route matches the current address
function navClass({ isActive }) {
  return isActive ? `${styles.link} ${styles.active}` : styles.link;
}

// Header, navigation and footer, written once; the current page is drawn in <Outlet />
export default function Layout() {
  const [theme, setTheme] = useState(initialTheme);

  // Theme switch: state for the button, data-theme attribute for the CSS
  function handleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoIcon}>F</span>
            <span className={styles.logoName}>FlowForge</span>
          </Link>
          <p className={styles.description}>
            Build and manage automated workflows from one place.
          </p>
          <nav className={styles.nav} data-testid="nav">
            {/* end: "/" is active only on the exact address, not on every page */}
            <NavLink to="/" end className={navClass}>
              Workflows
            </NavLink>
            <NavLink to="/about" className={navClass}>
              About
            </NavLink>
          </nav>
          <button
            className={styles.themeToggle}
            onClick={handleTheme}
            aria-pressed={theme === "dark"}
          >
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>
        </div>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <p>FlowForge · Web Technologies Project · 2026</p>
      </footer>
    </>
  );
}
