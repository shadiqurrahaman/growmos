"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Region = {
  city: string;
  country: string;
  /** ISO 3166-1 alpha-2 country code, used by flagcdn.com for the image src */
  cc: string;
  /** IANA timezone identifier, used by Intl.DateTimeFormat */
  tz: string;
  /** Region name shown in the card sub-label (e.g. "Americas") */
  region: string;
};

const regions: Region[] = [
  { city: "New York", country: "United States", cc: "us", tz: "America/New_York", region: "Americas" },
  { city: "San Francisco", country: "United States", cc: "us", tz: "America/Los_Angeles", region: "Americas" },
  { city: "London", country: "United Kingdom", cc: "gb", tz: "Europe/London", region: "EMEA" },
  { city: "Berlin", country: "Germany", cc: "de", tz: "Europe/Berlin", region: "EMEA" },
  { city: "Singapore", country: "Singapore", cc: "sg", tz: "Asia/Singapore", region: "APAC" },
  { city: "Dhaka", country: "Bangladesh", cc: "bd", tz: "Asia/Dhaka", region: "APAC" },
];

const trustPills = [
  { icon: "fa-solid fa-earth-americas", label: "24h coverage across 3 continents", flagCodes: ["us", "gb", "sg"] },
  { icon: "fa-solid fa-comments", label: "Async-first written communication", flagCodes: [] as string[] },
  { icon: "fa-solid fa-stopwatch", label: "< 4h response during business hours", flagCodes: [] as string[] },
];

// Hoist the flag source out of the render so we don't reconstruct it per iteration.
const flagSrc = (cc: string) => `https://flagcdn.com/${cc}.svg`;

function formatTime(tz: string): { time: string; period: string } {
  const now = new Date();
  // 24-hour HH:MM in the target timezone
  const time = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: tz,
  }).format(now);
  return { time, period: "" };
}

function formatDay(tz: string): string {
  const now = new Date();
  // e.g. "Mon · 13 Aug"
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    timeZone: tz,
  })
    .format(now)
    .replace(",", " ·");
}

function businessStatus(tz: string): { label: string; tone: "open" | "soon" | "closed" } {
  const now = new Date();
  const hour = Number(
    new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      hour12: false,
      timeZone: tz,
    }).format(now),
  );
  if (hour >= 9 && hour < 18) return { label: "Team online", tone: "open" };
  if (hour >= 7 && hour < 9) return { label: "Starting soon", tone: "soon" };
  if (hour >= 18 && hour < 22) return { label: "Wrapping up", tone: "soon" };
  return { label: "Async support", tone: "closed" };
}

export default function Timezones() {
  const [, setTick] = useState(0);

  useEffect(() => {
    // Re-render every 60s so the clocks stay accurate without
    // burning a tick every second.
    const id = setInterval(() => setTick((t) => t + 1), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="tz-section" id="timezones" aria-label="Working across timezones">
      <div className="container">
        <header className="section__header">
          <span className="section__badge">Global Team</span>
          <h2 className="section__title">
            Working across <span className="gradient-text">timezones</span>, not despite them
          </h2>
          <p className="section__subtitle">
            Our distributed team covers the Americas, EMEA, and APAC so your engagement
            moves forward while you sleep — and someone is always online for the overlap.
          </p>
        </header>

        <ul className="tz-grid" aria-label="Live local times across our delivery regions">
          {regions.map((r) => {
            const { time } = formatTime(r.tz);
            const day = formatDay(r.tz);
            const status = businessStatus(r.tz);
            return (
              <li key={r.tz} className={`tz-card tz-card--${status.tone}`}>
                <div className="tz-card__head">
                  <span className="tz-card__flag" aria-hidden="true">
                    <Image
                      src={flagSrc(r.cc)}
                      alt=""
                      width={48}
                      height={48}
                      className="tz-card__flag-img"
                      unoptimized
                    />
                  </span>
                  <div className="tz-card__city">
                    <strong>{r.city}</strong>
                    <small>{r.region}</small>
                  </div>
                </div>
                <div className="tz-card__time" aria-live="off">
                  <span className="tz-card__clock" suppressHydrationWarning>{time}</span>
                  <span className="tz-card__day" suppressHydrationWarning>{day}</span>
                </div>
                <div className={`tz-card__status tz-card__status--${status.tone}`}>
                  <span className="tz-card__dot" aria-hidden="true"></span>
                  {status.label}
                </div>
              </li>
            );
          })}
        </ul>

        <ul className="tz-pills" aria-label="How we work across regions">
          {trustPills.map((p) => (
            <li key={p.label} className="tz-pill">
              <i className={p.icon} aria-hidden="true"></i>
              <span>{p.label}</span>
              {p.flagCodes.length > 0 && (
                <span className="tz-pill__flags" aria-label="Coverage regions">
                  {p.flagCodes.map((cc) => (
                    <span key={cc} className="tz-pill__flag" aria-hidden="true" title={cc.toUpperCase()}>
                      <Image
                        src={flagSrc(cc)}
                        alt=""
                        width={20}
                        height={14}
                        className="tz-pill__flag-img"
                        unoptimized
                      />
                    </span>
                  ))}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
