import {
  d as s,
  o as r,
  c,
  a as e,
  F as p,
  e as i,
  g as l,
} from "./runtime-dom.esm-bundler.648e5a1c.js";
var u = "/assets/images/menu.png";
var sc =
  "chrome-extension://cibffnhhlfippmhdmdkcfecncoaegdkh/assets/images/menu.webm";
const d = e(
    "div",
    {
      class: "draggable",
      style: "top: 132.188px; left: -399px; width: 550px;",
    },
    [
      e("img", { src: u, width: "350" }),
      e("div", { style: "position: absolute; top: 0px; left: 151px;" }, [
        e(
          "video",
          { loop: true, draggable: true, autoplay: true, width: "400" },
          [
            e("source", {
              src: sc,
              type: "video/webm",
            }),
          ]
        ),
      ]),
    ]
  ),
  _ = i(" | "),
  g = s({
    name: "popup",
    setup(m) {
      const o = () => {
          chrome.tabs.query({ active: !0, currentWindow: !0 }, function (a) {
            let t = a[0];
            debugger;
            chrome.scripting.executeScript({
              target: { tabId: t.id ? t.id : -1 },
              files: ["starter.js"],
            });
          });
        },
        n = () => {
          chrome.tabs.create({ url: "index.html" });
        };
      return (a, t) => (
        r(),
        c(
          p,
          null,
          [
            d,
            e("p", { style: "position: absolute; bottom: 0px;" }, [
              e("a", { onClick: o }, "Menu Bot"),
              _,
              e("a", { onClick: n }, "Main Page"),
            ]),
          ],
          64
        )
      );
    },
  });
l(g).mount("#app");
console.log("Background - service worker (updated)");
