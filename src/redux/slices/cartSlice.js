import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
        const isItemExists = state.items.some(item => item.prodID === action.payload.prodID);
        if (!isItemExists) {
          state.items.push(action.payload);
        } else {
            alert('Item already added in the cart')
        }
    },
    removeItem: (state, action) => {
        const index = state.items.findIndex((item) => item.prodID === action.payload.prodID);
        if (index !== -1) {
          state.items.splice(index, 1);
        }
    },
    updateItemCount: (state, action) => {
        const { id, updateType } = action.payload;
        const item = state.items.find((item) => item.prodID === id);
        if (item) {
          if (updateType === 'increase' && item.count < item.quantity) {
            item.count += 1;
            item.amount += item.price;
          } else if (updateType === 'decrease' && item.count > 1) {
            item.count -= 1;
            item.amount -= item.price;
          } else {
            alert('Reached quantity limit');
          }
        }
    },
    clearCart: (state) => {
        state.items.length = 0
    }
  },
});

export const {addItem, removeItem, clearCart,updateItemCount} = cartSlice.actions;
export default cartSlice.reducer;