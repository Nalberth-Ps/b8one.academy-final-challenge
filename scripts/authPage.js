function initUser() {
  const enterButton = document.querySelector(".card-button__submit");
  enterButton.addEventListener("click", getUserData);
}

function getUserData(event) {
  event.preventDefault();
  const userEmail = document.getElementById("email").value;
  const userPassword = document.getElementById("password").value;

  if (userPassword === "" && userEmail === "") return;
  fetchLogin(userEmail, userPassword);
}

async function fetchLogin(email, password) {
  try {
    const URL = "https://test-final.b8one.academy/login";
    const response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error(response.message);

    saveUserLogged({ email });

    window.location.replace("./dashboard.html");
  } catch (error) {
    handleUserNotFound();
  }
}

function handleUserNotFound() {
  const inputWrong = document.querySelector(".card-login-form__input");
  inputWrong.classList.add("card-login-form__input--wrong");

  const feedbackHelperText = document.querySelector(".card__input-wrong");
  feedbackHelperText.classList.add("card__input-wrong--active");

  inputWrong.addEventListener("change", ({ currentTarget }) => {
    currentTarget.classList.remove("card-login-form__input--wrong");
    inputWrong.classList.remove("card__input-wrong--active");
  });
}

function saveUserLogged(email) {
  localStorage.setItem("user", JSON.stringify(email));
}

function showPassword() {
  const passwordButton = document.getElementById("password");
  if (passwordButton.type === "password") passwordButton.type = "text";
  else passwordButton.type = "password";
}

function verifyLogged() {
  if (localStorage.getItem("user") !== null)
    window.location.replace("./dashboard.html");
}

verifyLogged();
