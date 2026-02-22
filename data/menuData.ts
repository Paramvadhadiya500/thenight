// data/menuData.ts

export interface MenuItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  currency: string;        // e.g., "₹"
  description: string;
  image: string;           // Cloudinary public ID
  model3D?: string;        // Cloudinary public ID for .glb
  modelAR?: string;        // Optional .usdz for iOS
  ingredients: string[];
  isVeg: boolean;
  isSpicy: boolean;
  isPopular: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  thumbnail: string;       // Cloudinary public ID
  description: string;
  items: MenuItem[];
}

export const categories: Category[] = [
  {
    id: "cat-1",
    name: "Italian",
    slug: "italian",
    thumbnail: "https://res.cloudinary.com/dlnn95ku7/image/upload/v1771783455/wtf_syqmh7.glb",
    description: "Authentic wood-fired classics and handmade pastas.",
    items: [
      {
        id: "item-1",
        name: "Truffle Mushroom Risotto",
        slug: "truffle-mushroom-risotto",
        price: 850,
        currency: "₹",
        description: "Creamy Arborio rice with wild mushrooms, finished with white truffle oil and parmesan tuile.",
        image: "https://res.cloudinary.com/dlnn95ku7/image/upload/v1771690737/123_efqrhk.jpg",
        model3D: "https://res.cloudinary.com/dlnn95ku7/image/upload/v1771782664/145236_h9lql2.glb", // We will use this in Phase 3
        ingredients: ["Arborio Rice", "Wild Mushrooms", "Truffle Oil", "Parmesan"],
        isVeg: true,
        isSpicy: false,
        isPopular: true,
      }
    ]
  },
  {
    id: "cat-2",
    name: "Beverages",
    slug: "beverages",
    thumbnail: "https://res.cloudinary.com/dlnn95ku7/image/upload/v1771690853/1234_ac921s.jpg",
    description: "Artisanal pours and botanical infusions.",
    items: [
      {
        id: "item-2",
        name: "Smoked Hibiscus Negroni",
        slug: "smoked-hibiscus-negroni",
        price: 650,
        currency: "₹",
        description: "A theatrical botanical twist on the classic, served under a cloche of applewood smoke.",
        image: "https://res.cloudinary.com/dlnn95ku7/image/upload/v1771690853/1234_ac921s.jpg",
        model3D: "https://res.cloudinary.com/dlnn95ku7/image/upload/v1769104384/output_ha2s3x.glb",
        ingredients: ["Gin", "Campari", "Sweet Vermouth", "Hibiscus", "Applewood Smoke"],
        isVeg: true,
        isSpicy: false,
        isPopular: true,
      }
    ]
  }
  // We can add Thai, Continental, and Desserts here later!
];