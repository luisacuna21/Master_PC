const userURL = "https://localhost:7138/api/users";

const usernameInput = document.getElementById("usernameInput");
const passwordInput = document.getElementById("passwordInput");
const loginButton = document.getElementById("loginButton");

// console.log(localStorage.getItem("userId"));
// console.log(localStorage.getItem("userName"));
// console.log(localStorage.getItem("isEmployee"));
// console.log(localStorage.getItem("customerId"));

class User {
  constructor(userName, passwordString) {
    this.userName = userName;
    this.password = password;
  }
}

async function loginUser(url, user) {
  // var body = JSON.stringify(user);

  const response = await fetch(url, {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-type": "application/json;",
    },
    body: JSON.stringify({
      username: user.userName,
      password: user.passwordString,
    }),
  }).catch((error) => {
    console.log(error);
  });
  return response;
}

loginButton.addEventListener("click", async function () {
  // loginButton.removeEventListener("keydown", async function () {});
  var usernameInput = document.getElementById("usernameInput");
  var passwordInput = document.getElementById("passwordInput");

  var username = usernameInput.value;
  var passwordString = passwordInput.value;

  var user = new User(username, passwordString);

  var response = await loginUser(userURL + "/verify", user);

  console.log(await response.json());
});

// If key down avobe the button is enter, then do nothing
loginButton.addEventListener("keydown", async function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    loginButton.click();
  }
});
