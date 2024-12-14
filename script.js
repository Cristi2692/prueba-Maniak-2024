import { init as initCart } from "./components/cart/cart.js";
import { init as initProductsList } from "./components/products-list/products-list.js";

document.addEventListener("DOMContentLoaded", () => {
  /**
   * Initialize the application by fetching products and setting up event listeners.
   */
  async function init() {
    try {
      initCart();
      await initProductsList();
    } catch (error) {
      console.error("Initialization error:", error);
    }
  }

  // Initialize the app
  init();
});
