import initUser from "./modules/user-data.js";
import chartPopulate from "./modules/chart-populate.js";
import initTablePopulation from "./modules/populate-table.js";
import initAccordionMenu from "./modules/populate-menu.js";
import handleAccordionMenuAnimation from "./modules/accordion-menu.js";

initUser();
initTablePopulation();
chartPopulate();

await initAccordionMenu();
handleAccordionMenuAnimation();
