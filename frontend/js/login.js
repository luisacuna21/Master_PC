const userURL = "https://localhost:7138/api/users";

const usernameInput = document.getElementById("usernameInput");
const passwordInput = document.getElementById("passwordInput");
const loginButton = document.getElementById("loginButton");

// console.log(localStorage.getItem("userId"));
// console.log(localStorage.getItem("userName"));
// console.log(localStorage.getItem("isEmployee"));
// console.log(localStorage.getItem("customerId"));

document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
document.cookie = "isEmployee=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
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

loginButton.addEventListener("click", async function () {
  // loginButton.removeEventListener("keydown", async function () {});
  let usernameInput = document.getElementById("usernameInput");
  let passwordInput = document.getElementById("passwordInput");

  let username = usernameInput.value;
  let passwordString = passwordInput.value;

  let userToLogin = new User(username, passwordString);

  let response = await loginUser(userURL + "/verify", userToLogin);

  let loginResponse = await response.json();

  if (response.ok) {
    if (loginResponse.userId != 0) {
      document.cookie = "userId=" + loginResponse.userId;
      document.cookie = "token=" + loginResponse.token;
      document.cookie = "isEmployee=" + loginResponse.isEmployee;

      console.log(loginResponse);

      alert(
        `Login successful \n ${loginResponse.userId} \n ${loginResponse.token}`
      );

      let isEmployee = loginResponse.isEmployee;

      if (isEmployee) {
        window.location.href = "management/index.html";
      } else {
        window.location.href = "index.html";
      }
    } else {
      alert(loginResponse.message);
    }
  }
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
