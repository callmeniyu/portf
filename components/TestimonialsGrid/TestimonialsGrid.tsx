import type { Testimonial } from '@/lib/data'
import styles from './TestimonialsGrid.module.css'

interface TestimonialsGridProps {
  testimonials: Testimonial[]
}

export default function TestimonialsGrid({ testimonials }: TestimonialsGridProps) {
  return (
    <div className={styles.grid} id="testimonials-grid">
      {testimonials.map((t) => (
        <div key={t.id} id={`testimonial-${t.id}`} className={styles.card}>
          <div className={styles.starsRow}>
            {'★'.repeat(t.rating)}
          </div>
          <p className={styles.text}>"{t.text}"</p>
          <div className={styles.footer}>
            <div className={styles.avatar}>{t.avatar}</div>
            <div>
              <div className={styles.name}>{t.name}</div>
              <div className={styles.role}>{t.role}</div>
            </div>
          </div>
          <div className={styles.projectTag}>📦 {t.project}</div>
          <div className={styles.date}>{t.date}</div>
        </div>
      ))}
    </div>
  )
}
