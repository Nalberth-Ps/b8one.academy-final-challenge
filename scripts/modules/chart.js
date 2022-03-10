export default function initChart(chartData) {
  const labels = chartData.days;
  let labelDatasets = [];
  for (let i = 0; i < chartData.length; i++) {
    labelDatasets.push({
      label: chartData[i].label,
      backgroundColor: chartData[i].color,
      borderColor: chartData[i].color,
      data: chartData[i].data,
    });
  }

  const data = {
    labels: labels,
    datasets: labelDatasets,
  };

  const config = {
    type: "line",
    data: data,
    options: {
      elements: {
        point: {
          pointRadius: 0,
        },
      },
      layout: {
        padding: {
          top: 16,
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            maxTicksLimit: getTicksAmount(),
          },
          grid: {
            drawBorder: false,
            drawOnChartArea: false,
            display: false,
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            maxTicksLimit: 4,
          },
          grid: {
            drawBorder: false,
          },
        },
      },
      plugins: {
        legend: {
          position: "bottom",
          align: "start",
          labels: {
            usePointStyle: true,
            pointStyle: "circle",
          },
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  };

  const myChart = new Chart(document.getElementById("myChart"), config);
}

function getTicksAmount() {
  const screenSize = window.screen.width;
  if (screenSize > 490) return 15;
  else return 7;
}

getTicksAmount();
