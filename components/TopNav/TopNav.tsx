"use client";

import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider/ThemeProvider";
import styles from "./TopNav.module.css";

interface TopNavProps {
  username: string;
}

export default function TopNav({ username }: TopNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      // fallback for older browsers
      const el = document.createElement("input");
      el.value = window.location.href;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setMenuOpen(false);
  };

  const shareProfile = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Niyas Mohammed — Full-Stack Developer",
        text: "Check out my portfolio built like an Instagram profile!",
        url: window.location.href,
      });
    } else {
      // Fallback: copy link
      await navigator.clipboard.writeText(window.location.href);
    }
    setMenuOpen(false);
  };

  const menuItems = [
    {
      id: "copy-link",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      ),
      label: "Copy Profile Link",
      action: copyLink,
    },
    {
      id: "share",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      ),
      label: "Share This Profile",
      action: shareProfile,
    },
  ];

  return (
    <>
      <header className={styles.nav} id="top-nav">
        {/* Left spacer to keep username centered */}
        <div className={styles.spacer} />

        {/* Username */}
        <div className={styles.userInfo}>
          <span className={styles.username}>{username}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              stroke="#0095f6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Three-dot menu */}
        <button
          className={styles.iconBtn}
          aria-label="More options"
          id="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="5" cy="12" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="19" cy="12" r="2" />
          </svg>
        </button>
      </header>

      {menuOpen && (
        <>
          <div className={styles.backdrop} onClick={() => setMenuOpen(false)} />
          <div className={styles.dropdown} id="menu-dropdown">
            {/* ── Theme Toggle (top, prominent) ── */}
            <div className={styles.themeRow}>
              <div className={styles.themeLabel}>
                <span className={styles.themeIcon}>{isDark ? "🌙" : "☀️"}</span>
                <span>{isDark ? "Dark Mode" : "Light Mode"}</span>
              </div>
              <button
                className={`${styles.toggleTrack} ${isDark ? styles.toggleDark : styles.toggleLight}`}
                onClick={toggle}
                aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
                role="switch"
                aria-checked={isDark}
              >
                <span className={styles.toggleIcon}>
                  {isDark ? "🌙" : "☀️"}
                </span>
                <span className={styles.toggleThumb} />
              </button>
            </div>

            <div className={styles.divider} />

            {/* Other items */}
            {menuItems.map((item) => (
              <button
                key={item.id}
                className={styles.dropdownItem}
                onClick={item.action}
              >
                <span className={styles.itemIcon}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
}
