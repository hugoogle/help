"use strict";

if (document.body.classList.contains("bl-bluesoft-help")) {
  var url = new URL(window.location);
  url.searchParams.delete("wyp");
  window.location.replace(url);
} else {
  var editorBody = html;

  document.open();
  document.write(editorBody);
  document.close();

  window.bMode = true;

  var oldP = 0;
  function wyp_load_note(text, p) {
    if (window.loadStatus == false && oldP < p) {
      if (text) {
        document.querySelector(".loading-files").innerHTML = text;
      }
      document.querySelector("#loader i").style.width = p + "%";
      oldP = p;
    }
  }

  if (!!window.performance && window.performance.navigation.type === 2) {
    wyp_load_note("Recarregando...", "0");
    window.location.reload();
  }

  window.loadStatus = false;

  wyp_load_note("Carregando...", "20");

  setTimeout(function () {
    wyp_load_note(null, "23");
  }, 300);

  setTimeout(function () {
    wyp_load_note(null, "26");
  }, 600);

  setTimeout(function () {
    wyp_load_note(null, "29");
  }, 900);

  (function () {
    var iframeNode = document.getElementById("iframe");

    if (window.bMode) {
      iframeNode.contentWindow.location.replace(window.location.href);
    } else {
      iframeNode.contentWindow.location.replace(
        iframeNode.getAttribute("data-href")
      );
    }

    wyp_load_note("Carregando pagina...", "33");

    setTimeout(function () {
      wyp_load_note(null, "33");
    }, 600);

    setTimeout(function () {
      wyp_load_note(null, "36");
    }, 900);

    var iframeReady = false;
    iframeNode.addEventListener("load", function () {
      try {
        var iframeURL =
          document.getElementById("iframe").contentWindow.location.href;
      } catch (e) {
        alert("Esta página não permite o uso do ajuda Bluesoft.");
        if (window.bMode) {
          window.location.reload();
        }
        return false;
      }

      if (iframeReady && window.bMode) {
        alert(
          "Esta página não pode ser inspecionada. Recarregue novamente o editor."
        );
        window.location.href = iframeURL;
      }

      if (window.bMode !== true) {
        if (iframeReady || iframeURL.indexOf("yellow_pencil_frame") == -1) {
          document.querySelector(".wyp-iframe-loader").style.display = "block";
          document.querySelector(".loading-files").innerHTML =
            "Page was redirected!";
          window.wyp_redirect_on = true;

          var parentURL = window.location;

          parentURL = parentURL.toString().split("href=")[0] + "href=";

          iframeURL = new URL(iframeURL);
          iframeURL.searchParams.delete("yellow_pencil_frame");
          iframeURL.searchParams.delete("wyp_page_id");
          iframeURL.searchParams.delete("wyp_page_type");
          iframeURL.searchParams.delete("wyp_mode");
          iframeURL.searchParams.delete("wyp_load_popup");
          iframeURL.searchParams.delete("wyp_rand");
          iframeURL.searchParams.delete("wyp_out");

          var xhr = new XMLHttpRequest();
          xhr.open("POST", iframeURL, true);
          xhr.setRequestHeader(
            "Content-type",
            "application/x-www-form-urlencoded"
          );

          xhr.onreadystatechange = function () {
            if (this.readyState != 4) return;

            if (this.status == 200) {
              var data = document.createElement("div");
              data.insertAdjacentHTML("beforeend", this.responseText);
              data = data.querySelector("#wyp_page_details").innerHTML;

              if (data === undefined || data === null) {
                alert("As informações da página não podem ser recuperadas.");
                return false;
              }

              var pageID = data.split("|")[0];
              var pageTYPE = data.split("|")[1];
              var pageMODE = data.split("|")[2];

              iframeURL = iframeURL.toString().replace(/.*?:\/\//g, "");
              iframeURL = encodeURIComponent(iframeURL);
              parentURL =
                parentURL +
                iframeURL +
                "&wyp_page_id=" +
                pageID +
                "&wyp_page_type=" +
                pageTYPE +
                "&wyp_mode=" +
                pageMODE;

              window.location = parentURL;
            } else {
              alert("As informações da página não podem ser recuperadas.");
            }
          };

          xhr.send("wyp_get_details=true");

          return false;
        }
      }

      iframeReady = true;

      var iframe =
        iframeNode.contentWindow.document || iframeNode.contentDocument;
      var iframeHead = iframe.head;
      var iframeBody = iframe.body;

      var editorData = document.querySelector("#yellow-pencil-iframe-data");
      if (editorData !== null) {
        iframeHead.insertAdjacentHTML(
          "beforeend",
          editorData.innerHTML.replace(/(^\<\!\-\-|\-\-\>$)/g, "")
        );
      }

      function wyp_load_style(link, i, length) {
        var style = document.createElement("link");
        style.rel = "stylesheet";
        style.href = link;
        style.async = false;
        document.head.appendChild(style);

        style.onload = function () {
          wyp_load_note(
            "Loading Styles",
            39 + parseInt((21 * i) / (length - 1))
          );
        };
      }

      var styles = [
        "//fonts.googleapis.com/css2?family=Roboto+Mono&family=Roboto:wght@400;500&display=swap",

        chrome.runtime.getURL("editor/") + "css/bluesoft.css",
        chrome.runtime.getURL("editor/") + "css/toogles.css",

        chrome.runtime.getURL("editor/") + "css/bootstrap.min.css",
        chrome.runtime.getURL("editor/") + "css/introjs.min.css",
        chrome.runtime.getURL("editor/") + "css/help-number-layer.css",
        chrome.runtime.getURL("editor/") + "css/font-awesome.min.css",
        chrome.runtime.getURL("editor/") + "css/general.css",
        chrome.runtime.getURL("editor/") + "css/style.css",
        chrome.runtime.getURL("editor/") + "css/toggle-button.css",
        chrome.runtime.getURL("editor/") + "css/summernote-bs4.min.css",
        chrome.runtime.getURL("editor/") + "css/modal.css",
        chrome.runtime.getURL("editor/") + "css/botaosizesummer.css",
      ];

      iframeHead.insertAdjacentHTML(
        "beforeend",
        "<link rel='stylesheet' id='yellow-pencil-frame'  href='" +
          chrome.runtime.getURL("editor/") +
          "css/frame.css?wypver=7.5.4' type='text/css' media='all' />"
      );

      iframeHead.insertAdjacentHTML(
        "beforeend",
        "<link rel='stylesheet' id='yellow-pencil-frame'  href='" +
          chrome.runtime.getURL("editor/") +
          "css/general.css?wypver=7.5.4' type='text/css' media='all' />"
      );

      iframeHead.insertAdjacentHTML(
        "beforeend",
        "<link rel='stylesheet' id='yellow-pencil-frame'  href='https://cdn.jsdelivr.net/npm/sweetalert2@10.9.1/dist/sweetalert2.min.css'" +
          "type='text/css' media='all' />"
      );

      for (var i = 0; i < styles.length; i++) {
        wyp_load_style(styles[i], i, styles.length);
      }

      var scripts = [
        {
          endereco: chrome.runtime.getURL("editor/") + "js/general.js",
          module: false,
        },

        {
          endereco:
            chrome.runtime.getURL("editor/") + "js/sweetalert2.all.min.js",
          module: false,
        },

        {
          endereco: chrome.runtime.getURL("editor/") + "js/jquery-3.5.1.min.js",
          module: false,
        },
        {
          endereco: chrome.runtime.getURL("editor/") + "js/functions.js",
          module: false,
        },
        {
          endereco: chrome.runtime.getURL("editor/") + "js/events.js",
          module: false,
        },
        {
          endereco: chrome.runtime.getURL("editor/") + "js/popper.min.js",
          module: false,
        },
        {
          endereco: chrome.runtime.getURL("editor/") + "js/bootstrap.min.js",
          module: false,
        },
        {
          endereco: chrome.runtime.getURL("editor/") + "js/intro.min.js",
          module: false,
        },

        {
          endereco: chrome.runtime.getURL("editor/") + "js/drag-drop.js",
          module: true,
        },

        {
          endereco: chrome.runtime.getURL("editor/") + "js/fontawesome.js",
          module: false,
        },

        {
          endereco:
            chrome.runtime.getURL("editor/") + "js/summernote-bs4.min.js",
          module: false,
        },
        {
          endereco: chrome.runtime.getURL("editor/") + "js/modal.js",
          module: false,
        },
        {
          endereco: chrome.runtime.getURL("editor/") + "js/html2canvas.min.js",
          module: false,
        },
        {
          endereco:
            chrome.runtime.getURL("editor/") + "js/summernote-pt-BR.min.js",
          module: false,
        },
        {
          endereco:
            chrome.runtime.getURL("editor/") + "js/botoes-edicao-summer.js",
          module: false,
        },
        {
          endereco:
            chrome.runtime.getURL("editor/") + "js/service/usuario-service.js",
          module: true,
        },
        {
          endereco:
            chrome.runtime.getURL("editor/") +
            "js/service/html-code-service.js",
          module: true,
        },
        {
          endereco:
            chrome.runtime.getURL("editor/") +
            "js/controller/usuario-controller.js",
          module: true,
        },

        {
          endereco:
            chrome.runtime.getURL("editor/") +
            "js/controller/parametro-controller.js",
          module: true,
        },
        {
          endereco:
            chrome.runtime.getURL("editor/") +
            "js/controller/parametro-controller.js",
          module: true,
        },
        {
          endereco:
            chrome.runtime.getURL("editor/") +
            "js/controller/html-code-controller.js",
          module: true,
        },
      ];

      function wyp_start_editor() {
        wyp_load_note("Preparar!", "100");

        window.loadStatus = true;

        if (window.bMode) {
          var url = window.location.href.substring(
            window.location.href.lastIndexOf("/") + 1
          );

          //grava url
          // document.querySelector("#customizing-mode .type-heading").innerHTML =
          //   "http:\\..." + url;

          // document.querySelector(".wyp-customizing-inner-url").title =
          //   window.location.href;
        }

        setTimeout(function () {
          var addClasses = ["yp-yellow-pencil", "blue-pencil-ready"];

          if (window.bMode) {
            addClasses.push("wyp-b-mode");
          }

          for (var i = 0; i < addClasses.length; i++) {
            document.body.classList.add(addClasses[i]);
            iframeBody.classList.add(addClasses[i]);
          }

          document.querySelector(".wyp-iframe-loader").style.display = "none";

          document.querySelector("#iframe").focus();
        }, 350);
      }

      function menuItem() {
        debugger;
        const link = document.querySelector(".ng-scope");
        link.addEventListener("mouseover", function (event) {
          if (event === undefined) event = window.event;
          var target = "target" in event ? event.target : event.srcElement;
          console.log(target.title);
        });
      }

      function wyp_load_script(src, i, length, module) {
        var script = document.createElement("script");
        if (module) {
          script.setAttribute("type", "module");
        }

        script.src = src;
        script.async = false;
        document.head.appendChild(script);

        script.onload = function () {
          wyp_load_note(
            "Carregando scripts",
            60 + parseInt((38 * i) / (length - 1))
          );
          if (i === length - 1) {
            wyp_start_editor();
          }
        };
      }

      for (var i = 0; i < scripts.length; i++) {
        wyp_load_script(
          scripts[i].endereco,
          i,
          scripts.length,
          scripts[i].module
        );
      }
    });

    window.yp_js_hook = function () {};
  })();
}
