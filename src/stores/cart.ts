import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Food, SelectedAddon } from "@/types";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;

  // Actions
  addItem: (food: Food, quantity: number, addons: SelectedAddon[], instructions?: string) => void;
  removeItem: (foodId: string) => void;
  updateQuantity: (foodId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;

  // Computed
  totalItems: () => number;
  subtotal: () => number;
}

function calculateItemTotal(food: Food, quantity: number, addons: SelectedAddon[]): number {
  const basePrice = food.discount_price ?? food.price;
  const addonsTotal = addons.reduce((sum, a) => sum + a.option.price, 0);
  return (basePrice + addonsTotal) * quantity;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (food, quantity, addons, instructions) => {
        const items = [...get().items];
        const existingIndex = items.findIndex((i) => i.food.id === food.id);

        if (existingIndex > -1) {
          items[existingIndex].quantity += quantity;
          items[existingIndex].itemTotal = calculateItemTotal(
            food,
            items[existingIndex].quantity,
            items[existingIndex].selectedAddons
          );
        } else {
          items.push({
            food,
            quantity,
            selectedAddons: addons,
            specialInstructions: instructions,
            itemTotal: calculateItemTotal(food, quantity, addons),
          });
        }

        set({ items, isOpen: true });
      },

      removeItem: (foodId) => {
        set({ items: get().items.filter((i) => i.food.id !== foodId) });
      },

      updateQuantity: (foodId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(foodId);
          return;
        }
        const items = get().items.map((item) =>
          item.food.id === foodId
            ? {
                ...item,
                quantity,
                itemTotal: calculateItemTotal(item.food, quantity, item.selectedAddons),
              }
            : item
        );
        set({ items });
      },

      clearCart: () => set({ items: [], isOpen: false }),
      toggleCart: () => set({ isOpen: !get().isOpen }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: () => get().items.reduce((sum, i) => sum + i.itemTotal, 0),
    }),
    {
      name: "flavour-haven-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
