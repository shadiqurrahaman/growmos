import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | GrowMos",
  description:
    "The terms and conditions governing your use of the GrowMos website and services.",
};

const LAST_UPDATED = "31 July 2026";

export default function TermsOfServicePage() {
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
            Terms of Service
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
              These Terms of Service (&ldquo;Terms&rdquo;) govern your access
              to and use of the GrowMos website (growmos.com) and any services,
              proposals, or deliverables provided by GrowMos
              (&ldquo;Services&rdquo;). By accessing the website or engaging
              our Services, you agree to these Terms.
            </p>

            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginTop: "2.5rem", marginBottom: "1rem", color: "var(--gray-900)" }}>
              1. Use of the Website
            </h2>
            <ul style={{ paddingLeft: "1.5rem", marginBottom: "1.5rem" }}>
              <li>
                You must use the website lawfully and not attempt to disrupt or
                gain unauthorized access to it.
              </li>
              <li>
                Content on the website (text, graphics, logos, code) is owned
                by GrowMos or its licensors and may not be copied, republished,
                or commercially exploited without written permission.
              </li>
              <li>
                We may update or withdraw parts of the website at any time
                without notice.
              </li>
            </ul>

            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginTop: "2.5rem", marginBottom: "1rem", color: "var(--gray-900)" }}>
              2. Services &amp; Engagements
            </h2>
            <p style={{ marginBottom: "1.5rem" }}>
              Specific Services are delivered under a written proposal,
              statement of work, or master services agreement (an
              &ldquo;Engagement&rdquo;). The Engagement governs the scope,
              deliverables, fees, timelines, and acceptance criteria for the
              Services. In case of a conflict, the Engagement controls over
              these Terms.
            </p>

            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginTop: "2.5rem", marginBottom: "1rem", color: "var(--gray-900)" }}>
              3. Client Responsibilities
            </h2>
            <ul style={{ paddingLeft: "1.5rem", marginBottom: "1.5rem" }}>
              <li>
                Provide timely access to systems, data, and personnel required
                for us to perform the Services.
              </li>
              <li>
                Ensure that any data you share with us is collected and shared
                lawfully, and that you have the right to share it for the
                purposes of the Engagement.
              </li>
              <li>
                Review deliverables and provide feedback within the agreed
                review windows.
              </li>
            </ul>

            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginTop: "2.5rem", marginBottom: "1rem", color: "var(--gray-900)" }}>
              4. Fees &amp; Payment
            </h2>
            <p style={{ marginBottom: "1.5rem" }}>
              Fees and payment terms are set out in the Engagement. Unless
              otherwise stated, invoices are due within the period specified
              on the invoice. Late payments may incur interest charges and
              suspension of Services.
            </p>

            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginTop: "2.5rem", marginBottom: "1rem", color: "var(--gray-900)" }}>
              5. Intellectual Property
            </h2>
            <p style={{ marginBottom: "1.5rem" }}>
              Each party retains ownership of its pre-existing intellectual
              property. Subject to full payment, GrowMos assigns to the client
              the rights to deliverables explicitly identified as
              &ldquo;work-for-hire&rdquo; in the Engagement. GrowMos retains
              rights to its underlying tools, methodologies, frameworks, and
              know-how, and may use them for other clients.
            </p>

            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginTop: "2.5rem", marginBottom: "1rem", color: "var(--gray-900)" }}>
              6. Confidentiality
            </h2>
            <p style={{ marginBottom: "1.5rem" }}>
              Each party will treat the other&rsquo;s confidential information
              with the same care it uses to protect its own confidential
              information (and at least a reasonable standard of care) and
              will not disclose it to third parties except as required to
              perform the Services or meet legal obligations.
            </p>

            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginTop: "2.5rem", marginBottom: "1rem", color: "var(--gray-900)" }}>
              7. Data Protection
            </h2>
            <p style={{ marginBottom: "1.5rem" }}>
              Where GrowMos processes personal data on behalf of a client, the
              parties will execute a Data Processing Agreement (DPA) that
              governs such processing. Our general privacy practices are
              described in our{" "}
              <a
                href="/privacy-policy"
                style={{ color: "var(--primary)", textDecoration: "underline" }}
              >
                Privacy Policy
              </a>
              .
            </p>

            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginTop: "2.5rem", marginBottom: "1rem", color: "var(--gray-900)" }}>
              8. Warranties &amp; Disclaimers
            </h2>
            <p style={{ marginBottom: "1.5rem" }}>
              We will perform the Services with reasonable skill and care. The
              website and its content are provided &ldquo;as is&rdquo; and
              without warranties of any kind, express or implied, including
              warranties of merchantability or fitness for a particular
              purpose, except as required by law.
            </p>

            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginTop: "2.5rem", marginBottom: "1rem", color: "var(--gray-900)" }}>
              9. Limitation of Liability
            </h2>
            <p style={{ marginBottom: "1.5rem" }}>
              To the maximum extent permitted by law, GrowMos will not be
              liable for any indirect, incidental, special, or consequential
              damages, or for loss of profits, revenue, or data, arising from
              or related to the website or the Services. Our aggregate
              liability under an Engagement is limited to the fees paid by the
              client to GrowMos for that Engagement in the twelve (12) months
              preceding the claim.
            </p>

            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginTop: "2.5rem", marginBottom: "1rem", color: "var(--gray-900)" }}>
              10. Termination
            </h2>
            <p style={{ marginBottom: "1.5rem" }}>
              Either party may terminate an Engagement per the termination
              provisions set out in it. We may suspend or terminate access to
              the website at any time if you breach these Terms. Provisions
              that by their nature should survive termination will do so.
            </p>

            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginTop: "2.5rem", marginBottom: "1rem", color: "var(--gray-900)" }}>
              11. Third-Party Links
            </h2>
            <p style={{ marginBottom: "1.5rem" }}>
              The website may link to third-party sites or services we do not
              control. We are not responsible for their content, policies, or
              practices.
            </p>

            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginTop: "2.5rem", marginBottom: "1rem", color: "var(--gray-900)" }}>
              12. Governing Law
            </h2>
            <p style={{ marginBottom: "1.5rem" }}>
              These Terms are governed by the laws applicable at GrowMos&rsquo;s
              place of business, without regard to conflict-of-law principles.
              Any dispute will be resolved in the competent courts of that
              jurisdiction unless the parties agree otherwise in an
              Engagement.
            </p>

            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginTop: "2.5rem", marginBottom: "1rem", color: "var(--gray-900)" }}>
              13. Changes to These Terms
            </h2>
            <p style={{ marginBottom: "1.5rem" }}>
              We may update these Terms from time to time. The
              &ldquo;Last updated&rdquo; date at the top reflects the most
              recent changes. Continued use of the website after changes
              indicates acceptance of the updated Terms.
            </p>

            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginTop: "2.5rem", marginBottom: "1rem", color: "var(--gray-900)" }}>
              14. Contact
            </h2>
            <p style={{ marginBottom: "1.5rem" }}>
              Questions about these Terms can be sent to{" "}
              <a
                href="mailto:hello@growmos.com"
                style={{ color: "var(--primary)", textDecoration: "underline" }}
              >
                hello@growmos.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
