import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link href="/" className="footer__logo">
              <span className="logo-growss">Grow</span>
              <span className="logo-mosss">Mos</span>
            </Link>
            <p className="footer__tagline">
              Your dedicated data and growth partner. We design, build, and
              maintain the data foundation your business runs on.
            </p>
            <div className="footer__social" aria-label="Social links">
              <a href="#" className="footer__social-link" aria-label="LinkedIn">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a href="#" className="footer__social-link" aria-label="X (Twitter)">
                <i className="fa-brands fa-x-twitter"></i>
              </a>
              <a href="#" className="footer__social-link" aria-label="Facebook">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="footer__social-link" aria-label="Instagram">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#" className="footer__social-link" aria-label="YouTube">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </div>
          </div>

          <div className="footer__links">
            <h4 className="footer__title">Data Solutions</h4>
            <ul className="footer__list">
              <li>
                <Link href="/data-pipeline-engineering">Data Pipeline Engineering</Link>
              </li>
              <li>
                <Link href="/cloud-data-warehousing">Cloud Data Warehousing</Link>
              </li>
              <li>
                <Link href="/bi-dashboards">BI &amp; Dashboards</Link>
              </li>
              <li>
                <Link href="/crm-data-integration">CRM Data Integration</Link>
              </li>
              <li>
                <Link href="/reverse-etl-activation">Reverse ETL &amp; Activation</Link>
              </li>
            </ul>
          </div>

          <div className="footer__links">
            <h4 className="footer__title">Growth Services</h4>
            <ul className="footer__list">
              <li>
                <Link href="/meta-ads">Meta Ads</Link>
              </li>
              <li>
                <Link href="/google-ads">Google Ads</Link>
              </li>
              <li>
                <Link href="/social-media-management">Social Media Management</Link>
              </li>
              <li>
                <Link href="/ai-video-editing">AI Video &amp; Editing</Link>
              </li>
              <li>
                <Link href="/custom-software-development">Custom Software</Link>
              </li>
            </ul>
          </div>

          <div className="footer__links">
            <h4 className="footer__title">Industries</h4>
            <ul className="footer__list">
              <li><Link href="/industries/saas">SaaS</Link></li>
              <li><Link href="/industries/ecommerce">E-commerce</Link></li>
              <li><Link href="/industries/edtech">EdTech</Link></li>
              <li><Link href="/industries/retail">Retail</Link></li>
            </ul>
          </div>

          <div className="footer__links">
            <h4 className="footer__title">Company</h4>
            <ul className="footer__list">
              <li>
                <Link href="/boss-model">The Boss Model</Link>
              </li>
              <li>
                <Link href="/resources/data-maturity-assessment">Free Data Maturity Assessment</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="footer__contact">
            <h4 className="footer__title">Get in Touch</h4>
            <ul className="footer__contact-list">
              <li>
                <i className="fa-solid fa-envelope"></i>
                <a href="mailto:hello@growmos.com">hello@growmos.com</a>
              </li>
              <li>
                <i className="fa-solid fa-phone"></i>
                <a href="tel:+8801731438768">+880 1731 438768</a>
              </li>
              <li>
                <i className="fa-solid fa-location-dot"></i>
                <span>Remote-first, Global Team</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; 2026 GrowMos. All rights reserved.
          </p>
          <div className="footer__legal">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-of-service">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
