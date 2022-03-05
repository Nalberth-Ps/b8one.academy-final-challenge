const dropdownMenus = document.querySelectorAll("[data-dropdown]");
export default function initDropdownMenu() {
  dropdownMenus.forEach((menu) => {
    ["touchstart", "click"].forEach((userEvent) => {
      menu.addEventListener(userEvent, handleClick);
    });
  });
}

function handleClick(event) {
  event.preventDefault();
  const activeMenu = this;
  closeOpenDropdowns(activeMenu);
  activeMenu.classList.toggle("nav__item--selected");
}

function closeOpenDropdowns(activeMenu) {
  dropdownMenus.forEach((menu) => {
    if (menu.innerHTML === activeMenu.innerHTML) return;
    menu.classList.remove("nav__item--selected");
  });
}
