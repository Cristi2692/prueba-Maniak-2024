import { getItems, getTotalPrice } from "../cart.js";

function renderCartItems() {
  const cartSheetContent = document.querySelector(".cart-sheet-inner-content");
  const cartItems = getItems();
  cartSheetContent.innerHTML = `
      ${
        cartItems.length
          ? `
        <div class="cart-items">
          ${cartItems
            .map(
              (item) => `
            <div class="cart-item">
              <img src="${item.image}" alt="${item.title}">
              <div class="cart-item-details">
                <h3>${item.title}</h3>
                <p class="cart-item-price">${item.price}€</p>
                <div class="cart-item-quantity">
                  <button class="quantity-btn minus">-</button>
                  <span class="quantity">${item.quantity}</span>
                  <button class="quantity-btn plus">+</button>
                </div>
              </div>
              <button class="remove-item">&times;</button>
            </div>
          `
            )
            .join("")}
        </div>
        <div class="cart-total">
          <span>Total:</span>
          <span class="total-price">${getTotalPrice().toFixed(2)}€</span>
        </div>
        <button class="view-details-button checkout-button">
          <span>Finalizar Compra</span>
        </button>
      `
          : "<p>No hay productos en el carrito</p>"
      }
    `;
}

function createOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'cart-overlay';
  return overlay;
}

export function show() {
  const cartSheet = document.querySelector(".cart-sheet");
  const overlay = createOverlay();
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
  renderCartItems();
  cartSheet.classList.add("open");
  setTimeout(() => overlay.classList.add('active'), 50);
}

export function close() {
  const cartSheet = document.querySelector(".cart-sheet");
  const overlay = document.querySelector('.cart-overlay');
  overlay.classList.remove('active');
  document.body.style.overflow = 'auto';
  cartSheet.classList.remove("open");
  setTimeout(() => overlay.remove(), 300); // Esperamos a que termine la transición
}
