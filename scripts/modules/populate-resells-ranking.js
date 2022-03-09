const resellsUrl = "https://test-final.b8one.academy/resellers/ranking";

export default async function initResellsRankingPopulation() {
  const data = await fetchData();
  return populateResellsRanking(data.resellers);
}

async function fetchData() {
  const response = await (await fetch(resellsUrl)).json();
  return response;
}

function populateResellsRanking(resellers) {
  let resellersRankingContent = `
  <div class="general-report--right">
    <div class="resells-ranking__header">
      <div class="resells-ranking__image-wrapper">
        <img src="./assets/images/champion-icon.png" alt="Ícone de Campeão" class="resells-ranking__image">
      </div>
      <h2 class="resells-ranking__title">
        Ranking de revendedores
      </h2>
    </div>
    <ul class="resells-ranking__list">
    `;

  resellers.forEach((reseller, index) => {
    resellersRankingContent += `
    <li class="resells-ranking__item">
      <div class="resell-wrapper">
        <span class="resell__indice">
          ${index + 1}°
        </span>
        <div class="resell-info-wrapper">
          <div class="resell-info__image-wrapper">
            <img src="./assets/images/resell-icon.png" alt="Avatar Revendedor" class="resell-info__image">
          </div>
        <div class="resell-info">
          <span class="resell__name">
            ${reseller.name}
          </span>
          <div class="resell-orders-wrapper">
            <span class="resell__orders">
              ${reseller.ordersCount} pedidos
            </span>
            ${salesSuccess(reseller.percentage)}
          </div>
        </div>
      </div>
    </div>
    </li>
  `;
  });

  resellersRankingContent += `
    </ul>
      <div class="see-all-button-wrapper">
        <button class="resells-ranking__see-all">
          Ver todos
        </button>
      </div>
    </div>
  `;

  return resellersRankingContent;
}

function salesSuccess(percentage) {
  const orderPercentage = percentage.substring(1);
  const orderPercentageContentSuccess = `
    <span class="resell-orders__percentage resell-orders__percentage--success">
      ${orderPercentage}
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.9998 9.5L7.99976 6.5L4.99976 9.5" stroke="#158F2E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>                           
    </span>`;

  const orderPercentageContentNegative = `
      <span class="resell-orders__percentage resell-orders__percentage--negative">
        ${orderPercentage}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.00024 6.5L8.00024 9.5L11.0002 6.5" stroke="#EB0045" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>                           
      </span>
    `;

  return percentage.charAt(0) === "+"
    ? orderPercentageContentSuccess
    : orderPercentageContentNegative;
}
