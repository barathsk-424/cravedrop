import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const getSupabase = () => createClient<Database>(supabaseUrl, supabaseKey);
import type { Category, Food, Banner } from '@/types';

export async function getBanners() {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('banners')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching banners:', error);
    return [];
  }

  return data as Banner[];
}

export async function getCategories() {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return data as Category[];
}

export async function getFeaturedFoods() {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('foods')
    .select(`
      *,
      images:food_images(*)
    `)
    .eq('is_available', true)
    .limit(10);

  if (error) {
    console.error('Error fetching featured foods:', error);
    return [];
  }

  return data as unknown as Food[];
}

export async function getFoodByCategory(categoryId: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('foods')
    .select(`
      *,
      images:food_images(*)
    `)
    .eq('category_id', categoryId)
    .eq('is_available', true);

  if (error) {
    console.error('Error fetching foods by category:', error);
    return [];
  }

  return data as unknown as Food[];
}
