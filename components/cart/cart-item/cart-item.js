function createCartItem(product, quantity = 1) {
  return {
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.image,
    quantity: quantity,
    getTotalPrice() {
      return this.price * this.quantity;
    }
  };
}

export default createCartItem;
