import { show as showProductModal } from "../product-list-item-modal/product-list-item-modal.js";
import { init as initAddToCartButton } from "../add-to-cart-button/add-to-cart-button.js";
import { init as initViewDetailsButton } from "../view-details-button/view-details-button.js";

export function init(product) {
  return renderProductListItem(product);
}

/**
 * Crear un elemento HTML de producto con listeners adjuntos.
 * @param {Object} product - El objeto del producto.
 * @returns {HTMLElement} - El elemento de producto con listeners.
 */
export function renderProductListItem(product) {
  const productElement = document.createElement("div");
  productElement.className = "product";

  // usar template literals para crear el elemento HTML
  const template = `
    <img src="${product.image}" alt="${product.title}" />
    <h3 class="product-title">${product.title}</h3>
    <p class="category">${product.category}</p>
    <p class="price">${product.price}€</p>
    `;

  productElement.innerHTML = template;

  productElement.appendChild(
    initViewDetailsButton(() => showProductModal(product))
  );
  productElement.appendChild(initAddToCartButton(product));

  return productElement;
}
