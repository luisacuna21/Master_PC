const userURL = "https://localhost:7138/api/users";

const loginDiv = document.querySelector("#loginDiv");
const userAccountDiv = document.querySelector("#userAccountDiv");

const solutionsBtn = document.querySelector("#solutionsBtn");
const solutionsSubmenu = document.querySelector("#solutionsSubmenu");

const moreBtn = document.querySelector("#moreBtn");
const moreSubmenu = document.querySelector("#moreSubmenu");

const accountDropdownBtn = document.querySelector("#accountDropdownBtn");
const accountDropdownLabel = document.querySelector("#accountDropdownLabel");
const accountDropdown = document.querySelector("#accountDropdown");

const logoutLink = document.querySelector("#logoutLink");

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

const userId = getCookie("userId");
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

// console.log(userLogged);

async function getUsername() {
  let response = await getUserById(userURL, userId);

  let user = await response.json();
  return user.username;
}

if (userLogged) {
  loginDiv.classList.add("collapse");
  //   loginDiv.classList.remove("collapse");

  userAccountDiv.classList.remove("collapse");

  document.addEventListener("DOMContentLoaded", async function () {
    accountDropdownLabel.textContent = await getUsername();
  });
}
// console.log(localStorage.getItem("userId"));
// console.log(localStorage.getItem("userName"));
// console.log(localStorage.getItem("isEmployee"));
// console.log(localStorage.getItem("customerId"));

solutionsBtn.addEventListener("click", () => {
  solutionsSubmenu.classList.toggle("hidden");
  // solutionsSubmenu.classList.toggle('opacity-0');
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
});