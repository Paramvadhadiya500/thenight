// app/page.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Player } from "@lottiefiles/react-lottie-player";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashIntro() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Show the Lottie preloader for exactly 2.5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleVideoEnd = () => {
    // Automatically navigate to the main menu when the video finishes
    router.push("/home");
  };

  return (
    <div className="relative w-full h-screen bg-background overflow-hidden flex flex-col items-center justify-center">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center z-20"
          >
            {/* Lottie Spinner - using a clean, minimal loading animation */}
            <Player
              autoplay
              loop
              src="https://lottie.host/8c64137c-473f-42b7-9fa4-1e053a473215/MkVX1U6j50.json" 
              style={{ height: '120px', width: '120px' }}
            />
            <motion.h1 
              className="font-playfair text-3xl text-primary mt-6 tracking-[0.2em] uppercase font-medium"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Earthmonk
            </motion.h1>
          </motion.div>
        ) : (
          <motion.div
            key="video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 z-10"
          >
            {/* playsInline is crucial for iOS so it doesn't open the native video player.
              We keep it muted to allow autoplay on modern browsers.
            */}
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnd}
              className="w-full h-full object-cover opacity-70"
            >
              {/* Note: Update this src later with your actual Cloudinary video URL */}
              <source src="https://res.cloudinary.com/dlnn95ku7/video/upload/v1770540223/globsalvideo2_ptqvcd.mp4" type="video/mp4" />
            </video>
            
            {/* Dark gradient overlay to match our premium theme */}
            <div className="absolute inset-0 bg-[var(--gradient-overlay)] mix-blend-multiply pointer-events-none" />
            
            {/* Subtle skip button for returning customers */}
            <button 
              onClick={handleVideoEnd}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 text-muted-foreground text-xs tracking-[0.15em] uppercase border-b border-muted-foreground/30 pb-1 hover:text-primary transition-colors z-30"
            >
              Skip Intro
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}