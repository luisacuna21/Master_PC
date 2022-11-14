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

saveBtn.addEventListener("click", async function () {
  var firstName = firstNameInput.value;
  var lastName = lastNameInput.value;
  var email = emailInput.value;
  var country = countryInput.value;
  var city = cityInput.value;
  var postalCode = postalCodeInput.value;
  var phone = phoneInput.value;
  var username = usernameInput.value;
  var password = passwordInput.value;
  var passwordAgain = passwordAgainInput.value;

  if (password !== passwordAgain) {
    alert("Las contraseñas no coinciden!");
    return;
  }

  // Is not a employee. So, IsEmployee = false
  // (Every account introduced in this page is a customer account)
  var userToAdd = new User(username, password, false);

  var userResponse = await addUser(userURL, userToAdd);

  if (!userResponse.ok) {
    var message = `Ha ocurrido un error: ${userResponse.status}`;
    throw new Error(message);
  }

  var userAdded = await userResponse.json();
  console.log(userAdded);
  
  alert("Usuario agregado correctamente!" + userAdded.userId);

  var customer = new Customer(
    firstName,
    lastName,
    email,
    country,
    city,
    postalCode,
    phone,
    userAdded.userId
  );

  console.log(customer);

  alert("Check");

  var customerResponse = await addCustomer(customerURL, customer);

  if (!customerResponse.ok) {
    var message = `Ha ocurrido un error: ${customerResponse.status}`;
    throw new Error(message);
  }

  var customerAdded = customerResponse.json();
  console.log(customerAdded);

  localStorage.setItem("userId", userAdded.userId);
  localStorage.setItem("isEmployee", userAdded.isEmployee);
  localStorage.setItem("customerId", customerAdded.customerId);

  // console.log(localStorage.getItem("userId"));
  // console.log(localStorage.getItem("userName"));
  // console.log(localStorage.getItem("isEmployee"));

  alert(
    `Usuario registrado con éxito! \n UserId = ${userAdded.userId} \n userName = ${userAdded.userName} \n isEmployee = ${userAdded.isEmployee} \n customerId = ${customerAdded.customerId}`
  );

  window.location.href = "index.html";
});