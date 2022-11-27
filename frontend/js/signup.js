const customerURL = "https://localhost:7138/api/customers";
const userURL = "https://localhost:7138/api/users";

const firstNameInput = document.querySelector("#firstNameInput");
const lastNameInput = document.querySelector("#lastNameInput");
const emailInput = document.querySelector("#emailInput");
const countryInput = document.querySelector("#countryInput");
const cityInput = document.querySelector("#cityInput");
const postalCodeInput = document.querySelector("#postalCodeInput");
const phoneInput = document.querySelector("#phoneInput");

const usernameInput = document.querySelector("#usernameInput");
const passwordInput = document.querySelector("#passwordInput");
const passwordAgainInput = document.querySelector("#passwordAgainInput");

const saveBtn = document.querySelector("#saveBtn");

class User {
  constructor(username, password, isEmployee) {
    this.username = username;
    this.password = password;
    this.isEmployee = isEmployee;
  }
}

class Customer {
  constructor(
    firstName,
    lastName,
    email,
    city,
    postalCode,
    country,
    phone,
    userId
  ) {
    this.fullName = firstName + " " + lastName;
    this.email = email;
    this.city = city;
    this.postalCode = postalCode;
    this.country = country;
    this.phone = phone;
    this.userId = userId;
  }
}

async function addUser(url, user) {
  const response = await fetch(url, {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-type": "application/json;",
    },
    body: JSON.stringify({
      username: user.username,
      password: user.password,
      isEmployee: user.isEmployee,
    }),
  }).catch((error) => {
    console.log(error);
  });
  return response;
}

async function addCustomer(url, customer) {
  const response = await fetch(url, {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-type": "application/json;",
    },
    body: JSON.stringify({
      fullName: customer.fullName,
      email: customer.email,
      city: customer.city,
      postalCode: customer.postalCode,
      country: customer.country,
      phone: customer.phone,
      userId: customer.userId,
    }),
  }).catch((error) => {
    console.log(error);
  });
  return response;
}

async function loginUser(url, user) {
  const response = await fetch(url, {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-type": "application/json;",
    },
    body: JSON.stringify({
      username: user.username,
      password: user.password,
    }),
  }).catch((error) => {
    console.log(error);
  });
  return response;
}

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

// TODO: later
// passwordAgainInput.addEventListener("keyup", function () {
//   if (passwordInput.value != passwordAgainInput.value) {
//     passwordAgainInput.classList.toggle("border-red-600");
//   } else {
//     // passwordAgainInput.setCustomValidity("");
//   }
// });

saveBtn.addEventListener("click", async function () {
  let firstName = firstNameInput.value;
  let lastName = lastNameInput.value;
  let email = emailInput.value;
  let country = countryInput.value;
  let city = cityInput.value;
  let postalCode = postalCodeInput.value;
  let phone = phoneInput.value;
  let username = usernameInput.value;
  let password = passwordInput.value;
  let passwordAgain = passwordAgainInput.value;

  if (password !== passwordAgain) {
    alert("Las contraseñas no coinciden!");
    return;
  }

  // Adding user
  // Is not a employee. So, IsEmployee = false
  // (Every account introduced in this page is a customer account)
  let userToAdd = new User(username, password, false);
  
  let userResponse = await addUser(userURL, userToAdd);
  
  if (!userResponse.ok) {
    throwError(userResponse.status)
  }

  let userAdded = await userResponse.json();
  console.log(userAdded);

  alert("Usuario agregado correctamente!" + userAdded.userId);

  // Adding customer after adding user
  let customer = new Customer(
    firstName,
    lastName,
    email,
    city,
    postalCode,
    country,
    phone,
    userAdded.userId
  );

  console.log(customer);

  alert("Check");

  let customerResponse = await addCustomer(customerURL, customer);

  if (!customerResponse.ok) {
    throwError(customerResponse.status);
  }

  let customerAdded = customerResponse.json();
  console.log(customerAdded);

  // Login user
  // First get the user by user id  
  let userToLoginResponse = await getUserById(userURL, userAdded.userId);
  let userToLogin = await userToLoginResponse.json();

  // Then, login
  let loginUserResponse = await loginUser(userURL + '/verify', userToLogin);

  if (!loginUserResponse.ok) {
    throwError(loginUserResponse.status);
  }

  let loggedUser = await loginUserResponse.json();

  // Adding cookie
  document.cookie = "userId=" + loggedUser.userId;
  document.cookie = "token=" + loggedUser.token;
  document.cookie = "isEmployee=" + loggedUser.isEmployee;

  // localStorage.setItem("userId", userAdded.userId);

  alert(
    `Usuario registrado con éxito! \n UserId = ${userAdded.userId} \n userName = ${userAdded.userName} \n isEmployee = ${userAdded.isEmployee} \n customerId = ${customerAdded.customerId} \n \n Inicio de sesión: \n userId: ${loggedUser.userId}, \n token: ${loggedUser.token}`
  );

  window.location.href = "index.html";
});

function throwError(message) {
  alert(`Ha ocurrido un error: ${message}`);
  throw new Error(`Ha ocurrido un error: ${message}`);
}
