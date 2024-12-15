/**
 * fetch de productos
 * @param {string} url - endpoint de la api
 * @returns {Promise<any>} - fetch de productos
 */
export async function fetchProducts() {
  try {
    const url = "https://fakestoreapi.com/products";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Productos cargados:', data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
