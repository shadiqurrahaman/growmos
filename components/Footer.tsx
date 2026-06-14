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
              Your dedicated Management Operating System. We handle the tech so
              you can focus on business growth.
            </p>
            {/* Social links — hidden for now, will activate once profiles are live
            <div className="footer__social">
              <a href="#" className="footer__social-link" aria-label="LinkedIn">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a href="#" className="footer__social-link" aria-label="Twitter">
                <i className="fa-brands fa-x-twitter"></i>
              </a>
              <a href="#" className="footer__social-link" aria-label="Facebook">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="footer__social-link" aria-label="Instagram">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </div>
            */}
          </div>

          <div className="footer__links">
            <h4 className="footer__title">Services</h4>
            <ul className="footer__list">
              <li>
                <Link href="/digital-marketing">Digital Marketing</Link>
              </li>
              <li>
                <Link href="/custom-software-development">Software Development</Link>
              </li>
              <li>
                <Link href="/bi-reporting-ai">BI, Reporting & AI</Link>
              </li>
              <li>
                <Link href="/#services">All Services</Link>
              </li>
            </ul>
          </div>

          <div className="footer__links">
            <h4 className="footer__title">Company</h4>
            <ul className="footer__list">
              <li>
                <Link href="/boss-model">The Boss Model</Link>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Careers</a>
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
            &copy; 2024 Grow Mos. All rights reserved.
          </p>
          <div className="footer__legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
