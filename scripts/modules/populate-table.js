const productsUrl = "https://test-final.b8one.academy/products/more-sold";

export default async function initTablePopulation() {
  const data = await fetchData();
  populateTable(data.products);
}

async function fetchData() {
  const response = await (await fetch(productsUrl)).json();
  return response;
}

function populateTable(products) {
  const tbody = document.querySelector(".insights-table__body");
  const productsArrayHtml = products.map((product, index) => {
    let priceInBRL = product.price.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });

    return `
      <tr class="insights-table__trow">
          <td class="insights-table__column col-1">
              <span class="insights-table__product-indice">
              ${index + 1}
              </span>
          </td>
          <td class="insights-table__column col-2">
              <span class="insights-table__product-description">
              <img src="./assets/images/product-image-01.png" alt="${
                product.name
              }">
              ${product.name}
              </span>
          </td>
          <td class="insights-table__column col-3">
              <span class="insights-table__product-text">
              ${product.orderId}
              </span>
          </td>
          <td class="insights-table__column col-4">
              <span class="insights-table__product-text">
              ${product.department}
              </span>
          </td>
          <td class="insights-table__column col-5">
              <span class="insights-table__product-text">
              ${priceInBRL}
              </span>
          </td>
        </tr>
    `;
  });

  const productsHtml = productsArrayHtml.join(" ");

  tbody.insertAdjacentHTML("beforeend", productsHtml);
}
