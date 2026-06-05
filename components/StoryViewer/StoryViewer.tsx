"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import type { IconType } from "react-icons";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiBriefcase,
  FiGlobe,
  FiSmartphone,
  FiBookOpen,
  FiZap,
} from "react-icons/fi";
import TechIcon from "@/components/TechIcon/TechIcon";
import type {
  Highlight,
  HighlightPage,
  ExperiencePage,
  SkillPage,
  ServicePage,
  EducationPage,
  ContactPage,
  AboutPage,
} from "@/lib/data";
import styles from "./StoryViewer.module.css";

interface StoryViewerProps {
  highlights: Highlight[];
  initialHighlightId: string;
  onClose: (ids?: string[]) => void;
}

const STORY_DURATION = 15000;

const SERVICE_ICON_MAP: Record<string, IconType> = {
  "🌐": FiGlobe,
  "📱": FiSmartphone,
  "💡": FiZap,
};

export default function StoryViewer({
  highlights,
  initialHighlightId,
  onClose,
}: StoryViewerProps) {
  const highlightIdx = highlights.findIndex((h) => h.id === initialHighlightId);
  const [currentHighlight, setCurrentHighlight] = useState(
    Math.max(0, highlightIdx),
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const pausedProgressRef = useRef<number>(0);
  // Track which highlight IDs have been fully viewed (all pages completed)
  const fullyViewedRef = useRef<Set<string>>(new Set());

  const highlight = highlights[currentHighlight];
  const pages = highlight.pages;

  // Mark a highlight as fully viewed when its last page is reached
  const markFullyViewed = useCallback(
    (highlightIndex: number, pageIndex: number) => {
      const h = highlights[highlightIndex];
      if (pageIndex >= h.pages.length - 1) {
        fullyViewedRef.current.add(h.id);
      }
    },
    [highlights],
  );

  const goNext = useCallback(() => {
    if (currentPage < pages.length - 1) {
      setCurrentPage((p) => p + 1);
      setProgress(0);
    } else {
      // Last page of current highlight — mark it fully viewed
      markFullyViewed(currentHighlight, currentPage);
      if (currentHighlight < highlights.length - 1) {
        setCurrentHighlight((h) => h + 1);
        setCurrentPage(0);
        setProgress(0);
      } else {
        // All stories done — go back through history so the entry is cleaned
        // up; the popstate handler will call onClose with the viewed IDs.
        history.back();
      }
    }
  }, [currentPage, pages.length, currentHighlight, highlights.length, markFullyViewed]);

  const goPrev = useCallback(() => {
    if (currentPage > 0) {
      setCurrentPage((p) => p - 1);
      setProgress(0);
    } else if (currentHighlight > 0) {
      setCurrentHighlight((h) => h - 1);
      setCurrentPage(0);
      setProgress(0);
    }
  }, [currentPage, currentHighlight]);

  useEffect(() => {
    if (paused) {
      cancelAnimationFrame(rafRef.current);
      return;
    }
    const offset = (pausedProgressRef.current * STORY_DURATION) / 100;
    startTimeRef.current = performance.now() - offset;
    const animate = (now: number) => {
      const p = Math.min(
        ((now - startTimeRef.current) / STORY_DURATION) * 100,
        100,
      );
      setProgress(p);
      if (p < 100) rafRef.current = requestAnimationFrame(animate);
      else goNext();
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [currentHighlight, currentPage, paused, goNext]);

  // Push a fake history entry so the browser Back button closes the viewer
  // instead of navigating away from the page.
  useEffect(() => {
    history.pushState({ storyOpen: true }, "");
    const onPop = () => {
      onClose([...fullyViewedRef.current]);
    };
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") {
        // Clean up the fake history entry we pushed
        history.back();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev, onClose]);

  return (
    <div className={styles.overlay} id="story-viewer" onClick={() => history.back()}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {/* Progress bars */}
        <div className={styles.progressRow}>
          {pages.map((_, i) => (
            <div key={i} className={styles.progressTrack}>
              <div
                className={styles.progressFill}
                style={{
                  width:
                    i < currentPage
                      ? "100%"
                      : i === currentPage
                        ? `${progress}%`
                        : "0%",
                }}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.highlightInfo}>
            <div
              className={styles.hlIcon}
              style={{ background: highlight.gradient }}
            >
              {highlight.icon}
            </div>
            <div>
              <div className={styles.hlLabel}>{highlight.label}</div>
              <div className={styles.hlTime}>
                {currentPage + 1}/{pages.length}
              </div>
            </div>
          </div>
          <div className={styles.headerActions}>
            <button
              className={styles.headerBtn}
              onClick={() => {
                pausedProgressRef.current = progress;
                setPaused((p) => !p);
              }}
              aria-label="Pause/resume"
            >
              {paused ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              )}
            </button>
            <button
              className={styles.headerBtn}
              onClick={() => {
                // Go back in history — the popstate handler will call onClose
                history.back();
              }}
              aria-label="Close"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tap zones */}
        <div className={styles.tapLeft} onClick={goPrev} />
        <div className={styles.tapRight} onClick={goNext} />

        {/* Content */}
        <div
          className={styles.content}
          key={`${currentHighlight}-${currentPage}`}
        >
          <StoryPageContent
            page={pages[currentPage]}
            gradient={highlight.gradient}
          />
        </div>
      </div>
    </div>
  );
}

function StoryPageContent({
  page,
  gradient,
}: {
  page: HighlightPage;
  gradient: string;
}) {
  switch (page.type) {
    case "about":
      return <AboutStory page={page as AboutPage} />;
    case "experience":
      return (
        <ExperienceStory page={page as ExperiencePage} gradient={gradient} />
      );
    case "skill":
      return <SkillStory page={page as SkillPage} gradient={gradient} />;
    case "service":
      return <ServiceStory page={page as ServicePage} gradient={gradient} />;
    case "education":
      return (
        <EducationStory page={page as EducationPage} gradient={gradient} />
      );
    case "contact":
      return <ContactStory page={page as ContactPage} gradient={gradient} />;
    default:
      return null;
  }
}

/* ─── About Story ─── */
function AboutStory({ page }: { page: AboutPage }) {
  const lines = page.body.split('\n');

  return (
    <div className={styles.storyCard} style={{ '--theme-grad': page.accent } as React.CSSProperties}>
      {/* Ambient background glow */}
      <div className={styles.aboutGlowWrap}>
        <div className={styles.aboutGlow1} style={{ background: page.accent }} />
        <div className={styles.aboutGlow2} style={{ background: page.accent }} />
      </div>

      <div className={styles.aboutContent}>
        {/* Top emoji with gradient circle background */}
        <div className={styles.aboutEmojiWrap}>
          <div className={styles.aboutEmojiRing} style={{ background: page.accent }}>
            <span className={styles.aboutEmoji}>
              {page.title.includes('Hi') ? '👋' : page.title.includes('What I Do') ? '🛠️' : page.title.includes('Journey') ? '🚀' : '🔭'}
            </span>
          </div>
        </div>

        <div className={styles.storyBadge}>{page.subtitle}</div>
        <h2 className={styles.storyTitle}>{page.title}</h2>

        {/* Body with paragraph spacing */}
        <div className={styles.aboutBodyWrap}>
          {lines.map((line, i) => (
            line.trim() ? (
              <p key={i} className={styles.aboutBodyP}>{line}</p>
            ) : (
              <div key={i} className={styles.aboutSpacer} />
            )
          ))}
        </div>

        {/* Highlight pill */}
        <div className={styles.aboutHighlight}>
          <span className={styles.highlightPill}>
            {page.highlight}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Experience Story ─── */
function ExperienceStory({
  page,
  gradient,
}: {
  page: ExperiencePage;
  gradient: string;
}) {
  return (
    <div className={styles.storyCard}>
      {/* Background image with overlay */}
      {page.image && (
        <div className={styles.expBgWrap}>
          <Image
            src={page.image}
            alt={page.company}
            fill
            className={styles.expBg}
            sizes="470px"
          />
          <div
            className={styles.expBgOverlay}
            style={{
              background: `radial-gradient(circle at 50% 30%, rgba(255,255,255,0.08), transparent 28%), linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.28) 45%, rgba(0,0,0,0.08) 100%)`,
            }}
          />
        </div>
      )}
      {!page.image && (
        <div className={styles.expSolidBg} style={{ background: gradient }} />
      )}

      {/* Content */}
      <div className={styles.expContent}>
        <div className={styles.expLogoRow}>
          <div className={styles.expLogoWrapper}>
            {page.image ? (
              <Image
                src={page.image}
                alt={`${page.company} logo`}
                width={44}
                height={44}
                className={styles.expLogoImage}
              />
            ) : (
              <span className={styles.expLogo}>{page.logo}</span>
            )}
          </div>
          <div className={styles.storyBadge}>Experience</div>
        </div>
        <h2 className={styles.storyTitle}>{page.role}</h2>
        <p className={styles.expCompany}>{page.company}</p>
        <p className={styles.expMeta}>
          {page.period} · {page.location}
        </p>
        <p className={styles.expDesc}>{page.description}</p>
        <div className={styles.techRow}>
          {page.tech.map((t) => (
            <span key={t} className={styles.techChip}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Skill Story ─── */
function SkillStory({ page, gradient }: { page: SkillPage; gradient: string }) {
  return (
    <div className={styles.storyCard} style={{ background: "var(--ig-bg)", '--theme-grad': gradient } as React.CSSProperties}>
      <div className={styles.skillBgDecor}>
        <div className={styles.skillDot1} />
        <div className={styles.skillDot2} />
      </div>
      <div className={styles.skillContent}>
        <div
          className={styles.storyBadgeColored}
          style={{ background: gradient }}
        >
          {page.category}
        </div>
        <h2 className={styles.skillTitle}>{page.title}</h2>
        <div className={styles.skillList}>
          {page.skills.map((skill, i) => (
            <div
              key={skill.name}
              className={styles.skillItem}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className={styles.skillHeader}>
                <div className={styles.skillMeta}>
                  <span className={styles.skillIcon}>
                    <TechIcon name={skill.name} size={18} />
                  </span>
                  <span className={styles.skillName}>{skill.name}</span>
                </div>
                <span className={styles.skillPct}>{skill.level}%</span>
              </div>
              <div className={styles.skillTrack}>
                <div
                  className={styles.skillFill}
                  style={{ width: `${skill.level}%`, background: gradient }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Service Story ─── */
function ServiceStory({
  page,
  gradient,
}: {
  page: ServicePage;
  gradient: string;
}) {
  return (
    <div className={styles.storyCard} style={{ '--theme-grad': gradient } as React.CSSProperties}>
      <div className={styles.srvBgDecor}>
        <div className={styles.srvGlow1} style={{ background: gradient }} />
        <div className={styles.srvGlow2} style={{ background: gradient }} />
      </div>
      <div className={styles.srvContent}>
        <div className={styles.srvIconCircle}>
          {(() => {
            const Icon = SERVICE_ICON_MAP[page.icon] ?? FiBriefcase;
            return <Icon size={32} />;
          })()}
        </div>
        <div className={styles.storyBadge}>What I Offer</div>
        <h2 className={styles.storyTitle}>{page.title}</h2>
        <p className={styles.srvDesc}>{page.description}</p>
        <div className={styles.featureList}>
          {page.features.map((f) => (
            <div key={f} className={styles.featureItem}>
              <span className={styles.featureCheck}>✓</span>
              <span>{f}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Education Story ─── */
function EducationStory({
  page,
  gradient,
}: {
  page: EducationPage;
  gradient: string;
}) {
  return (
    <div className={styles.storyCard} style={{ '--theme-grad': gradient } as React.CSSProperties}>
      <div className={styles.eduBgDecor}>
        <div className={styles.eduShard1} style={{ background: gradient }} />
        <div className={styles.eduShard2} style={{ background: gradient }} />
      </div>
      <div className={styles.eduContent}>
        <div className={styles.eduIcon}>
          <FiBookOpen size={32} />
        </div>
        <div className={styles.storyBadge}>Education</div>
        <h2 className={styles.storyTitle}>{page.degree}</h2>
        <p className={styles.expCompany}>{page.institution}</p>
        <div className={styles.eduMetaRow}>
          <span className={styles.eduMetaChip}>{page.period}</span>
          <span className={styles.eduMetaChip}>GPA {page.gpa}</span>
        </div>
        <div className={styles.featureList}>
          {page.highlights.map((h) => (
            <div key={h} className={styles.featureItem}>
              <span className={styles.featureCheck}>🏆</span>
              <span>{h}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Contact Story ─── */
function ContactStory({
  page,
  gradient,
}: {
  page: ContactPage;
  gradient: string;
}) {
  return (
    <div className={styles.storyCard} style={{ '--theme-grad': gradient } as React.CSSProperties}>
      <div className={styles.cntBgDecor}>
        <div className={styles.cntBlob1} style={{ background: gradient }} />
        <div className={styles.cntBlob2} style={{ background: gradient }} />
      </div>
      <div className={styles.cntContent}>
        <div className={styles.cntIcon}>
          <FiMail size={28} />
        </div>
        <div className={styles.storyBadge}>Get In Touch</div>
        <h2 className={styles.storyTitle}>{page.title}</h2>
        <div className={styles.contactGrid}>
          {[
            { icon: <FiMail />, label: "Email", value: page.email },
            { icon: <FiPhone />, label: "Phone", value: page.phone },
            { icon: <FiMapPin />, label: "Location", value: page.location },
            {
              icon: <FiBriefcase />,
              label: "Status",
              value: page.availability,
            },
          ].map((item) => (
            <div key={item.label} className={styles.contactCard}>
              <span className={styles.contactCardIcon}>{item.icon}</span>
              <div>
                <div className={styles.contactCardLabel}>{item.label}</div>
                <div className={styles.contactCardValue}>{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
