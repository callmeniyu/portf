'use client'

import { useState } from 'react'
import type { Testimonial } from '@/lib/data'
import styles from './TestimonialsGrid.module.css'

interface TestimonialsGridProps {
  testimonials: Testimonial[]
}

export default function TestimonialsGrid({ testimonials }: TestimonialsGridProps) {
  const [likedSet, setLikedSet] = useState<Set<string>>(new Set())
  const [savedSet, setSavedSet] = useState<Set<string>>(new Set())

  const toggleLike = (id: string) =>
    setLikedSet(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })

  const toggleSave = (id: string) =>
    setSavedSet(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })

  return (
    <div className={styles.feed} id="testimonials-feed">
      {testimonials.map((t) => {
        const liked = likedSet.has(t.id)
        const saved = savedSet.has(t.id)
        // Generate a plausible like count
        const likeBase = 40 + testimonials.indexOf(t) * 13

        return (
          <article key={t.id} id={`review-${t.id}`} className={styles.post}>
            {/* Post header */}
            <div className={styles.postHeader}>
              <div className={styles.userRow}>
                <div className={styles.avatar}>{t.avatar}</div>
                <div>
                  <div className={styles.username}>{t.name}</div>
                  <div className={styles.role}>{t.role}</div>
                </div>
              </div>
              <button className={styles.moreBtn} aria-label="More">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>
                </svg>
              </button>
            </div>

            {/* Review text body (no image) */}
            <div className={styles.textBody}>
              <p className={styles.reviewText}>"{t.text}"</p>
              <div className={styles.projectTag}>📦 {t.project}</div>
            </div>

            {/* Action bar */}
            <div className={styles.actionBar}>
              <div className={styles.leftActions}>
                <button
                  className={`${styles.actionBtn} ${liked ? styles.liked : ''}`}
                  onClick={() => toggleLike(t.id)}
                  aria-label="Like"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24"
                    fill={liked ? '#ed4956' : 'none'}
                    stroke={liked ? '#ed4956' : 'currentColor'}
                    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>
                <button className={styles.actionBtn} aria-label="Comment">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </button>
                <button className={styles.actionBtn} aria-label="Share">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </button>
              </div>
              <button
                className={`${styles.actionBtn} ${saved ? styles.saved : ''}`}
                onClick={() => toggleSave(t.id)}
                aria-label="Save"
              >
                <svg width="24" height="24" viewBox="0 0 24 24"
                  fill={saved ? 'currentColor' : 'none'}
                  stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                </svg>
              </button>
            </div>

            {/* Likes */}
            <div className={styles.likes}>
              {(likeBase + (liked ? 1 : 0)).toLocaleString()} likes
            </div>

            {/* Caption */}
            <div className={styles.caption}>
              <strong className={styles.captionUser}>niyasmohammed._</strong>
              {' '}tagged by{' '}
              <strong>{t.name.split(' ')[0].toLowerCase().replace(' ', '_')}</strong>
            </div>

            {/* Date */}
            <div className={styles.date}>{t.date}</div>
          </article>
        )
      })}
    </div>
  )
}
