const productURL = "https://localhost:7138/api/products";
const usersURL = "https://localhost:7138/api/users";
const customersURL = "https://localhost:7138/api/customers";

// Products
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



export { getProducts, getProductById, getUsers, getCustomers };
