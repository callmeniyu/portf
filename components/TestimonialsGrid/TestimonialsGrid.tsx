'use client'

import { useState, useEffect } from 'react'
import type { Testimonial } from '@/lib/data'
import styles from './TestimonialsGrid.module.css'

interface TestimonialsGridProps {
  testimonials: Testimonial[]
}

export default function TestimonialsGrid({ testimonials }: TestimonialsGridProps) {
  const [likedSet, setLikedSet] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem('portfolio-liked-testimonials')
      return stored ? new Set(JSON.parse(stored)) : new Set()
    } catch { return new Set() }
  })

  // Persist likes to localStorage
  useEffect(() => {
    try { localStorage.setItem('portfolio-liked-testimonials', JSON.stringify([...likedSet])) } catch {}
  }, [likedSet])

  const toggleLike = (id: string) =>
    setLikedSet(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })

  return (
    <div className={styles.feed} id="testimonials-feed">
      {testimonials.map((t, tIdx) => {
        const liked = likedSet.has(t.id)
        const likeBase = 40 + tIdx * 13

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

            {/* Review text body (no image — Instagram-style text post) */}
            <div className={styles.textBody}>
              <p className={styles.reviewText}>"{t.text}"</p>
              <div className={styles.projectTag}>📦 {t.project}</div>
            </div>

            {/* Action bar — only Like button */}
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
              </div>
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

            {/* Star rating */}
            <div className={styles.ratingRow}>
              {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
            </div>

            {/* Date */}
            <div className={styles.date}>{t.date}</div>
          </article>
        )
      })}
    </div>
  )
}
