'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Project } from '@/lib/data'
import styles from './ProjectModal.module.css'

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [imgIdx, setImgIdx] = useState(0)

  return (
    <div className={styles.backdrop} onClick={onClose} id="project-modal-backdrop">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()} id={`modal-${project.id}`}>
        {/* Drag handle */}
        <div className={styles.handle} />

        {/* Image carousel */}
        <div className={styles.imgWrapper}>
          <Image
            src={project.images[imgIdx]}
            alt={`${project.title} screenshot ${imgIdx + 1}`}
            fill
            className={styles.img}
            sizes="600px"
          />
          <div className={styles.imgGradient} />
          <span className={styles.categoryBadge}>{project.category}</span>
          {/* Carousel tap zones */}
          {project.images.length > 1 && (
            <>
              <div className={styles.carouselLeft} onClick={() => setImgIdx(i => (i - 1 + project.images.length) % project.images.length)} />
              <div className={styles.carouselRight} onClick={() => setImgIdx(i => (i + 1) % project.images.length)} />
            </>
          )}
          {/* Dot indicators */}
          {project.images.length > 1 && (
            <div className={styles.dots}>
              {project.images.map((_, i) => (
                <span key={i}
                  className={`${styles.dot} ${i === imgIdx ? styles.dotActive : ''}`}
                  onClick={() => setImgIdx(i)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className={styles.body}>
          {/* Header: profile mini + actions */}
          <div className={styles.postHeader}>
            <div className={styles.userMini}>
              <div className={styles.avatarMini}>N</div>
              <div>
                <div className={styles.usernameMini}>niyasmohammed._</div>
                <div className={styles.projectLocation}>{project.category} Project</div>
              </div>
            </div>
            <div className={styles.headerRight}>
              <button className={styles.iconBtn} aria-label="More options">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
                </svg>
              </button>
            </div>
          </div>

          {/* Action bar */}
          <div className={styles.actionBar}>
            <div className={styles.leftActions}>
              <button className={styles.actionBtn} aria-label="Like">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
              <button className={styles.actionBtn} aria-label="Share" onClick={() => {
                const url = `${window.location.origin}/projects?id=${project.id}`;
                if (navigator.share) {
                  navigator.share({ title: project.title, url });
                } else {
                  navigator.clipboard.writeText(url);
                }
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
            <button className={styles.actionBtn} aria-label="Bookmark" onClick={() => {
              const url = `${window.location.origin}/projects?id=${project.id}`;
              navigator.clipboard.writeText(url).then(() => {
                alert('Link copied! Bookmark this with Ctrl+D / Cmd+D.');
              }).catch(() => {
                prompt('Copy this link to bookmark:', url);
              });
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
              </svg>
            </button>
          </div>

          {/* Likes */}
          <div className={styles.likes}>{project.likes.toLocaleString()} likes</div>

          {/* Caption */}
          <div className={styles.caption}>
            <span className={styles.captionUsername}>niyasmohammed._</span>{' '}
            <span className={styles.captionTitle}>{project.title}</span>{' '}
            <span className={styles.captionDesc}>{project.description}</span>
          </div>

          {/* Tech stack */}
          <div className={styles.techRow}>
            {project.tech.map((t) => (
              <span key={t} className={styles.techTag}>#{t.toLowerCase().replace(/[^a-z0-9]/g, '')}</span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className={styles.ctaRow}>
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaLive}
              id={`live-link-${project.id}`}
            >
              🌐 Live Demo
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaGithub}
              id={`github-link-${project.id}`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
