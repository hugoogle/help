import { HtmlCodeService } from "chrome-extension://cibffnhhlfippmhdmdkcfecncoaegdkh/editor/js/service/html-code-service.js";

const btnHtmlCodeSalvar = document.querySelector("#btnHtmlCodeSalvar");

btnHtmlCodeSalvar.addEventListener("click", async () => {
  const selectElement = document.querySelector("#fluxos");

  const sizeModal = document.getElementsByClassName("size-modal")[0];
  const width = sizeModal.offsetWidth;

  const passo = await HtmlCodeService.salvarHtmlCode();

  let urlPage = document.querySelector("#base-uri").title;
  if (urlPage === "") {
    urlPage =
      "https://erp.bluesoft.com.br/beta//erp-app/areas/core/menu-central/menu-central.index.jsp#/menu-central";
  }

  const passoJson = JSON.parse(passo);
  debugger;

  const alreadyExists =
    Array.from(selectElement.options).filter((option) => {
      return option.value === passoJson.id.toString();
    }).length > 0;

  if (passo !== "" && !alreadyExists) {
    selectElement.appendChild(new Option(passoJson.titulo, passoJson.id));

    var options = Array.from(selectElement.options);

    // options.sort(function (a, b) {
    //   if (a.passo < b.passo) return -1;
    //   if (a.passo > b.passo) return 1;
    //   return 0;
    // });

    selectElement.innerHTML = "";

    options.forEach(function (option) {
      selectElement.appendChild(option);
    });
    selectElement.selectedIndex = 0;
  } else {
    if (alreadyExists) {
      const selectedIndex = selectElement.selectedIndex;
      const selectedOption = selectElement.options[selectedIndex];
      selectedOption.textContent = passoJson.titulo;
    }
  }
});
