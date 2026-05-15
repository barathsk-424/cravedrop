// Demo data for the homepage - will be replaced by Supabase queries
import type { Food, Category, Banner } from "@/types";

export const demoBanners: Banner[] = [
  {
    id: "1",
    title: "Flat 50% Off on Your First Order",
    image_url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80",
    link_url: "/menu",
    is_active: true,
    start_date: null,
    end_date: null,
    sort_order: 0,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Weekend Special Biryani Fest",
    image_url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80",
    link_url: "/menu",
    is_active: true,
    start_date: null,
    end_date: null,
    sort_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Free Delivery Above ₹499",
    image_url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
    link_url: "/menu",
    is_active: true,
    start_date: null,
    end_date: null,
    sort_order: 2,
    created_at: new Date().toISOString(),
  },
];

export const demoCategories: Category[] = [
  { id: "1", name: "Biryani", slug: "biryani", image_url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&q=80", sort_order: 0, created_at: "" },
  { id: "2", name: "Pizza", slug: "pizza", image_url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&q=80", sort_order: 1, created_at: "" },
  { id: "3", name: "Burgers", slug: "burgers", image_url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=80", sort_order: 2, created_at: "" },
  { id: "4", name: "Desserts", slug: "desserts", image_url: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=200&q=80", sort_order: 3, created_at: "" },
  { id: "5", name: "Chinese", slug: "chinese", image_url: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=200&q=80", sort_order: 4, created_at: "" },
  { id: "6", name: "South Indian", slug: "south-indian", image_url: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=200&q=80", sort_order: 5, created_at: "" },
  { id: "7", name: "Drinks", slug: "drinks", image_url: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=200&q=80", sort_order: 6, created_at: "" },
  { id: "8", name: "Starters", slug: "starters", image_url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200&q=80", sort_order: 7, created_at: "" },
];

export const demoFoods: Food[] = [
  {
    id: "1", category_id: "1", name: "Hyderabadi Chicken Biryani", description: "Fragrant basmati rice layered with tender chicken, saffron & aromatic spices", price: 349, discount_price: 299,
    is_veg: false, is_available: true, stock_quantity: -1, preparation_time: "25 min", rating_avg: 4.5, rating_count: 234, created_at: "", updated_at: "",
    images: [{ id: "i1", food_id: "1", image_url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80", is_primary: true, sort_order: 0 }],
  },
  {
    id: "2", category_id: "2", name: "Margherita Pizza", description: "Classic thin crust with fresh mozzarella, basil & san marzano tomatoes", price: 299, discount_price: null,
    is_veg: true, is_available: true, stock_quantity: -1, preparation_time: "20 min", rating_avg: 4.3, rating_count: 189, created_at: "", updated_at: "",
    images: [{ id: "i2", food_id: "2", image_url: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80", is_primary: true, sort_order: 0 }],
  },
  {
    id: "3", category_id: "3", name: "Smash Burger Deluxe", description: "Double smashed patties, aged cheddar, caramelized onions, house sauce", price: 249, discount_price: 199,
    is_veg: false, is_available: true, stock_quantity: -1, preparation_time: "15 min", rating_avg: 4.7, rating_count: 312, created_at: "", updated_at: "",
    images: [{ id: "i3", food_id: "3", image_url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80", is_primary: true, sort_order: 0 }],
  },
  {
    id: "4", category_id: "4", name: "Tiramisu", description: "Classic Italian dessert with espresso-soaked ladyfingers & mascarpone", price: 199, discount_price: null,
    is_veg: true, is_available: true, stock_quantity: -1, preparation_time: "5 min", rating_avg: 4.8, rating_count: 156, created_at: "", updated_at: "",
    images: [{ id: "i4", food_id: "4", image_url: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80", is_primary: true, sort_order: 0 }],
  },
  {
    id: "5", category_id: "1", name: "Paneer Butter Masala", description: "Creamy tomato gravy with soft paneer cubes, served with naan", price: 279, discount_price: 249,
    is_veg: true, is_available: true, stock_quantity: -1, preparation_time: "20 min", rating_avg: 4.4, rating_count: 198, created_at: "", updated_at: "",
    images: [{ id: "i5", food_id: "5", image_url: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80", is_primary: true, sort_order: 0 }],
  },
  {
    id: "6", category_id: "5", name: "Hakka Noodles", description: "Stir-fried noodles with fresh vegetables and Indo-Chinese sauces", price: 199, discount_price: null,
    is_veg: true, is_available: true, stock_quantity: -1, preparation_time: "15 min", rating_avg: 4.2, rating_count: 145, created_at: "", updated_at: "",
    images: [{ id: "i6", food_id: "6", image_url: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&q=80", is_primary: true, sort_order: 0 }],
  },
];
