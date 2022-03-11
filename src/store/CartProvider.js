import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updateTotalAmount =
      state.totalAmount + action.item.amount * action.item.price;

    const checkCartItemIndex = state.items.findIndex(
      (i) => i.id === action.item.id
    );
    const presentCartItem = state.items[checkCartItemIndex];
    let updateItems;

    if (presentCartItem) {
      const updateItem = {
        ...presentCartItem,
        amount: presentCartItem.amount + action.item.amount,
      };

      updateItems = [...state.items];
      updateItems[checkCartItemIndex] = updateItem;
    } else {
      updateItems = state.items.concat(action.item);
    }

    localStorage.setItem("cart", JSON.stringify(updateItems));
    return {
      items: updateItems,
      totalAmount: updateTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const checkCartItemIndex = state.items.findIndex((i) => i.id === action.id);
    const presentCartItem = state.items[checkCartItemIndex];
    const updateTotalAmount =
      state.totalAmount - presentCartItem.amount * presentCartItem.price;
    const updateItems = state.items.filter((item) => item.id !== action.id);

    localStorage.setItem("cart", JSON.stringify(updateItems));
    return {
      items: updateItems,
      totalAmount: updateTotalAmount,
    };
  }
  if (action.type === "SUB") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    localStorage.setItem("cart", JSON.stringify(updatedItems));
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "CLEAR") {
    localStorage.setItem("cart", JSON.stringify(defaultCartState.items));
    return defaultCartState;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (item) => {
    dispatchCartAction({
      type: "ADD",
      item: item,
    });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({
      type: "REMOVE",
      id: id,
    });
  };

  const clearCartHandler = () => {
    dispatchCartAction({
      type: "CLEAR",
    });
  };

  const subItemFromCartHandler = (id) => {
    dispatchCartAction({
      type: "SUB",
      id: id,
    });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    subItem: subItemFromCartHandler,
    clearCart: clearCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
