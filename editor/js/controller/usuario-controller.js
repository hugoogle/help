import { UsuarioService } from "chrome-extension://cibffnhhlfippmhdmdkcfecncoaegdkh/editor/js/service/usuario-service.js";

const btnConfiguracao = document.querySelector(".wyp-button-manage");

const btnSalvarParametro = document.querySelector("#btnSalvarParametro");

btnConfiguracao.addEventListener("click", async () => {
  const response = await UsuarioService.obterParametroPorUsuario();

  console.log(response);
  //   .then(async (data) => {
  // console.table(data.json());
  // });
});

btnSalvarParametro.addEventListener("click", () => {
  debugger;
  UsuarioService.salvarParametro();
});
