'use client'

import { useState } from 'react'
import type { Project, Testimonial } from '@/lib/data'
import ProjectGrid from '@/components/ProjectGrid/ProjectGrid'
import TestimonialsGrid from '@/components/TestimonialsGrid/TestimonialsGrid'
import styles from './ContentTabs.module.css'

interface ContentTabsProps {
  projects: Project[]
  testimonials: Testimonial[]
}

type Tab = 'posts' | 'tags'

export default function ContentTabs({ projects, testimonials }: ContentTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>('posts')

  return (
    <section className={styles.section} id="content-tabs">
      {/* Tab Header */}
      <div className={styles.tabBar} role="tablist">
        <button
          role="tab"
          id="tab-posts"
          aria-selected={activeTab === 'posts'}
          aria-controls="panel-posts"
          className={`${styles.tab} ${activeTab === 'posts' ? styles.active : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          {/* Grid icon */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
          </svg>
          {activeTab === 'posts' && <span className={styles.tabLabel}>Projects</span>}
        </button>

        <button
          role="tab"
          id="tab-tags"
          aria-selected={activeTab === 'tags'}
          aria-controls="panel-tags"
          className={`${styles.tab} ${activeTab === 'tags' ? styles.active : ''}`}
          onClick={() => setActiveTab('tags')}
        >
          {/* Tag/person icon */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
            <line x1="7" y1="7" x2="7.01" y2="7" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          {activeTab === 'tags' && <span className={styles.tabLabel}>Reviews</span>}
        </button>
      </div>

      {/* Panels */}
      <div
        role="tabpanel"
        id="panel-posts"
        aria-labelledby="tab-posts"
        hidden={activeTab !== 'posts'}
      >
        <ProjectGrid projects={projects} />
      </div>

      <div
        role="tabpanel"
        id="panel-tags"
        aria-labelledby="tab-tags"
        hidden={activeTab !== 'tags'}
      >
        <TestimonialsGrid testimonials={testimonials} />
      </div>
    </section>
  )
}
