// app/item/[category]/[item]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Info } from "lucide-react";
import { categories } from "@/data/menuData";
import ModelViewer from "@/components/ar/ModelViewer";

interface ItemPageProps {
  params: {
    category: string;
    item: string;
  };
}

export default function ItemDetailPage({ params }: ItemPageProps) {
  // 1. Find the category
  const category = categories.find((c) => c.slug === params.category);
  if (!category) notFound();

  // 2. Find the specific item inside that category
  const menuItem = category.items.find((i) => i.slug === params.item);
  if (!menuItem) notFound();

  return (
    <div className="w-full min-h-screen flex flex-col pb-24">
      {/* Navigation Header */}
      <header className="px-6 py-8 flex items-center justify-between z-10">
        <Link 
          href={`/category/${category.slug}`}
          className="p-2 -ml-2 text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 backdrop-blur-md bg-background/50 rounded-full"
        >
          <ChevronLeft size={24} />
          <span className="text-sm font-medium tracking-wide">Back to {category.name}</span>
        </Link>
      </header>

      {/* 3D Viewer Section */}
      <section className="w-full px-4 mb-8 relative z-0">
        {menuItem.model3D ? (
          <ModelViewer 
            model3D={menuItem.model3D} 
            modelAR={menuItem.modelAR} 
          />
        ) : (
          <div className="w-full h-[50vh] rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground shadow-soft">
            <p className="font-inter flex items-center gap-2">
              <Info size={18} /> 3D Model coming soon
            </p>
          </div>
        )}
      </section>

      {/* Item Details Section */}
      <main className="px-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h1 className="font-playfair text-3xl text-foreground font-bold tracking-wide pr-4 leading-tight">
            {menuItem.name}
          </h1>
          <span className="font-inter text-xl text-primary font-semibold whitespace-nowrap pt-1">
            {menuItem.currency}{menuItem.price}
          </span>
        </div>

        <div className="w-12 h-[1px] bg-primary/30 mb-6" />

        <p className="font-inter text-muted-foreground leading-relaxed mb-8">
          {menuItem.description}
        </p>

        {/* Ingredients List */}
        {menuItem.ingredients && menuItem.ingredients.length > 0 && (
          <div className="bg-card/50 border border-border p-5 rounded-xl shadow-soft">
            <h3 className="font-playfair text-lg text-foreground mb-3 font-semibold tracking-wide">
              Key Ingredients
            </h3>
            <ul className="flex flex-wrap gap-2">
              {menuItem.ingredients.map((ingredient, idx) => (
                <li 
                  key={idx}
                  className="bg-background border border-border text-muted-foreground text-xs px-3 py-1.5 rounded-full font-medium"
                >
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}