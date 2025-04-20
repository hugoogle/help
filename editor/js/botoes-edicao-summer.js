(function () {
  "use strict";

  var footer = $(
    "body > div.modal.fade.bd-example-modal-lg.size-modal.show > div > div > div.modal-footer"
  );

  var pDescricao = document.createElement("p");
  pDescricao.innerText = "Redimencionar modal";

  var range = document.createElement("input");
  range.setAttribute("type", "range");
  range.setAttribute("min", "1");
  range.setAttribute("max", "100");
  range.setAttribute("value", "50");

  footer.append(pDescricao);
  footer.append(range);
})();
