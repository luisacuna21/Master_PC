const userURL = "https://localhost:7138/api/users";
const productURL = "https://localhost:7138/api/products";

const loginDiv = document.querySelector("#loginDiv");
const userAccountDiv = document.querySelector("#userAccountDiv");

const mobileMenuDiv = document.querySelector("#mobileMenuDiv");
const closeMobileMenuBtn = document.querySelector("#closeMobileMenuBtn");
const openMobileMenuBtn = document.querySelector("#openMobileMenuBtn");

const solutionsBtn = document.querySelector("#solutionsBtn");
const solutionsSubmenu = document.querySelector("#solutionsSubmenu");

const moreBtn = document.querySelector("#moreBtn");
const moreSubmenu = document.querySelector("#moreSubmenu");

const accountDropdownBtn = document.querySelector("#accountDropdownBtn");
const accountDropdownLabel = document.querySelector("#accountDropdownLabel");
const accountDropdown = document.querySelector("#accountDropdown");

const logoutLink = document.querySelector("#logoutLink");

const productsDiv = document.querySelector("#productsDiv");

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// Get Cookie values
const userId = getCookie("userId");
const isEmployeeCookie = getCookie("isEmployee");
const isEmployee = isEmployeeCookie === "true" ? true : false;
const userLogged = userId != 0 ? true : false;

async function getUserById(url, id) {
  const response = await fetch(url + `/${id}`, {
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

async function getProducts(url) {
  const response = await fetch(url, {
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

// console.log(userLogged);

async function getUsername() {
  let response = await getUserById(userURL, userId);

  let user = await response.json();
  return user.username;
}

// class Card extends HTMLElement{
//   constructor() {
//     super();
//     let shadow = this.attachShadow({mode: 'open'});

//     let card = document.createElement('div');
//     card.classList.add("bg-red-300");

//     let testDiv = document.createElement("div");
//     // testDiv.classList.add("bg-red-500");

//     let alink = document.createElement("a");
//     alink.setAttribute("href", "#");
//     alink.classList.add("text-sm", "text-red-700");
//     alink.innerHTML = "test";

//     card.appendChild(alink);
//     shadow.appendChild(card);

//     // console.log("Card created");
//     // this.attachShadow({ mode: "open" });
//   }

//   connectedCallback() {

//   }

// }
// customElements.define("card-component", Card);

// function hexToBase64(str) {
//   return btoa(
//     String.fromCharCode.apply(
//       null,
//       str
//         .replace(/\r|\n/g, "")
//         .replace(/([\da-fA-F]{2}) ?/g, "0x$1 ")
//         .replace(/ +$/, "")
//         .split(" ")
//     )
//   );
// }
function hexToBase64(str) {
  return btoa(
    String.fromCharCode.apply(
      null,
      str
        .replace(/\r|\n/g, "")
        .replace(/([\da-fA-F]{2}) ?/g, "0x$1 ")
        .replace(/ +$/, "")
        .split(" ")
    )
  );
}

function showProducts(products) {
  let template = "";
  products.forEach((product) => {
    template += `<div class="container group relative rounded-lg shadow-sm shadow-gray-400 p-1">
        <div class="flex items-center sm:h-56 group-hover:opacity-75">
        <img src="${product.firstPhoto.photoBase64}" alt="productPhoto.jpg"/>
        </div>
        <div class="flex flex-wrap justify-between p-1">
          <div>
            <h3 class="text-sm text-gray-700">
              <label for="productId" class="hidden">${product.productId}</label>
              <a href="#">
                <span
                  aria-hidden="true"
                  class="absolute inset-0"
                ></span>
                <p class="text-justify">
                  ${product.productShortName}
                </p>
              </a>
            </h3>
          </div>
          <p class="text-md font-medium text-gray-900 mt-1">USD ${product.unitPrice}</p>
        </div>
      </div>`;
  });
  productsDiv.innerHTML += template;
}

document.addEventListener("DOMContentLoaded", async () => {
  if (userLogged) {
    if (!isEmployee) {
      loginDiv.classList.add("collapse");
      userAccountDiv.classList.remove("collapse");

      accountDropdownLabel.textContent = await getUsername();
    }
  }
  const productsResponse = await getProducts(productURL);
  console.log(productsResponse);
  const products = await productsResponse.json();

  console.log(products);
  showProducts(products);
});

// if (userLogged) {

//   loginDiv.classList.add("collapse");
//   //   loginDiv.classList.remove("collapse");

//   userAccountDiv.classList.remove("collapse");

//   document.addEventListener("DOMContentLoaded", async function () {
//     accountDropdownLabel.textContent = await getUsername();

//     const productsResponse = await getProducts(productURL);
//     const products = await productsResponse.json();

//     console.log(products);

//   });
// }

solutionsBtn.addEventListener("click", () => {
  solutionsSubmenu.classList.toggle("hidden");
});

moreBtn.addEventListener("click", () => {
  moreSubmenu.classList.toggle("hidden");
});

accountDropdownBtn.addEventListener("click", () => {
  accountDropdown.classList.toggle("hidden");
});

logoutLink.addEventListener("click", () => {
  localStorage.clear();
  document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  document.cookie = "isEmployee=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

  // Hide user info
  loginDiv.classList.remove("collapse");
  userAccountDiv.classList.add("collapse");
});

// mobileMenuDiv
closeMobileMenuBtn.addEventListener("mousedown", function (e) {
  mobileMenuDiv.classList.add("hidden");
});

openMobileMenuBtn.addEventListener("mousedown", function (e) {
  mobileMenuDiv.classList.remove("hidden");
});
