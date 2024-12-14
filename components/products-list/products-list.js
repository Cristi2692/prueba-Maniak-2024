import { fetchProducts } from "../../services/products-service.js";
import { init as initProductListItem } from "./product-list-item/product-list-item.js";
import { init as initProductListItemModal } from "./product-list-item-modal/product-list-item-modal.js";

let categories = [];
let products = [];
const productList = document.getElementById("product-list");
const categoryFilter = document.getElementById("category-filter");
const searchInput = document.getElementById("search");

export async function init() {
  products = (await fetchProducts()) ?? [];
  extractAndPopulateCategories(products);
  initProductListItemModal();
  renderProducts(products);
  initListeners();
}

export function initListeners() {
  // Event Listeners
  categoryFilter.addEventListener("change", handleCategoryChange);
  searchInput.addEventListener("input", handleSearchInput);
}

/**
 * Render the list of products.
 * @param {Array<Object>} items - The list of products to render.
 */
function renderProducts(items) {
  productList.innerHTML = "";
  items.forEach((product) => {
    productList.appendChild(initProductListItem(product));
  });
}

/**
 * Extract unique categories from products and populate the category filter.
 * @param {Array<Object>} items - The list of products.
 */
function extractAndPopulateCategories(items) {
  categories = [...new Set(items.map((product) => product.category))];
  populateCategories(categoryFilter, categories);
}

/**
 * Handle changes in the category filter.
 */
function handleCategoryChange() {
  const selectedCategory = categoryFilter.value;
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);
  renderProducts(filteredProducts);
}

/**
 * Handle search input to filter products by title.
 */
function handleSearchInput() {
  const query = searchInput.value.toLowerCase();
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(query)
  );
  renderProducts(filteredProducts);
}

/**
 * Populate dropdown with categories.
 * @param {HTMLElement} categoryFilter - The select element.
 * @param {Array<string>} categories - The list of categories.
 */
export function populateCategories(categoryFilter, categories) {
  categoryFilter.innerHTML = `<option value="all">All</option>`;
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}
