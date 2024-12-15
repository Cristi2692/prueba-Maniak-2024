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
 * Renderizar la lista de productos.
 * @param {Array<Object>} items - La lista de productos a renderizar.
 */
function renderProducts(items) {
  productList.innerHTML = "";
  items.forEach((product) => {
    productList.appendChild(initProductListItem(product));
  });
}

/**
 * Extraer categorías únicas de los productos y llenar el desplegable de categorías.
 * @param {Array<Object>} items - La lista de productos.
 */
function extractAndPopulateCategories(items) {
  categories = [...new Set(items.map((product) => product.category))];
  populateCategories(categoryFilter, categories);
}

/**
 * Manejar los cambios en el filtro de categoría.
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
 * Manejar la entrada de búsqueda para filtrar productos por título.
 */
function handleSearchInput() {
  const query = searchInput.value.toLowerCase();
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(query)
  );
  renderProducts(filteredProducts);
}

/**
 * llenar desplegable con categorías.
 * @param {HTMLElement} categoryFilter - El elemento select.
 * @param {Array<string>} categories - La lista de categorías.
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
