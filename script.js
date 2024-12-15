import { init as initCart } from "./components/cart/cart.js";
import { init as initProductsList } from "./components/products-list/products-list.js";

document.addEventListener("DOMContentLoaded", () => {
  /**
   * Inicializar la aplicación obteniendo productos y configurando los listeners de eventos.
   */
  async function init() {
    try {
      initCart();
      await initProductsList();
    } catch (error) {
      console.error("Initialization error:", error);
    }
  }

  // Inicializar la aplicación
  init();
});
