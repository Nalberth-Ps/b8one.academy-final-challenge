export default function initLogout() {
  const logoutSpan = document.querySelector(".dropdown-menu__text.password");
  logoutSpan.addEventListener("click", handleLogout);
}

function handleLogout() {
  localStorage.removeItem("user");
  window.location.replace(window.location.origin);
}
