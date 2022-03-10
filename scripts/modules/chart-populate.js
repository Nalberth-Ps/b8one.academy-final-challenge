import initChart from "./chart.js";
import initResellsRankingPopulation from "./populate-resells-ranking.js";
import initSalesPopulation from "./populate-sales-chart.js";

const chartWrapper = document.querySelector(".general-report-wrapper__main");
await salesChart();
export default async function chartPopulate() {
  initDateInterval();
  const generalReportInput = document.querySelectorAll(
    ".general-report__input"
  );
  generalReportInput.forEach((input) => {
    input.addEventListener("click", handleChartClick);
  });
}

let currentChart = document.querySelector(".general-report__input:checked");
function handleChartClick(event) {
  if (event.target.value === currentChart) return;

  if (event.target.value == "resellers") resellersChart();
  else if (event.target.value == "sells") salesChart();
  else if (event.target.value == "orders") ordersChart();
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

function ordersChart() {
  const resellersRanking = document.querySelector(".general-report--right");
  if (resellersRanking !== null) resellersRanking.remove();

  chartWrapper.innerHTML = loadingAnimation();

  const chartData = {
    0: {
      label: "Total de pedidos",
      color: "rgba(66, 93, 199, 1)",
      data: generateRandomData(),
    },
    days: getDays(),
    length: 1,
  };

  const ordersContent = `
  <div class="chart-wrapper">
    <canvas id="myChart"></canvas>
  </div>
  `;

  chartWrapper.innerHTML = "";

  defaultWidth();

  chartWrapper.insertAdjacentHTML("beforeend", ordersContent);
  initChart(chartData);
}

async function salesChart() {
  const resellersRanking = document.querySelector(".general-report--right");
  if (resellersRanking !== null) resellersRanking.remove();

  chartWrapper.innerHTML = loadingAnimation();

  await initSalesPopulation();

  const chartHTML = `
  <div class="chart-wrapper">
    <canvas id="myChart"></canvas>
  </div>
  `;

  const chartData = {
    0: {
      label: "Estornado",
      color: "rgba(66, 93, 199, 1)",
      data: generateRandomData(),
    },
    1: {
      label: "Cancelado",
      color: "rgba(240, 52, 96, 1)",
      data: generateRandomData(),
    },
    2: {
      label: "Não Pago",
      color: "rgba(255, 190, 0, 1)",
      data: generateRandomData(),
    },
    3: {
      label: "Pago",
      color: "rgba(46, 176, 66, 1)",
      data: generateRandomData(),
    },
    days: getDays(),
    length: 4,
  };

  chartWrapper.insertAdjacentHTML("beforeend", chartHTML);
  defaultWidth();
  initChart(chartData);
}

async function resellersChart() {
  const resellersRanking = document.querySelector(".general-report--right");
  if (resellersRanking !== null) resellersRanking.remove();

  chartWrapper.innerHTML = loadingAnimation();
  const resellersContent = `<div class="resells-select-wrapper">
  <select class="resells-select" name="resells" id="resells">
    <option value="" selected disabled>Mostrar todos os revendedores</option>
  </select>
  <div class="chart-wrapper">
    <canvas id="myChart"></canvas>
  </div>
  </div>`;
  const resellersRankingContent = await initResellsRankingPopulation();
  chartWrapper.innerHTML = "";

  resizeWidth();

  chartWrapper.insertAdjacentHTML("beforeend", resellersContent);

  const resell = document.querySelector(".general-report");
  resell.insertAdjacentHTML("beforeend", resellersRankingContent);

  const chartData = {
    0: {
      label: "Valor total de vendas",
      color: "rgba(66, 93, 199, 1)",
      data: generateRandomData(),
    },
    1: {
      label: "Quantidade de pedidos",
      color: "rgba(240, 52, 96, 1)",
      data: generateRandomData(),
    },
    2: {
      label: "Comissão a pagar",
      color: "rgba(255, 190, 0, 1)",
      data: generateRandomData(),
    },
    days: getDays(),
    length: 3,
  };

  initChart(chartData);
}

function loadingAnimation() {
  return `
  <div class="loader" title="0">
      <svg class="loader__icon" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve">
     <rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2">
       <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" />
       <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
       <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
     </rect>
     <rect x="8" y="10" width="4" height="10" fill="#333"  opacity="0.2">
       <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
       <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
       <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
     </rect>
     <rect x="16" y="10" width="4" height="10" fill="#333"  opacity="0.2">
       <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
       <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
       <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
     </rect>
   </svg>
  </div>
      `;
}

function getDays() {
  const dateInterval = document.querySelector(
    ".data-resume__input:checked"
  ).value;
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();

  let days = [];

  for (let i = 0; i < dateInterval; i++) {
    const outroDia = new Date(year, month, day - i).toLocaleDateString("pt-BR");
    days[i] = outroDia;
  }
  return days.reverse();
}

function initDateInterval() {
  const dateInterval = document.querySelectorAll(".data-resume__input");
  dateInterval.forEach((item) => {
    item.addEventListener("click", chartPopulateDate);
  });
}

function chartPopulateDate({ target }) {
  if (target.value == "on") return;

  let currentChart = document.querySelector(
    ".general-report__input:checked"
  ).value;

  if (currentChart == "resellers") resellersChart();
  else if (currentChart == "sells") salesChart();
  else if (currentChart == "orders") ordersChart();
}

function getRandomNumber() {
  const max = 500;
  const min = 0;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomData() {
  const dateInterval = document.querySelector(
    ".data-resume__input:checked"
  ).value;
  let randomNumber = [];
  for (let i = 0; i < dateInterval; i++) {
    randomNumber.push(getRandomNumber());
  }
  return randomNumber;
}
