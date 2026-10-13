"use client";

import { useEffect } from "react";

const scripts = ["/content.js", "/site.js", "/scene.js"];

export default function SiteScripts() {
  useEffect(() => {
    let currentScript;
    let cancelled = false;

    function loadScript(index) {
      if (cancelled || index === scripts.length) return;

      const script = document.createElement("script");
      script.src = scripts[index];
      script.async = false;
      script.onload = () => loadScript(index + 1);
      script.onerror = () => {
        console.error(`Unable to load ${scripts[index]}`);
      };

      currentScript = script;
      document.body.append(script);
    }

    loadScript(0);

    return () => {
      cancelled = true;
      currentScript?.remove();
    };
  }, []);

  return null;
}
