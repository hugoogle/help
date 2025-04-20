const salvarHtmlCode = async () => {
  return $.ajax({
    url: "https://bluebot-help-production.up.railway.app/user-guild/html-code/salvar/elemento",
    dataType: "text",
    type: "put",
    contentType: "application/json",
    data: JSON.stringify({
      id: parseInt($("#elemento").val()),
      titulo: $("#input-field-titulo").val(),
      tabMenu: $("#pagina").val(),
      passo: $("#ordenacao-modal").val(),
      posicao: $("#posicao-modal").text(),
      code: $("#summernote").summernote("code"),
      largura: $("#rangeVal").val(),
      elemento: $("#elemento").val(),
      urlPage: $("#base-uri").val(),
    }),
    success: function (response) {
      if (response) {
        $("#ajax-alert").removeClass("alert alert-danger");
        $("#ajax-alert")
          .addClass("alert alert-success")
          .html("Código HTML alterado com sucesso!");
        $("#ajax-alert").alert();
        $("#ajax-alert").fadeIn(300).delay(2500).fadeOut(400);
      }
    },
    error: function (xhr, status, errorThrown) {
      console.log("Error status: " + status);
      console.log("Error message: " + xhr.responseText);
      var error = JSON.parse(xhr.responseText);
      var errorMessage = "";
      for (var i = 0; i < error.length; i++) {
        errorMessage += error[i].defaultMessage + "<br/>";
      }
      $("#ajax-alert").removeClass("alert alert-success");
      $("#ajax-alert")
        .addClass("alert alert-danger")
        .html("Por favor verifique:<br/>" + errorMessage);
      $("#ajax-alert").alert();
      $("#ajax-alert").fadeIn(300).delay(2500).fadeOut(400);
      console.log(errorThrown);
    },
  });
};

const obterHtmlCode = async (htmlCodeElemento, urlPage) => {
  return $.ajax({
    url: "https://bluebot-help-production.up.railway.app/user-guild/html-code/elemento-css",
    type: "GET",
    data: { htmlCodeElemento: htmlCodeElemento, urlPage: urlPage },
    success: function (data) {
      return data;
    },
    error: function (jqXhr, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
};

// const obterPassos = async (urlPage) => {
//   return await $.ajax({
//     url: "http://localhost:8080/user-guild/html-code/passos",
//     type: "GET",
//     data: { urlPage: urlPage },
//     success: function (data) {
//       return data;
//     },
//     error: function (jqXhr, textStatus, errorThrown) {
//       console.log(errorThrown);
//     },
//   });
// };

const obterPassosPorTabMenu = async (tabMenu) => {
  return await $.ajax({
    url: "https://bluebot-help-production.up.railway.app/user-guild/html-code/passosPorTab",
    type: "GET",
    data: { tabMenu: tabMenu },
    success: function (data) {
      return data;
    },
    error: function (jqXhr, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
};

const obterHtmlCodePorId = async (id, urlPage) => {
  return await $.ajax({
    url: "https://bluebot-help-production.up.railway.app/user-guild/html-code/passoPorId",
    type: "GET",
    data: { id: id, urlPage: urlPage },
    success: function (data) {
      return data;
    },
    error: function (jqXhr, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
};

const excluirHtmlCodePorId = (id) => {
  Swal.fire({
    title: "Deseja excluir este passo?",
    text: "Esta ação não poderá ser desfeita!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sim, excluir!",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: `https://bluebot-help-production.up.railway.app/user-guild/html-codes/deletar/${id}`,
        type: "DELETE",
        data: { id: id },
        success: function (data) {
          Swal.fire("Excluído!", "O passo foi excluído.", "success");

          console.log(data);

          $("#iniciar-fluxo-help").click();
        },
        error: function (jqXhr, textStatus, errorThrown) {
          console.log(errorThrown);
        },
      });
    }
  });
};

export const HtmlCodeService = {
  salvarHtmlCode,
  obterHtmlCode,
  obterHtmlCodePorId,
  obterPassosPorTabMenu,
  excluirHtmlCodePorId,
};
