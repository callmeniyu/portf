import styles from './BottomNav.module.css'

export default function BottomNav() {
  return (
    <nav className={styles.nav} id="bottom-nav" aria-label="Bottom navigation">
      {/* Home — disabled */}
      <button className={styles.navItemDisabled} disabled aria-label="Home" aria-disabled="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
      </button>

      {/* Search — disabled */}
      <button className={styles.navItemDisabled} disabled aria-label="Search" aria-disabled="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      </button>

      {/* Create — disabled */}
      <button className={styles.navItemDisabled} disabled aria-label="Create" aria-disabled="true">
        <div className={styles.addBtn}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </div>
      </button>

      {/* Reels — disabled */}
      <button className={styles.navItemDisabled} disabled aria-label="Reels" aria-disabled="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/>
        </svg>
      </button>

      {/* Profile — ACTIVE */}
      <button className={styles.navItemActive} aria-label="Profile" aria-current="page">
        <div className={styles.profileThumb}><span>N</span></div>
      </button>
    </nav>
  )
}
