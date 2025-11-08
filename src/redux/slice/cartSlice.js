import { createSelector, createSlice } from "@reduxjs/toolkit";

const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("cartItems");
    if (serializedState === null) {
      return [];
    }
    const items = JSON.parse(serializedState);
    if (!Array.isArray(items)) {
      throw new Error("Invalid item format in localStorage");
    }
    // Verinin doğru formatta olduğunu doğruladık, bu nedenle bu adımda doğrudan dönebiliriz
    return items;
  } catch (err) {
    // Hata oluştuğunda, konsola hata mesajını yazdırarak ve boş bir dizi döndürerek hatayı ele alıyoruz
    console.error("Error loading state from localStorage:", err);
    return [];
  }
};

const calculateTotal = (items) => {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

// Функция для подсчета общего количества товаров в корзине
const calculateTotalItems = (items) => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadStateFromLocalStorage(),
    subtotal: calculateTotal(loadStateFromLocalStorage()),
    total: calculateTotal(loadStateFromLocalStorage()),
    itemCount: calculateTotalItems(loadStateFromLocalStorage()),
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = {
        ...action.payload,
        quantity: action.payload.quantity || 1,
      };
      state.items.push(newItem); // Always add new item
      state.subtotal = calculateTotal(state.items);
      state.total = state.subtotal;
      state.itemCount = calculateTotalItems(state.items);
      saveStateToLocalStorage(state.items);
    },
    increaseQuantity: (state, action) => {
      const { id, size } = action.payload;
      const item = state.items.find(
        (item) => item.id === id && item.size === size
      );
      if (item) {
        item.quantity += 1;
        state.subtotal = calculateTotal(state.items);
        state.total = state.subtotal;
        state.itemCount = calculateTotalItems(state.items); // Пересчитываем общее количество товаров
        saveStateToLocalStorage(state.items);
      }
    },
    // Уменьшение количества товара
    decreaseQuantity: (state, action) => {
      const { id, size } = action.payload;
      const item = state.items.find(
        (item) => item.id === id && item.size === size
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.subtotal = calculateTotal(state.items);
        state.total = state.subtotal;
        state.itemCount = calculateTotalItems(state.items); // Пересчитываем общее количество товаров
        saveStateToLocalStorage(state.items);
      }
    },
    // Удаление товара
    removeItem: (state, action) => {
      const { id, size } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.id === id && item.size === size)
      );
      state.subtotal = calculateTotal(state.items);
      state.total = state.subtotal;
      state.itemCount = calculateTotalItems(state.items); // Пересчитываем общее количество товаров
      saveStateToLocalStorage(state.items);
    },
    // Очистка корзины
    clearCart: (state) => {
      state.items = [];
      state.subtotal = 0;
      state.total = 0;
      state.itemCount = 0; // Обнуляем общее количество товаров
      localStorage.removeItem("cartItems");
    },
    updateCartItemQuantity: (state, action) => {
      const { id, size, quantity } = action.payload;
      const item = state.items.find(
        (item) => item.id === id && item.size === size
      );
      if (item) {
        item.quantity = quantity;
        state.subtotal = calculateTotal(state.items);
        state.total = state.subtotal;
        state.itemCount = calculateTotalItems(state.items);
        saveStateToLocalStorage(state.items);
      }
    },
  },
});

const saveStateToLocalStorage = (items) => {
  try {
    // Преобразуем данные в строку и сохраняем их в LocalStorage
    const serializedState = JSON.stringify(items);
    localStorage.setItem("cartItems", serializedState);
  } catch (err) {
    // Если произошла ошибка при сохранении данных, выводим её в консоль
    console.error("Ошибка сохранения состояния в localStorage:", err);
  }
};

// // Memoized selector for cart items
// export const selectCartItems = createSelector(
//   [(state) => state.cart.items],
//   (items) => items
// );

export const selectCartItems = (state) => state.cart.items;

export const {
  addItem,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  clearCart,
  updateCartItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
