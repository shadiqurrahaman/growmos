export interface TeamMember {
  initials: string;
  name: string;
  role: string;
  bio: string;
  accent: "blue" | "green" | "purple" | "pink" | "orange";
}

const team: TeamMember[] = [
  {
    initials: "MS",
    name: "MD Sha",
    role: "Founder & CEO",
    bio: "Sets the vision and leads the team. Oversees delivery on every B2B data engagement.",
    accent: "blue",
  },
  {
    initials: "HD",
    name: "Head of Data",
    role: "Head of Data Engineering",
    bio: "TODO — Lead our data engineering practice. Owns architecture, ingestion, and warehouse design for B2B clients.",
    accent: "green",
  },
  {
    initials: "DE",
    name: "Lead Data Engineer",
    role: "Lead Data Engineer",
    bio: "TODO — Senior engineer with deep experience in dbt, Fivetran, and BigQuery / Fabric deployments.",
    accent: "purple",
  },
  {
    initials: "BI",
    name: "BI Lead",
    role: "BI & Dashboards Lead",
    bio: "TODO — Designs and builds executive dashboards in Power BI and Metabase that teams actually use.",
    accent: "pink",
  },
  {
    initials: "GS",
    name: "Growth Strategist",
    role: "Growth & Attribution Strategist",
    bio: "TODO — Connects paid media to warehouse data so growth is measured end-to-end.",
    accent: "orange",
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
          {team.map((m) => (
            <div key={m.name} className={`team-card team-card--${m.accent}`}>
              <div className="team-card__avatar">
                <span className="team-card__initials">{m.initials}</span>
              </div>
              <div className="team-card__body">
                <h3 className="team-card__name">{m.name}</h3>
                <p className="team-card__role">{m.role}</p>
                <p className="team-card__bio">{m.bio}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="team-section__note">
          Founders and their customers want to know who they&apos;re working with.
          We&apos;re adding headshots and full bios soon — in the meantime, happy
          to introduce the team on your discovery call.
        </p>
      </div>
    </section>
  );
}
