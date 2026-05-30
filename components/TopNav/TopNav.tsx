'use client'

import { useState } from 'react'
import { useTheme } from '@/components/ThemeProvider/ThemeProvider'
import styles from './TopNav.module.css'

interface TopNavProps {
  username: string
}

export default function TopNav({ username }: TopNavProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggle } = useTheme()

  const menuItems = [
    { icon: '🔗', label: 'Copy Profile Link', action: () => {} },
    { icon: '📤', label: 'Share This Profile', action: () => {} },
    { icon: '🔔', label: 'Turn On Notifications', action: () => {} },
    { icon: theme === 'dark' ? '☀️' : '🌙', label: theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode', action: toggle },
    { icon: '📋', label: 'About This Account', action: () => {} },
  ]

  return (
    <>
      <header className={styles.nav} id="top-nav">
        <button className={styles.iconBtn} aria-label="Go back" id="back-btn">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className={styles.userInfo}>
          <span className={styles.username}>{username}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#0095f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <button
          className={styles.iconBtn}
          aria-label="More options"
          id="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
          </svg>
        </button>
      </header>

      {menuOpen && (
        <>
          <div className={styles.backdrop} onClick={() => setMenuOpen(false)} />
          <div className={styles.dropdown} id="menu-dropdown">
            {menuItems.map((item) => (
              <button
                key={item.label}
                className={styles.dropdownItem}
                onClick={() => { item.action(); setMenuOpen(false) }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </>
  )
}
