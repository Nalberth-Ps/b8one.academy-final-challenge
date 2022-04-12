export default async function initTablePopulation() {
  const data = await fetchProductsData();
  populateTable(data.products);
}

async function fetchProductsData() {
  const productsUrl = "https://test-final.b8one.academy/products/more-sold";
  const response = await (await fetch(productsUrl)).json();
  return response;
}

function populateTable(products) {
  const productsArrayHtml = products
    .map((product, index) => {
      return getTableContent(product, index + 1);
    })
    .join(" ");

  const tbody = document.querySelector(".insights-table__body");
  tbody.insertAdjacentHTML("beforeend", productsArrayHtml);
}

function getTableContent({ name, orderId, department, price, image }, index) {
  return `
  <tr class="insights-table__trow">
      <td class="insights-table__column col-1">
          <span class="insights-table__product-indice">
            ${index}
          </span>
      </td>
      <td class="insights-table__column col-2">
        <span class="insights-table__product-description">
          <img src="${image}" alt="${name}" referrerpolicy="no-referrer">
          ${name}
        </span>
      </td>
      <td class="insights-table__column col-3">
        <span class="insights-table__product-text">
          ${orderId}
        </span>
      </td>
      <td class="insights-table__column col-4">
        <span class="insights-table__product-text">
          ${department}
        </span>
      </td>
      <td class="insights-table__column col-5">
        <span class="insights-table__product-text">
          ${parsePriceToBRL(price)}
        </span>
      </td>
  </tr>
`;
}

function parsePriceToBRL(price) {
  const princeInBrl = (price / 100).toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  return princeInBrl;
}
