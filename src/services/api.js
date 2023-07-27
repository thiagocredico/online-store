export async function getCategories() {
  const categories = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const response = categories.json().then((data) => data);
  return response;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const categories = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const response = categories.json().then((data) => data);
  return response;
}

export async function getProductById(productId) {
  const idProduct = await fetch(`https://api.mercadolibre.com/items/${productId}`);
  const response = await idProduct.json();
  return response;
}

// export async function getProductsFromQuery(query) {
//   const categories = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
//   const response = categories.json().then((data) => data);
//   return response;
// }
