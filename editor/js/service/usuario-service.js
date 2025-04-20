const obterParametroPorUsuario = async () => {
  return $.ajax({
    url: "https://bluebot-help-production.up.railway.app/user-guild/parametros/Hugo",
    type: "get",
    dataType: "json",
    contentType: "application/json",
    crossDomain: true,
    source: "/:path*",
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
      "Access-Control-Allow-Headers":
        "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
    },
    success: function (response) {
      if (response.usuario) {
        $("#printElementoCheckbox").get(0).checked =
          response.printElementoSelecionado;
        $("#bordaElementoCheckbox").get(0).checked =
          response.bordaElementoSelecionado;
        $("#barraFerramentaCheckbox").get(0).checked =
          response.fixarBarrarFerramentaDireita;
        return response;
      } else {
        return obterParametroGlobal();
      }
    },
    cache: false,
  }).fail(function (jqXHR, textStatus, errorThrown) {
    $("#ajax-alert-config-padrao")
      .addClass("alert alert-danger")
      .html("Parâmetros não atualizados ocorreu um <strong>erro!</strong>");
    $("#ajax-alert-config-padrao").alert();
    $("#ajax-alert-config-padrao").fadeIn(300).delay(2500).fadeOut(400);
    console.log(errorThrown);
  });
};

const obterParametroGlobal = async () => {
  return $.ajax({
    url: "https://bluebot-help-production.up.railway.app/user-guild/parametros-global/obter",
    type: "get",
    dataType: "json",
    contentType: "application/json",
    crossDomain: true,
    //  secure: true,
    source: "/:path*",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "content-type": "aplication/json",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
      "Access-Control-Allow-Headers":
        "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
    },
    success: function (response) {
      if (response) {
        $("#printElementoCheckbox").get(0).checked =
          response.printElementoSelecionado;
        $("#bordaElementoCheckbox").get(0).checked =
          response.bordaElementoSelecionado;
        $("#barraFerramentaCheckbox").get(0).checked =
          response.fixarBarraFerramentaDireita;
        return response;
      }
    },
    cache: false,
  }).fail(function (jqXHR, textStatus, errorThrown) {
    $("#ajax-alert-config-padrao")
      .addClass("alert alert-danger")
      .html("Parâmetros não atualizados ocorreu um <strong>erro!</strong>");
    $("#ajax-alert-config-padrao").alert();
    $("#ajax-alert-config-padrao").fadeIn(300).delay(2500).fadeOut(400);
    console.log(errorThrown);
  });
};

const salvarParametro = async () => {
  return $.ajax({
    url: "https://bluebot-help-production.up.railway.app/user-guild/parametros/salvar",
    dataType: "json",
    type: "post",
    contentType: "application/json",
    data: JSON.stringify({
      usuario: "Hugo",
      printElementoSelecionado: $("#printElementoCheckbox").get(0).checked,
      bordaElementoSelecionado: $("#bordaElementoCheckbox").get(0).checked,
      fixarBarrarFerramentaDireita: $("#barraFerramentaCheckbox").get(0)
        .checked,
    }),
    success: function (response) {
      if (response) {
        debugger;
        document.getElementById("bordaElementoSelecionado").value =
          response.bordaElementoSelecionado;

        document.getElementById("printElementoSelecionado").value =
          response.printElementoSelecionado;

        $("#ajax-alert-config-padrao")
          .addClass("alert alert-success")
          .html("Parâmetros atualizados com <strong>sucesso!</strong>");
        $("#ajax-alert-config-padrao").alert();
        $("#ajax-alert-config-padrao").fadeIn(300).delay(2500).fadeOut(400);
      }
    },
    error: function (jqXhr, textStatus, errorThrown) {
      $("#ajax-alert-config-padrao")
        .addClass("alert alert-danger")
        .html("Parâmetros não atualizados ocorreu um <strong>erro!</strong>");
      $("#ajax-alert-config-padrao").alert();
      $("#ajax-alert-config-padrao").fadeIn(300).delay(2500).fadeOut(400);
      console.log(errorThrown);
    },
  });
};

export const UsuarioService = {
  obterParametroPorUsuario,
  salvarParametro,
};
