export default async function initSalesPopulation() {
  const salesData = await fetchSellsData();
  const chartWrapper = document.querySelector(".general-report-wrapper__main");
  chartWrapper.innerHTML = "";
  const a = `<ul class="data-cards-sells__list"></ul>`;
  chartWrapper.insertAdjacentHTML("beforeend", a);
  populateSales(salesData);
}

async function fetchSellsData() {
  const sellsURL = "https://test-final.b8one.academy/sales";
  const response = await (await fetch(sellsURL)).json();
  return response;
}

function populateSales(sales) {
  const cardsHTML = cardsData();

  const keysName = Object.keys(sales);

  keysName.forEach((key) => {
    const saleType = cardsHTML[key];
    const cardContent = saleType(sales);
    populateCards(cardContent);
  });
}

function populateCards(cardContent) {
  let cardContentHTML = `
    <li class="data-cards-sells__item">
      <div class="data-card-sells">
        <div class="data-card-sells__icon-wrapper">
            ${cardContent.icon}
        </div>
        <div class="data-card-sells__text-wrapper">
          <span class="data-card-sells__description">
            ${cardContent.name}
          </span>
          <span class="data-card-sells__value">
            ${cardContent.number}
          </span>
        </div>               
      </div>
    </li>
`;
  const sellsCardsList = document.querySelector(".data-cards-sells__list");
  sellsCardsList.insertAdjacentHTML("beforeend", cardContentHTML);
}

function cardsData() {
  return {
    revenues(sales) {
      const princeInBrl = (sales.revenues / 100).toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      });

      return {
        name: "Faturamento",
        icon: `<svg class="data-card__icon" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 29.3333C23.3638 29.3333 29.3333 23.3638 29.3333 16C29.3333 8.63619 23.3638 2.66666 16 2.66666C8.63619 2.66666 2.66666 8.63619 2.66666 16C2.66666 23.3638 8.63619 29.3333 16 29.3333Z" fill="#CDD2EB" stroke="#CDD2EB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M20 10.6667H14.8889C13.2933 10.6667 12 11.8606 12 13.3333C12 14.8061 13.2933 16 14.8889 16H17.1111C18.7067 16 20 17.1938 20 18.6667C20 20.1395 18.7067 21.3333 17.1111 21.3333H12" stroke="#425DC7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M16 8V10.6667" stroke="#425DC7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M16 21.3333L16 24" stroke="#425DC7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`,
        number: princeInBrl,
      };
    },
    totalSales(sales) {
      return {
        name: "Vendas totais",
        icon: `<svg class="data-card__icon" width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.49999 4L5.66666 8.8V25.6C5.66666 26.2365 5.9359 26.847 6.41516 27.2971C6.89442 27.7471 7.54444 28 8.22221 28H26.1111C26.7889 28 27.4389 27.7471 27.9182 27.2971C28.3974 26.847 28.6667 26.2365 28.6667 25.6V8.8L24.8333 4H9.49999Z" fill="#CDD2EB" stroke="#CDD2EB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M5.66666 8.8002H28.6667" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M22.2781 13.5999C22.2781 14.8739 21.7396 16.0957 20.7811 16.9965C19.8226 17.8974 18.5226 18.4035 17.167 18.4035C15.8115 18.4035 14.5114 17.8974 13.5529 16.9965C12.5944 16.0957 12.0559 14.8739 12.0559 13.5999" stroke="#425DC7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`,
        number: sales.totalSales,
      };
    },
    averageTicket(sales) {
      const princeInBrl = (sales.averageTicket / 100).toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      });
      return {
        name: "Ticket Médio",
        icon: `<svg class="data-card__icon" width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M28.8577 18.5374L18.8846 28.5105C18.6262 28.7691 18.3194 28.9743 17.9817 29.1143C17.644 29.2543 17.282 29.3264 16.9164 29.3264C16.5508 29.3264 16.1888 29.2543 15.8511 29.1143C15.5134 28.9743 15.2066 28.7691 14.9482 28.5105L3.58658 17.1621C3.211 16.7869 2.99997 16.2779 2.99997 15.747V4.66666C2.99997 3.56209 3.8954 2.66666 4.99997 2.66666H16.081C16.6114 2.66666 17.1202 2.87737 17.4952 3.25244L28.8577 14.6149C29.3758 15.1361 29.6666 15.8412 29.6666 16.5761C29.6666 17.3111 29.3758 18.0161 28.8577 18.5374Z" fill="#CDD2EB" stroke="#CDD2EB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M11 10.6667H11.0133" stroke="#425DC7" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>`,
        number: princeInBrl,
      };
    },
  };
}
