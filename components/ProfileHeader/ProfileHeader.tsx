"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./ProfileHeader.module.css";
import type { profile as ProfileType } from "@/lib/data";
import ActionButtons from "@/components/ActionButtons/ActionButtons";
import { useTheme } from "@/components/ThemeProvider/ThemeProvider";

interface ProfileHeaderProps {
  profile: typeof ProfileType;
  onAvatarClick?: () => void;
  profileStoryViewed?: boolean;
}

export default function ProfileHeader({
  profile,
  onAvatarClick,
  profileStoryViewed,
}: ProfileHeaderProps) {
  const bioLines = profile.bio.split("\n");
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
    <section className={styles.section} id="profile-header">
      {/* Desktop Username + Menu Row (only visible on desktop) */}
      <div className={styles.desktopUserRow}>
        <div className={styles.desktopUserRowLeft}>
          <h2 className={styles.desktopUsername}>{profile.username}</h2>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            className={styles.verificationBadge}
          >
            <path
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              stroke="#0095f6"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className={styles.menuContainer}>
          <button
            className={styles.desktopMenuBtn}
            aria-label="More options"
            id="desktop-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="5" cy="12" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="19" cy="12" r="2" />
            </svg>
          </button>

          {menuOpen && (
            <>
              <div
                className={styles.backdrop}
                onClick={() => setMenuOpen(false)}
              />
              <div className={styles.dropdown} id="desktop-menu-dropdown">
                {/* Theme Toggle */}
                <div className={styles.themeRow}>
                  <div className={styles.themeLabel}>
                    <span className={styles.themeIcon}>
                      {isDark ? "🌙" : "☀️"}
                    </span>
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
        </div>
      </div>

      {/* Top Row: Avatar + Stats (side-by-side on mobile) */}
      <div className={styles.topRow}>
        {/* Clickable avatar with story ring */}
        <button
          className={`${styles.avatarBtn} ${profileStoryViewed ? styles.avatarViewed : ""}`}
          onClick={onAvatarClick}
          aria-label="View profile story"
        >
          <div className={profileStoryViewed ? styles.ringViewed : styles.ring}>
            <div className={styles.ringInner}>
              <Image
                src={profile.avatar}
                alt={`${profile.name} profile photo`}
                width={86}
                height={86}
                className={styles.avatar}
                priority
              />
            </div>
          </div>
        </button>

        {/* Instagram-style stats */}
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{profile.projectsCount}</span>
            <span className={styles.statLabel}>projects</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{profile.stacksCount}</span>
            <span className={styles.statLabel}>stacks</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{profile.experienceCount}</span>
            <span className={styles.statLabel}>Exp in Js</span>
          </div>
        </div>
      </div>

      {/* Name + Profession */}
      <div className={styles.nameBlock}>
        <h1 className={styles.name}>{profile.name}</h1>
        <p className={styles.profession}>{profile.profession}</p>
      </div>

      {/* Bio */}
      <div className={styles.bio}>
        {bioLines.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>

      {/* Links */}
      <div className={styles.linksRow}>
        <a
          href={`https://${profile.website}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
          id="website-link"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          {profile.website}
        </a>
      </div>

      {/* Tags */}
      <div className={styles.tagRow}>
        <a
          href="https://drive.google.com/file/d/1Jl5hg7sha9iIMb1RoOgv7LcRfpEvUyHU/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.resumeTag}
          id="resume-link"
        >
          🔖 Resume
        </a>
        <span className={styles.tagGreen}>✅ Open to Work</span>
      </div>

      {/* Action Buttons Row */}
      <div className={styles.actionButtonsWrapper}>
        <ActionButtons />
      </div>
    </section>
  );
}
