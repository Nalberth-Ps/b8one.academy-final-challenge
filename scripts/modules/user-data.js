const userDataUrl = "https://test-final.b8one.academy/user";

export default async function initUser() {
  const data = await fetchData();
  setCompanyData(data.organization);
  setUserData(data);
}
async function fetchData() {
  const response = await (await fetch(userDataUrl)).json();
  return response;
}

function setCompanyData(username) {
  const companyDiv = document.querySelector(".company");
  const companyData = `
  <img class="company__logo" src="./assets/images/company-logo.png" alt="Logo da Empresa">
  <span class="company__name">
     ${username}
  </span>
    `;
  companyDiv.insertAdjacentHTML("afterbegin", companyData);
}

function setUserData(data) {
  const userProfileDiv = document.querySelector(".user-actions-item__profile");
  const userData = `
  <img src="${data.photo}" alt="Foto de Perfil">
    <span class="user-actions-item__name">
      ${data.username}
    </span>
  `;

  userProfileDiv.insertAdjacentHTML("afterbegin", userData);

  const dropdownMenu = document.querySelector(".dropdown__user");
  const dropdownMenuData = `
  <h3 class="dropdown-user__title">
    Olá, <span class="user__highlight">${data.username.split(" ")[0]}</span> 👋
  </h3>
  <span class="dropdown-menu__text">
    Minha Conta
  </span>
  <span class="dropdown-menu__text">
    Sair
  </span>
  `;

  dropdownMenu.insertAdjacentHTML("afterbegin", dropdownMenuData);
}
