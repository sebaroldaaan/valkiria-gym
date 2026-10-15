"use client";

import { useEffect } from "react";

// Share in-flight requests across Strict Mode's mount/cleanup/mount cycle.
const loaded = new Map();
function loadScript(src) {
  if (!loaded.has(src)) {
    const promise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = resolve;
      script.onerror = () => { script.remove(); loaded.delete(src); reject(new Error(`Unable to load ${src}`)); };
      document.body.append(script);
    });
    loaded.set(src, promise);
  }
  return loaded.get(src);
}

export default function SiteScripts() {
  useEffect(() => {
    let cancelled = false;
    const cleanups = [];
    async function start() {
      try {
        await Promise.all(["/content.js", "/motion.js", "/site.js", "/cinematic.js"].map(loadScript));
        if (cancelled) return;
        const motion = window.createValkiriaMotion();
        cleanups.push(() => motion.destroy());
        cleanups.push(window.initValkiriaSite(motion));
        cleanups.push(window.initValkiriaCinematic(motion));
      } catch (error) {
        cleanups.reverse().forEach(cleanup => cleanup?.());
        cleanups.length = 0;
        console.error(error);
      }
    }
    start();
    return () => { cancelled = true; cleanups.reverse().forEach(cleanup => cleanup?.()); };
  }, []);
  return null;
}
