import { createSlice } from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist";

const recalcTotals = (state) => {
  const summary = state.products.reduce(
    (acc, item) => {
      const price = Number(item.price) || 0;
      acc.quantity += item.quantity;
      acc.total += price * item.quantity;
      return acc;
    },
    { quantity: 0, total: 0 }
  );
  state.quantity = summary.quantity;
  state.total = summary.total;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const incoming = action.payload;
      const existingIndex = state.products.findIndex(
        (item) =>
          item._id === incoming._id &&
          item.color === incoming.color &&
          item.size === incoming.size
      );

      if (existingIndex !== -1) {
        state.products[existingIndex].quantity += incoming.quantity;
      } else {
        state.products.push({ ...incoming });
      }

      recalcTotals(state);
    },
    updateQuantity: (state, action) => {
      const { id, color, size, type } = action.payload;
      const item = state.products.find(
        (product) =>
          product._id === id &&
          product.color === color &&
          product.size === size
      );

      if (!item) return;

      if (type === "inc") {
        item.quantity += 1;
      } else if (type === "dec" && item.quantity > 1) {
        item.quantity -= 1;
      } else if (type === "dec" && item.quantity === 1) {
        state.products = state.products.filter(
          (product) =>
            !(
              product._id === id &&
              product.color === color &&
              product.size === size
            )
        );
      }

      recalcTotals(state);
    },
    removeProduct: (state, action) => {
      const { id, color, size } = action.payload;
      state.products = state.products.filter(
        (product) =>
          !(
            product._id === id &&
            product.color === color &&
            product.size === size
          )
      );
      recalcTotals(state);
    },
    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(REHYDRATE, (state, action) => {
      const incoming = action.payload?.cart;
      if (incoming) {
        state.products = incoming.products || [];
        recalcTotals(state);
      }
    });
  },
});

export const { addProduct, updateQuantity, removeProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
