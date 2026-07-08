"use client";

import { useEffect } from "react";

const visitorStorageKey = "jeroen-and-paws-visitor-id";

function getVisitorId() {
  const existing = window.localStorage.getItem(visitorStorageKey);
  if (existing) return existing;
  const next = crypto.randomUUID();
  window.localStorage.setItem(visitorStorageKey, next);
  return next;
}

export function PageViewTracker() {
  useEffect(() => {
    if (window.location.pathname.startsWith("/backend")) return;
    let isActive = true;
    const visitorId = getVisitorId();
    const send = () => {
      if (!isActive) return;
      void fetch("/api/page-views", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitorId, path: window.location.pathname, title: document.title, referrer: document.referrer }),
        keepalive: true,
      });
    };
    send();
    const interval = window.setInterval(send, 45000);
    const onVisibilityChange = () => { if (document.visibilityState === "visible") send(); };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => { isActive = false; window.clearInterval(interval); document.removeEventListener("visibilitychange", onVisibilityChange); };
  }, []);

  return null;
}