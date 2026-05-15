export const SITE_CONFIG = {
  name: "CraveDrop",
  tagline: "Your Craving, Delivered.",
  description: "Premium dining experience with online ordering, live tracking & more.",
  phone: "+91 98765 43210",
  email: "hello@cravedrop.com",
  address: "123, MG Road, Bangalore, Karnataka 560001",
  hours: "11:00 AM – 11:00 PM",
  socials: {
    instagram: "#",
    facebook: "#",
    twitter: "#",
    youtube: "#",
  },
} as const;

export const ORDER_STATUS_CONFIG: Record<
  string,
  { label: string; color: string; icon: string }
> = {
  pending: { label: "Order Placed", color: "var(--warning)", icon: "Clock" },
  confirmed: { label: "Confirmed", color: "var(--info)", icon: "CheckCircle" },
  preparing: { label: "Preparing", color: "var(--accent)", icon: "ChefHat" },
  cooking: { label: "Cooking", color: "var(--primary)", icon: "Flame" },
  ready: { label: "Ready", color: "var(--success)", icon: "Package" },
  out_for_delivery: { label: "On the Way", color: "var(--primary)", icon: "Truck" },
  delivered: { label: "Delivered", color: "var(--success)", icon: "CircleCheckBig" },
  cancelled: { label: "Cancelled", color: "var(--danger)", icon: "XCircle" },
};

export const NAV_ITEMS = [
  { label: "Home", href: "/", icon: "Home" },
  { label: "Menu", href: "/menu", icon: "UtensilsCrossed" },
  { label: "Cart", href: "/cart", icon: "ShoppingBag" },
  { label: "Orders", href: "/orders", icon: "ClipboardList" },
  { label: "Profile", href: "/profile", icon: "User" },
] as const;

export const ADMIN_NAV_ITEMS = [
  { label: "Dashboard", href: "/admin/dashboard", icon: "LayoutDashboard" },
  { label: "Foods", href: "/admin/foods", icon: "UtensilsCrossed" },
  { label: "Categories", href: "/admin/categories", icon: "Grid3X3" },
  { label: "Orders", href: "/admin/orders", icon: "ClipboardList" },
  { label: "Coupons", href: "/admin/coupons", icon: "Ticket" },
  { label: "Banners", href: "/admin/banners", icon: "Image" },
  { label: "Users", href: "/admin/users", icon: "Users" },
  { label: "Delivery", href: "/admin/delivery-partners", icon: "Bike" },
  { label: "Reports", href: "/admin/reports", icon: "BarChart3" },
  { label: "Settings", href: "/admin/settings", icon: "Settings" },
] as const;

export const GST_RATE = 0.05; // 5% GST for restaurants
export const DELIVERY_CHARGE = 40;
export const FREE_DELIVERY_ABOVE = 499;
export const PLATFORM_FEE = 5;
export const TIP_PRESETS = [0, 20, 30, 50];
