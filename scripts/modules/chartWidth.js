import initChart from "./chart.js";
import initResellsRankingPopulation from "./populate-resells-ranking.js";
import initSalesPopulation from "./populate-sells-chart.js";

const chartWrapper = document.querySelector(".general-report-wrapper__main");
const chart = `
  <div class="chart-wrapper">
    <canvas id="myChart"></canvas>
  </div>
`;
let currentChart = document.querySelector(".general-report__input:checked");

export default function initReportWidth() {
  sellsChart(chartWrapper);
  const generalReportInput = document.querySelectorAll(
    ".general-report__input"
  );
  generalReportInput.forEach((input) => {
    input.addEventListener("click", handleClick);
  });
}

function handleClick(event) {
  if (event.target.value === currentChart) return;

  if (event.target.value == "resellers") resellersChart(chartWrapper);
  else if (event.target.value == "sells") sellsChart(chartWrapper);
  else if (event.target.value == "orders") ordersChart(chartWrapper);
  currentChart = event.target.value;
}

function defaultWidth() {
  const generalReportLeft = document.querySelector(".general-report--left");
  generalReportLeft.classList.remove("general-report--resize");
}

function resizeWidth() {
  const generalReportLeft = document.querySelector(".general-report--left");
  generalReportLeft.classList.add("general-report--resize");
}

async function sellsChart(chartWrapper) {
  chartWrapper.innerHTML = "";
  await initSalesPopulation(chartWrapper);

  const resellersRanking = document.querySelector(".general-report--right");
  if (resellersRanking !== null) resellersRanking.remove();

  chartWrapper.insertAdjacentHTML("beforeend", chart);

  defaultWidth();
  initChart();
}

function ordersChart(chartWrapper) {
  chartWrapper.innerHTML = "";
  const ordersContent = `
  <div class="chart-wrapper">
    <canvas id="myChart"></canvas>
  </div>
  `;

  const resellersRanking = document.querySelector(".general-report--right");
  if (resellersRanking !== null) resellersRanking.remove();

  defaultWidth();

  chartWrapper.insertAdjacentHTML("beforeend", ordersContent);
  initChart();
}

async function resellersChart(chartWrapper) {
  chartWrapper.innerHTML = "";
  const resellersContent = `<div class="resells-select-wrapper">
  <select class="resells-select" name="resells" id="resells">
    <option value="" selected disabled>Mostrar todos os revendedores</option>
  </select>
  <div class="chart-wrapper">
    <canvas id="myChart"></canvas>
  </div>
  </div>`;
  const resellersRankingContent = await initResellsRankingPopulation();

  resizeWidth();

  chartWrapper.insertAdjacentHTML("beforeend", resellersContent);

  const resell = document.querySelector(".general-report");
  resell.insertAdjacentHTML("beforeend", resellersRankingContent);
  initChart();
}
