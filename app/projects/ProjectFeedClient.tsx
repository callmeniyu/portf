'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import type { Project } from '@/lib/data'
import styles from './ProjectFeedClient.module.css'

interface Props { projects: Project[] }

export default function ProjectFeedClient({ projects }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const startId = searchParams.get('id')
  const feedRef = useRef<HTMLDivElement>(null)
  const [likedSet, setLikedSet] = useState<Set<string>>(new Set())
  const [savedSet, setSavedSet] = useState<Set<string>>(new Set())
  const [activeIdx, setActiveIdx] = useState(0)
  const scrolling = useRef(false)

  // Scroll to the starting project without animation
  useEffect(() => {
    const idx = startId ? Math.max(0, projects.findIndex(p => p.id === startId)) : 0
    setActiveIdx(idx)
    if (!feedRef.current || idx === 0) return
    // Use requestAnimationFrame to wait for DOM paint
    requestAnimationFrame(() => {
      feedRef.current?.scrollTo({ top: idx * feedRef.current.clientHeight, behavior: 'instant' })
    })
  }, [startId, projects])

  // Track which post is in view
  const onScroll = useCallback(() => {
    if (!feedRef.current || scrolling.current) return
    const h = feedRef.current.clientHeight
    const idx = Math.round(feedRef.current.scrollTop / h)
    setActiveIdx(idx)
  }, [])

  const toggleLike = (id: string) =>
    setLikedSet(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })

  const toggleSave = (id: string) =>
    setSavedSet(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })

  return (
    <div className={styles.page} id="projects-feed-page">
      {/* Top Bar */}
      <header className={styles.topBar}>
        <button className={styles.backBtn} onClick={() => router.back()} aria-label="Go back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <span className={styles.topTitle}>Post</span>
        <div className={styles.topSpacer} />
      </header>

      {/* Snap-scroll feed */}
      <div className={styles.feed} ref={feedRef} onScroll={onScroll}>
        {projects.map((project, idx) => {
          const liked = likedSet.has(project.id)
          const saved = savedSet.has(project.id)
          const fakeDots = Math.min(project.tech.length, 5)

          return (
            <article key={project.id} className={styles.post} id={`post-${project.id}`}>
              {/* Post Header */}
              <div className={styles.postHeader}>
                <div className={styles.postUser}>
                  <div className={styles.postAvatar}>N</div>
                  <div>
                    <div className={styles.postUsername}>niyasmohammed._</div>
                    <div className={styles.postLocation}>{project.category}</div>
                  </div>
                </div>
                <button className={styles.moreBtn} aria-label="More">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>
                  </svg>
                </button>
              </div>

              {/* Image */}
              <div className={styles.imageWrap}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="470px"
                  className={styles.postImg}
                  priority={idx === 0}
                />
                {/* Dot indicators */}
                <div className={styles.dots}>
                  {Array.from({ length: fakeDots }).map((_, i) => (
                    <span key={i} className={`${styles.dot} ${i === 0 ? styles.dotActive : ''}`} />
                  ))}
                </div>
              </div>

              {/* Actions + Content */}
              <div className={styles.postContent}>
                {/* Action bar */}
                <div className={styles.actionBar}>
                  <div className={styles.leftActions}>
                    <button
                      className={`${styles.actionBtn} ${liked ? styles.liked : ''}`}
                      onClick={() => toggleLike(project.id)}
                      aria-label="Like"
                    >
                      <svg width="26" height="26" viewBox="0 0 24 24"
                        fill={liked ? '#ed4956' : 'none'}
                        stroke={liked ? '#ed4956' : 'currentColor'}
                        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                      </svg>
                    </button>
                    <button className={styles.actionBtn} aria-label="Comment">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                      </svg>
                    </button>
                    <button className={styles.actionBtn} aria-label="Share">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                    </button>
                  </div>
                  <button
                    className={`${styles.actionBtn} ${saved ? styles.saved : ''}`}
                    onClick={() => toggleSave(project.id)}
                    aria-label="Save"
                  >
                    <svg width="26" height="26" viewBox="0 0 24 24"
                      fill={saved ? 'currentColor' : 'none'}
                      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                    </svg>
                  </button>
                </div>

                {/* Likes row */}
                <p className={styles.likesRow}>
                  <strong>{(project.likes + (liked ? 1 : 0)).toLocaleString()}</strong> likes
                </p>

                {/* Caption */}
                <p className={styles.caption}>
                  <strong className={styles.captionUser}>niyasmohammed._</strong>{' '}
                  <strong>{project.title}</strong>{' '}
                  <span className={styles.captionDesc}>{project.description}</span>
                </p>

                {/* Tech hashtags */}
                <p className={styles.techTags}>
                  {project.tech.map(t => (
                    <span key={t} className={styles.techTag}>
                      #{t.toLowerCase().replace(/[^a-z0-9]/g, '')}
                    </span>
                  ))}
                </p>

                {/* View comments */}
                <p className={styles.viewComments}>View all {project.comments} comments</p>

                {/* CTA Buttons */}
                <div className={styles.ctaRow}>
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className={styles.ctaLive} id={`live-${project.id}`}>
                    🌐 Live Demo
                  </a>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.ctaGithub} id={`gh-${project.id}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.73-4.03-1.42-4.03-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.19.69.8.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                </div>

                {/* Date */}
                <p className={styles.date}>Featured Project</p>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
