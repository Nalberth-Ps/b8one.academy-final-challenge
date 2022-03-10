function initUser() {
  const enterButton = document.querySelector(".card-button__submit");
  enterButton.addEventListener("click", getUserData);
}

function getUserData(event) {
  event.preventDefault();
  const userEmail = document.getElementById("email").value;
  const userName = document.getElementById("password").value;

  if (userName !== "" && userEmail !== "") fetchLogin(userEmail, userName);
}

async function fetchLogin(userEmail, userName) {
  try {
    const URL = "https://test-final.b8one.academy/login";
    const response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: userEmail,
        password: userName,
      }),
    });
    if (!response.ok) throw new Error(response.message);
    window.location.replace(window.location.origin);
  } catch (error) {
    handleUserNotFound();
  }
}

function handleUserNotFound() {
  const labelWrong = document.querySelector(".card-login-form__input");
  labelWrong.classList.add("card-login-form__input--wrong");

  const inputWrong = document.querySelector(".card__input-wrong");
  inputWrong.classList.add("card__input-wrong--active");

  labelWrong.addEventListener("change", (e) => {
    e.currentTarget.classList.remove("card-login-form__input--wrong");
    inputWrong.classList.remove("card__input-wrong--active");
  });
}

function saveTheCookies() {}

function showPassword() {
  const passwordButton = document.getElementById("password");
  if (passwordButton.type === "password") passwordButton.type = "text";
  else passwordButton.type = "password";
}
