import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | GrowMos",
  description:
    "How GrowMos collects, uses, and protects your personal data. GDPR-compliant privacy practices for our website, marketing, and data services.",
};

const LAST_UPDATED = "31 July 2026";

export default function PrivacyPolicyPage() {
  return (
    <main>
      <section
        style={{
          paddingTop: "8rem",
          paddingBottom: "3rem",
          background: "var(--secondary)",
          textAlign: "center",
        }}
      >
        <div className="container">
          <span
            className="section__badge"
            style={{ margin: "0 auto 1rem" }}
          >
            Legal
          </span>
          <h1
            style={{
              color: "#fff",
              fontSize: "var(--font-size-5xl)",
              fontWeight: 800,
              marginBottom: "1rem",
            }}
          >
            Privacy Policy
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      <section style={{ padding: "4rem 0" }}>
        <div className="container" style={{ maxWidth: "820px" }}>
          <div style={{ color: "var(--gray-700)", lineHeight: 1.7 }}>
            <p style={{ marginBottom: "1.5rem", fontSize: "1.05rem" }}>
              GrowMos (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) is committed to
              protecting the privacy of our website visitors, prospects, and
              clients. This Privacy Policy explains what personal data we
              collect, how we use it, and the rights you have over it. It
              applies to our website (growmos.com), our marketing
              communications, and the data services we deliver to clients.
            </p>

            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginTop: "2.5rem", marginBottom: "1rem", color: "var(--gray-900)" }}>
              1. Data We Collect
            </h2>
            <ul style={{ paddingLeft: "1.5rem", marginBottom: "1.5rem" }}>
              <li>
                <strong>Contact information</strong> &mdash; name, email, phone
                number, and company name when you submit a contact form, request
                a proposal, or book a meeting.
              </li>
              <li>
                <strong>Marketing data</strong> &mdash; email address and
                engagement (opens, clicks) when you subscribe to our newsletter.
              </li>
              <li>
                <strong>Account &amp; billing data</strong> &mdash; information
                necessary to deliver and invoice our services.
              </li>
              <li>
                <strong>Client data</strong> &mdash; data you provide to us as
                part of an engagement (e.g., source systems to be integrated
                into a data warehouse). This is processed under a separate Data
                Processing Agreement (DPA).
              </li>
              <li>
                <strong>Technical data</strong> &mdash; IP address, browser
                type, device, and pages visited, collected via cookies and
                server logs.
              </li>
            </ul>

            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginTop: "2.5rem", marginBottom: "1rem", color: "var(--gray-900)" }}>
              2. How We Use Your Data
            </h2>
            <ul style={{ paddingLeft: "1.5rem", marginBottom: "1.5rem" }}>
              <li>To respond to inquiries and deliver requested services.</li>
              <li>
                To send service-related communications (proposals, invoices,
                updates).
              </li>
              <li>
                To send marketing communications where you have opted in. You
                can unsubscribe at any time using the link in any email.
              </li>
              <li>
                To improve our website, measure performance, and prevent abuse.
              </li>
              <li>
                To comply with legal, accounting, and regulatory obligations.
              </li>
            </ul>

            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginTop: "2.5rem", marginBottom: "1rem", color: "var(--gray-900)" }}>
              3. Legal Bases (GDPR)
            </h2>
            <p style={{ marginBottom: "1.5rem" }}>
              For visitors in the European Economic Area, we process personal
              data on the following legal bases: performance of a contract,
              our legitimate interests in operating and improving our business,
              your consent (for marketing), and compliance with legal
              obligations.
            </p>

            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginTop: "2.5rem", marginBottom: "1rem", color: "var(--gray-900)" }}>
              4. Cookies
            </h2>
            <p style={{ marginBottom: "1.5rem" }}>
              We use a small number of essential cookies to make the site work
              and, where you have consented, analytics cookies to understand how
              visitors use the site. You can control cookies through your
              browser settings.
            </p>

            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginTop: "2.5rem", marginBottom: "1rem", color: "var(--gray-900)" }}>
              5. Sharing &amp; Sub-Processors
            </h2>
            <p style={{ marginBottom: "1.5rem" }}>
              We do not sell your personal data. We share data only with vetted
              sub-processors who help us run our business &mdash; such as
              hosting, email delivery, analytics, and CRM providers. A current
              list is available on request. All sub-processors are bound by
              data-protection obligations.
            </p>

            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginTop: "2.5rem", marginBottom: "1rem", color: "var(--gray-900)" }}>
              6. Data Retention
            </h2>
            <p style={{ marginBottom: "1.5rem" }}>
              We keep personal data only as long as necessary for the purposes
              described above and to meet legal, tax, and accounting
              requirements. Marketing data is retained until you unsubscribe.
            </p>

            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginTop: "2.5rem", marginBottom: "1rem", color: "var(--gray-900)" }}>
              7. Your Rights
            </h2>
            <p style={{ marginBottom: "1.5rem" }}>
              Depending on your location, you may have the right to access,
              correct, delete, restrict, or port your personal data, and to
              object to processing or withdraw consent. To exercise these
              rights, email{" "}
              <a
                href="mailto:hello@growmos.com"
                style={{ color: "var(--primary)", textDecoration: "underline" }}
              >
                hello@growmos.com
              </a>
              .
            </p>

            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginTop: "2.5rem", marginBottom: "1rem", color: "var(--gray-900)" }}>
              8. Security
            </h2>
            <p style={{ marginBottom: "1.5rem" }}>
              We use industry-standard technical and organisational measures
              to protect personal data, including encryption in transit,
              access controls, and least-privilege practices for staff and
              contractors.
            </p>

            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginTop: "2.5rem", marginBottom: "1rem", color: "var(--gray-900)" }}>
              9. International Transfers
            </h2>
            <p style={{ marginBottom: "1.5rem" }}>
              Some of our sub-processors may be located outside your country
              of residence. Where required, we use appropriate safeguards
              (such as Standard Contractual Clauses) to protect your data
              during transfer.
            </p>

            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginTop: "2.5rem", marginBottom: "1rem", color: "var(--gray-900)" }}>
              10. Children
            </h2>
            <p style={{ marginBottom: "1.5rem" }}>
              Our services are intended for businesses and are not directed at
              children under 16. We do not knowingly collect data from
              children.
            </p>

            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginTop: "2.5rem", marginBottom: "1rem", color: "var(--gray-900)" }}>
              11. Changes to This Policy
            </h2>
            <p style={{ marginBottom: "1.5rem" }}>
              We may update this Privacy Policy from time to time. The
              &ldquo;Last updated&rdquo; date at the top reflects when the
              latest changes were made. Material changes will be communicated
              where required.
            </p>

            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginTop: "2.5rem", marginBottom: "1rem", color: "var(--gray-900)" }}>
              12. Contact
            </h2>
            <p style={{ marginBottom: "1.5rem" }}>
              GrowMos &mdash; Data Protection
              <br />
              Email:{" "}
              <a
                href="mailto:hello@growmos.com"
                style={{ color: "var(--primary)", textDecoration: "underline" }}
              >
                hello@growmos.com
              </a>
              <br />
              Phone:{" "}
              <a
                href="tel:+8801731438768"
                style={{ color: "var(--primary)", textDecoration: "underline" }}
              >
                +880 1731 438768
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
