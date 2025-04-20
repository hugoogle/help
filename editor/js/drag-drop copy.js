import { HtmlCodeService } from "chrome-extension://cibffnhhlfippmhdmdkcfecncoaegdkh/editor/js/service/html-code-service.js";
$(document).ready(function () {
  var TemplaPadrao = function (context) {
    var ui = $.summernote.ui;

    // create button
    var button = ui.button({
      contents: '<i class="fa fa-pencil-square-o fa-2"/> Padrão',
      tooltip: "Padrao",
      click: function () {
        //Apicar template pronto
        context.invoke("editor.insertText", "Borda Ativa");
      },
    });
    return button.render();
  };

  var EventData = function (context) {
    debugger;
    var ui = $.summernote.ui;
    var event = ui.buttonGroup([
      ui.button({
        contents: "Alinhar Modal",
        data: {
          toggle: "dropdown",
        },
      }),
      ui.dropdown({
        items: ["Esquerda", "Direita", "Cima", "Baixo"],
        click: function (event) {
          var value = $(event.target).text();
          switch (value) {
            case "Esquerda":
              debugger;
              $("#posicao-modal")[0].innerText = "Esquerda";
              context.invoke("editor.insertText", "left");

              break;
            case "Direita":
              $("#posicao-modal")[0].innerText = "Direita";
              context.invoke("editor.insertText", "right");

              break;
            case "Cima":
              $("#posicao-modal")[0].innerText = "Cima";
              context.invoke("editor.insertText", "topa");

              break;
            case "Baixo":
              $("#posicao-modal")[0].innerText = "Baixo";
              context.invoke("editor.insertText", "bottom");

              break;
          }
        },
      }),
    ]);

    return event.render();
  };

  $("#summernote").summernote({
    lang: "pt-BR",
    placeholder: "Hello stand alone ui",
    tabsize: 2,
    height: 120,
    toolbar: [
      ["style", ["style"]],
      ["font", ["bold", "underline", "clear"]],
      ["color", ["color"]],
      ["para", ["ul", "ol", "paragraph"]],
      ["table", ["table"]],
      ["insert", ["link", "picture", "video"]],
      ["view", ["fullscreen", "codeview", "help"]],
      ["mybutton", ["padrao", "posicao"]],
      ["eventButton", ["event"]],
    ],
    buttons: {
      padrao: TemplaPadrao,
      event: EventData,
    },
    // callbacks: {
    //   onChange: function (contents, $editable) {
    //     var markup = $("#summernote").summernote("code");
    //   },
    //},
  });
});

//fecha modal

function fecharModalImagem() {
  $(".modal .note-modal").modal("hide");
}

$("#markAllCheckbox").click(function () {
  checkElements();
});
const elementos = [];

var elementLocatorOnOff = !1;
var markAllElementsOnOff = !1;
var currentLocationHref;
var currentPageElements = [];
var currentCheckElements = [];
var contextMenuID;
var currentElement;
var contentDocument;
// const wrapper = document.querySelector(".wyp-disable-cancel"),
//   header = wrapper.querySelector(".ed-pnl-top");

// function onDrag({ movementX, movementY }) {
//   let getStyle = window.getComputedStyle(wrapper);
//   let leftVal = parseInt(getStyle.left);
//   let topVal = parseInt(getStyle.top);
//   wrapper.style.left = `${leftVal + movementX}px`;
//   wrapper.style.top = `${topVal + movementY}px`;
// }

// header.addEventListener("mousedown", () => {
//   header.classList.add("active");
//   header.addEventListener("mousemove", onDrag);
// });

// document.addEventListener("mouseup", () => {
//   header.classList.remove("active");
//   header.removeEventListener("mousemove", onDrag);
// });

// $(function () {
//   $("#draggable").draggable();
// });

var objSelecionado = null;
var mouseOffset = null;
function addEvent(obj, evType, fn) {
  if (typeof obj == "string") {
    if (null == (obj = document.getElementById(obj))) {
      throw new Error(
        "Elemento HTML não encontrado. Não foi possível adicionar o evento."
      );
    }
  }
  if (obj.attachEvent) {
    return obj.attachEvent("on" + evType, fn);
  } else if (obj.addEventListener) {
    return obj.addEventListener(evType, fn, true);
  } else {
    throw new Error(
      "Seu browser não suporta adição de eventos. Senta, chora e pega um navegador mais recente."
    );
  }
}
function mouseCoords(ev) {
  if (typeof ev.pageX !== "undefined") {
    return { x: ev.pageX, y: ev.pageY };
  } else {
    return {
      x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
      y: ev.clientY + document.body.scrollTop - document.body.clientTop,
    };
  }
}
function getPosition(e, ev) {
  var ev = ev || window.event;
  if (e.constructor == String) {
    e = document.getElementById(e);
  }
  var left = 0,
    top = 0;
  var coords = mouseCoords(ev);

  while (e.offsetParent) {
    left += e.offsetLeft;
    top += e.offsetTop;
    e = e.offsetParent;
  }
  left += e.offsetLeft;
  top += e.offsetTop;
  return { x: coords.x - left, y: coords.y - top };
}

function dragdrop(local_click, caixa_movida) {
  //local click indica quem é o cara que quando movido, move o caixa_movida
  if (local_click.constructor == String) {
    local_click = document.getElementById(local_click);
  }
  if (caixa_movida.constructor == String) {
    caixa_movida = document.getElementById(caixa_movida);
  }

  local_click.style.cursor = "move";
  if (!caixa_movida.style.position || caixa_movida.style.position == "static") {
    caixa_movida.style.position = "relative";
  }
  local_click.onmousedown = function (ev) {
    objSelecionado = caixa_movida;
    mouseOffset = getPosition(objSelecionado, ev);
    if (mouseOffset < 0) {
      objSelecionado.style.margin = "50px";
    }
  };
  document.onmouseup = function () {
    objSelecionado = null;
  };
  document.onmousemove = function (ev) {
    if (objSelecionado) {
      var ev = ev || window.event;
      var mousePos = mouseCoords(ev);
      var pai = objSelecionado.parentNode;

      //as variáveis w e h definem a posição do(s) objeto(s) movido(s)

      var w = mousePos.x - mouseOffset.x - pai.offsetLeft;
      var h = mousePos.y - mouseOffset.y - pai.offsetTop;

      //as variáveis areaHorizontal e areaVertical definem a área maxima, onde o objeto será movido (nesse caso é a area maxima do browser)

      var areaHorizontal =
        document.body.clientWidth - objSelecionado.clientWidth - 2;
      var areaVertical =
        document.body.clientHeight - objSelecionado.clientHeight - 2;

      objSelecionado.style.left = w + "px";
      objSelecionado.style.top = h + "px";

      //essa é a estrutura de condição que reposiciona o objeto movido para não ultrapassar a área máxima
      if (w >= areaHorizontal) {
        objSelecionado.style.left = areaHorizontal;
      }
      if (w <= 0) {
        objSelecionado.style.left = 0;
      }
      if (h >= areaVertical) {
        objSelecionado.style.top = areaVertical;
      }
      if (h <= 0) {
        objSelecionado.style.top = 0;
      }

      objSelecionado.style.margin = "0px";
      return false;
    }
  };
}

dragdrop("movedor", "movido");

debugger;
var fixo = 1;
$(".wyp-save-btn").click(function () {
  debugger;
  fixarBarraFerramentaDireita();
});

const fixarBarraFerramentaDireita = () => {
  debugger;
  $(".bl-bluesoft-help").toggleClass("wyp-fix-pan");

  if (fixo === 1) {
    fixo = 0;
    var iframe = $("#iframe").width() - $("#movido").width();
    $("#iframe").css("width", iframe);
    $("#movido").height(document.getElementById("iframe").offsetHeight - 48);
    $("#w-maximizar-painel")[0].className = "fa fa-window-restore fa-1x";
  } else {
    var iframe = $("#iframe").width() + $("#movido").width();
    $("#iframe").css("width", iframe);
    $("#movido").height("auto");
    $("#w-maximizar-painel")[0].className = "fa fa-window-maximize fa-1x";
    fixo = 1;
  }
};

window.onresize = function (event) {
  if (fixo === 0) {
    var a = window.innerWidth - $("#movido").width();
    $("#iframe").css("width", a);
    $("#movido").height(document.getElementById("iframe").offsetHeight - 48);
  } else {
    $("#iframe").css("width", screen.width);
    $("#movido").height("auto");
  }
};

$("#rangeVal").change(function (newVal) {
  debugger;
  console.log("aaaaaaaaa");
  const percentual = newVal + "%";
  $(".size-modal").css("max-width", percentual);
});

$("#iniciar-fluxo-help").click(function (event) {
  event.currentTarget.innerText = "Iniciado...";
  start();

  if (event.currentTarget.innerText === "Iniciado...") {
    debugger;

    document
      .getElementsByClassName("yellow_pencil_iframe")
      .iframe.contentWindow.document.querySelector("#menu")
      .contentWindow.document.querySelector("#tab-iframe-2")

      .contentWindow.document.addEventListener(
        "mouseover",
        onMouseHoverElement
      );
    document
      .getElementsByClassName("yellow_pencil_iframe")
      .iframe.contentWindow.document.querySelector("#menu")
      .contentWindow.document.querySelector("#tab-iframe-2")

      .contentWindow.document.addEventListener("mousedown", onClickElement);
  }
});

function ajustarLayout(element) {
  debugger;

  const a = $(".introjs-helperLayer").position();
  a.top = a.top + 33;
  a.left = a.left + 45;
  $(".introjs-helperLayer").css("top", a.top + "px");
  $(".introjs-helperLayer").css("left", a.left + "px");

  const b = $(".introjs-tooltipReferenceLayer").position();
  b.top = b.top + 33;
  b.left = b.left + 45;
  $(".introjs-tooltipReferenceLayer").css("top", b.top + "px");
  $(".introjs-tooltipReferenceLayer").css("left", b.left + "px");

  const c = $(".introjs-tooltip").position();
  c.top = c.top + 3;

  $(".introjs-tooltip").css("top", c.top + "px");
}

function pausarInspensacao() {
  return document.getElementById("pausarInspencaoCheckbox").checked;
}

function marcaTodosElementosSelecionados() {
  return document.getElementById("markAllCheckbox").checked;
}

function ElementLocator(
  xpath,
  cssSelector,
  tagName,
  id,
  className,
  innerText,
  baseURI,
  attributes
) {
  this.xpath = xpath;
  this.cssSelector = cssSelector;
  this.tagName = tagName;
  this.id = id;
  this.className = className;
  this.innerText = innerText;
  this.baseURI = baseURI;
  this.attributes = attributes;
}
function ElementsLocatorObj(
  locationHref,
  turnOnOff,
  elementLocator,
  checkElements
) {
  this.turnOnOff = turnOnOff;
  this.locationHref = locationHref;
  this.elementLocator = elementLocator;
  this.checkElements = checkElements;
}
function sendRunTimeMessage(message) {
  chrome.tabs.query({ active: !0, currentWindow: !0 }, function (tabs) {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, message);
    }
  });
}
function ElementAttribute(name, value, updateDate) {
  this.name = name;
  this.value = value;
  this.updateDate = updateDate;
}
function CheckElement(
  elementLocator,
  isExist,
  unMachAttributes,
  xpathIsDuplicated,
  cssSelectorIsDuplicated
) {
  this.elementLocator = elementLocator;
  this.isExist = isExist;
  this.unMachAttributes = unMachAttributes;
  this.xpathIsDuplicated = xpathIsDuplicated;
  this.cssSelectorIsDuplicated = cssSelectorIsDuplicated;
}

function rangeSize() {
  debugger;
  const footer = $(
    "body > div.modal.fade.bd-example-modal-lg.show > div > div > div.modal-footer"
  );

  const element = document.getElementById("rangeVal");
  if (element == null) {
    var pDescricao = document.createElement("p");
    pDescricao.setAttribute("class", "p-size-summer");
    pDescricao.innerText = "Redimencionar em ";
    var percentual = document.createElement("span");
    percentual.setAttribute("id", "percentual");
    percentual.innerText = "%";

    var range = document.createElement("input");
    range.setAttribute("class", "range-size-summer");
    range.setAttribute("id", "rangeVal");
    range.setAttribute("name", "rangeVal");
    range.setAttribute("step", "1");
    range.setAttribute("type", "range");
    range.setAttribute("min", "35");
    range.setAttribute("max", "100");
    range.setAttribute("value", "100");
    range.setAttribute(
      "oninput",
      "document.getElementById('rangeValLabel').innerHTML = this.value + document.getElementById('percentual').innerText;"
    );

    // range.setAttribute("onchange", "display.value=value");

    var size = document.createElement("label");
    size.setAttribute("id", "rangeValLabel");
    size.setAttribute("for", "rangeVal");
    size.setAttribute("class", "p-result-summer");
    size.innerText = "100%";

    pDescricao.appendChild(range);
    pDescricao.append(size);
    pDescricao.append(percentual);

    range.setAttribute(
      "onchange",
      "document.getElementsByClassName('size-modal')[0].style.width = this.value + document.getElementById('percentual').innerText;"
    );
    footer.append(pDescricao);
  }
}

function addImageBorda(img, width) {
  // img.style.borderColor = "red";
  // img.style.borderStyle = "solid";
  // img.style.widht = widht;
  img.setAttribute("borderColor", "red");
  //  img.setAttribute("border-block-style", "revert");
  img.setAttribute("border-style", "solid");
  img.setAttribute("border-width", "2px");
  img.setAttribute("widht", width);
}

var currentElement;
function onMouseHoverElement(event) {
  if (!pausarInspensacao()) {
    if (event === undefined) event = window.event;
    var target = "target" in event ? event.target : event.srcElement;
    var tooltip = document.createElement("span");
    tooltip.setAttribute("locator-data-tooltip", target.tagName);
    tooltip.setAttribute("data-html2canvas-ignore", "data-html2canvas-ignore");

    target.appendChild(tooltip);
    markElementTemp(target);
    elementoSelecionado(target);

    target.addEventListener("mouseout", function () {
      unMarkAllTempElements();
      if (tooltip.parentNode) {
        target.removeChild(tooltip);
      }
    });
  }
}

function borderElement() {
  return document.getElementById("bordaElementoSelecionado").value == "true"
    ? ";border-style:solid;border-color:red"
    : "";
}

function printElement(img, width) {
  return document.getElementById("printElementoSelecionado").value == "true"
    ? "<img src='" +
        img.src +
        "' " +
        "style=width:" +
        width +
        borderElement() +
        "> </img>"
    : "";
}

function onClickElement(event) {
  debugger;

  if (!pausarInspensacao()) {
    if (event === undefined) event = window.event;

    var t = "target" in event ? event.target : event.srcElement;

    delete t.__jsaction;

    t.classList.remove("marked-element-temp");
    var elo = new ElementsLocatorObj(
      location.href,
      null,
      new ElementLocator(
        getXPath(t),
        getCssPath(t),
        t.tagName,
        t.id,
        t.className,
        t.innerText,
        t.baseURI,
        getElementAttributes(t)
      )
    );

    //alert(positionXY(elo.elementLocator.cssSelector));

    var coords = getAbsPosition(
      document
        .getElementsByClassName("yellow_pencil_iframe")
        .iframe.contentWindow.document.querySelector("#menu")
        .contentWindow.document.querySelector("#tab-iframe-2")
        .contentWindow.document.querySelector(elo.elementLocator.cssSelector)
    );
    // alert(coords.x);
    // alert(coords.y);

    var brnModal = document.querySelector(
      'button[data-target=".bd-example-modal-lg"]'
    );
    brnModal.click();
    getCode();

    async function getCode() {
      try {
        const htmlCode = await HtmlCodeService.obterHtmlCode(
          elo.elementLocator.cssSelector
        );
        if (htmlCode !== "") {
          console.log(htmlCode);

          $("#summernote").summernote("code", htmlCode.code);
          $("#input-field-titulo").val(htmlCode.titulo);
          $("#posicao-modal").text(htmlCode.posicao);
          $("#summernote").summernote("code");
          $("#rangeVal").val(htmlCode.largura);
          $("#rangeValLabel").text(htmlCode.largura);
          const percentual = htmlCode.largura + "%";
          $(".size-modal").css("max-width", percentual);
        } else {
          console.log("O HTML retornado é nulo.");

          $("#input-field-titulo").val("");
          $("#posicao-modal").text("Baixo");

          $("#rangeVal").val(80);
          $("#rangeValLabel").text(80);
          $(".size-modal").css("max-width", "80%");

          // HtmlCodeService.obterHtmlCode(elo.elementLocator.cssSelector).then(
          //   async function (htmlCode) {

          //     console.log(htmlCode);
          //     await $("#summernote").summernote("code", htmlCode.code);
          //   }
          // );

          console.log(t.innerHTML);

          // html2canvas(
          //   document
          //     .getElementById("iframe")
          //     .contentWindow.document.querySelector(elo.elementLocator.cssSelector),
          //   {
          //     onrendered: function (canvas) {
          //       var img = document.createElement("img");
          //       img.src = canvas.toDataURL("image/png");
          //       $("#summernote").summernote("code", img);
          //     },
          //   }
          // );
          //   element.style.height = "50px";
          debugger;
          var element = document
            .getElementsByClassName("yellow_pencil_iframe")
            .iframe.contentWindow.document.querySelector("#menu")
            .contentWindow.document.querySelector("#tab-iframe-2")
            .contentWindow.document.querySelector(
              elo.elementLocator.cssSelector
            );

          if (element.type === "select-one" || element.type === "text") {
            element.style.height = "25px";
          }

          html2canvas(element).then((canvas) => {
            debugger;
            var width = 0;
            var summer = $("#summernote").summernote("code");
            var maxwidht = $("#note-editor");
            var img = document.createElement("img");
            img.src = canvas.toDataURL("image/png");

            console.log("zxc" + img.width);

            if (element.clientWidth > $(".modal-content").width()) {
              width = "100%";
            } else {
              width = element.clientWidth;
            }

            //adiciona o mesmo elemento ja clicado
            //      var doc = summer + printElement(img, width);

            var doc = printElement(img, width);

            $("#summernote").summernote("code", doc);

            rangeSize();
          });

          $("#elemento").val(elo.elementLocator.cssSelector);
          $("#base-uri").val(elo.elementLocator.baseURI);

          elementos.push(elo.elementLocator);
          console.table(elementos);
          currentElement = t;
          sendMessage(elo);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}

const showVal = (newVal) => {
  const percentual = newVal + "%";
};

function positionXY(x) {
  var o = document
    .getElementById("iframe")
    .contentWindow.document.querySelector(x);
  var l = o.offsetLeft;
  var t = o.offsetTop;
  while ((o = o.offsetParent)) l += o.offsetLeft;
  o = document
    .getElementsByClassName("yellow_pencil_iframe")
    .iframe.contentWindow.document.querySelector("#menu")
    .contentWindow.document.querySelector("#tab-iframe-2")
    .contentWindow.document.querySelector(x);
  while ((o = o.offsetParent)) t += o.offsetTop;
  return [l, t];
}

function getAbsPosition(element) {
  var rect = element.getBoundingClientRect();
  return { x: rect.left, y: rect.top };
}

function getElementAttributes(element) {
  var attributes = [];
  var elementAttributeNames = element.getAttributeNames();
  for (var index = 0; index < elementAttributeNames.length; index++) {
    if (
      elementAttributeNames[index] == "class" &&
      element.getAttribute(elementAttributeNames[index]) == ""
    ) {
      continue;
    }
    attributes.push(
      new ElementAttribute(
        elementAttributeNames[index],
        element.getAttribute(elementAttributeNames[index])
      )
    );
  }
  return attributes;
}
function getXPath(el) {
  var element = el;
  delete element.__jsaction;

  if (element.id !== undefined && element.id !== "") {
    var xpathWithId = '//*[@id="' + element.id + '"]';
    return xpathWithId;
  }
  if (element === document.body && element.id !== undefined)
    return element.tagName.toLowerCase();
  var ix = 0;

  if (element.id !== undefined) {
    var siblings = element.parentNode.childNodes;

    for (var i = 0; i < siblings.length; i++) {
      var sibling = siblings[i];
      if (sibling === element) {
        var selector =
          getXPath(element.parentNode) +
          "/" +
          element.tagName.toLowerCase() +
          "[" +
          (ix + 1) +
          "]";

        return selector.replace("undefined/", "");
      }

      if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
        ix++;
      }
    }
  }
}
function getElementsByXPath(xpath, parent) {
  let results = [];
  let query = document.evaluate(
    xpath,
    parent || document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
  );
  for (let i = 0, length = query.snapshotLength; i < length; ++i) {
    results.push(query.snapshotItem(i));
  }
  return results;
}
function getCssPath(el) {
  // var el = document.createElement("my-custom-element");

  // el = element;
  delete el.__jsaction;

  //if (!(el instanceof Element)) return;
  var path = [];
  while (el.nodeType === Node.ELEMENT_NODE) {
    var selector = el.nodeName.toLowerCase();
    if (el.id) {
      selector += "#" + el.id;
      path.unshift(selector);
      break;
    } else {
      var sib = el,
        nth = 1;
      while ((sib = sib.previousElementSibling)) {
        if (sib.nodeName.toLowerCase() == selector) nth++;
      }
      if (nth != 1) selector += ":nth-of-type(" + nth + ")";
    }
    path.unshift(selector);
    el = el.parentNode;
  }
  return path.join(" > ");
}
function checkVisible(elm) {
  if (elm) {
    var rect = elm.getBoundingClientRect();
    var viewHeight = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight
    );
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
  }
}

function elementoSelecionado(element) {
  if (element) {
    $("#elemento-point")[0].innerText =
      element.tagName + " > " + element.innerText.split("\n")[0].trim();
  }
}

function markElement(element) {
  if (element) {
    element.classList.add("marked-element");
  }
}
function markElementTemp(element) {
  if (element) {
    element.classList.add("marked-element-temp");
  }
}
function markElementSuccess(element) {
  if (element) {
    element.classList.add("mark-successfully");
  }
}
function markAllElement(element) {
  if (element) {
    element.classList.add("marked-element");
  }
}
function unMarkElement(element, isTemp) {
  if (element) {
    if (isTemp) {
      element.classList.remove("mark-successfully");
      element.classList.remove("marked-element-temp");
    } else {
      element.classList.remove("marked-element");
    }
    if (element.getAttribute("class") == "") {
      element.removeAttribute("class");
    } else {
      element.setAttribute("class", element.getAttribute("class").trim());
    }
  }
}
function unMarkElements(elementArr, isTemp) {
  for (var index = 0; index < elementArr.length; index++) {
    unMarkElement(elementArr[index], isTemp);
  }
}
function unMarkAllTempElements() {
  unMarkElements(
    document
      .getElementsByClassName("yellow_pencil_iframe")
      .iframe.contentWindow.document.querySelector("#menu")
      .contentWindow.document.querySelector("#tab-iframe-2")
      .contentWindow.document.querySelectorAll(
        '*[class*="marked-element-temp"]'
      ),
    !0
  );
  unMarkElements(
    document
      .getElementsByClassName("yellow_pencil_iframe")
      .iframe.contentWindow.document.querySelector("#menu")
      .contentWindow.document.querySelector("#tab-iframe-2")
      .contentWindow.document.querySelectorAll('*[class*="mark-successfully"]'),
    !0
  );
}
function unMarkAllMarks() {
  var markElements = document.getElementsByClassName("yellow_pencil_iframe");
  if (markElements.length > 0 && markElements[0].iframe) {
    markElements[0].iframe.contentWindow.document
      .querySelector("#menu")
      .contentWindow.document.querySelector("#tab-iframe-2")
      .contentWindow.document.querySelectorAll('*[class*="marked-element"]');
    for (var index = 0; index < markElements.length; index++) {
      unMarkElement(markElements[index]);
    }
    var markElementsTemp = document
      .getElementsByClassName("yellow_pencil_iframe")
      .iframe.contentWindow.document.querySelector("#menu")
      .contentWindow.document.querySelector("#tab-iframe-2")
      .contentWindow.document.querySelectorAll(
        '*[class*="marked-element-temp"]'
      );
    for (var index = 0; index < markElementsTemp.length; index++) {
      unMarkElement(markElementsTemp[index], !0);
    }
    var markElementsSuccess = document
      .getElementsByClassName("yellow_pencil_iframe")
      .iframe.contentWindow.document.querySelector("#menu")
      .contentWindow.document.querySelector("#tab-iframe-2")
      .contentWindow.document.querySelectorAll('*[class*="mark-successfully"]');
    for (var index = 0; index < markElementsSuccess.length; index++) {
      unMarkElement(markElementsSuccess[index], !0);
    }
  }
}

function getElementsCheckResults(checkElements) {
  for (var index = 0; index < checkElements.length; index++) {
    var elementCheck = checkElements[index];
    var elementInPage = document.querySelectorAll(
      elementCheck.elementLocator.cssSelector
    );
    elementCheck.isExist = elementInPage.length > 0 ? !0 : !1;
    elementCheck.cssSelectorIsDuplicated = elementInPage.length > 1 ? !0 : !1;
    var elementsInPageWithXpath = getElementsByXPath(
      elementCheck.elementLocator.xpath,
      document.getElementById("iframe").contentWindow.document
    );
    elementCheck.xpathIsDuplicated =
      elementsInPageWithXpath.length > 1 ? !0 : !1;
    checkElements[index] = elementCheck;
  }
  sendMessage(new ElementsLocatorObj(location.href, null, null, checkElements));
}
function showElementOnPage(elementLocator) {
  unMarkAllTempElements();
  if (currentElement) {
    markElementSuccess(currentElement);
    currentElement = null;
  } else {
    var element = document
      .getElementsByClassName("yellow_pencil_iframe")
      .iframe.contentWindow.document.querySelector("#menu")
      .contentWindow.document.querySelector("#tab-iframe-2")
      .contentWindow.document.querySelector(elementLocator.cssSelector);
    if (element) {
      markElementTemp(element);
      if (!checkVisible(element)) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
    }
  }
}

function sendMessage(el) {
  // if (eventPageMessage.turnOnOff == !0) {
  //   document.addEventListener("mouseover", onMouseHoverElement);
  //   document.addEventListener("mousedown", onClickElement);
  // } else if (eventPageMessage.turnOnOff == !1) {
  //   document.removeEventListener("mouseover", onMouseHoverElement);
  //   document.removeEventListener("mousedown", onClickElement);
  // }

  if (el) {
    if (el.elementLocator.cssSelector) {
      showElementOnPage(el.elementLocator);
    } else if (el.elementLocator.length) {
      if (currentElement) {
        markElementSuccess(currentElement);
        currentElement = null;
      }
    }
  } else {
    unMarkAllMarks();
  }
  // if (checkElements) {
  //   getElementsCheckResults(checkElements);
  // }
}

$("#markAllCheckbox").on("click", checkElements());

function checkElements() {
  if (marcaTodosElementosSelecionados()) {
    getElements();
  } else {
    unMarkAllMarks();
  }
}
function getElements() {
  currentCheckElements = null;
  currentPageElements = elementos ? elementos : [];

  if (currentPageElements) {
    for (var i = 0; i < currentPageElements.length; i++) {
      markElement(
        document
          .getElementsByClassName("yellow_pencil_iframe")
          .iframe.contentWindow.document.querySelector("#menu")
          .contentWindow.document.querySelector("#tab-iframe-2")
          .contentWindow.document.querySelector(
            currentPageElements[i].cssSelector
          )
      );
    }
    currentElement = null;
  }

  // var currentElem = currentElement ? currentElement : null;
  // var checkElements = [];
  // for (var index = 0; index < currentPageElements.length; index++) {
  //   checkElements.push(new CheckElement(currentPageElements[index]));
  // }

  // sendMessage(checkElements);
  // sendRunTimeMessage(
  //   new ElementsLocatorObj(
  //     null,
  //     elementLocatorOnOff,
  //     markAllElementsOnOff ? currentPageElements : currentElem,
  //     checkElements
  //   )
  // );
  // currentElement = null;
  // updateBadge();
}

function criarTabela(conteudo) {
  var tabela = document.getElementById("elementsTable");
  var tbody = document.getElementById("elementsTableBody");
  var thd = function (i) {
    return i == 0 ? "td" : "td";
  };

  for (var i = 0; i < conteudo.length; i++) {
    var tr = document.createElement("tr");
    for (var o = 0; o < conteudo[i].length; o++) {
      var t = document.createElement(thd(i));
      var texto = document.createTextNode(conteudo[i][o]);
      t.appendChild(texto);
      tr.appendChild(t);
    }
    tbody.appendChild(tr);
  }
  tabela.appendChild(tbody);
  return tabela;
}

function start() {
  var intro = introJs();
  intro.setOptions({
    doneLabel: "Fim",
    nextLabel: "Proximo &rarr;",
    prevLabel: "&larr; Voltar",
    // skipLabel: 'Fechar',
    tooltipPosition: "bottom",
    exitOnEsc: true,
    showStepNumbers: true,
    keyboardNavigation: true,
    scrollToElement: false,
    showButtons: true,
    stepNumbersOfLabel: "/",
    overlayOpacity: 0.6,
    positionPrecedence: ["bottom", "top", "right", "left"],
    // tooltipClass: "customTooltip",

    steps: [
      {
        element: document
          .getElementsByClassName("yellow_pencil_iframe")
          .iframe.contentWindow.document.querySelector("#menu")
          .contentWindow.document.querySelector("#tab-iframe-2")
          .contentDocument.querySelector("#tab-gerada > a"),
        // document
        //   .getElementById("menu")
        //   .contentWindow.document.querySelector("#tab-gerada > a"),

        // var doc = document
        // .getElementById("tab-iframe-2");

        intro:
          'Bem Vindo ao <span style="color: #007bff"><b>Bluesoft-Time</b></span>, ao clicar sobre o botão <i>"Proximo"</i> iremos te guiar pelo site',
        width: "800px",
        position: "rigth",
      },

      {
        element: document
          .getElementById("iframe")
          .contentWindow.document.querySelector("#tab-gerada > a"),
        intro:
          'Bem Vindo ao <span style="color: #007bff"><b>Bluesoft-Time</b></span>, ao clicar sobre o botão <i>"Proximo"</i> iremos te guiar pelo site',
        width: "800px",
      },
      {
        intro:
          '<p><br></p><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABSIAAABQCAYAAAAN+gtKAAAAAXNSR0IArs4c6QAAIABJREFUeF7tnQl4VdW5/r+EQCAQQhIwzAgCMqhMToAVERUqQ7HFlqtWe60oBUWtehEQUVHEgoKK1lZr1ar//nvVCjJpsa1WIULDpDIpCIhMYQghc0Jyn3fFdbrOZu9z9jk5U8551/PkSbL3Gn97rX3Ofvf3fSuppqamRphIgARIgARIgARIgARIgARIgARIgARIgARIgARIIIwEkihEhpEuqyYBEiABEiABEiABEiABEiABEiABEiABEiABElAEKERyIpAACZAACZAACZAACZAACZAACZAACZAACZAACYSdAIXIsCNmAyRAAiRAAiRAAiRAAiRAAiRAAiRAAiRAAiRAAhQiOQdIgARIgARIgARIgARIgARIgARIgARIgARIgATCToBCZNgRswESIAESIAESIAESIAESIAESIAESIAESIAESIAEKkZwDJEACJEACJEACJEACJEACJEACJEACJEACJEACYSdAITLsiNkACZAACZAACZAACZAACZAACZAACZAACZAACZAAhUjOARIgARIgARIgARIgARIgARIgARIgARIgARIggbATiJoQeWDBfCndvl06zpkrKVnZYR8oGyABEiABXwTKvtoh+2Y/JJmjfyTZ1/6MsEiABEjAJwHeMzhBSIAESIAESIAESIAESCBwAhQiA2fGEiRAAnFIgKJCHF5UDokEwkiA94wwwmXVJEACJEACJEACJEACcUsgokJkdWmJfPfYbMkcNUbKv90rJZs2Ss7EyXLgqd9Izq9ul8bdusctaA6MBEggNgkU5a6R40uXqHvRvkcfljN+cbO6P1Xs+1ba3H1vbHaavSIBEogaAd4zooaeDZMACZAACZAACZAACcQBgYgKkdp6oLqk5DR02T/7L7pDxsGE4hBIoL4RQJiIk59+clq3U1q2YuiI+nYx2V8SiAAB3jNCD3n//v2ya9cuOX78uJw8eVKaN28u2dnZ0qVLF8nJyQl9g3WscdOmTZKfny8FBQWqpoyMDMnKypLevXtL48aN61g7i5MACZAACZAACZBAfBMISIgsKyuTRx99VFauXKmotGnTRp555hnp3LmzfPPNNzJlyhQ5cOCAh9iIESPkgQceOO1LmSlIUoCM7wnG0QVPQK+phx9+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LQoXl02GnwBEUogPwYiY4epdZX6+IGZkUk34BdxwjYH1koATgZrkZElt315SWtTGRIyFhJdukYpnGwvjZR8SiwBetMEiK9qfc9u3b1eeB3pDOHMTnVBckUDjKvtr05/QifL+8gR6PpA6/fWf570JQIhErMxIGFbgJTdESKy7SLTHa00CJEACJBC7BHYfKZX1ewpl3/Eyqe82D5VVNdIqvZGc2z5dzmufLknuNEh1cYISImP3srJnJEACJEACJEACJEACsU4A7uHffPON2iAKP4hfmCgp1CJpIIKlWzE0lHXG4nVF/FyEKYiEVTAEd8xxWtnH4kxgn0iABEiABKJBgEJkNKizTRIgARIgARIgARJIcAJwEUfIH4hCkQjbkuC4OXwLAcQSP+ecc8iFBEiABEiABEggwgQoREYYOJsjARIgARIgARIgARIgARIgARIgARIgARIggUQkQCEyEa86x0wCJEACJEACJEACJEACJEACJEACJEACJEACESZAITLCwNkcCZAACZAACZAACZAACZAACZAACZAACZAACSQiAQqRiXjVOWYSIAESIAESIAESIAESIAESIAESIAESIAESiDABCpERBs7mSIAESIAESIAESIAESIAESIAESIAESIAESCARCURNiPzXpp1y85w3T2P+8vTr5Ad9zjrteGl5pUxZ8Jbc+MML5Zv9R+Xr747II7dc7ZXvtRVrbY/rTKhj+u+Wym0/GqQO3Tj7dTl+ssSrjpm/GK7aiEQyx2Q3Zn990OX/ueFrr6z/deUA6dqupWIx5dohMnn+X+Th71nNemm5PHfvT6VlRlN/1fM8CZAACZAACZAACZAACZAACZAACZAACZAACYSMQFSFyEdf/UDemHVjwKKYP8HRic62PYfkd4tXy5zbRsmeg8dkysK35Zm7fiI9OuWEDGggFYVKiISI6SSeHjlR7BEi8wuKJFjmgYyLeUmABEiABEiABEiABEiABEiABEiABEiABEjASsCVEHnqVLW8tHSNK3q3jBooDRok+80Li0gnUezBl5ar8rB4RL57nn1Xfj91vDz39scei0gc33u4QHZ9d0RgAYi8WqDUVoBtW7WQLbsPesROlIE1JUQ7iJK+hEj04f/9LU/1Q9ePMtqK8rJ+XeWZu8dJk9SGqo/aulPnxbFFb32syq/fsU/M/Lru/t3bq/O3j7tUWYGi/7Nfed+rTbOeszvleFmBaiHTToi0srh7/FCZ9YcVHl6wmNQMr79ygFw9qLdc//Br6nyXdi09zOw4+L24zEACJEACJEACJEACJEACJEACJEACJEACJEACFgKuhEiU+WpfvkyY+2f5Lr/AFmK7Vi3kxfvHS7f2rVxBtnPNzkxPk9dm3iCdWmcpF+qfj7hA/rRynXKlxjHTNXvR2/9SeVu2aKYEtAduusrjsg0hEscgsJmWghDVrrzgbCX6maKi2WG4hrdq0Uy0CzPOwbV52o1XKSFUi36oC2Lehb06eQRN3Ufk6dw2Wwmo1j6iPi3AHikoUsLmk3eMVV2AeAhxE0mPFX/reqyWm3au2VpEXL76y9Ncs02LSJx/4295SnBs2riRak+PDf3A9Zn8k0vl8dc+UK7cmgNcvKNlQepqYjETCZAACZAACZAACZAACZAACZAACZAACZBATBJwLUT6EiMDFSFRly+LSJyHS7EpJlpjRKK8tkjUoiDK6biIWpzUsRdR37TfLpHHfzVGuYL7sog0BT5t4Wi6OJtCHPqhBURYR2pLRAieWnDUQh9E0b+t264mAiw4rWPS1pB6pqBtsx5rXMdALCIhIFqFSM2wuKzC476NsYENhNj5d1wjj7y8QhCDUnOIyVnMTpEACZAACZAACZAACZAACZAACZAACZAACcQ8gYCESDsxMhgR0o0QqS0WR1zc01a0C1SIRH6IgHqDG3+u2aYYCnflhXf+WImMVovAUAqRdhvw+BJswy1E6k1ttCgMDk6bCcX8TGcHSYAESIAESIAESIAESIAESIAESIAESIAEokogYCHSFCPxdyDu2OZI/QlsenfrN/+Wp6wCz+/RMWDXbLhra4tIiIhI2lXblxBpbmqDMnBb/tkV/eX/r1rv5ZqNc9ddOcDRNdvOIhJlnFyztQu21cXbKZZmqIRIPUY71+xXV6xVm/voPOAXzA7fUZ3lbJwESIAESIAESIAESIAESIAESIAESIAESCDqBIISIrUYid9uY0JaR2oXIxJ5rr28n+QfP+kR/LRg+JtJP/LarGbZ6i9VldgIxm6zGtM1G4KdFja1W7VTjEi9qcz//n3DaRvHmJaB5oYuTpvV2AmREPEC3awmVEKkEmJnvy6wMtWb1Wj3dqex2W2gE/VZyw6QAAmQAAmQAAmQAAmQAAmQAAmQAAmQAAnUOwJBC5H1bqTsMAmQAAmQAAmQAAmQAAmQAAmQAAmQAAmQAAmQQNQIUIiMGno2TAIkQAIkQAIkQAIkQAIkQAIkQAIkQAIkQAKJQ4BCZOJca46UBEiABEiABEiABEiABEiABEiABEiABEiABKJGgEJk1NCzYRIgARIgARIgARIgARIgARIgARIgARIgARJIHAIUIhPnWnOkJEACJEACJEACJEACJEACJEACJEACJEACJBA1AhQio4aeDZMACZAACZAACZAACZAACZAACZAACZAACZBA4hCgEJk415ojJQESIAESIAESIAESIAESIAESIAESIAESIIGoEaAQGTX0bJgESIAESIAESIAESIAESIAESIAESIAESIAEEocAhcjEudYcKQmQAAmQAAmQAAmQAAmQAAmQAAmQAAmQAAlEjQCFyKihZ8MkQAIkQAIkQAIkQAIkQAIkQAIkQAIkQAIkkDgEKEQmzrXmSEmABEiABEiABEiABEiABEiABEiABEiABEggagQoREYNPRsmARIgARIgARIgARIgARIgARIgARIgARIggcQhQCEyca41R0oCJEACJEACJEACJEACJEACJEACJEACJEACUSNAITJq6NkwCZAACZAACZAACZAACZAACZAACZAACZAACSQOAQqRiXOtOVISIAESIAESIAESIAESIAESIAESIAESIAESiBqB/wO3N9gPrXIRuwAAAABJRU5ErkJggg==" <="" img="">',
        width: "800px",
      },

      {
        intro:
          '<p><br></p><p><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABSoAAABTCAYAAACYuTkQAAAgAElEQVR4nO3de1yUZf7/8RegqOAghiBi7Yon/JZSbOO26ylPBZqHtlX8ftMoT2VuaT8zstJ2N90y09asXM1DG1G7Yt82zFUowg7qt5IWQytRETuIyMFMlGQE5vfHPTPMwHASdDy8n48HD5j7vu7r+sztnPzM57purzNnzlgRERERERERERER8SAvq9WqRKWIiIiIiIiIiIh4lLenAxARERERERERERFRolJEREREREREREQ8TolKERERERERERER8TglKkVERERERERERMTjlKgUERERERERERERj1OiUkRERERERERERDxOiUoRERERERERERHxOCUqRURERERERERExOOUqBQRERERERERERGPU6JSREREREREREREPE6JShEREREREREREfE4JSpFRERERERERETE45SoFBEREREREREREY9TolJEREREREREREQ8TolKERERERERERER8TglKkVERERERERERMTjlKgUERERERERERERj1OiUkRERERERERERDxOiUoRERERERERERHxOCUqRURERERERERExOOUqBQRERERERERERGPuzgSlSUfkzvudvaPe4VCT8ciIgIcf30i+8fdzsEtxzwdiohcAvSaISIiIiLSdC08HQAApkAjYxra/iIJSESudC2Drgay8Wnf3tOhiMglQK8ZTbdlH6zfBR8fgsLTEOwPg7rClL4wspeno6tp3759ZGRkcOjQIU6fPo2/vz9du3bFbDbTq9dFGLCIiIjIJcBjeUFL8TEsAR1p2xKgIy26QFlrf1ra9lee/ZHSM+1pa/JUhCJyZfmRkiP+tOnsSwvAv9M1QC7eJl9Hi7KCH7GGtKe1x2IUkYuHXjOa04y3YXsuzBkEL46FTgFw9CRszYb4f8Omr2HVHZ6Ossrbb7/N4cOHGThwIGPGjCEgIICTJ0+SnZ3Nli1b+Prrr7njjoso4HNRYSFvz1bSPz3CSQLoHNWfoeZwTD6eDkxEREQuZ+c29buimF0J85kysh9ms5l+I6ew5ONiKEhmttmM2fYzZFw8y1Nzsbjp4vS2J8n7n1j2z3ySw29/zNkzQKvTlLz9PIemxXLwfyaT/4mmT4kYz6vZJBecp/53L8dsXk5WnY2KSZ5lZvam4gZ3m7Wi6rXA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" style="width: 744px;" data-filename="image.png"></p>',
        width: "800px",
      },

      {
        element: "#avatares-equipe",
        intro:
          '<h4  data-step="1" data-title="asd" style="text-align: center">Avatares</h4> </br>' +
          '<span style="color: #007bff"><b>Área Avatar:</b></span> É exibido os usuários que pertence a Squad selecionada' +
          "<p><b>:Exemplo</b></p>" +
          "Caso selecionado a Squad “ERP Truck”, é exibido os colaboradores <i>Alexandre, Hugo, Lucas, Patricia e Wesley<i>",
        position: "right",
      },
      {
        element: ".gLFyf",
        intro:
          '<h4 style="text-align: center">Categorias</h4> </br>' +
          '<table style="position: relative; right: 116px;">' +
          "<tbody>" +
          "<tr>" +
          "<td>Atividade Jurítica&nbsp;</td>" +
          '<td><div class="circle-tipos LILAS"></div></td>' +
          "</tr>" +
          "<tr>" +
          "<td>Atividade em Análise&nbsp;</td>" +
          '<td><div class="circle-tipos" style="background-color: #da4453;"></div></td>' +
          "</tr>" +
          "<tr>" +
          "<td>Auditoria ERP&nbsp;</td>" +
          '<td><div class="circle-tipos AMARELO"></div></td>' +
          "</tr>" +
          "<tr>" +
          "<td>Auditoria de Uso do ERP&nbsp;</td>" +
          '<td><div class="circle-tipos VERDE_PRIMAVERA></div></td>' +
          "</tr>" +
          "<tr>" +
          "<td>Ação&nbsp;</td>" +
          '<td><div class="circle-tipos VERMELHO"></div></td>' +
          "</tr>" +
          "<tr>" +
          "<td>Banco de Dados&nbsp;</td>" +
          '<td><div class="circle-tipos LARANJA"></div></td>' +
          "</tr>" +
          "<tr>" +
          "<td>Bug Homologação&nbsp;</td>" +
          '<td><div class="circle-tipos AZUL_ARDOSIA"></div></td>' +
          "</tr>" +
          "<tr>" +
          "<td>Bug Pôs Homologação&nbsp;</td>" +
          '<td><div class="circle-tipos LAVANDA"></div></td>' +
          "</tr>" +
          "<tr>" +
          "<td>Bug Urgente&nbsp;</td>" +
          '<td><div class="circle-tipos ROSA_CHOQUE"></div></td>' +
          "</tr>" +
          "<tr>" +
          "<td>Bug Não Urgente&nbsp;</td>" +
          '<td><div class="circle-tipos ROSA"></div></td>' +
          "</tr>" +
          "<tr>" +
          "<td>Casos de Teste&nbsp;</td>" +
          '<td><div class="circle-tipos VERDE_AGUA"></div></td>' +
          "</tr>" +
          "<tr>" +
          "<td>Documentação&nbsp;</td>" +
          '<td><div class="circle-tipos CINZA"></div></td>' +
          "</tr>" +
          "<tr>" +
          "<td>Divída Tecnica&nbsp;</td>" +
          '<td><div class="circle-tipos AZUL"></div></td>' +
          "</tr>" +
          "<tr>" +
          "<td>Erro de Log&nbsp;</td>" +
          '<td><div class="circle-tipos SALMAO"></div></td>' +
          "</tr>" +
          "<tr>" +
          "<td>Força de Vendas&nbsp;</td>" +
          '<td><div class="circle-tipos OLIVA"></div></td>' +
          "</tr>" +
          "<tr>" +
          "<td>Grooming&nbsp;</td>" +
          '<td><div class="circle-tipos AZUL_CADETE"></div></td>' +
          "</tr>" +
          "<tr>" +
          "<td>Melhoria&nbsp;</td>" +
          '<td><div class="circle-tipos CIANO_ESCURO"></div></td>' +
          "</tr>" +
          "<tr>" +
          "<td>Otimização&nbsp;</td>" +
          '<td><div class="circle-tipos BRANCO"></div></td>' +
          "</tr>" +
          "<tr>" +
          "<td>&nbsp;</td>" +
          "<td>&nbsp;</td>" +
          "</tr>" +
          "</tbody>" +
          "</table>" +
          "Ao clicar sobre algum tipo é filtrado apenas o tipo do ticket do qual foi selecionado",
        position: "left",
      },
      {
        element: "#multisquad",
        intro:
          '<h4 style="text-align: center">Multi Squad</h4> </br>' +
          'Ao Marcar a opção <span style="color: #007bff"><b>Multi-Squad:</b></span> é exibido no painel frontal do kaban os tickets no qual uma determinada equipe ficou encarregada de desenvolver, ou seja é ilustrado o ticket que outra Squad está desenvolvendo para ajudar outra equipe' +
          "<h3>:Exemplo de Ticket Multi-Squad</h3>" +
          "<center>" +
          '<div class="box ticket" cor="CIANO_ESCURO">' +
          '<div class="badge badge-primary badge-clientes" title="Bluesoft">Bluesoft</div>' +
          '<p class="text-center">' +
          "<b>#246515 (To Test)</b></p>" +
          '<div class="text-center">' +
          "</div>" +
          '<p class="text-center" title="Relatório Consulta de Notas Fiscais Recebidas">' +
          "Relatório Consulta de Notas Fiscais Recebidas" +
          "</p><p><small>" +
          "Total: 3:01" +
          "|" +
          "Etapa: 124h" +
          "|" +
          "LT: 0d" +
          "</small>" +
          "</p>" +
          "<p>" +
          '</p><div class="multi-squad">Multi Squad</div>' +
          '<div class="badge badge-danger" title="Squads">ERP Nitro</div>' +
          "<p></p>" +
          "</div>" +
          "</center>",
        position: "left",
        width: "800px",
      },
      {
        element: document
          .getElementsByClassName("yellow_pencil_iframe")
          .iframe.contentWindow.document.querySelector("#menu")
          .contentWindow.document.querySelector("#tab-iframe-2")
          .contentDocument.querySelector(
            "#wms-gerenciamento-collapse > bs-form-input:nth-child(3)"
          ),

        // document
        //   .getElementById("iframe")
        //   .contentWindow.document.querySelector(
        //     "#wms-gerenciamento-collapse > bs-form-input:nth-child(3)"
        //   ),

        intro:
          '<h4 style="text-align: center">Multi Squad</h4> </br>' +
          "<b>?O que é Squad</b>" +
          '<div><span style="color: #007bff"><b>Squads:</b></span> São pequenas equipes multidisciplinares encarregadas de desenvolver projetos de forma autônoma, o que favorece uma comunicação eficaz, mais direta e sem ruídos</div>' +
          "Ao selecionar uma Squad é listado os tickets no Kanban responsavel pela equipe",
        position: "right",
        width: "800px",
      },
      {
        element: "#wms-gerenciamento-collapse > bs-form-input:nth-child(3)",
        intro:
          '<h4 style="text-align: center">Gráficos</h4> </br>' +
          "<table>" +
          "<tbody>" +
          '<tr style="height: 23px;">' +
          '<td rowspan="4">&nbsp;<img class="ajuda-grafico"></td>' +
          "<td ><b>Bugs:</b> Exibi a quantidade de bugs&nbsp</td>" +
          "</tr>" +
          "<tr >" +
          "<td ></br>  <b>Progesso das Metas:</b> Exibi a evolu&ccedil;&atilde;o das metas em percentual </td>" +
          "</tr>" +
          "<tr >" +
          "<td ><b>Progesso das Metas por Tarefa:</b> Exibi a evolu&ccedil;&atilde;o das tarefas associada as metas em percentual</td>" +
          "</tr>" +
          "<tr >" +
          "<td ><b>LeadTime:</b> Exibi o tempo decorrido que cada ticket levou</td>" +
          "</tr>" +
          "</tbody>" +
          "</table>",
        position: "left",
      },
    ],
  });

  // intro.onafterchange(function (targetElement) {
  //   for (var i = 0; i < intro._options.steps.length; i++) {
  //     if (intro._options.steps[i].element == targetElement) {
  //       ajustarLayout(intro._options.steps[i].element);
  //       //   intro.refresh();
  //     }
  //   }
  // });

  intro
    .onchange(function (targetElement) {
      debugger;
      var stepNumber = 0;
      var width = "350px";
      var top = 0;
      for (var i = 0; i < intro._options.steps.length; i++) {
        if (intro._options.steps[i].element == targetElement) {
          debugger;
          stepNumber = i;
          width = intro._options.steps[i].width;
        }
      }
      switch (stepNumber) {
        case stepNumber:
          //change CSS styling only for the first box

          $(".introjs-tooltip").css("min-width", width);
          break;
      }
    })
    .start();

  intro.refresh();
}

export const DragDrop = {
  fixarBarraFerramentaDireita,
};
