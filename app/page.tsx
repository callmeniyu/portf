"use client";

import { useState } from "react";
import TopNav from "@/components/TopNav/TopNav";
import ProfileHeader from "@/components/ProfileHeader/ProfileHeader";

import StoryHighlights from "@/components/StoryHighlights/StoryHighlights";
import ContentTabs from "@/components/ContentTabs/ContentTabs";
import BottomNav from "@/components/BottomNav/BottomNav";
import StoryViewer from "@/components/StoryViewer/StoryViewer";
import {
  profile,
  profileStory,
  highlights,
  projects,
  testimonials,
} from "@/lib/data";

export default function HomePage() {
  const [viewedStories, setViewedStories] = useState<Set<string>>(new Set());
  const [profileStoryOpen, setProfileStoryOpen] = useState(false);

  /** Mark a batch of story IDs as viewed */
  const markViewed = (ids: string[]) =>
    setViewedStories((prev) => new Set([...prev, ...ids]));

  const profileStoryViewed = viewedStories.has("profile-story");

  return (
    <main id="portfolio-main" style={{ paddingBottom: "64px" }}>
      <TopNav username={profile.username} />

      <ProfileHeader
        profile={profile}
        onAvatarClick={() => setProfileStoryOpen(true)}
        profileStoryViewed={profileStoryViewed}
      />


      {/* Highlights — passes all viewed IDs on close so all rings update */}
      <StoryHighlights
        highlights={highlights}
        viewedStories={viewedStories}
        onStoriesViewed={markViewed}
      />

      <ContentTabs projects={projects} testimonials={testimonials} />
      <BottomNav />

      {/* Profile story (avatar tap) */}
      {profileStoryOpen && (
        <StoryViewer
          highlights={[profileStory]}
          initialHighlightId="profile-story"
          onClose={(ids?: string[]) => {
            if (ids) markViewed(ids);
            setProfileStoryOpen(false);
          }}
        />
      )}
    </main>
  );
}
