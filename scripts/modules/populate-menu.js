const menuDataUrl = "https://test-final.b8one.academy/menu";

export default async function initMenuPopulation() {
  const data = await fetchData();
  populateMenu(data.menuTree);
}

async function fetchData() {
  const response = await (await fetch(menuDataUrl)).json();
  return response;
}

function populateMenu(menuTree) {
  const menuList = document.querySelector(".nav__list");
}
