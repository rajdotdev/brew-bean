"use client";

import { useEffect, useState } from "react";

export default function ModelViewerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadModelViewer = async () => {
      // Check if already loaded
      if (customElements.get("model-viewer")) {
        setIsReady(true);
        return;
      }

      // Add CSS
      const existingCss = document.querySelector('link[href*="model-viewer"]');
      if (!existingCss) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.css";
        document.head.appendChild(link);
      }

      // Load the script as a module
      if (!customElements.get("model-viewer")) {
        const script = document.createElement("script");
        script.type = "module";
        script.src = "https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.js";
        document.head.appendChild(script);

        // Wait for custom element to be defined
        await new Promise((resolve) => {
          const check = () => {
            if (customElements.get("model-viewer")) {
              resolve(true);
            } else {
              setTimeout(check, 100);
            }
          };
          check();
        });
      }

      setIsReady(true);
    };

    loadModelViewer();
  }, []);

  if (!isReady) {
    return null;
  }

  return <>{children}</>;
}