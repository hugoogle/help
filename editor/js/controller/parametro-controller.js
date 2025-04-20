import { UsuarioService } from "chrome-extension://cibffnhhlfippmhdmdkcfecncoaegdkh/editor/js/service/usuario-service.js";
import { HtmlCodeService } from "chrome-extension://cibffnhhlfippmhdmdkcfecncoaegdkh/editor/js/service/html-code-service.js";
//import { DragDrop } from "chrome-extension://cibffnhhlfippmhdmdkcfecncoaegdkh/editor/js/drag-drop.js";

async function init() {
  const response = await UsuarioService.obterParametroPorUsuario();
  if (response.fixarBarrarFerramentaDireita) {
    //  DragDrop.fixarBarraFerramentaDireita();
  }
  debugger;

  document.getElementById("bordaElementoSelecionado").value =
    response.bordaElementoSelecionado;

  document.getElementById("printElementoSelecionado").value =
    response.printElementoSelecionado;

  let urlPage = document.querySelector("#base-uri").title;
  $("#fluxos").empty();
  if (urlPage === "") {
    urlPage =
      "https://erp.bluesoft.com.br/beta//erp-app/areas/core/menu-central/menu-central.index.jsp#/menu-central";
  }

  const passos = await HtmlCodeService.obterPassosPorTabMenu("");
  const selectElement = document.querySelector("#fluxos");
  debugger;
  if (passos == "") {
    const option = document.createElement("option");
    option.text = "Não há passos";
    selectElement.add(option);
    return;
  }

  passos.forEach((htmlCode) => {
    const option = document.createElement("option");
    option.value = htmlCode.id;
    option.text = htmlCode.titulo;
    selectElement.add(option);
  });
}

init();
