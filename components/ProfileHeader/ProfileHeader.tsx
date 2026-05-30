import Image from 'next/image'
import styles from './ProfileHeader.module.css'
import type { profile as ProfileType } from '@/lib/data'

interface ProfileHeaderProps {
  profile: typeof ProfileType
}

// Portfolio-specific metrics replacing followers/following
const portfolioStats = [
  { value: '5+', label: 'Yrs Exp', icon: '💼' },
  { value: '15+', label: 'Projects', icon: '🚀' },
  { value: '3', label: 'Stacks', icon: '⚡' },
]

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  const bioLines = profile.bio.split('\n')

  return (
    <section className={styles.section} id="profile-header">
      {/* Top Row: Avatar + Stats */}
      <div className={styles.topRow}>
        <div className={styles.avatarWrapper}>
          <div className="story-ring">
            <div className="story-ring-inner">
              <Image
                src={profile.avatar}
                alt={`${profile.name} profile photo`}
                width={86}
                height={86}
                className={styles.avatar}
                priority
              />
            </div>
          </div>
        </div>

        <div className={styles.stats}>
          {portfolioStats.map((stat) => (
            <div key={stat.label} className={styles.statItem}>
              <span className={styles.statIcon}>{stat.icon}</span>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Name + Profession */}
      <div className={styles.nameBlock}>
        <h1 className={styles.name}>{profile.name}</h1>
        <p className={styles.profession}>{profile.profession}</p>
      </div>

      {/* Bio */}
      <div className={styles.bio}>
        {bioLines.map((line, i) => <p key={i}>{line}</p>)}
      </div>

      {/* Links */}
      <div className={styles.linksRow}>
        <a href={`https://${profile.website}`} target="_blank" rel="noopener noreferrer" className={styles.link} id="website-link">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          {profile.website}
        </a>
        <a href={`mailto:${profile.email}`} className={styles.link} id="email-link">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          {profile.email}
        </a>
      </div>

      {/* Tags */}
      <div className={styles.tagRow}>
        <span className={styles.tag}>🔖 Portfolio</span>
        <span className={styles.tagGreen}>✅ Open to Work</span>
      </div>
    </section>
  )
}
