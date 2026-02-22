// components/ar/ModelViewer.tsx
"use client";

import { useEffect, useState } from "react";
import { getRawFileUrl } from "@/lib/cloudinary";

interface ModelViewerProps {
  model3D: string;
  modelAR?: string;
}

export default function ModelViewer({ model3D, modelAR }: ModelViewerProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 1. Dynamically import model-viewer to prevent SSR hydration crashes
    import("@google/model-viewer").catch(console.error);
    setIsMounted(true);

    // 2. Detect mobile device to selectively show the AR button
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    if (/android|ipad|iphone|ipod/i.test(userAgent.toLowerCase())) {
      setIsMobile(true);
    }
  }, []);

  // Show a premium dark skeleton loader while the component mounts
  if (!isMounted) {
    return <div className="w-full h-full min-h-[50vh] bg-card animate-pulse rounded-xl" />;
  }

  const src = getRawFileUrl(model3D);
  const iosSrc = modelAR ? getRawFileUrl(modelAR) : undefined;

  return (
    <div className="relative w-full h-[50vh] md:h-[60vh] rounded-xl overflow-hidden bg-gradient-to-b from-card to-background border border-border shadow-soft">
      <model-viewer
        src={src}
        ios-src={iosSrc}
        alt="A 3D model of the menu item"
        ar
        // WE KEPT WEBXR FIRST FOR INSTANT LOADING!
        ar-modes="webxr scene-viewer quick-look"
        // FIX 1: Locks the 3D model in place so you can walk 360 degrees around it without it moving
        ar-scale="fixed"
        ar-placement="floor"
        // FIX 2: Makes the food exactly twice as big instantly. (Change to "3 3 3" if still too small)
        scale="2 2 2"
        environment-image="neutral"
        camera-controls
        auto-rotate
        shadow-intensity="1"
        // FIX 3: Removes the invisible tutorial layer so your touches work on the FIRST try
        interaction-prompt="none"
        style={{ width: "100%", height: "100%", backgroundColor: "transparent" }}
      >
        {isMobile && (
          <button
            slot="ar-button"
            className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold shadow-soft tracking-wide hover:scale-105 transition-transform"
          >
            View in AR
          </button>
        )}
      </model-viewer>
      
      {/* Subtle Toast overlay for gesture instructions */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md text-white/90 text-xs px-4 py-2 rounded-full pointer-events-none tracking-wide whitespace-nowrap z-10">
        1 Finger Move • 2 Fingers Zoom & Rotate
      </div>
    </div>
  );
}