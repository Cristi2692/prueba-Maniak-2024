import { addItem as addItemToCart } from "../../cart/cart.js";
import { getCurrentProduct } from "../product-list-item-modal/product-list-item-modal.js";

export function init(product) {
  const button = renderButton();
  if (product) {
    addEventListeners(button, product);
  } else {
    addEventListeners(button, null, getCurrentProduct);
  }
  return button;
}

function renderButton() {
  const button = document.createElement("button");
  button.className = "cart-button";
  button.innerHTML = `
        <span class="add-to-cart">Añadir al carrito</span>
        <span class="added">Añadido</span>
        <i class="fa fa-shopping-cart"></i>
        <i class="fa fa-square"></i>
    `;
  return button;
}

function animateButton(button) {
  button.classList.add("clicked");
  setTimeout(() => {
    button.classList.remove("clicked");
  }, 3000);
}

function addEventListeners(button, product, getCurrentProduct) {
  // Add to cart from modal
  button.addEventListener("click", () => {
    let productToAdd = product;
    if (!productToAdd && getCurrentProduct) {
      productToAdd = getCurrentProduct();
    }

    if (productToAdd) {
      addItemToCart(productToAdd);
      animateButton(button);
    }
  });
}
