"use client";

import { useState } from "react";

export function Photo({ src, className = "" }: { src: string; className?: string }) {
  return <div className={`photo ${className}`} style={{ backgroundImage: `url("${src}")` }} />;
}

export function PageHeader({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <section className="ph">
      <div className="phi">
        <p className="ey">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </section>
  );
}

export function InfoBox({ rows }: { rows: [string, string][] }) {
  return (
    <div className="ib">
      {rows.map(([label, value]) => (
        <div className="ir" key={label}>
          <span className="il">{label}</span>
          <span className="iv">{value}</span>
        </div>
      ))}
    </div>
  );
}

export function RoomCarousel({ imgs }: { imgs: string[] }) {
  const [idx, setIdx] = useState(0);
  if (imgs.length === 0) return null;
  const prev = () => setIdx((i) => (i - 1 + imgs.length) % imgs.length);
  const next = () => setIdx((i) => (i + 1) % imgs.length);
  return (
    <div className="rcar">
      <div className="rp" style={{ backgroundImage: `url("${imgs[idx]}")` }} />
      {imgs.length > 1 && (
        <>
          <button className="rcarBtn rcarPrev" onClick={prev} aria-label="Previous">
            &#8249;
          </button>
          <button className="rcarBtn rcarNext" onClick={next} aria-label="Next">
            &#8250;
          </button>
          <div className="rcarDots">
            {imgs.map((_, i) => (
              <button
                key={i}
                className={`rcarDot ${i === idx ? "rcarDotOn" : ""}`}
                onClick={() => setIdx(i)}
                aria-label={`Image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function GuestSection({
  title,
  note,
  rows,
  link,
  action,
}: {
  title: string;
  note?: string;
  rows: [string, string][];
  link?: { href: string; text: string };
  action?: { onClick: () => void; text: string };
}) {
  return (
    <section className="gst-section">
      <h2>{title}</h2>
      {note ? <p className="gst-note">{note}</p> : null}
      {rows.map(([label, value]) => (
        <div className="gst-row" key={label}>
          <span className="gst-lbl">{label}</span>
          <span className="gst-val">{value}</span>
        </div>
      ))}
      {link ? (
        <a
          href={link.href}
          className="gst-textlink"
          target={link.href.startsWith("mailto:") ? undefined : "_blank"}
          rel="noreferrer"
        >
          {link.text}
        </a>
      ) : null}
      {action ? (
        <button className="gst-textlink gst-action-btn" onClick={action.onClick}>
          {action.text}
        </button>
      ) : null}
    </section>
  );
}
