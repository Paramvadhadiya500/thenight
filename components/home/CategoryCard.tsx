// components/home/CategoryCard.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { getImageUrl } from "@/lib/cloudinary";
import { Category } from "@/data/menuData";

interface CategoryCardProps {
  category: Category;
  index: number;
}

export default function CategoryCard({ category, index }: CategoryCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1
      } 
    },
    hover: { 
      scale: 1.02, 
      y: -4, 
      transition: { type: "spring", stiffness: 300, damping: 20 } 
    }
  };

  const imageUrl = getImageUrl(category.thumbnail, 600);

  return (
    <Link href={`/category/${category.slug}`}>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap={{ scale: 0.98 }}
        className="relative h-48 w-full rounded-xl overflow-hidden shadow-soft cursor-pointer group bg-card border border-border"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <div className="absolute inset-0 bg-[var(--gradient-overlay)]" />
        <div className="absolute bottom-0 left-0 p-5 w-full flex flex-col justify-end">
          <h2 className="text-2xl font-playfair text-foreground tracking-wide font-semibold mb-1">
            {category.name}
          </h2>
          <p className="text-sm text-muted-foreground font-inter line-clamp-1">
            {category.description}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}