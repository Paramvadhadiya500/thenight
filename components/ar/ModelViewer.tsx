// components/ar/ModelViewer.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { getRawFileUrl } from "@/lib/cloudinary";

interface ModelViewerProps {
  model3D: string;
  modelAR?: string;
}

export default function ModelViewer({ model3D, modelAR }: ModelViewerProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isAR, setIsAR] = useState(false);
  const [rotation, setRotation] = useState(0); // Tracks our custom slider rotation
  
  const modelRef = useRef<any>(null);

  useEffect(() => {
    import("@google/model-viewer").catch(console.error);
    setIsMounted(true);

    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    if (/android|ipad|iphone|ipod/i.test(userAgent.toLowerCase())) {
      setIsMobile(true);
    }
  }, []);

  // Listen for when the user enters or exits the AR camera
  useEffect(() => {
    const modelEl = modelRef.current;
    if (!modelEl) return;

    const handleARStatus = (event: any) => {
      if (event.detail.status === "session-started") {
        setIsAR(true);
      } else if (event.detail.status === "not-presenting") {
        setIsAR(false);
      }
    };

    modelEl.addEventListener("ar-status", handleARStatus);
    return () => modelEl.removeEventListener("ar-status", handleARStatus);
  }, [isMounted]);

  if (!isMounted) {
    return <div className="w-full h-full min-h-[50vh] bg-card animate-pulse rounded-xl" />;
  }

  const src = getRawFileUrl(model3D);
  const iosSrc = modelAR ? getRawFileUrl(modelAR) : undefined;

  return (
    <div className="relative w-full h-[50vh] md:h-[60vh] rounded-xl overflow-hidden bg-gradient-to-b from-card to-background border border-border shadow-soft">
      <model-viewer
        ref={modelRef}
        src={src}
        ios-src={iosSrc}
        alt="A 3D model of the menu item"
        ar
        // Forcing WebXR first for instant loading
        ar-modes="webxr scene-viewer quick-look"
        ar-scale="auto"
        ar-placement="floor"
        environment-image="neutral"
        camera-controls
        // We dynamically tie the 3D rotation to our React state slider!
        orientation={`0 ${rotation}deg 0`}
        shadow-intensity="1"
        interaction-prompt="none"
        style={{ width: "100%", height: "100%", backgroundColor: "transparent" }}
      >
        {/* AR Launch Button */}
        {isMobile && !isAR && (
          <button
            slot="ar-button"
            className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold shadow-soft tracking-wide hover:scale-105 transition-transform z-10"
          >
            View in AR
          </button>
        )}

        {/* CUSTOM AR OVERLAY: Only shows when the camera is open! */}
        {isAR && (
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[80%] max-w-sm flex flex-col items-center gap-3 z-50 pointer-events-auto">
            <span className="text-white text-xs font-inter tracking-widest uppercase drop-shadow-md backdrop-blur-md bg-black/40 border border-white/20 px-4 py-1.5 rounded-full">
              Slide to Spin Food
            </span>
            <input
              type="range"
              min="0"
              max="360"
              value={rotation}
              onChange={(e) => setRotation(Number(e.target.value))}
              className="w-full h-2 bg-white/30 rounded-lg appearance-none cursor-pointer backdrop-blur-md accent-primary"
            />
          </div>
        )}
      </model-viewer>
      
      {/* Normal desktop/web instructions */}
      {!isAR && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md text-white/90 text-xs px-4 py-2 rounded-full pointer-events-none tracking-wide whitespace-nowrap z-10">
          Drag to spin • Scroll to zoom
        </div>
      )}
    </div>
  );
}