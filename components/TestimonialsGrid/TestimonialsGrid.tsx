"use client";

import { useState, useEffect } from "react";
import type { Testimonial } from "@/lib/data";
import styles from "./TestimonialsGrid.module.css";

interface TestimonialsGridProps {
  testimonials: Testimonial[];
}

export default function TestimonialsGrid({
  testimonials,
}: TestimonialsGridProps) {
  const [likedSet, setLikedSet] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem("portfolio-liked-testimonials");
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Persist likes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        "portfolio-liked-testimonials",
        JSON.stringify([...likedSet]),
      );
    } catch {}
  }, [likedSet]);

  const toggleLike = (id: string) =>
    setLikedSet((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  return (
    <div className={styles.feed} id="testimonials-feed">
      {testimonials.map((t, tIdx) => {
        const liked = likedSet.has(t.id);
        const likeBase = 40 + tIdx * 13;

        return (
          <article key={t.id} id={`review-${t.id}`} className={styles.post}>
            {/* Post header */}
            <div className={styles.postHeader}>
              <div className={styles.userRow}>
                <img className={styles.avatar} src={t.avatar} />
                <div>
                  <div className={styles.username}>{t.name}</div>
                  <div className={styles.role}>{t.role}</div>
                </div>
              </div>
            </div>

            {/* Review text body (no image — Instagram-style text post) */}
            <div className={styles.textBody}>
              <p className={styles.reviewText}>{t.text}</p>
              <div className={styles.projectTag}>📦 {t.project}</div>
            </div>

            {/* Caption */}
            <div className={styles.caption}>
              <strong className={styles.captionUser}>niyasmohammed._</strong>{" "}
              tagged by{" "}
              <strong>
                {t.name.split(" ")[0].toLowerCase().replace(" ", "_")}
              </strong>
            </div>
          </article>
        );
      })}
    </div>
  );
}
