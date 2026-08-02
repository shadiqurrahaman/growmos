"use client";
import { useState } from "react";
import Link from "next/link";

const services = [
  // ---- Data Solutions (lead with these) ----
  {
    icon: "fa-solid fa-database",
    color: "blue",
    name: "Data Pipeline Engineering",
    desc: "Fivetran, Airbyte, dbt pipelines",
    href: "/data-pipeline-engineering",
    subs: [
      { label: "Source connectors & sync", hash: "#sources-sync" },
      { label: "dbt transformations", hash: "#transformations" },
      { label: "Orchestration & scheduling", hash: "#orchestration" },
      { label: "Observability & lineage", hash: "#monitoring" },
    ],
  },
  {
    icon: "fa-solid fa-cube",
    color: "cyan",
    name: "Cloud Data Warehousing",
    desc: "BigQuery, Fabric, Snowflake",
    href: "/cloud-data-warehousing",
    subs: [
      { label: "Warehouse architecture", hash: "#warehouse-architecture" },
      { label: "Fabric / BigQuery / Snowflake", hash: "#fabric-bigquery-snowflake" },
      { label: "Migration from legacy", hash: "#migration" },
      { label: "Cost & performance tuning", hash: "#cost-performance" },
    ],
  },
  {
    icon: "fa-solid fa-chart-line",
    color: "purple",
    name: "BI & Dashboard Development",
    desc: "Power BI & Metabase dashboards",
    href: "/bi-dashboards",
    subs: [
      { label: "Metric modelling", hash: "#metric-modeling" },
      { label: "Executive dashboards", hash: "#executive-dashboards" },
      { label: "Operational dashboards", hash: "#operational-dashboards" },
      { label: "Self-serve enablement", hash: "#self-serve-enablement" },
    ],
  },
  {
    icon: "fa-solid fa-plug",
    color: "orange",
    name: "CRM Data Integration",
    desc: "Salesforce & HubSpot unification",
    href: "/crm-data-integration",
    subs: [
      { label: "Salesforce sync", hash: "#salesforce-sync" },
      { label: "HubSpot sync", hash: "#hubspot-sync" },
      { label: "Customer 360 model", hash: "#customer-360" },
      { label: "Attribution modelling", hash: "#attribution" },
    ],
  },
  {
    icon: "fa-solid fa-arrows-right-left",
    color: "pink",
    name: "Reverse ETL & Activation",
    desc: "Hightouch / Census syncs",
    href: "/reverse-etl-activation",
    subs: [
      { label: "Hightouch / Census setup", hash: "#hightouch-census" },
      { label: "Modelled audiences", hash: "#audiences" },
      { label: "Sales & support enablement", hash: "#sales-enablement" },
      { label: "Closed-loop reporting", hash: "#closed-loop" },
    ],
  },
  // ---- Growth Services ----
  {
    icon: "fa-brands fa-meta",
    color: "blue",
    name: "Performance Marketing & Paid Ads",
    desc: "Meta & Google campaigns tied to your warehouse",
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
    desc: "Search, Shopping & Performance Max",
    href: "/google-ads",
    subs: [
      { label: "Search Ads Management", hash: "#search-ads" },
      { label: "Shopping & Merchant Center", hash: "#shopping-ads" },
      { label: "Keyword & Competitor Research", hash: "#keyword-research" },
      { label: "Performance Max (PMax)", hash: "#pmax" },
    ],
  },
  {
    icon: "fa-solid fa-share-nodes",
    color: "cyan",
    name: "Social Media Management",
    desc: "AI-augmented content & growth",
    href: "/social-media-management",
    subs: [
      { label: "Strategy & Consulting", hash: "#strategy" },
      { label: "Visual Branding & Templates", hash: "#branding" },
      { label: "Platform Niche Management", hash: "#niche-management" },
      { label: "Creator & Influencer Ops", hash: "#influencer" },
    ],
  },
  {
    icon: "fa-solid fa-film",
    color: "pink",
    name: "AI Video & Editing",
    desc: "Stop-scroll video content",
    href: "/ai-video-editing",
    subs: [
      { label: "AI Video Generation", hash: "#ai-video-generation" },
      { label: "UGC Ad Editing", hash: "#ugc-editing" },
      { label: "E-Commerce Product Videos", hash: "#ecommerce-video" },
      { label: "AI Workflow Integration", hash: "#ai-integration" },
    ],
  },
  {
    icon: "fa-solid fa-code",
    color: "green",
    name: "Custom Software & Dashboards",
    desc: "Custom apps over your data",
    href: "/custom-software-development",
    subs: [
      { label: "Web Applications", hash: "#web-apps" },
      { label: "Mobile Apps", hash: "#mobile-apps" },
      { label: "Custom AI Assistants", hash: "#ai-assistants" },
      { label: "AI Workflow Automation", hash: "#ai-workflows" },
    ],
  },
];

const industries = [
  { name: "SaaS", desc: "Product-led & sales-led data platforms", href: "/industries/saas" },
  { name: "E-commerce", desc: "Multi-channel attribution & LTV", href: "/industries/ecommerce" },
  { name: "EdTech", desc: "Learner analytics & privacy", href: "/industries/edtech" },
  { name: "Retail", desc: "POS + online customer 360", href: "/industries/retail" },
];

const resources = [
  { name: "Blog", desc: "Data engineering deep-dives", href: "/blog", icon: "fa-solid fa-newspaper" },
  { name: "Data Maturity Assessment", desc: "Free 5-minute scoring", href: "/resources/data-maturity-assessment", icon: "fa-solid fa-clipboard-check" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"services" | "industries" | "resources" | null>(null);
  const [openSub, setOpenSub] = useState<number | null>(null);

  const closeMenu = () => {
    setMenuOpen(false);
    setOpenDropdown(null);
    setOpenSub(null);
  };

  const toggleDropdown = (name: "services" | "industries" | "resources") => {
    setOpenDropdown(openDropdown === name ? null : name);
    setOpenSub(null);
  };

  return (
    <header className="header" id="header">
      {menuOpen && (
        <div
          className="nav__overlay"
          onClick={closeMenu}
          aria-hidden="true"
        ></div>
      )}
      <nav className="nav container">
        <Link href="/" className="nav__logo" onClick={closeMenu}>
          <span className="brand-mark" aria-hidden="true"><span></span><span></span><span></span></span>
          <span className="brand-wordmark">GrowMos</span>
        </Link>

        <div className={`nav__menu${menuOpen ? " show-menu" : ""}`} id="nav-menu">
          <ul className="nav__list">
            {/* Services dropdown */}
            <li
              className="nav__item nav__item--has-dropdown"
              onMouseEnter={() => setOpenDropdown("services")}
              onMouseLeave={() => { setOpenDropdown(null); setOpenSub(null); }}
            >
              <button
                type="button"
                className="nav__link nav__link--dropdown"
                onClick={() => toggleDropdown("services")}
              >
                Services
                <i className="fa-solid fa-chevron-down nav__dropdown-arrow"></i>
              </button>
              {openDropdown === "services" && (
                <div className="nav__dropdown" id="services-dropdown">
                  <div className="nav__dropdown-section">
                    <div className="nav__dropdown-section-title">Data Solutions</div>
                    <ul className="nav__svc-list">
                      {services.slice(0, 5).map((svc, idx) => (
                        <li className="nav__svc-item" key={`d-${idx}`}>
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
                                  <Link href={`${svc.href}${sub.hash}`} onClick={closeMenu}>
                                    <i className="fa-solid fa-circle-dot"></i> {sub.label}
                                  </Link>
                                </li>
                              ))}
                              <li className="nav__svc-page-link">
                                <Link href={svc.href} onClick={closeMenu}>
                                  View {svc.name} <i className="fa-solid fa-arrow-right"></i>
                                </Link>
                              </li>
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="nav__dropdown-section">
                    <div className="nav__dropdown-section-title">Growth Services</div>
                    <ul className="nav__svc-list">
                      {services.slice(5).map((svc, i) => {
                        const idx = i + 5;
                        return (
                          <li className="nav__svc-item" key={`g-${idx}`}>
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
                                    <Link href={`${svc.href}${sub.hash}`} onClick={closeMenu}>
                                      <i className="fa-solid fa-circle-dot"></i> {sub.label}
                                    </Link>
                                  </li>
                                ))}
                                <li className="nav__svc-page-link">
                                  <Link href={svc.href} onClick={closeMenu}>
                                    View {svc.name} <i className="fa-solid fa-arrow-right"></i>
                                  </Link>
                                </li>
                              </ul>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              )}
            </li>

            {/* Industries dropdown */}
            <li
              className="nav__item nav__item--has-dropdown"
              onMouseEnter={() => setOpenDropdown("industries")}
              onMouseLeave={() => { setOpenDropdown(null); setOpenSub(null); }}
            >
              <button
                type="button"
                className="nav__link nav__link--dropdown"
                onClick={() => toggleDropdown("industries")}
              >
                Industries
                <i className="fa-solid fa-chevron-down nav__dropdown-arrow"></i>
              </button>
              {openDropdown === "industries" && (
                <div className="nav__dropdown nav__dropdown--simple" id="industries-dropdown">
                  <ul className="nav__svc-list">
                    {industries.map((ind, idx) => (
                      <li className="nav__svc-item" key={idx}>
                        <Link href={ind.href} className="nav__svc-link" onClick={closeMenu}>
                          <span className="nav__svc-info">
                            <span className="nav__svc-name">{ind.name}</span>
                            <span className="nav__svc-desc">{ind.desc}</span>
                          </span>
                          <i className="fa-solid fa-arrow-right nav__svc-chevron"></i>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>

            {/* Resources dropdown */}
            <li
              className="nav__item nav__item--has-dropdown"
              onMouseEnter={() => setOpenDropdown("resources")}
              onMouseLeave={() => { setOpenDropdown(null); setOpenSub(null); }}
            >
              <button
                type="button"
                className="nav__link nav__link--dropdown"
                onClick={() => toggleDropdown("resources")}
              >
                Resources
                <i className="fa-solid fa-chevron-down nav__dropdown-arrow"></i>
              </button>
              {openDropdown === "resources" && (
                <div className="nav__dropdown nav__dropdown--simple" id="resources-dropdown">
                  <ul className="nav__svc-list">
                    {resources.map((r, idx) => (
                      <li className="nav__svc-item" key={idx}>
                        <Link href={r.href} className="nav__svc-link" onClick={closeMenu}>
                          <span className={`nav__dropdown-icon nav__dropdown-icon--purple`}>
                            <i className={r.icon}></i>
                          </span>
                          <span className="nav__svc-info">
                            <span className="nav__svc-name">{r.name}</span>
                            <span className="nav__svc-desc">{r.desc}</span>
                          </span>
                          <i className="fa-solid fa-arrow-right nav__svc-chevron"></i>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>

            <li className="nav__item">
              <Link href="/boss-model" className="nav__link" onClick={closeMenu}>
                The &quot;Boss&quot; Model
              </Link>
            </li>
            <li className="nav__item">
              <Link href="/contact" className="nav__link" onClick={closeMenu}>
                Contact
              </Link>
            </li>
          </ul>

          <div
            className="nav__close"
            id="nav-close"
            onClick={closeMenu}
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
            Book a call
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
