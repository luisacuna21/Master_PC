import { getProducts } from "./modules/APIConnection.js";
import { getProductById } from "./modules/APIConnection.js";

import { getUsers } from "./modules/APIConnection.js";

import { getCustomers } from "./modules/APIConnection.js";

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

const productsDiv = document.querySelector("#productsDiv");
const productsTableBody = document.querySelector("#productsTableBody");

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
  loadAndShowProducts();
  loadAndShowUsers();
  loadAndShowCustomers();
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
