'use client'

import { useState } from 'react'
import TopNav from '@/components/TopNav/TopNav'
import ProfileHeader from '@/components/ProfileHeader/ProfileHeader'
import ActionButtons from '@/components/ActionButtons/ActionButtons'
import StoryHighlights from '@/components/StoryHighlights/StoryHighlights'
import ContentTabs from '@/components/ContentTabs/ContentTabs'
import BottomNav from '@/components/BottomNav/BottomNav'
import StoryViewer from '@/components/StoryViewer/StoryViewer'
import { profile, profileStory, highlights, projects, testimonials } from '@/lib/data'

export default function HomePage() {
  const [viewedStories, setViewedStories] = useState<Set<string>>(new Set())
  const [activeStory, setActiveStory] = useState<string | null>(null)

  const handleStoryClose = (id: string) => {
    setViewedStories(prev => new Set([...prev, id]))
    setActiveStory(null)
  }

  const allHighlights = [profileStory, ...highlights]
  const profileStoryViewed = viewedStories.has('profile-story')

  return (
    <main id="portfolio-main" style={{ paddingBottom: '64px' }}>
      <TopNav username={profile.username} />

      <ProfileHeader
        profile={profile}
        onAvatarClick={() => setActiveStory('profile-story')}
        profileStoryViewed={profileStoryViewed}
      />

      <ActionButtons />

      <StoryHighlights
        highlights={highlights}
        viewedStories={viewedStories}
        onStoryViewed={(id) => setViewedStories(prev => new Set([...prev, id]))}
      />

      <ContentTabs projects={projects} testimonials={testimonials} />
      <BottomNav />

      {/* Profile story viewer (avatar tap) */}
      {activeStory && (
        <StoryViewer
          highlights={allHighlights}
          initialHighlightId={activeStory}
          onClose={() => handleStoryClose(activeStory)}
        />
      )}
    </main>
  )
}