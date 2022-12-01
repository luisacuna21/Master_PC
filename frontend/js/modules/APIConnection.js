const productURL = "https://localhost:7138/api/products";
const usersURL = "https://localhost:7138/api/users";
const customersURL = "https://localhost:7138/api/customers";
const homeURL = "https://localhost:7138/api/home";

// Home
async function getHome() {
  const response = await fetch(homeURL, {
    mode: "cors",
    method: "GET",
    headers: {
      "Content-type": "application/json;",
    },
  }).catch((error) => {
    console.log(error);
  });
  return response;
}

// Products

async function addProduct(product) {
  const response = await fetch(productURL, {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-type": "application/json;",
    },
    body: JSON.stringify({
      productName: product.productName,
      productShortName: product.productShortName,
      brandId: product.brandId,
      categoryId: product.categoryId,
      unitPrice: product.unitPrice,
      unitsInStock: product.unitsInStock,
      unitsOnOrder: product.unitsOnOrder,
      reorderLevel: product.reorderLevel,
      discontinued: product.discontinued,
      productDescription: product.productDescription,
      productPhotos: product.productPhotos,
    }),
  }).catch((error) => {
    console.log(error);
  });
  return response;
}

async function getProducts() {
  const response = await fetch(productURL, {
    mode: "cors",
    method: "GET",
    headers: {
      "Content-type": "application/json;",
    },
  }).catch((error) => {
    console.log(error);
  });
  return response;
}

async function getProductById(id) {
  const response = await fetch(productURL + `/${id}`, {
    mode: "cors",
    method: "GET",
    headers: {
      "Content-type": "application/json;",
    },
  }).catch((error) => {
    console.log(error);
  });
  return response;
}

// Users
async function getUsers() {
  const response = await fetch(usersURL, {
    mode: "cors",
    method: "GET",
    headers: {
      "Content-type": "application/json;",
    },
  }).catch((error) => {
    console.log(error);
  });
  return response;
}

// Customers
async function getCustomers() {
  const response = await fetch(customersURL, {
    mode: "cors",
    method: "GET",
    headers: {
      "Content-type": "application/json;",
    },
  }).catch((error) => {
    console.log(error);
  });
  return response;
}

export {
  addProduct,
  getProducts,
  getProductById,
  getUsers,
  getCustomers,
  getHome,
};
