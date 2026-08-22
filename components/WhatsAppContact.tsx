import Image from "next/image";

/**
 * Reusable WhatsApp contact card.
 * Replaces direct email links with a scannable QR code that opens WhatsApp.
 *
 * - On desktop: people scan the QR with their phone.
 * - On mobile: a "Chat on WhatsApp" button appears under the QR for one-tap contact.
 *
 * Aspect ratio of the source image is ~1:1 (1080×1070), so the card stays square.
 */
export default function WhatsAppContact({
  phone = "15551234567",
  message = "Hi GrowMos, I'd like to chat about a data project.",
  label = "Chat on WhatsApp",
  title = "Message us on WhatsApp",
  subtitle = "Scan the QR with your phone, or tap the button below on mobile.",
  variant = "card", // "card" | "inline"
}: {
  phone?: string;
  message?: string;
  label?: string;
  title?: string;
  subtitle?: string;
  variant?: "card" | "inline";
}) {
  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  if (variant === "inline") {
    return (
      <div className="wa-inline">
        <div className="wa-inline__qr">
          <Image
            src="/images/whatsapp-qr-growmos.webp"
            alt="GrowMos WhatsApp QR code"
            width={1080}
            height={1070}
            sizes="(max-width: 600px) 260px, 220px"
            className="wa-inline__img"
            priority
          />
        </div>
        <div className="wa-inline__body">
          <strong className="wa-inline__title">{title}</strong>
          {subtitle && <p className="wa-inline__sub">{subtitle}</p>}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="wa-inline__cta"
          >
            <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
            <span>{label}</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="wa-card">
      <div className="wa-card__qr">
        <Image
          src="/images/whatsapp-qr-growmos.webp"
          alt="GrowMos WhatsApp QR code"
          width={1080}
          height={1070}
          sizes="(max-width: 719px) 70vw, 320px"
          className="wa-card__img"
          priority
        />
      </div>
      <div className="wa-card__body">
        <h3 className="wa-card__title">{title}</h3>
        {subtitle && <p className="wa-card__sub">{subtitle}</p>}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="wa-card__cta"
        >
          <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
          <span>{label}</span>
        </a>
      </div>
    </div>
  );
}
