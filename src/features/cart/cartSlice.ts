import {
  createSlice,
} from "@reduxjs/toolkit";

import type {
  PayloadAction,
} from "@reduxjs/toolkit";
import type {
  Product,
  CartItem,
} from "../../types";

import type {
  RootState,
} from "../../app/store";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    addToCart: (
      state,
      action: PayloadAction<Product>
    ) => {
      const item =
        state.items.find(
          (i) =>
            i.id ===
            action.payload.id
        );

      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },

    removeFromCart: (
      state,
      action: PayloadAction<number>
    ) => {
      state.items =
        state.items.filter(
          (item) =>
            item.id !==
            action.payload
        );
    },

    updateQuantity: (
      state,
      action: PayloadAction<{
        id: number;
        quantity: number;
      }>
    ) => {
      const item =
        state.items.find(
          (i) =>
            i.id ===
            action.payload.id
        );

      if (item) {
        item.quantity =
          action.payload.quantity;
      }
    },

    clearCart: (
      state
    ) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export const selectTotalQuantity =
  (
    state: RootState
  ) =>
    state.cart.items.reduce(
      (
        total,
        item
      ) =>
        total +
        item.quantity,
      0
    );

export const selectTotalPrice =
  (
    state: RootState
  ) =>
    state.cart.items.reduce(
      (
        total,
        item
      ) =>
        total +
        item.price *
          item.quantity,
      0
    );

export default cartSlice.reducer;