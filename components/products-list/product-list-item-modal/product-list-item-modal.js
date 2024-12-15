import { init as initAddToCartButton } from "../add-to-cart-button/add-to-cart-button.js";

let modal = null;
let currentProduct = null;
let modalImage = null;
let modalTitle = null;
let modalDescription = null;
let modalPrice = null;
let closeButton = null;

export function init() {
  return createModal();
}

function createModal() {
  modal = document.createElement("div");
  modal.id = "product-modal";
  modal.className = "modal hidden";

  modal.innerHTML = `
    <div class="modal-content">
      <button class="close">&times;</button>
      <div class="image-container">
        <img id="modal-image" src="" alt="Product image">
      </div>
      <h3 id="modal-title"></h3>
      <p id="modal-description"></p>
      <p id="modal-price"></p>
    </div>
  `;

  const cartButton = initAddToCartButton();
  modal.querySelector(".modal-content").appendChild(cartButton);

  document.body.appendChild(modal);

  // Save references to modal elements
  modalImage = modal.querySelector("#modal-image");
  modalTitle = modal.querySelector("#modal-title");
  modalDescription = modal.querySelector("#modal-description");
  modalPrice = modal.querySelector("#modal-price");
  closeButton = modal.querySelector(".close");

  bindEvents();

  return modal;
}

export function getCurrentProduct() {
  return currentProduct;
}

export function show(product) {
  currentProduct = product;
  modalImage.src = product.image;
  modalTitle.textContent = product.title;
  modalDescription.textContent = product.description;
  modalPrice.textContent = `${product.price}€`;
  modal.classList.remove("hidden");
}

function hide() {
  modal.classList.add("hidden");
  currentProduct = null;
}

function bindEvents() {
  // Close modal with X button
  closeButton.addEventListener("click", () => hide());

  // Close modal clicking outside
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      hide();
    }
  });
}

export default {
  init,
  show,
  hide,
};
