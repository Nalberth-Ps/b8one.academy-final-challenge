export default function handleAccordionMenuAnimation() {
  const dropdownMenus = document.querySelectorAll("[data-dropdown]");
  dropdownMenus.forEach((menu) => {
    ["touchstart", "click"].forEach((userEvent) => {
      menu.addEventListener(userEvent, handleAccordionMenuClick);
    });
  });
}

function handleAccordionMenuClick(event) {
  event.preventDefault();
  const activeMenu = this;
  closeOpenMenus(activeMenu);
  activeMenu.classList.toggle("nav__item--selected");
}

function closeOpenMenus(activeMenu) {
  const dropdownMenus = document.querySelectorAll("[data-dropdown]");
  dropdownMenus.forEach((menu) => {
    if (menu.innerHTML === activeMenu.innerHTML) return;
    menu.classList.remove("nav__item--selected");
  });
}
