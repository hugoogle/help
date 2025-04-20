var html = "";
fetch(chrome.runtime.getURL("/clone/editor/html/index.html"))
  .then((response) => response.text())
  .then((response) => {
    html = response;
  })
  .catch((err) => console.log(err));

function menuItem() {
  const link = document.querySelector(".ng-scope");
  link.addEventListener("mouseover", function (event) {
    if (event === undefined) event = window.event;
    var target = "target" in event ? event.target : event.srcElement;
    if (target.title !== "") {
      console.log(target.title);
      if (chrome.runtime && chrome.runtime.sendMessage) {
        chrome.runtime.sendMessage({ message: target.title });
      }
    }
  });
}
