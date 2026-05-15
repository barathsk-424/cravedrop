import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Food, Category, Banner, Address, Profile, Order } from "@/types";
import { demoBanners, demoCategories, demoFoods } from "@/lib/demo-data";

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("categories")
          .select("*")
          .order("sort_order", { ascending: true });

        if (error || !data || data.length === 0) return demoCategories;
        return data as Category[];
      } catch (err) {
        return demoCategories;
      }
    },
  });
}

export function useFoods(categoryId?: string | null) {
  return useQuery<Food[]>({
    queryKey: ["foods", categoryId],
    queryFn: async () => {
      try {
        let query = supabase
          .from("foods")
          .select(`
            *,
            images:food_images(*),
            category:categories(*)
          `)
          .eq("is_available", true);

        if (categoryId) {
          query = query.eq("category_id", categoryId);
        }

        const { data, error } = await query;

        if (error || !data || data.length === 0) {
          if (categoryId) {
            return demoFoods.filter(f => f.category_id === categoryId);
          }
          return demoFoods;
        }
        return data as Food[];
      } catch (err) {
        return categoryId ? demoFoods.filter(f => f.category_id === categoryId) : demoFoods;
      }
    },
  });
}

export function useBanners() {
  return useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("banners")
          .select("*")
          .eq("is_active", true)
          .order("sort_order", { ascending: true });

        if (error || !data || data.length === 0) return demoBanners;
        return data as Banner[];
      } catch (err) {
        return demoBanners;
      }
    },
  });
}

export function useOrders() {
  return useQuery<any[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          items:order_items(
            *,
            food:foods(
              *,
              images:food_images(*)
            )
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}

export function useAddresses() {
  return useQuery<any[]>({
    queryKey: ["addresses"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from("addresses")
        .select("*")
        .eq("user_id", user.id)
        .order("is_default", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}

export function useProfile() {
  return useQuery<any>({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      return data;
    },
  });
}

export function useAdminStats() {
  return useQuery<any>({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const { data: ordersData, error: ordersError } = await supabase
        .from("orders")
        .select("total_amount, status");
      const orders = ordersData as any[];
      
      if (ordersError) throw ordersError;

      const totalRevenue = (orders || [])
        .filter(o => o.status !== 'cancelled')
        .reduce((sum, o) => sum + (o.total_amount || 0), 0);

      const activeOrders = (orders || [])
        .filter(o => ['pending', 'confirmed', 'preparing', 'out_for_delivery'].includes(o.status || ''))
        .length;

      const { count: customerCount, error: userError } = await supabase
        .from("profiles")
        .select("*", { count: 'exact', head: true });

      if (userError) throw userError;

      const avgOrderValue = orders && orders.length > 0 ? totalRevenue / orders.length : 0;

      return {
        totalRevenue,
        activeOrders,
        totalCustomers: customerCount || 0,
        avgOrderValue
      };
    },
  });
}

export function useRecentOrders(limit = 10) {
  return useQuery<any[]>({
    queryKey: ["recent-orders", limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          profile:profiles(full_name),
          items:order_items(*)
        `)
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data;
    },
  });
}
