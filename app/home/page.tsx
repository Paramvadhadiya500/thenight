// app/home/page.tsx
import { categories } from "@/data/menuData";
import CategoryCard from "@/components/home/CategoryCard";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen px-6 py-12 pb-24 flex flex-col">
      <header className="mb-10 text-center">
        <h1 className="font-playfair text-4xl text-primary font-bold tracking-wide mb-3">
          Menu
        </h1>
        <p className="font-inter text-sm text-muted-foreground uppercase tracking-[0.2em]">
          The House of Earthmonk
        </p>
        <div className="w-12 h-[1px] bg-primary/50 mx-auto mt-6" />
      </header>

      <main className="flex flex-col gap-6 w-full">
        {categories.map((category, index) => (
          <CategoryCard 
            key={category.id} 
            category={category} 
            index={index} 
          />
        ))}
      </main>
    </div>
  );
}