import verifyLogged from "./modules/verify-logged.js";
import initUser from "./modules/user-data.js";
import chartPopulate from "./modules/chart-populate.js";
import initTablePopulation from "./modules/populate-table.js";
import initAccordionMenu from "./modules/populate-menu.js";

verifyLogged();
initUser();
initTablePopulation();
chartPopulate();
initAccordionMenu();
