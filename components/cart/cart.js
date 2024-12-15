import StorageService from "../../services/storage-service.js";
import createCartItem from "./cart-item/cart-item.js";
import {
  show as showCartSheet,
  close as closeCartSheet,
} from "./cart-sheet/cart-sheet.js";

// Storage functions
function getStorage() {
  return StorageService;
}

function loadItemsFromStorage() {
  const storage = getStorage();
  const storedItems = storage.get();
  return storedItems.map((item) =>
    createCartItem(
      {
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
      },
      item.quantity
    )
  );
}

function saveItems(items) {
  const storage = getStorage();
  storage.save(items);
}

// Event listeners
function initCartIconListener() {
  const cartIcon = document.querySelector(".cart-icon");
  cartIcon.addEventListener("click", () => showCartSheet());
  return cartIcon;
}

function initCloseButtonListener() {
  const closeCartButton = document.getElementById("close-cart");
  closeCartButton.addEventListener("click", () => closeCartSheet());
}

function initCartSheetListener() {
  const cartSheet = document.getElementById("cart-sheet");
  cartSheet.addEventListener("click", (event) => {
    event.stopPropagation();
  });
}

function addCartIconToHeader(cartIcon) {
  const headerRight = document.querySelector(".header-right");
  headerRight.appendChild(cartIcon);
}

function addListeners() {
  const cartIcon = initCartIconListener();
  initCloseButtonListener();
  initCartSheetListener();
  addCartIconToHeader(cartIcon);
}

// Cart item management
function findItemById(items, productId) {
  return items.find((item) => item.id === productId);
}

function addItemToCart(items, product) {
  const existingItem = findItemById(items, product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    items.push(createCartItem(product));
  }

  saveItems(items);
}

function removeItemFromCart(items, productId) {
  return items.filter((item) => item.id !== productId);
}

function updateCartCountDisplay(totalItems) {
  const cartCount = document.querySelector(".cart-count");
  cartCount.textContent = totalItems;
}

// Cart calculations
function calculateTotalItems(items) {
  return items.reduce((total, item) => total + item.quantity, 0);
}

function calculateTotalPrice(items) {
  return items.reduce((total, item) => total + item.getTotalPrice(), 0);
}

// Public API
export function init() {
  addListeners();
  updateCartCountDisplay(calculateTotalItems(getItems()));
}

export function getItems() {
  return loadItemsFromStorage();
}

export function addItem(product) {
  const items = getItems();
  addItemToCart(items, product);
  updateCartCountDisplay(calculateTotalItems(items));
}

export function getTotalPrice() {
  const items = getItems();
  return calculateTotalPrice(items);
}

export function updateItemQuantity(productId, newQuantity) {
  let items = getItems();
  items = items.map(item => {
    if (item.id === productId) {
      return { ...item, quantity: Math.max(1, newQuantity) };
    }
    return item;
  });
  saveItems(items);
  updateCartCountDisplay(calculateTotalItems(items));
}

export function removeItem(productId) {
  let items = getItems();
  items = items.filter(item => item.id !== productId);
  saveItems(items);
  updateCartCountDisplay(calculateTotalItems(items));
}
