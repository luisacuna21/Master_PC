import {
  addProduct,
  getProducts,
  getProductById,
  getCustomers,
  getUsers,
  getHome,
} from "./modules/APIConnection.js";

import { Product } from "./modules/Classes.js";

// const productURL = "https://localhost:7138/api/products";

const showMenuBtn = document.querySelector("#showMenuBtn");
const logoutBtn = document.querySelector("#logoutBtn");

const asideMenu = document.querySelector("#asideMenu");
const mainDiv = document.querySelector("#mainDiv");

const homeMenuBtn = document.querySelector("#homeMenuBtn");
const homeMenuBtnSpan = document.querySelector("#homeMenuBtnSpan");

const productsMenuBtn = document.querySelector("#productsMenuBtn");
const productsMenuBtnSpan = document.querySelector("#productsMenuBtnSpan");

const usersMenuBtn = document.querySelector("#usersMenuBtn");
const usersMenuBtnSpan = document.querySelector("#usersMenuBtnSpan");

const customersMenuBtn = document.querySelector("#customersMenuBtn");
const customersMenuBtnSpan = document.querySelector("#customersMenuBtnSpan");

const employeesMenuBtn = document.querySelector("#employeesMenuBtn");
const employeesMenuBtnSpan = document.querySelector("#employeesMenuBtnSpan");

const ordersMenuBtn = document.querySelector("#ordersMenuBtn");
const ordersMenuBtnSpan = document.querySelector("#ordersMenuBtnSpan");

// Views

const homeDiv = document.querySelector("#homeDiv");
const totalIncomeParagraph = document.querySelector("#totalIncomeParagraph");
const totalOrdersParagraph = document.querySelector("#totalOrdersParagraph");
const registeredProductsParagraph = document.querySelector(
  "#registeredProductsParagraph"
);
const registeredClientsParagraph = document.querySelector(
  "#registeredClientsParagraph"
);
const productsPerOrderAverageParagraph = document.querySelector(
  "#productsPerOrderAverageParagraph"
);
const bestSellersTableBody = document.querySelector("#bestSellersTableBody");

const productsDiv = document.querySelector("#productsDiv");
const productsTableDiv = document.querySelector("#productsTableDiv");
const productsTableBody = document.querySelector("#productsTableBody");
const showAddProductBtn = document.querySelector("#showAddProductBtn");
const addProductModal = document.querySelector("#addProductModal");
const productNameInput = document.querySelector("#productNameInput");
const productShortNameInput = document.querySelector("#productShortNameInput");
const productBrandInput = document.querySelector("#productBrandInput");
const productCategoryInput = document.querySelector("#productCategoryInput");
const unitPriceInput = document.querySelector("#unitPriceInput");
const unitsOnOrderInput = document.querySelector("#unitsOnOrderInput");
const reorderLevelInput = document.querySelector("#reorderLevelInput");
const productDescriptionInput = document.querySelector(
  "#productDescriptionInput"
);
const productPhotosInput = document.querySelector("#productPhotosInput");
const saveProductButton = document.querySelector("#saveProductButton");
const cancelAddProductButton = document.querySelector(
  "#cancelAddProductButton"
);

const usersDiv = document.querySelector("#usersDiv");
const usersTableBody = document.querySelector("#usersTableBody");

const customersDiv = document.querySelector("#customersDiv");
const customersTableBody = document.querySelector("#customersTableBody");

const employeesDiv = document.querySelector("#employeesDiv");
const employeesTableBody = document.querySelector("#employeesTableBody");

const ordersDiv = document.querySelector("#ordersDiv");
const ordersTableBody = document.querySelector("#ordersTableBody");

// Logout

logoutBtn.addEventListener("click", () => {
  localStorage.clear();
  document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  document.cookie = "isEmployee=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

  // Hide user info
  window.location.href = "../index.html";
});

// Menu buttons event listeners

// homeMenuBtn.addEventListener("click", () => {
//     // mainDiv.classList.contains("hidden") ? mainDiv.classList.remove("hidden") : mainDiv.classList.add("hidden");
//     // mainDiv.childNodes.forEach((child) => { child.classList.});
// });
homeMenuBtn.addEventListener("click", function () {
  if (homeDiv.classList.contains("hidden")) {
    homeDiv.classList.remove("hidden");

    productsDiv.classList.add("hidden");
    usersDiv.classList.add("hidden");
    customersDiv.classList.add("hidden");
    employeesDiv.classList.add("hidden");
    ordersDiv.classList.add("hidden");
  }
});

productsMenuBtn.addEventListener("click", function () {
  if (productsDiv.classList.contains("hidden")) {
    productsDiv.classList.remove("hidden");

    homeDiv.classList.add("hidden");
    usersDiv.classList.add("hidden");
    customersDiv.classList.add("hidden");
    employeesDiv.classList.add("hidden");
    ordersDiv.classList.add("hidden");
  }
});

usersMenuBtn.addEventListener("click", function () {
  if (usersDiv.classList.contains("hidden")) {
    usersDiv.classList.remove("hidden");

    homeDiv.classList.add("hidden");
    productsDiv.classList.add("hidden");
    customersDiv.classList.add("hidden");
    employeesDiv.classList.add("hidden");
    ordersDiv.classList.add("hidden");
  }
});

customersMenuBtn.addEventListener("click", function () {
  if (customersDiv.classList.contains("hidden")) {
    customersDiv.classList.remove("hidden");

    homeDiv.classList.add("hidden");
    productsDiv.classList.add("hidden");
    usersDiv.classList.add("hidden");
    employeesDiv.classList.add("hidden");
    ordersDiv.classList.add("hidden");
  }
});

employeesMenuBtn.addEventListener("click", function () {
  if (employeesDiv.classList.contains("hidden")) {
    employeesDiv.classList.remove("hidden");

    homeDiv.classList.add("hidden");
    productsDiv.classList.add("hidden");
    usersDiv.classList.add("hidden");
    customersDiv.classList.add("hidden");
    ordersDiv.classList.add("hidden");
  }
});

ordersMenuBtn.addEventListener("click", function () {
  if (ordersDiv.classList.contains("hidden")) {
    ordersDiv.classList.remove("hidden");

    homeDiv.classList.add("hidden");
    productsDiv.classList.add("hidden");
    usersDiv.classList.add("hidden");
    customersDiv.classList.add("hidden");
    employeesDiv.classList.add("hidden");
  }
});

// Load Data

function showBestSellersInTable(bestSellers) {
  let template = "";
  bestSellers.forEach((bestSeller) => {
    template += `
            <tr class="bg-white border-b text-center">
                <td class="px-4 py-3 text-sm text-gray-900 font-regular whitespace-nowrap">
                  ${bestSeller.product.productId}
                </td>
                <td class="px-4 py-3 text-sm text-gray-900 font-regular whitespace-nowrap">
                  ${bestSeller.product.productShortName}
                </td>
                <td class="px-4 py-3 text-sm text-gray-900 font-regular whitespace-nowrap">
                  ${bestSeller.product.category.categoryName}
                </td>
                <td class="px-4 py-3 text-sm text-gray-900 font-regular whitespace-nowrap">
                  ${bestSeller.product.brand.brandName}
                </td>
                <td class="px-4 py-3 text-sm text-gray-900 font-regular whitespace-nowrap">
                  ${bestSeller.quantity}
                </td>
            </tr>
        `;
  });
  bestSellersTableBody.innerHTML += template;
}

function showHome(home) {
  totalIncomeParagraph.textContent = home.incomeStringFormat;
  totalOrdersParagraph.textContent = home.ordersCount;
  registeredProductsParagraph.textContent = home.productsCount;
  registeredClientsParagraph.textContent = home.customersCount;
  productsPerOrderAverageParagraph.textContent = home.productsPerOrderAverage;
  showBestSellersInTable(home.bestSellers);
}

async function loadAndShowHome() {
  const homeResponse = await getHome();
  const home = await homeResponse.json();
  console.log(home);
  showHome(home);
}

function showProductsInTable(products) {
  let template = "";
  products.forEach((p) => {
    template += `<tr class="bg-white border-b hover:bg-blue-200">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 hidden">
                      ${p.productId}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-start">
                      ${p.productShortName}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${p.brand.brandName}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${p.category.categoryName}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${p.unitPrice}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${p.unitsInStock}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${p.unitsOnOrder}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${p.reorderLevel}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${p.discontinued}
                    </td>                    
                  </tr>`;
  });
  productsTableBody.innerHTML += template;
}

async function loadAndShowProducts() {
  const productsResponse = await getProducts();
  const products = await productsResponse.json();
  console.log(products);
  showProductsInTable(products);
}

function showUsersInTable(users) {
  let template = "";
  users.forEach((u) => {
    template += `<tr class="bg-white border-b hover:bg-blue-200">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 hidden">
                          ${u.userId}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-start">
                          ${u.username}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ${u.isEmployee}
                      </td>              
                  </tr>`;
  });
  usersTableBody.innerHTML += template;
}

async function loadAndShowUsers() {
  const usersResponse = await getUsers();
  const users = await usersResponse.json();
  console.log(users);
  showUsersInTable(users);
}

function showCustomersInTable(customers) {
  let template = "";
  customers.forEach((c) => {
    template += `<tr class="bg-white border-b hover:bg-blue-200">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 hidden">
                        ${c.customerId}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-start">
                        ${c.fullName}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${c.user.username}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${c.email}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${c.city}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${c.postalCode}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${c.country}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${c.phone}
                    </td>                 
                </tr>`;
  });
  customersTableBody.innerHTML += template;
}

async function loadAndShowCustomers() {
  const customersResponse = await getCustomers();
  const customers = await customersResponse.json();
  console.log(customers);
  showCustomersInTable(customers);
}

document.addEventListener("DOMContentLoaded", function () {
  // loadAndShowHome();
  // loadAndShowProducts();
  // loadAndShowUsers();
  // loadAndShowCustomers();
});

showMenuBtn.addEventListener("click", () => {
  asideMenu.classList.remove("w-16");
  asideMenu.classList.add("w-fit");

  homeMenuBtnSpan.classList.toggle("hidden");
  productsMenuBtnSpan.classList.toggle("hidden");
  usersMenuBtnSpan.classList.toggle("hidden");
  customersMenuBtnSpan.classList.toggle("hidden");
  employeesMenuBtnSpan.classList.toggle("hidden");
  ordersMenuBtnSpan.classList.toggle("hidden");

  logoutBtn.classList.toggle("hidden");
});

// showAddProductBtn
// addProductModal
// productNameProductInput
// productBrandInput
// productCategoryInput
// unitPriceInput
// unitsOnOrderInput
// reorderLevelInput
// productDescriptionInput
// productPhotosInput
// saveProductButton
// cancelAddProductButton

showAddProductBtn.addEventListener("click", () => {
  showAddProductBtn.classList.add("hidden");
  productsTableDiv.classList.add("hidden");

  addProductModal.classList.remove("hidden");
});

cancelAddProductButton.addEventListener("click", function () {
  showAddProductBtn.classList.remove("hidden");
  productsTableDiv.classList.remove("hidden");

  addProductModal.classList.add("hidden");
});

async function imagesToB64Url(photos) {
  return new Promise((resolve, reject) => {
    let photosB64 = [];
    for (let i = 0; i < photos.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(photos[i]);
      reader.onloadend = () => {
        const obj = { photoBase64: reader.result };
        photosB64.push(obj);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    }
    resolve(photosB64);
  });
}

// var productPhotos = [];

saveProductButton.addEventListener("click", async function () {
  const productName = productNameInput.value;
  const productShortName = productShortNameInput.value;
  const brandId = productBrandInput.value;
  const categoryId = productCategoryInput.value;
  const unitPrice = unitPriceInput.value;
  const unitsOnOrder = unitsOnOrderInput.value;
  const reorderLevel = reorderLevelInput.value;
  const productDescription = productDescriptionInput.value;

  const productPhotosB64 = await imagesToB64Url(productPhotosInput.files);
  // const productPhotosAsB64 = await imagesToB64Url(productPhotosInput.files);

  while (productPhotosB64 === []) {
    console.log("waiting photos");
    setTimeout(() => {}, 1000);
  }

  console.log(productPhotosB64);

  let productPhotos = productPhotosB64;

  const product = {
    productName: productName,
    productShortName: productShortName,
    brandId: brandId,
    categoryId: categoryId,
    unitPrice: unitPrice,
    unitsInStock: 0,
    unitsOnOrder: unitsOnOrder,
    reorderLevel: reorderLevel,
    discontinued: false,
    productDescription: productDescription,
    productPhotos: productPhotos,
  };

  console.log(product);

  setTimeout(() => {}, 1000);

  alert("Lets see");

  console.log(JSON.stringify(product));

  return;

  const productResponse = await addProduct(product);

  if (!productResponse.ok) {
    alert("Product an error occured");
    return;
  }

  const addedProduct = await productResponse.json();
  console.log(addedProduct);

  alert("Product added successfully");

  location.reload();
});

// function getFileList(files) {
//   for (const f in files) {
//     const file = files[f];
//     productPhotos.push(file);
//   }
// }

// productPhotosInput.addEventListener("change", function (e) {
//   const file = productPhotosInput.files[0];
// });
