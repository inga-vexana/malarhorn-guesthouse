"use client";

import { useState, useRef } from "react";

export default function UploadVideoPage() {
  const [status, setStatus] = useState<"idle" | "uploading" | "processing" | "done" | "error">("idle");
  const [url, setUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    const file = inputRef.current?.files?.[0];
    if (!file) return;

    setStatus("uploading");
    setProgress(0);
    setErrorMsg(null);

    const formData = new FormData();
    formData.append("file", file);

    // Use XHR for upload progress, then switch to "processing" state
    await new Promise<void>((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/upload-video");

      xhr.upload.onprogress = (ev) => {
        if (ev.lengthComputable) {
          const pct = Math.round((ev.loaded / ev.total) * 100);
          setProgress(pct);
          if (pct === 100) setStatus("processing");
        }
      };

      xhr.onload = () => {
        try {
          const data = JSON.parse(xhr.responseText);
          if (xhr.status === 200) {
            setUrl(data.url);
            setStatus("done");
          } else {
            setErrorMsg(data.error ?? "Óþekkt villa");
            setStatus("error");
          }
        } catch {
          setErrorMsg("Gat ekki lesið svar frá þjóni");
          setStatus("error");
        }
        resolve();
      };

      xhr.onerror = () => {
        setErrorMsg("Tenging við þjón mistókst");
        setStatus("error");
        resolve();
      };

      xhr.send(formData);
    });
  }

  const btnLabel =
    status === "uploading" ? `${progress}% — Hleður upp...` :
    status === "processing" ? "Vinnsla..." :
    "Hlaða upp";

  return (
    <main style={{
      alignItems: "center",
      background: "#f4f0e8",
      display: "flex",
      justifyContent: "center",
      minHeight: "100vh",
      padding: "2rem",
    }}>
      <div style={{
        background: "#fff",
        border: "1px solid #d6cfc0",
        maxWidth: 480,
        padding: "3rem",
        width: "100%",
      }}>
        <h1 style={{
          color: "#1a1814",
          fontFamily: "var(--font-serif, Georgia, serif)",
          fontSize: "2rem",
          fontWeight: 300,
          marginBottom: "0.5rem",
        }}>
          Hero Video
        </h1>
        <p style={{
          color: "#4a4438",
          fontFamily: "var(--font-sans, Arial, sans-serif)",
          fontSize: "0.9rem",
          fontWeight: 300,
          lineHeight: 1.7,
          marginBottom: "2rem",
        }}>
          Hladdu upp hero.mp4 videoinu hér. Mælst er til að nota MP4 með H.264 kóðun. Engin takmörk á stærð.
        </p>

        {status === "done" ? (
          <div>
            <p style={{ color: "#4a8a4a", fontFamily: "var(--font-sans, Arial, sans-serif)", fontSize: "0.9rem", marginBottom: "1rem" }}>
              Videoið hefur verið hlaðið upp!
            </p>
            <video src={url!} controls style={{ width: "100%", marginBottom: "1.5rem" }} />
            <p style={{ color: "#4a4438", fontFamily: "var(--font-sans, Arial, sans-serif)", fontSize: "0.8rem" }}>
              Farðu á forsíðuna til að sjá videoið í hero-hlutanum.
            </p>
            <a href="/" style={{
              background: "#1a1814",
              color: "#faf7f2",
              display: "inline-block",
              fontFamily: "var(--font-sans, Arial, sans-serif)",
              fontSize: "0.72rem",
              fontWeight: 500,
              letterSpacing: "0.2em",
              marginTop: "1.5rem",
              padding: "0.9rem 2rem",
              textDecoration: "none",
              textTransform: "uppercase",
            }}>
              Fara á forsíðu
            </a>
          </div>
        ) : (
          <form onSubmit={handleUpload}>
            <input
              ref={inputRef}
              type="file"
              accept="video/*"
              required
              style={{
                border: "1px solid #d6cfc0",
                display: "block",
                fontFamily: "var(--font-sans, Arial, sans-serif)",
                fontSize: "0.88rem",
                marginBottom: "1.5rem",
                padding: "0.75rem",
                width: "100%",
              }}
            />

            {(status === "uploading" || status === "processing") && (
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ background: "#ece6d8", height: 4, marginBottom: "0.5rem", width: "100%" }}>
                  <div style={{
                    background: "#a08858",
                    height: "100%",
                    transition: "width 0.3s",
                    width: status === "processing" ? "100%" : `${progress}%`,
                  }} />
                </div>
                <p style={{ color: "#4a4438", fontFamily: "var(--font-sans, Arial, sans-serif)", fontSize: "0.8rem" }}>
                  {status === "processing" ? "Vinnsla hjá þjóni, bíddu..." : `${progress}% hlaðið upp...`}
                </p>
              </div>
            )}

            {status === "error" && (
              <p style={{ color: "#c0392b", fontFamily: "var(--font-sans, Arial, sans-serif)", fontSize: "0.85rem", marginBottom: "1rem" }}>
                Villa: {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "uploading" || status === "processing"}
              style={{
                background: (status === "uploading" || status === "processing") ? "#888" : "#1a1814",
                border: "none",
                color: "#faf7f2",
                cursor: (status === "uploading" || status === "processing") ? "not-allowed" : "pointer",
                fontFamily: "var(--font-sans, Arial, sans-serif)",
                fontSize: "0.72rem",
                fontWeight: 500,
                letterSpacing: "0.2em",
                padding: "0.9rem 2rem",
                textTransform: "uppercase",
                transition: "background 0.2s",
              }}
            >
              {btnLabel}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
