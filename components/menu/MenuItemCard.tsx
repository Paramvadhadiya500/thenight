// components/menu/MenuItemCard.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { getImageUrl } from "@/lib/cloudinary";
import { MenuItem } from "@/data/menuData";
import { Flame, Star } from "lucide-react";

interface MenuItemCardProps {
  item: MenuItem;
  categorySlug: string;
  index: number;
}

export default function MenuItemCard({ item, categorySlug, index }: MenuItemCardProps) {
  const imageUrl = getImageUrl(item.image, 500);

  // Staggered fade-in-up animation
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, delay: index * 0.1 } 
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      className="bg-card border border-border rounded-xl overflow-hidden shadow-soft flex flex-col"
    >
      {/* Top Half: Image & Badges */}
      <div className="relative h-48 w-full bg-muted">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-80" />
        
        {/* Badges Container */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
          {item.isPopular && (
            <span className="bg-amber-500/90 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
              <Star size={10} fill="currentColor" /> Popular
            </span>
          )}
          <div className="flex gap-2">
            {item.isSpicy && (
              <span className="bg-red-500/90 text-white p-1.5 rounded-full backdrop-blur-sm">
                <Flame size={12} fill="currentColor" />
              </span>
            )}
            {/* Veg Indicator */}
            <span className="bg-white/90 p-1.5 rounded-sm flex items-center justify-center backdrop-blur-sm">
              <span className={`w-2.5 h-2.5 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Half: Details & CTAs */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-playfair text-xl text-foreground font-semibold pr-2">
            {item.name}
          </h3>
          <span className="font-inter text-primary font-medium whitespace-nowrap">
            {item.currency}{item.price}
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground font-inter line-clamp-2 mb-4">
          {item.description}
        </p>

        {/* Call to Action Buttons */}
        <div className="mt-auto grid grid-cols-2 gap-3 pt-2">
          <Link href={`/item/${categorySlug}/${item.slug}`} className="w-full">
            <button className="w-full py-2.5 rounded-lg border border-primary/50 text-primary text-sm font-semibold tracking-wide hover:bg-primary/10 transition-colors">
              View in 3D
            </button>
          </Link>
          <Link href={`/item/${categorySlug}/${item.slug}`} className="w-full">
            <button className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold tracking-wide hover:opacity-90 transition-opacity shadow-soft">
              View in AR
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}