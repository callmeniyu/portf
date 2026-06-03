"use client";

import { useState } from "react";
import type { Highlight } from "@/lib/data";
import StoryViewer from "@/components/StoryViewer/StoryViewer";
import styles from "./StoryHighlights.module.css";

interface StoryHighlightsProps {
  highlights: Highlight[];
  viewedStories?: Set<string>;
  onStoriesViewed?: (ids: string[]) => void;
}

export default function StoryHighlights({
  highlights,
  viewedStories,
  onStoriesViewed,
}: StoryHighlightsProps) {
  const [activeStory, setActiveStory] = useState<string | null>(null);

  const handleClose = (visitedIds?: string[]) => {
    if (visitedIds) onStoriesViewed?.(visitedIds);
    setActiveStory(null);
  };

  return (
    <>
      <section
        className={styles.section}
        id="story-highlights"
        aria-label="Story Highlights"
      >
        <div className={styles.scrollRow}>
          {highlights.map((highlight) => {
            const viewed = viewedStories?.has(highlight.id) ?? false;
            return (
              <div
                key={highlight.id}
                id={`highlight-${highlight.id}`}
                className={styles.item}
                role="button"
                tabIndex={0}
                aria-label={`Open ${highlight.label} story`}
                onClick={() => setActiveStory(highlight.id)}
                onKeyDown={(e) =>
                  e.key === "Enter" && setActiveStory(highlight.id)
                }
              >
                <div
                  className={styles.ring}
                  style={{
                    background: viewed ? "transparent" : highlight.gradient,
                  }}
                >
                  <div
                    className={`${styles.ringInner} ${viewed ? styles.ringInnerViewed : ""}`}
                  >
                    <div className={styles.iconCircle}>
                      <span className={styles.icon}>{highlight.icon}</span>
                    </div>
                  </div>
                </div>
                <span className={styles.label}>{highlight.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      {activeStory && (
        <StoryViewer
          highlights={highlights}
          initialHighlightId={activeStory}
          onClose={handleClose}
        />
      )}
    </>
  );
}
