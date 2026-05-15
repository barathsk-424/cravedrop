/* ============================================
   Core TypeScript Types
   ============================================ */

// ---- User & Auth ----
export type UserRole = "customer" | "admin" | "kitchen" | "delivery";

export interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  role: UserRole;
  subscription_tier: string | null;
  points: number | null;
  created_at: string;
  updated_at: string;
}

// ---- Categories ----
export interface Category {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
  sort_order: number;
  created_at: string;
}

// ---- Foods ----
export interface Food {
  id: string;
  category_id: string | null;
  name: string;
  description: string | null;
  price: number;
  discount_price: number | null;
  is_veg: boolean;
  is_available: boolean;
  stock_quantity: number;
  preparation_time: string;
  rating_avg: number;
  rating_count: number;
  created_at: string;
  updated_at: string;
  // joined
  category?: Category;
  images?: FoodImage[];
  addon_groups?: AddonGroup[];
}

export interface FoodImage {
  id: string;
  food_id: string;
  image_url: string;
  is_primary: boolean;
  sort_order: number;
}

export interface AddonGroup {
  id: string;
  food_id: string;
  name: string;
  required: boolean;
  multi_select: boolean;
  max_selections: number;
  options?: AddonOption[];
}

export interface AddonOption {
  id: string;
  group_id: string;
  name: string;
  price: number;
}

// ---- Cart ----
export interface CartItem {
  food: Food;
  quantity: number;
  selectedAddons: SelectedAddon[];
  specialInstructions?: string;
  itemTotal: number;
}

export interface SelectedAddon {
  groupId: string;
  groupName: string;
  option: AddonOption;
}

// ---- Address ----
export interface Address {
  id: string;
  user_id: string;
  label: string | null;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  pincode: string;
  lat: number | null;
  lng: number | null;
  is_default: boolean;
  created_at: string;
}

// ---- Orders ----
export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "cooking"
  | "ready"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";
export type OrderType = "delivery" | "dine_in" | "takeaway";

export interface Order {
  id: string;
  user_id: string;
  address_id: string | null;
  status: OrderStatus | null;
  payment_status: PaymentStatus | null;
  payment_method: string | null;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  subtotal: number;
  gst_amount: number;
  delivery_charge: number;
  discount: number;
  tip: number;
  total_amount: number;
  coupon_code: string | null;
  order_type: OrderType;
  table_number: string | null;
  notes: string | null;
  estimated_delivery_time: string | null;
  actual_delivery_time: string | null;
  created_at: string;
  updated_at: string;
  // joined
  items?: OrderItem[];
  address?: Address;
  profile?: Profile;
}

export interface OrderItem {
  id: string;
  order_id: string;
  food_id: string | null;
  food_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  special_instructions: string | null;
  addons?: OrderItemAddon[];
}

export interface OrderItemAddon {
  id: string;
  order_item_id: string;
  addon_option_id: string | null;
  name: string;
  price: number;
}

// ---- Coupons ----
export interface Coupon {
  id: string;
  code: string;
  description: string | null;
  discount_type: "flat" | "percent";
  discount_value: number;
  min_order_value: number;
  max_discount: number | null;
  start_date: string | null;
  end_date: string | null;
  usage_limit: number;
  used_count: number;
  is_active: boolean;
  created_at: string;
}

// ---- Reviews ----
export interface Review {
  id: string;
  user_id: string;
  food_id: string;
  order_id: string | null;
  rating: number;
  comment: string | null;
  image_urls: string[];
  created_at: string;
  profile?: Profile;
}

// ---- Banners ----
export interface Banner {
  id: string;
  title: string | null;
  image_url: string;
  link_url: string | null;
  is_active: boolean;
  start_date: string | null;
  end_date: string | null;
  sort_order: number;
  created_at: string;
}

// ---- Notifications ----
export interface Notification {
  id: string;
  user_id: string;
  title: string;
  body: string | null;
  data: Record<string, unknown> | null;
  read: boolean;
  created_at: string;
}

// ---- Delivery ----
export interface DeliveryPartner {
  id: string;
  user_id: string;
  vehicle_number: string | null;
  vehicle_type: string | null;
  driving_license: string | null;
  is_available: boolean;
  current_location_lat: number | null;
  current_location_lng: number | null;
  earnings_total: number;
  created_at: string;
  profile?: Profile;
}

export interface DeliveryAssignment {
  id: string;
  order_id: string;
  delivery_partner_id: string;
  assigned_at: string;
  picked_up_at: string | null;
  delivered_at: string | null;
  delivery_otp: string | null;
  status: "assigned" | "picked_up" | "delivered";
  partner?: DeliveryPartner;
  order?: Order;
}

// ---- Table Reservation ----
export interface TableReservation {
  id: string;
  user_id: string;
  reservation_date: string;
  reservation_time: string;
  guests: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  special_request: string | null;
  created_at: string;
}

// ---- Loyalty ----
export interface LoyaltyPoints {
  id: string;
  user_id: string;
  points: number;
  updated_at: string;
}
