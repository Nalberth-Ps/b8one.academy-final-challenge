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
  const companyData = getCompanyData(companyName);

  const companyDiv = document.querySelector(".company");
  companyDiv.insertAdjacentHTML("afterbegin", companyData);
}

function setUserData(data) {
  const userProfileDiv = document.querySelector(".user-actions-item__profile");
  const userData = getUserData(data);

  userProfileDiv.insertAdjacentHTML("afterbegin", userData);

  setUserDropdownData(data.username);
}

function setUserDropdownData(userName) {
  const dropdownMenu = document.querySelector(".dropdown__user");
  const dropdownMenuData = getUserDropdownData(userName);

  dropdownMenu.insertAdjacentHTML("afterbegin", dropdownMenuData);
}

function getCompanyData(companyName) {
  return `
    <span class="avatar-circle__icon company-logo">
      ${getInitials(companyName)}
    </span>
    <span class="company__name">
      ${companyName}
    </span>
`;
}

function getUserData({ username, photo }) {
  return `
    <img src="${photo}" alt="Foto de Perfil" referrerpolicy="no-referrer">
    <span class="user-actions-item__name">
      ${username}
    </span>
`;
}

function getUserDropdownData(userName) {
  return `
    <h3 class="dropdown-user__title">
      Olá, <span class="user__highlight">${userName.split(" ")[0]}</span> 👋
    </h3>
    <span class="dropdown-menu__text">
      Minha Conta
    </span>
    <span class="dropdown-menu__text password">
      Sair
    </span>
  `;
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
