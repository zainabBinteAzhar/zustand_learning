import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Type definition for a single cart item.
 */
export type CartItem = {
    id: string;
    title: string;
    image: any;
    price: number;
    quantity: number;
    options?: Record<string, string>; // e.g., { color: 'Red', size: 'M' }
};

/**
 * Type definition for the cart store's state and actions.
 */
type CartStore = {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    increaseQuantity: (item: CartItem) => void;
    decreaseQuantity: (item: CartItem) => void;
    removeItem: (item: CartItem) => void;
    clearCart: () => void;
};

/**
 * Zustand store for managing cart state with persistence.
 * Uses AsyncStorage[react natiev localStorage(web)] to keep data even after app reloads.
 */
export const useCartStore = create<CartStore>()(

    // Wrap the store with `persist` middleware to save and rehydrate state.
    // Uses persist middleware to save data across app reloads
    persist(

        /**
         * Store logic: state + actions
         */
        (set, get) => ({

            // Initial state: cart starts empty
            items: [],

            // Add a new item to the cart
            addItem: (item) => {
                // logic to add item or update quantity if it already exists
            },

            // Increase quantity of a specific item
            increaseQuantity: (item) => {
                // logic to increase quantity
            },

            // Decrease quantity of a specific item
            decreaseQuantity: (item) => {
                // logic to decrease or remove item if quantity hits 0
            },

            // Remove an item completely from the cart
            removeItem: (item) => {
                // logic to remove item
            },

            // Clear the entire cart
            clearCart: () => set({ items: [] }),
        }),

        /**
         * Configuration for the `persist` middleware
         */
        {
            name: 'cart-storage', // Key under which cart data is stored
            storage: createJSONStorage(() => AsyncStorage), // Use AsyncStorage in React Native (place where data will stay stored for an app reload)
        }
    )
);
