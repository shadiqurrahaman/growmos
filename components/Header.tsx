"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const services = [
  {
    icon: "fa-brands fa-meta",
    color: "blue",
    name: "AI Meta Ads",
    desc: "Facebook & Instagram advertising",
    href: "/meta-ads",
    subs: [
      { label: "Audience Research & Targeting", hash: "#audience-research" },
      { label: "Meta Pixel & Conversions API", hash: "#pixel-setup" },
      { label: "Campaign Strategy & Funnels", hash: "#campaign-strategy" },
      { label: "Account Management", hash: "#account-management" },
    ],
  },
  {
    icon: "fa-brands fa-google",
    color: "orange",
    name: "AI Google Ads",
    desc: "Dominate search & shopping",
    href: "/google-ads",
    subs: [
      { label: "Search Ads Management", hash: "#search-ads" },
      { label: "Shopping & Merchant Center", hash: "#shopping-ads" },
      { label: "Keyword & Competitor Research", hash: "#keyword-research" },
      { label: "Performance Max (PMax)", hash: "#pmax" },
    ],
  },
  {
    icon: "fa-solid fa-code",
    color: "green",
    name: "Software Dev & AI",
    desc: "Build powerful applications",
    href: "/custom-software-development",
    subs: [
      { label: "Web Applications", hash: "#web-apps" },
      { label: "Mobile Apps", hash: "#mobile-apps" },
      { label: "Custom AI Assistants", hash: "#ai-assistants" },
      { label: "AI Workflow Automation", hash: "#ai-workflows" },
    ],
  },
  {
    icon: "fa-solid fa-film",
    color: "pink",
    name: "AI Video & Editing",
    desc: "Content that stops the scroll",
    href: "/ai-video-editing",
    subs: [
      { label: "AI Video Generation", hash: "#ai-video-generation" },
      { label: "UGC Ad Editing", hash: "#ugc-editing" },
      { label: "E-Commerce Product Videos", hash: "#ecommerce-video" },
      { label: "AI Workflow Integration", hash: "#ai-integration" },
    ],
  },
  {
    icon: "fa-solid fa-chart-pie",
    color: "purple",
    name: "Web Analytics & BI",
    desc: "Data-driven decisions",
    href: "/bi-reporting-ai",
    subs: [
      { label: "GA4 & GTM Setup", hash: "#ga4-gtm" },
      { label: "Custom Event Tracking", hash: "#event-tracking" },
      { label: "Funnel Analysis", hash: "#funnel-analysis" },
      { label: "Dashboard Creation", hash: "#dashboards" },
    ],
  },
  {
    icon: "fa-solid fa-share-nodes",
    color: "cyan",
    name: "Social Media Management",
    desc: "Grow your audience & community",
    href: "/social-media-management",
    subs: [
      { label: "Strategy & Consulting", hash: "#strategy" },
      { label: "Visual Branding & Templates", hash: "#branding" },
      { label: "Platform Niche Management", hash: "#niche-management" },
      { label: "Creator & Influencer Ops", hash: "#influencer" },
    ],
  },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [openSub, setOpenSub] = useState<number | null>(null);

  return (
    <header className="header" id="header">
      <nav className="nav container">
        <Link href="/" className="nav__logo">
          <Image
            src="/images/growmos.jpg"
            alt="GrowMos Logo"
            width={40}
            height={40}
            className="nav__logo-img"
          />
          <span className="logo-mos">GrowMos</span>
        </Link>

        <div className={`nav__menu${menuOpen ? " show-menu" : ""}`} id="nav-menu">
          <ul className="nav__list">
            <li
              className="nav__item nav__item--has-dropdown"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => {
                setDropdownOpen(false);
                setOpenSub(null);
              }}
            >
              <Link
                href="/#services"
                className="nav__link nav__link--dropdown"
                onClick={() => setDropdownOpen(false)}
              >
                Services
                <i
                  className="fa-solid fa-chevron-down nav__dropdown-arrow"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDropdownOpen(!dropdownOpen);
                  }}
                ></i>
              </Link>

              {dropdownOpen && (
                <div className="nav__dropdown" id="services-dropdown">
                  <ul className="nav__svc-list">
                    {services.map((svc, idx) => (
                      <li className="nav__svc-item" key={idx}>
                        <button
                          className="nav__svc-toggle"
                          type="button"
                          onClick={() => setOpenSub(openSub === idx ? null : idx)}
                        >
                          <span className={`nav__dropdown-icon nav__dropdown-icon--${svc.color}`}>
                            <i className={svc.icon}></i>
                          </span>
                          <span className="nav__svc-info">
                            <span className="nav__svc-name">{svc.name}</span>
                            <span className="nav__svc-desc">{svc.desc}</span>
                          </span>
                          <i className="fa-solid fa-chevron-right nav__svc-chevron"></i>
                        </button>
                        {openSub === idx && (
                          <ul className="nav__svc-subs">
                            {svc.subs.map((sub, si) => (
                              <li key={si}>
                                <Link href={`${svc.href}${sub.hash}`}>
                                  <i className="fa-solid fa-circle-dot"></i> {sub.label}
                                </Link>
                              </li>
                            ))}
                            <li className="nav__svc-page-link">
                              <Link href={svc.href}>
                                View all {svc.name} services{" "}
                                <i className="fa-solid fa-arrow-right"></i>
                              </Link>
                            </li>
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>

            <li className="nav__item">
              <Link href="/boss-model" className="nav__link">
                The &quot;Boss&quot; Model
              </Link>
            </li>
            <li className="nav__item">
              <Link href="/contact" className="nav__link">
                Contact
              </Link>
            </li>
          </ul>

          <div
            className="nav__close"
            id="nav-close"
            onClick={() => setMenuOpen(false)}
          >
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>

        <div className="nav__actions">
          <a
            href="https://calendly.com/hello-growmos/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary"
          >
            Schedule A Meeting
          </a>
          <div
            className="nav__toggle"
            id="nav-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>
      </nav>
    </header>
  );
}
