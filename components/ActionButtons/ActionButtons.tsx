'use client'

import styles from './ActionButtons.module.css'

export default function ActionButtons() {
  return (
    <div className={styles.row} id="action-buttons">
      {/* Follow → GitHub */}
      <button className={styles.followBtn} id="follow-btn" aria-label="Follow on GitHub">
        Follow
      </button>

      {/* Message → LinkedIn */}
      <button className={styles.messageBtn} id="message-btn" aria-label="Message on LinkedIn">
        Message
      </button>

      {/* Contact / Email */}
      <button className={styles.contactBtn} id="contact-btn" aria-label="Contact">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      </button>

      {/* Add Friend / Chevron */}
      <button className={styles.chevronBtn} id="chevron-btn" aria-label="More options">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
    </div>
  )
}
