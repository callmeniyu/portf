'use client'

import Image from 'next/image'
import styles from './ProfileHeader.module.css'
import type { profile as ProfileType } from '@/lib/data'

interface ProfileHeaderProps {
  profile: typeof ProfileType
  onAvatarClick?: () => void
  profileStoryViewed?: boolean
}

export default function ProfileHeader({ profile, onAvatarClick, profileStoryViewed }: ProfileHeaderProps) {
  const bioLines = profile.bio.split('\n')

  return (
    <section className={styles.section} id="profile-header">
      {/* Top Row: Avatar + Stats */}
      <div className={styles.topRow}>

        {/* Clickable avatar with story ring */}
        <button
          className={`${styles.avatarBtn} ${profileStoryViewed ? styles.avatarViewed : ''}`}
          onClick={onAvatarClick}
          aria-label="View profile story"
        >
          <div className={profileStoryViewed ? styles.ringViewed : styles.ring}>
            <div className={styles.ringInner}>
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
        </button>

        {/* Instagram-style stats */}
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{profile.postsCount}</span>
            <span className={styles.statLabel}>projects</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{profile.followersCount}</span>
            <span className={styles.statLabel}>followers</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{profile.followingCount}</span>
            <span className={styles.statLabel}>following</span>
          </div>
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
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          </svg>
          {profile.website}
        </a>
      </div>

      {/* Tags */}
      <div className={styles.tagRow}>
        <a
          href="https://drive.google.com/file/d/1Jl5hg7sha9iIMb1RoOgv7LcRfpEvUyHU/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.resumeTag}
          id="resume-link"
        >
          🔖 Resume
        </a>
        <span className={styles.tagGreen}>✅ Open to Work</span>
      </div>
    </section>
  )
}
