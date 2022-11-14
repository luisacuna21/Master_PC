const userURL = "https://localhost:7138/api/users";

const loginDiv = document.querySelector("#loginDiv");
const userAccountDiv = document.querySelector("#userAccountDiv");

const solutionsBtn = document.querySelector("#solutionsBtn");
const solutionsSubmenu = document.querySelector("#solutionsSubmenu");

const moreBtn = document.querySelector("#moreBtn");
const moreSubmenu = document.querySelector("#moreSubmenu");

const accountDropdownBtn = document.querySelector("#accountDropdownBtn");
const dropdownDividerBtnLabel = document.querySelector(
  "#dropdownDividerBtnLabel"
);
const accountDropdown = document.querySelector("#accountDropdown");

const userLogged = localStorage.getItem("userLogged");
const userId = localStorage.getItem("userId");

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

// const isEmployee = localStorage.getItem('isEmployee');

// if (userLogged) {
//   // if (isEmployee) {
//   //   window.location.href = 'employee.html';
//   // } else {
//   //   window.location.href = 'client.html';
//   // }
//   window.location.href = 'client.html';
// }

console.log(userLogged);

async function getUsername() {
  var response = await getUserById(userURL, userId);

  var user = await response.json();

  //   dropdownDividerBtnLabel.textContent = user.username;
  return user.username;
}

if (userLogged) {
  loginDiv.classList.add("collapse");
  //   loginDiv.classList.remove("collapse");

  userAccountDiv.classList.remove("collapse");

  document.addEventListener("DOMContentLoaded", async function () {
    dropdownDividerBtnLabel.textContent = await getUsername();
  });

  //   dropdownDividerBtnLabel.textContent = await getUsername();
  //   dropdownDividerBtnLabel.textContent = async () => {
  //     var response = await getUserById(userURL, userId);

  //     var user = await response.json();

  //     return user.username;
  //     //   dropdownDividerBtnLabel.textContent = user.username;
  //   };
}

// alert("pause");

// if(localStorage.length > 1) {

// }

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
  // solutionsSubmenu.classList.toggle('opacity-0');
});

accountDropdownBtn.addEventListener("click", () => {
  accountDropdown.classList.toggle("hidden");
  // solutionsSubmenu.classList.toggle('opacity-0');
});
