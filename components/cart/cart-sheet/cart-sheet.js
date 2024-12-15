import { getItems, getTotalPrice, updateItemQuantity, removeItem } from "../cart.js";

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
            <div class="cart-item" data-product-id="${item.id}">
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

function bindCartEvents() {
  const cartSheetContent = document.querySelector(".cart-sheet-inner-content");
  
  cartSheetContent.addEventListener("click", async (e) => {
    // Botones de cantidad
    if (e.target.classList.contains("quantity-btn")) {
      const cartItem = e.target.closest(".cart-item");
      const productId = parseInt(cartItem.dataset.productId);
      const currentQuantity = parseInt(cartItem.querySelector(".quantity").textContent);
      
      if (e.target.classList.contains("plus")) {
        updateItemQuantity(productId, currentQuantity + 1);
      } else if (e.target.classList.contains("minus")) {
        updateItemQuantity(productId, currentQuantity - 1);
      }
      renderCartItems();
    }
    
    // Botón eliminar
    if (e.target.classList.contains("remove-item")) {
      const cartItem = e.target.closest(".cart-item");
      const productId = parseInt(cartItem.dataset.productId);
      
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "¿Quieres eliminar este producto del carrito?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#eb5e4d',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
        removeItem(productId);
        renderCartItems();
        Swal.fire(
          '¡Eliminado!',
          'El producto ha sido eliminado del carrito.',
          'success'
        );
      }
    }
    
    // Botón finalizar compra
    if (e.target.closest(".checkout-button")) {
      const items = getItems();
      if (items.length === 0) {
        Swal.fire({
          icon: 'error',
          title: 'Carrito vacío',
          text: 'Añade productos al carrito antes de finalizar la compra'
        });
        return;
      }

      const result = await Swal.fire({
        title: '¿Finalizar compra?',
        text: `Total a pagar: ${getTotalPrice().toFixed(2)}€`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#eb5e4d',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, comprar',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
        // Aquí iría la lógica de procesamiento de pago
        await Swal.fire({
          icon: 'success',
          title: '¡Compra realizada!',
          text: 'Gracias por tu compra',
          confirmButtonColor: '#eb5e4d'
        });
        // Limpiar carrito después de la compra
        localStorage.clear();
        // Actualizar el contador del carrito
        updateCartCountDisplay(0);
        close();
        renderCartItems();
      }
    }
  });
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
  bindCartEvents();
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

// Añadir esta función para actualizar el contador
function updateCartCountDisplay(count) {
  const cartCount = document.querySelector(".cart-count");
  cartCount.textContent = count;
}
