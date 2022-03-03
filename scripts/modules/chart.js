export default function initChart() {
  //   Chart.defaults.global.legend.labels.usePointStyle = true;
  const labels = ["January", "February", "March", "April", "May", "June"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Estornado",
        backgroundColor: "rgba(66, 93, 199, 1)",
        borderColor: "rgba(66, 93, 199, 1)",
        data: [0, 10, 5, 2, 20, 30],
      },
      {
        label: "Cancelado",
        backgroundColor: "rgba(240, 52, 96, 1)",
        borderColor: "rgba(240, 52, 96, 1)",
        data: [0, 7, 4, 8, 30, 12, 15],
      },
      {
        label: "Não Pago",
        backgroundColor: "rgba(255, 190, 0, 1)",
        borderColor: "rgba(255, 190, 0, 1)",
        borderRadius: "100px",
        data: [2, 0, 3, 2, 4, 5, 1],
      },
      {
        label: "Pago",
        backgroundColor: "rgba(46, 176, 66, 1)",
        borderColor: "rgba(46, 176, 66, 1)",
        data: [0, 10, 15, 13, 8, 13, 14],
      },
    ],
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
        padding: 20,
      },
      scales: {
        x: {
          ticks: {
            // paddingRight: 32,
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
