// app/category/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { categories } from "@/data/menuData";
import MenuItemCard from "@/components/menu/MenuItemCard";

// This tells Next.js what URL parameters to expect
interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  // Find the exact category from our mock data that matches the URL
  const category = categories.find((c) => c.slug === params.slug);

  // If someone types a category that doesn't exist, show a 404 page safely
  if (!category) {
    notFound();
  }

  return (
    <div className="w-full min-h-screen px-6 py-8 pb-24 flex flex-col">
      {/* Navigation Header */}
      <header className="flex items-center justify-between mb-8">
        <Link 
          href="/home" 
          className="p-2 -ml-2 text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
        >
          <ChevronLeft size={24} />
          <span className="text-sm font-medium tracking-wide">Back</span>
        </Link>
      </header>

      {/* Category Title & Description */}
      <div className="mb-10">
        <h1 className="font-playfair text-4xl text-primary font-bold tracking-wide mb-3">
          {category.name}
        </h1>
        <p className="font-inter text-sm text-muted-foreground leading-relaxed">
          {category.description}
        </p>
        <div className="w-12 h-[1px] bg-primary/30 mt-6" />
      </div>

      {/* Menu Items List */}
      <main className="flex flex-col gap-6 w-full">
        {category.items.map((item, index) => (
          <MenuItemCard 
            key={item.id} 
            item={item} 
            categorySlug={category.slug}
            index={index} 
          />
        ))}
      </main>
    </div>
  );
}