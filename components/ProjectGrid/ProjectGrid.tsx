'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import type { Project } from '@/lib/data'
import styles from './ProjectGrid.module.css'

interface ProjectGridProps {
  projects: Project[]
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const router = useRouter()

  return (
    <div className={styles.grid} id="project-grid">
      {projects.map((project, i) => (
        <button
          key={project.id}
          id={`project-${project.id}`}
          className={styles.cell}
          onClick={() => router.push(`/projects?id=${project.id}`)}
          aria-label={`View ${project.title}`}
          style={{ animationDelay: `${i * 0.06}s` }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="33vw"
            className={styles.img}
          />
          <div className={styles.overlay}>
            <div className={styles.overlayStats}>
              <span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                {project.likes}
              </span>
              <span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                {project.comments}
              </span>
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}
