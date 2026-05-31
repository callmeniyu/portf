'use client'

import { useEffect, useState } from 'react'
import styles from './SplashScreen.module.css'

export default function SplashScreen() {
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 2700)
    const remove = setTimeout(() => setVisible(false), 3200)
    return () => { clearTimeout(timer); clearTimeout(remove) }
  }, [])

  if (!visible) return null

  return (
    <div className={`${styles.splash} ${fadeOut ? styles.fadeOut : ''}`} id="splash-screen">
      {/* Gradient icon — code brackets with IG gradient */}
      <div className={styles.iconWrapper}>
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="igGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f09433" />
              <stop offset="25%" stopColor="#e6683c" />
              <stop offset="50%" stopColor="#dc2743" />
              <stop offset="75%" stopColor="#cc2366" />
              <stop offset="100%" stopColor="#bc1888" />
            </linearGradient>
            <linearGradient id="igGradBorder" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f09433" />
              <stop offset="50%" stopColor="#dc2743" />
              <stop offset="100%" stopColor="#bc1888" />
            </linearGradient>
          </defs>
          {/* Rounded square background */}
          <rect x="2" y="2" width="76" height="76" rx="20" fill="url(#igGrad)" />
          {/* Code symbol: </> */}
          <text
            x="40"
            y="51"
            textAnchor="middle"
            fontSize="30"
            fontWeight="700"
            fontFamily="monospace"
            fill="#ffffff"
            letterSpacing="-2"
          >
            {`</>`}
          </text>
        </svg>
      </div>

      {/* From niyas — Instagram gradient text */}
      <div className={styles.fromText}>
        <svg width="120" height="24" viewBox="0 0 120 24">
          <defs>
            <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f09433" />
              <stop offset="33%" stopColor="#e6683c" />
              <stop offset="66%" stopColor="#dc2743" />
              <stop offset="100%" stopColor="#bc1888" />
            </linearGradient>
          </defs>
          <text
            x="60"
            y="17"
            textAnchor="middle"
            fontSize="13"
            fontWeight="500"
            fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
            fill="url(#textGrad)"
            letterSpacing="0.3"
          >
            from niyas
          </text>
        </svg>
      </div>
    </div>
  )
}
