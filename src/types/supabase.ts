export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      addon_groups: {
        Row: {
          food_id: string
          id: string
          max_selections: number | null
          multi_select: boolean | null
          name: string
          required: boolean | null
        }
        Insert: {
          food_id: string
          id?: string
          max_selections?: number | null
          multi_select?: boolean | null
          name: string
          required?: boolean | null
        }
        Update: {
          food_id?: string
          id?: string
          max_selections?: number | null
          multi_select?: boolean | null
          name?: string
          required?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "addon_groups_food_id_fkey"
            columns: ["food_id"]
            isOneToOne: false
            referencedRelation: "foods"
            referencedColumns: ["id"]
          },
        ]
      }
      addon_options: {
        Row: {
          group_id: string
          id: string
          name: string
          price: number | null
        }
        Insert: {
          group_id: string
          id?: string
          name: string
          price?: number | null
        }
        Update: {
          group_id?: string
          id?: string
          name?: string
          price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "addon_options_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "addon_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      addresses: {
        Row: {
          address_line1: string
          address_line2: string | null
          city: string
          created_at: string | null
          id: string
          is_default: boolean | null
          label: string | null
          lat: number | null
          lng: number | null
          pincode: string
          state: string
          user_id: string
        }
        Insert: {
          address_line1: string
          address_line2?: string | null
          city: string
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          label?: string | null
          lat?: number | null
          lng?: number | null
          pincode: string
          state: string
          user_id: string
        }
        Update: {
          address_line1?: string
          address_line2?: string | null
          city?: string
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          label?: string | null
          lat?: number | null
          lng?: number | null
          pincode?: string
          state?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "addresses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      banners: {
        Row: {
          created_at: string | null
          end_date: string | null
          id: string
          image_url: string
          is_active: boolean | null
          link_url: string | null
          sort_order: number | null
          start_date: string | null
          title: string | null
        }
        Insert: {
          created_at?: string | null
          end_date?: string | null
          id?: string
          image_url: string
          is_active?: boolean | null
          link_url?: string | null
          sort_order?: number | null
          start_date?: string | null
          title?: string | null
        }
        Update: {
          created_at?: string | null
          end_date?: string | null
          id?: string
          image_url?: string
          is_active?: boolean | null
          link_url?: string | null
          sort_order?: number | null
          start_date?: string | null
          title?: string | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string | null
          id: string
          image_url: string | null
          name: string
          slug: string
          sort_order: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          image_url?: string | null
          name: string
          slug: string
          sort_order?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          image_url?: string | null
          name?: string
          slug?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      coupon_usage: {
        Row: {
          coupon_id: string
          id: string
          order_id: string | null
          used_at: string | null
          user_id: string
        }
        Insert: {
          coupon_id: string
          id?: string
          order_id?: string | null
          used_at?: string | null
          user_id: string
        }
        Update: {
          coupon_id?: string
          id?: string
          order_id?: string | null
          used_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "coupon_usage_coupon_id_fkey"
            columns: ["coupon_id"]
            isOneToOne: false
            referencedRelation: "coupons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coupon_usage_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coupon_usage_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      coupons: {
        Row: {
          code: string
          created_at: string | null
          description: string | null
          discount_type: string
          discount_value: number
          end_date: string | null
          id: string
          is_active: boolean | null
          max_discount: number | null
          min_order_value: number | null
          start_date: string | null
          usage_limit: number | null
          used_count: number | null
        }
        Insert: {
          code: string
          created_at?: string | null
          description?: string | null
          discount_type: string
          discount_value: number
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          max_discount?: number | null
          min_order_value?: number | null
          start_date?: string | null
          usage_limit?: number | null
          used_count?: number | null
        }
        Update: {
          code?: string
          created_at?: string | null
          description?: string | null
          discount_type?: string
          discount_value?: number
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          max_discount?: number | null
          min_order_value?: number | null
          start_date?: string | null
          usage_limit?: number | null
          used_count?: number | null
        }
        Relationships: []
      }
      delivery_assignments: {
        Row: {
          assigned_at: string | null
          delivered_at: string | null
          delivery_otp: string | null
          delivery_partner_id: string
          id: string
          order_id: string
          picked_up_at: string | null
          status: string | null
        }
        Insert: {
          assigned_at?: string | null
          delivered_at?: string | null
          delivery_otp?: string | null
          delivery_partner_id: string
          id?: string
          order_id: string
          picked_up_at?: string | null
          status?: string | null
        }
        Update: {
          assigned_at?: string | null
          delivered_at?: string | null
          delivery_otp?: string | null
          delivery_partner_id?: string
          id?: string
          order_id?: string
          picked_up_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "delivery_assignments_delivery_partner_id_fkey"
            columns: ["delivery_partner_id"]
            isOneToOne: false
            referencedRelation: "delivery_partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "delivery_assignments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: true
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      delivery_partners: {
        Row: {
          created_at: string | null
          current_location_lat: number | null
          current_location_lng: number | null
          driving_license: string | null
          earnings_total: number | null
          id: string
          is_available: boolean | null
          user_id: string
          vehicle_number: string | null
          vehicle_type: string | null
        }
        Insert: {
          created_at?: string | null
          current_location_lat?: number | null
          current_location_lng?: number | null
          driving_license?: string | null
          earnings_total?: number | null
          id?: string
          is_available?: boolean | null
          user_id: string
          vehicle_number?: string | null
          vehicle_type?: string | null
        }
        Update: {
          created_at?: string | null
          current_location_lat?: number | null
          current_location_lng?: number | null
          driving_license?: string | null
          earnings_total?: number | null
          id?: string
          is_available?: boolean | null
          user_id?: string
          vehicle_number?: string | null
          vehicle_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "delivery_partners_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      food_images: {
        Row: {
          food_id: string
          id: string
          image_url: string
          is_primary: boolean | null
          sort_order: number | null
        }
        Insert: {
          food_id: string
          id?: string
          image_url: string
          is_primary?: boolean | null
          sort_order?: number | null
        }
        Update: {
          food_id?: string
          id?: string
          image_url?: string
          is_primary?: boolean | null
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "food_images_food_id_fkey"
            columns: ["food_id"]
            isOneToOne: false
            referencedRelation: "foods"
            referencedColumns: ["id"]
          },
        ]
      }
      foods: {
        Row: {
          category_id: string | null
          created_at: string | null
          description: string | null
          discount_price: number | null
          id: string
          is_available: boolean | null
          is_veg: boolean | null
          name: string
          preparation_time: string | null
          price: number
          rating_avg: number | null
          rating_count: number | null
          stock_quantity: number | null
          updated_at: string | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          discount_price?: number | null
          id?: string
          is_available?: boolean | null
          is_veg?: boolean | null
          name: string
          preparation_time?: string | null
          price: number
          rating_avg?: number | null
          rating_count?: number | null
          stock_quantity?: number | null
          updated_at?: string | null
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          discount_price?: number | null
          id?: string
          is_available?: boolean | null
          is_veg?: boolean | null
          name?: string
          preparation_time?: string | null
          price?: number
          rating_avg?: number | null
          rating_count?: number | null
          stock_quantity?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "foods_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory: {
        Row: {
          id: string
          ingredient_name: string
          low_stock_threshold: number | null
          quantity: number | null
          unit: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          ingredient_name: string
          low_stock_threshold?: number | null
          quantity?: number | null
          unit?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          ingredient_name?: string
          low_stock_threshold?: number | null
          quantity?: number | null
          unit?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      loyalty_points: {
        Row: {
          id: string
          points: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          id?: string
          points?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          id?: string
          points?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "loyalty_points_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string | null
          data: Json | null
          id: string
          read: boolean | null
          title: string
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string | null
          data?: Json | null
          id?: string
          read?: boolean | null
          title: string
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string | null
          data?: Json | null
          id?: string
          read?: boolean | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      order_item_addons: {
        Row: {
          addon_option_id: string | null
          id: string
          name: string
          order_item_id: string
          price: number | null
        }
        Insert: {
          addon_option_id?: string | null
          id?: string
          name: string
          order_item_id: string
          price?: number | null
        }
        Update: {
          addon_option_id?: string | null
          id?: string
          name?: string
          order_item_id?: string
          price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "order_item_addons_addon_option_id_fkey"
            columns: ["addon_option_id"]
            isOneToOne: false
            referencedRelation: "addon_options"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_item_addons_order_item_id_fkey"
            columns: ["order_item_id"]
            isOneToOne: false
            referencedRelation: "order_items"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          food_id: string | null
          food_name: string
          id: string
          order_id: string
          quantity: number
          special_instructions: string | null
          total_price: number
          unit_price: number
        }
        Insert: {
          food_id?: string | null
          food_name: string
          id?: string
          order_id: string
          quantity?: number
          special_instructions?: string | null
          total_price: number
          unit_price: number
        }
        Update: {
          food_id?: string | null
          food_name?: string
          id?: string
          order_id?: string
          quantity?: number
          special_instructions?: string | null
          total_price?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_food_id_fkey"
            columns: ["food_id"]
            isOneToOne: false
            referencedRelation: "foods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          actual_delivery_time: string | null
          address_id: string | null
          coupon_code: string | null
          created_at: string | null
          delivery_charge: number | null
          discount: number | null
          estimated_delivery_time: string | null
          gst_amount: number | null
          id: string
          notes: string | null
          order_type: string | null
          payment_method: string | null
          payment_status: string | null
          razorpay_order_id: string | null
          razorpay_payment_id: string | null
          status: string | null
          subtotal: number | null
          table_number: string | null
          tip: number | null
          total_amount: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          actual_delivery_time?: string | null
          address_id?: string | null
          coupon_code?: string | null
          created_at?: string | null
          delivery_charge?: number | null
          discount?: number | null
          estimated_delivery_time?: string | null
          gst_amount?: number | null
          id?: string
          notes?: string | null
          order_type?: string | null
          payment_method?: string | null
          payment_status?: string | null
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          status?: string | null
          subtotal?: number | null
          table_number?: string | null
          tip?: number | null
          total_amount: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          actual_delivery_time?: string | null
          address_id?: string | null
          coupon_code?: string | null
          created_at?: string | null
          delivery_charge?: number | null
          discount?: number | null
          estimated_delivery_time?: string | null
          gst_amount?: number | null
          id?: string
          notes?: string | null
          order_type?: string | null
          payment_method?: string | null
          payment_status?: string | null
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          status?: string | null
          subtotal?: number | null
          table_number?: string | null
          tip?: number | null
          total_amount?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_address_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          phone: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          food_id: string
          id: string
          image_urls: string[] | null
          order_id: string | null
          rating: number | null
          user_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          food_id: string
          id?: string
          image_urls?: string[] | null
          order_id?: string | null
          rating?: number | null
          user_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          food_id?: string
          id?: string
          image_urls?: string[] | null
          order_id?: string | null
          rating?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_food_id_fkey"
            columns: ["food_id"]
            isOneToOne: false
            referencedRelation: "foods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_plans: {
        Row: {
          description: string | null
          duration_days: number | null
          id: string
          is_active: boolean | null
          meals_per_day: number | null
          name: string
          price: number
        }
        Insert: {
          description?: string | null
          duration_days?: number | null
          id?: string
          is_active?: boolean | null
          meals_per_day?: number | null
          name: string
          price: number
        }
        Update: {
          description?: string | null
          duration_days?: number | null
          id?: string
          is_active?: boolean | null
          meals_per_day?: number | null
          name?: string
          price?: number
        }
        Relationships: []
      }
      table_reservations: {
        Row: {
          created_at: string | null
          guests: number
          id: string
          reservation_date: string
          reservation_time: string
          special_request: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          guests: number
          id?: string
          reservation_date: string
          reservation_time: string
          special_request?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          guests?: number
          id?: string
          reservation_date?: string
          reservation_time?: string
          special_request?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "table_reservations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_subscriptions: {
        Row: {
          auto_renew: boolean | null
          end_date: string | null
          id: string
          plan_id: string | null
          start_date: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          auto_renew?: boolean | null
          end_date?: string | null
          id?: string
          plan_id?: string | null
          start_date?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          auto_renew?: boolean | null
          end_date?: string | null
          id?: string
          plan_id?: string | null
          start_date?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
