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
  activeMenu.classList.toggle("dropdown__list--selected");
}

function closeOpenDropdowns(activeMenu) {
  dropdownMenus.forEach((menu) => {
    if (menu.innerHTML === activeMenu.innerHTML) return;

    menu.classList.remove("dropdown__list--selected");
  });
}
