"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const dashboards = [
  { src: "/images/dashboards/saas-dashboard.webp", alt: "SaaS dashboard preview" },
  { src: "/images/dashboards/sales-dashboard.webp", alt: "Sales dashboard preview" },
  { src: "/images/dashboards/marketing-dashbord.webp", alt: "Marketing dashboard preview" },
  { src: "/images/dashboards/finance-dashboard.webp", alt: "Finance dashboard preview" },
  { src: "/images/dashboards/executive-dashbord.webp", alt: "Executive dashboard preview" },
  { src: "/images/dashboards/social-medi-dashbord.webp", alt: "Social media dashboard preview" },
];

const AUTOPLAY_MS = 4000;
const SWIPE_THRESHOLD = 40;

export default function DashboardSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % dashboards.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused]);

  const go = (i: number) =>
    setIndex((i + dashboards.length) % dashboards.length);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setPaused(true);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > SWIPE_THRESHOLD) {
      go(index + (dx < 0 ? 1 : -1));
    }
    setPaused(false);
    touchStartX.current = null;
  };

  return (
    <div
      className="dashboard-slider"
      role="group"
      aria-roledescription="carousel"
      aria-label="Dashboard previews"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="dashboard-slider__track"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {dashboards.map((d, i) => (
          <div
            className="dashboard-slider__slide"
            key={d.src}
            aria-hidden={i !== index}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${dashboards.length}`}
          >
            <Image
              src={d.src}
              alt={d.alt}
              fill
              sizes="(max-width: 719px) 100vw, 640px"
              priority={i === 0}
              draggable={false}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        className="dashboard-slider__arrow dashboard-slider__arrow--prev"
        onClick={() => go(index - 1)}
        aria-label="Previous dashboard"
      >
        <i className="fa-solid fa-chevron-left" aria-hidden="true"></i>
      </button>
      <button
        type="button"
        className="dashboard-slider__arrow dashboard-slider__arrow--next"
        onClick={() => go(index + 1)}
        aria-label="Next dashboard"
      >
        <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
      </button>

      <div className="dashboard-slider__dots" role="tablist" aria-label="Dashboard selector">
        {dashboards.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show dashboard ${i + 1}`}
            className={`dashboard-slider__dot${i === index ? " is-active" : ""}`}
            onClick={() => go(i)}
          />
        ))}
      </div>
    </div>
  );
}
