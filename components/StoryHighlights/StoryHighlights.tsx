'use client'

import { useState } from 'react'
import type { Highlight } from '@/lib/data'
import StoryViewer from '@/components/StoryViewer/StoryViewer'
import styles from './StoryHighlights.module.css'

interface StoryHighlightsProps {
  highlights: Highlight[]
}

export default function StoryHighlights({ highlights }: StoryHighlightsProps) {
  const [activeStory, setActiveStory] = useState<string | null>(null)

  return (
    <>
      <section className={styles.section} id="story-highlights" aria-label="Story Highlights">
        <div className={styles.scrollRow}>
          {highlights.map((highlight) => (
            <div
              key={highlight.id}
              id={`highlight-${highlight.id}`}
              className={styles.item}
              // Use onPointerUp for reliable mobile tap detection
              onPointerUp={(e) => { e.currentTarget.releasePointerCapture(e.pointerId); setActiveStory(highlight.id) }}
              role="button"
              tabIndex={0}
              aria-label={`Open ${highlight.label} story`}
              onKeyDown={(e) => e.key === 'Enter' && setActiveStory(highlight.id)}
            >
              <div className={styles.ring} style={{ background: highlight.gradient }}>
                <div className={styles.ringInner}>
                  <div className={styles.iconCircle}>
                    <span className={styles.icon}>{highlight.icon}</span>
                  </div>
                </div>
              </div>
              <span className={styles.label}>{highlight.label}</span>
            </div>
          ))}
        </div>
      </section>

      {activeStory && (
        <StoryViewer
          highlights={highlights}
          initialHighlightId={activeStory}
          onClose={() => setActiveStory(null)}
        />
      )}
    </>
  )
}
