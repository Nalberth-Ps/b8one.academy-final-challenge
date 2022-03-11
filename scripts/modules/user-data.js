import initLogout from "./logout.js";

export default async function initUser() {
  const data = await fetchData();
  setCompanyData(data.organization);
  setUserData(data);
  initLogout();
}
async function fetchData() {
  const userDataUrl = "https://test-final.b8one.academy/user";
  const response = await (await fetch(userDataUrl)).json();
  return response;
}

function setCompanyData(companyName) {
  const companyInitialLetters = getInitials(companyName);

  const companyData = `
  <span class="avatar-circle__icon company-logo">
          ${companyInitialLetters}
        </span>
  <span class="company__name">
  ${companyName}
  </span>
  `;

  const companyDiv = document.querySelector(".company");
  companyDiv.insertAdjacentHTML("afterbegin", companyData);
}

function setUserData({ username, photo }) {
  const userProfileDiv = document.querySelector(".user-actions-item__profile");
  const userData = `
  <img src="${photo}" alt="Foto de Perfil" referrerpolicy="no-referrer">
    <span class="user-actions-item__name">
      ${username}
    </span>
  `;

  userProfileDiv.insertAdjacentHTML("afterbegin", userData);

  const dropdownMenu = document.querySelector(".dropdown__user");
  const dropdownMenuData = `
  <h3 class="dropdown-user__title">
    Olá, <span class="user__highlight">${username.split(" ")[0]}</span> 👋
  </h3>
  <span class="dropdown-menu__text">
    Minha Conta
  </span>
  <span class="dropdown-menu__text password">
    Sair
  </span>
  `;

  dropdownMenu.insertAdjacentHTML("afterbegin", dropdownMenuData);
}

function getInitials(companyName) {
  return companyName
    .split(" ")
    .filter((item) => !["de", "da", "das", "do", "dos"].includes(item))
    .map((item) => item[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}
