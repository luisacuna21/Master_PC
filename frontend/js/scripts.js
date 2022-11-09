const userURL = "https://localhost:7138/api/users";

const usernameInput = document.getElementById("usernameInput");
const passwordInput = document.getElementById("passwordInput");
const loginButton = document.getElementById("loginButton");

class User {
  // constructor(userId, userName, passwordString) {
  //   this.userId = userId;
  //   this.username = userName;
  //   this.passwordString = passwordString;
  // }
  constructor(userName, passwordString) {
    this.userName = userName;
    this.passwordString = passwordString;
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
  var usernameInput = document.getElementById("usernameInput");
  var passwordInput = document.getElementById("passwordInput");

  var username = usernameInput.value;
  var passwordString = passwordInput.value;

  var user = new User(username, passwordString);

  var response = await loginUser(userURL + "/verify", user);

  console.log(await response.json());

  // await loginUser(userURL + "/verify", user).then((response) => {
  //   console.log(response.json());
  // });
});

// // Ejemplo implementando el metodo POST:
// async function postData(url = "", data = {}) {
//   // Opciones por defecto estan marcadas con un *
//   const response = await fetch(url, {
//     method: "POST", // *GET, POST, PUT, DELETE, etc.
//     mode: "cors", // no-cors, *cors, same-origin
//     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: "same-origin", // include, *same-origin, omit
//     headers: {
//       "Content-Type": "application/json",
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     redirect: "follow", // manual, *follow, error
//     referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//     body: JSON.stringify(data), // body data type must match "Content-Type" header
//   });
//   return response.json(); // parses JSON response into native JavaScript objects
// }

// postData("https://example.com/answer", { answer: 42 }).then((data) => {
//   console.log(data); // JSON data parsed by `data.json()` call
// });
