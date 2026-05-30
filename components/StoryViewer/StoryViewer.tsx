'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import type { Highlight, HighlightPage, ExperiencePage, SkillPage, ServicePage, EducationPage, ContactPage } from '@/lib/data'
import styles from './StoryViewer.module.css'

interface StoryViewerProps {
  highlights: Highlight[]
  initialHighlightId: string
  onClose: () => void
}

const STORY_DURATION = 15000 // 15 seconds per page

export default function StoryViewer({ highlights, initialHighlightId, onClose }: StoryViewerProps) {
  const highlightIdx = highlights.findIndex((h) => h.id === initialHighlightId)
  const [currentHighlight, setCurrentHighlight] = useState(Math.max(0, highlightIdx))
  const [currentPage, setCurrentPage] = useState(0)
  const [progress, setProgress] = useState(0)
  const [paused, setPaused] = useState(false)
  const rafRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)
  const pausedProgressRef = useRef<number>(0)

  const highlight = highlights[currentHighlight]
  const pages = highlight.pages

  const goNext = useCallback(() => {
    if (currentPage < pages.length - 1) {
      setCurrentPage((p) => p + 1); setProgress(0)
    } else if (currentHighlight < highlights.length - 1) {
      setCurrentHighlight((h) => h + 1); setCurrentPage(0); setProgress(0)
    } else {
      onClose()
    }
  }, [currentPage, pages.length, currentHighlight, highlights.length, onClose])

  const goPrev = useCallback(() => {
    if (currentPage > 0) {
      setCurrentPage((p) => p - 1); setProgress(0)
    } else if (currentHighlight > 0) {
      setCurrentHighlight((h) => h - 1); setCurrentPage(0); setProgress(0)
    }
  }, [currentPage, currentHighlight])

  useEffect(() => {
    if (paused) { cancelAnimationFrame(rafRef.current); return }
    // Restart from where we paused
    const offset = pausedProgressRef.current * STORY_DURATION / 100
    startTimeRef.current = performance.now() - offset

    const animate = (now: number) => {
      const elapsed = now - startTimeRef.current
      const p = Math.min((elapsed / STORY_DURATION) * 100, 100)
      setProgress(p)
      if (p < 100) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        goNext()
      }
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [currentHighlight, currentPage, paused, goNext])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goNext, goPrev, onClose])

  const holdStart = () => { pausedProgressRef.current = progress; setPaused(true) }
  const holdEnd = () => setPaused(false)

  return (
    <div className={styles.overlay} id="story-viewer" onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {/* Progress bars */}
        <div className={styles.progressRow}>
          {pages.map((_, i) => (
            <div key={i} className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: i < currentPage ? '100%' : i === currentPage ? `${progress}%` : '0%' }} />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.highlightInfo}>
            <div className={styles.hlIcon} style={{ background: highlight.gradient }}>{highlight.icon}</div>
            <div>
              <div className={styles.hlLabel}>{highlight.label}</div>
              <div className={styles.hlTime}>Portfolio · {currentPage + 1}/{pages.length}</div>
            </div>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.headerBtn} onPointerDown={holdStart} onPointerUp={holdEnd} onPointerLeave={holdEnd} aria-label="Hold to pause">
              {paused
                ? <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                : <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
              }
            </button>
            <button className={styles.headerBtn} onClick={onClose} aria-label="Close story">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tap zones */}
        <div className={styles.tapLeft} onPointerUp={goPrev} />
        <div className={styles.tapRight} onPointerUp={goNext} />

        {/* Content */}
        <div className={styles.content} key={`${currentHighlight}-${currentPage}`}>
          <StoryPageContent page={pages[currentPage]} gradient={highlight.gradient} />
        </div>
      </div>
    </div>
  )
}

function StoryPageContent({ page, gradient }: { page: HighlightPage; gradient: string }) {
  switch (page.type) {
    case 'experience': return <ExperienceStory page={page as ExperiencePage} gradient={gradient} />
    case 'skill':      return <SkillStory page={page as SkillPage} gradient={gradient} />
    case 'service':    return <ServiceStory page={page as ServicePage} gradient={gradient} />
    case 'education':  return <EducationStory page={page as EducationPage} gradient={gradient} />
    case 'contact':    return <ContactStory page={page as ContactPage} gradient={gradient} />
    default: return null
  }
}

function ExperienceStory({ page, gradient }: { page: ExperiencePage; gradient: string }) {
  return (
    <div className={styles.storyCard} style={{ background: gradient }}>
      <div className={styles.storyLogo}>{page.logo}</div>
      <div className={styles.storyBadge}>Work Experience</div>
      <h2 className={styles.storyTitle}>{page.role}</h2>
      <p className={styles.storyCompany}>{page.company}</p>
      <p className={styles.storyMeta}>{page.period} · {page.location}</p>
      <p className={styles.storyDesc}>{page.description}</p>
      <div className={styles.techRow}>{page.tech.map((t) => <span key={t} className={styles.techChip}>{t}</span>)}</div>
    </div>
  )
}

function SkillStory({ page, gradient }: { page: SkillPage; gradient: string }) {
  return (
    <div className={styles.storyCard} style={{ background: 'var(--ig-bg)' }}>
      <div className={styles.skillGradientBar} style={{ background: gradient }} />
      <div className={styles.storyBadge} style={{ background: gradient }}>Skills</div>
      <h2 className={styles.storyTitle} style={{ color: 'var(--ig-text-primary)' }}>{page.title}</h2>
      <p className={styles.storyCategoryLabel}>{page.category}</p>
      <div className={styles.skillList}>
        {page.skills.map((skill, i) => (
          <div key={skill.name} className={styles.skillItem} style={{ animationDelay: `${i * 0.1}s` }}>
            <div className={styles.skillHeader}>
              <span>{skill.icon} {skill.name}</span>
              <span className={styles.skillPct}>{skill.level}%</span>
            </div>
            <div className={styles.skillTrack}>
              <div className={styles.skillFill} style={{ width: `${skill.level}%`, background: gradient }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ServiceStory({ page, gradient }: { page: ServicePage; gradient: string }) {
  return (
    <div className={styles.storyCard} style={{ background: gradient }}>
      <div className={styles.storyLogo} style={{ fontSize: '52px' }}>{page.icon}</div>
      <div className={styles.storyBadge}>Services Offered</div>
      <h2 className={styles.storyTitle}>{page.title}</h2>
      <p className={styles.storyDesc}>{page.description}</p>
      <div className={styles.featureList}>
        {page.features.map((f) => (
          <div key={f} className={styles.featureItem}>
            <span className={styles.featureCheck}>✓</span><span>{f}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function EducationStory({ page, gradient }: { page: EducationPage; gradient: string }) {
  return (
    <div className={styles.storyCard} style={{ background: gradient }}>
      <div className={styles.storyLogo}>{page.icon}</div>
      <div className={styles.storyBadge}>Education</div>
      <h2 className={styles.storyTitle}>{page.degree}</h2>
      <p className={styles.storyCompany}>{page.institution}</p>
      <p className={styles.storyMeta}>{page.period} · GPA: {page.gpa}</p>
      <div className={styles.featureList}>
        {page.highlights.map((h) => (
          <div key={h} className={styles.featureItem}>
            <span className={styles.featureCheck}>🏆</span><span>{h}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ContactStory({ page, gradient }: { page: ContactPage; gradient: string }) {
  return (
    <div className={styles.storyCard} style={{ background: gradient }}>
      <div className={styles.storyLogo}>📬</div>
      <div className={styles.storyBadge}>Get In Touch</div>
      <h2 className={styles.storyTitle}>{page.title}</h2>
      <div className={styles.contactGrid}>
        {[
          { icon: '📧', label: 'Email', value: page.email },
          { icon: '📍', label: 'Location', value: page.location },
          { icon: '💼', label: 'Status', value: page.availability },
          { icon: '🐙', label: 'GitHub', value: page.links.github },
        ].map((item) => (
          <div key={item.label} className={styles.contactItem}>
            <span className={styles.contactIcon}>{item.icon}</span>
            <div>
              <div className={styles.contactLabel}>{item.label}</div>
              <div className={styles.contactValue}>{item.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
