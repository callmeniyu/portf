import TopNav from '@/components/TopNav/TopNav'
import ProfileHeader from '@/components/ProfileHeader/ProfileHeader'
import ActionButtons from '@/components/ActionButtons/ActionButtons'
import StoryHighlights from '@/components/StoryHighlights/StoryHighlights'
import ContentTabs from '@/components/ContentTabs/ContentTabs'
import BottomNav from '@/components/BottomNav/BottomNav'
import { profile, highlights, projects, testimonials } from '@/lib/data'

export default function HomePage() {
  return (
    <main id="portfolio-main" style={{ paddingBottom: '64px' }}>
      {/* ① Top navigation bar */}
      <TopNav username={profile.username} />

      {/* ② Profile section */}
      <ProfileHeader profile={profile} />

      {/* ③ Follow / Message / Contact buttons */}
      <ActionButtons />

      {/* ④ Story Highlights */}
      <StoryHighlights highlights={highlights} />

      {/* ⑤ Posts (Projects) + Tags (Testimonials) tabs */}
      <ContentTabs projects={projects} testimonials={testimonials} />

      {/* ⑥ Instagram-style bottom nav */}
      <BottomNav />
    </main>
  )
}