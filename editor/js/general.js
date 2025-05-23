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
