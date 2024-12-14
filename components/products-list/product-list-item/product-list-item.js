import { show as showProductModal } from "../product-list-item-modal/product-list-item-modal.js";
import { init as initAddToCartButton } from "../add-to-cart-button/add-to-cart-button.js";
import { init as initViewDetailsButton } from "../view-details-button/view-details-button.js";

export function init(product) {
  return renderProductListItem(product);
}

/**
 * Create a product HTML element with attached event listeners.
 * @param {Object} product - The product object.
 * @returns {HTMLElement} - The product element with listeners.
 */
export function renderProductListItem(product) {
  const productElement = document.createElement("div");
  productElement.className = "product";

  // Use template literals for better readability
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
