export interface TeamMember {
  initials: string;
  /** Person's name. Only the founder has a real name right now; the rest are shown by role. */
  name?: string;
  /** Role / designation. Always shown. */
  role: string;
  bio: string;
  accent: "blue" | "green" | "purple" | "pink" | "orange";
  /** Optional LinkedIn URL. Hidden from the card if absent. */
  linkedinUrl?: string;
  /** Optional photo URL. If absent, the initials monogram is shown. */
  photo?: string;
}

/**
 * Team roster. The founder is named; the rest are shown by role title (no
 * placeholder humans). Each member has a real headshot.
 */
const team: TeamMember[] = [
  {
    initials: "MS",
    name: "MD Sha",
    role: "Founder & CEO",
    bio: "Sets the vision and leads the team. Oversees delivery on every B2B data engagement from scoping to sign-off.",
    accent: "blue",
    linkedinUrl: "https://www.linkedin.com/in/mdshadataanalyst/",
    photo: "/images/avatars/ceo-real.jpg",
  },
  {
    initials: "HD",
    role: "Head of Data Engineering",
    bio: "Leads our data engineering practice. Owns architecture, ingestion, and warehouse design for every B2B engagement.",
    accent: "green",
    linkedinUrl: "https://www.linkedin.com/in/hassan-shamim/",
    photo: "/images/avatars/head-data-engineering.jpg",
  },
  {
    initials: "SC",
    role: "Salesforce & CRM Specialist",
    bio: "Owns Salesforce, HubSpot, and ad-platform integrations. Builds Customer 360 models and multi-touch attribution that connect marketing spend to closed revenue.",
    accent: "purple",
    linkedinUrl: "https://www.linkedin.com/in/abdullah-al-mahmud-jabir/",
    photo: "/images/avatars/salesforce-crm-specialist.jpg",
  },
  {
    initials: "BL",
    role: "BI & Dashboards Lead",
    bio: "Designs and builds executive dashboards in Power BI and Metabase that operators actually open on Monday morning.",
    accent: "pink",
    linkedinUrl: "https://www.linkedin.com/in/murtazapasha/",
    photo: "/images/avatars/head-bi-analysis.jpg",
  },
  {
    initials: "GA",
    role: "Growth & Attribution Strategist",
    bio: "Connects paid media to warehouse data so growth is measured end-to-end, not just in the ad platform's dashboard.",
    accent: "orange",
    photo: "/images/avatars/head-marketing.jpg",
  },
];

export default function Team() {
  return (
    <section className="team-section" id="team">
      <div className="container">
        <div className="section__header">
          <span className="section__badge">Our Team</span>
          <h2 className="section__title">
            Real Engineers, Real <span className="gradient-text">Strategists</span>
          </h2>
          <p className="section__subtitle">
            The team behind your data platform — not a roster of subcontractors.
          </p>
        </div>
        <div className="team-grid">
          {team.map((m) => {
            return (
              <article
                key={`${m.role}-${m.initials}`}
                className={`team-card team-card--${m.accent}`}
              >
                <div
                  className={`team-card__avatar${
                    m.photo ? " team-card__avatar--photo" : ""
                  }`}
                >
                  {m.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={m.photo}
                      alt={`${m.name ?? m.role} — ${m.role}`}
                      className="team-card__photo"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <span className="team-card__initials" aria-hidden="true">{m.initials}</span>
                  )}
                </div>
                <div className="team-card__body">
                  {m.name ? (
                    <>
                      <h3 className="team-card__name">{m.name}</h3>
                      <p className="team-card__role">{m.role}</p>
                    </>
                  ) : (
                    <h3 className="team-card__name team-card__name--role">{m.role}</h3>
                  )}
                  <p className="team-card__bio">{m.bio}</p>
                  {m.linkedinUrl ? (
                    <a
                      className="team-card__link"
                      href={m.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${m.name ?? m.role} on LinkedIn`}
                    >
                      <i className="fa-brands fa-linkedin-in" aria-hidden="true"></i>
                      <span>LinkedIn</span>
                    </a>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
        <p className="team-section__note">
          Founder and named leads introduce themselves on every discovery call.
          Full team profiles, headshots, and certifications roll in as we grow.
        </p>
      </div>
    </section>
  );
}