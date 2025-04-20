console.log("Background - service worker (updated)");
chrome.runtime.onInstalled.addListener(() => {
  console.log("BACKGROUND");
});

chrome.action.onClicked.addListener((r) => {
  chrome.tabs.query({ active: true }, function (t) {
    let e = t[0];

    chrome.scripting.executeScript({
      target: { tabId: e.id ? e.id : -1 },
      files: ["starter.js"],
    });
  });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request.message);
  sendResponse(); // adicionando chamada de função sendResponse()
});
