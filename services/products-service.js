/**
 * Fetch data from a given URL.
 * @param {string} url - The endpoint URL.
 * @returns {Promise<any>} - The fetched data.
 */
export async function fetchProducts() {
  try {
    const url = "https://fakestoreapi.com/products";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
