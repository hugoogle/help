function addElementLocator(checkElementLocator) {
  var elementLocator = checkElementLocator.elementLocator;
  setThWidths();
  var tr = document.createElement("tr");
  tr.setAttribute("class", "tr-element");
  if (!checkElementLocator.isExist) {
    tr.classList.add("tr-error");
  }
  var rowIndex = document.getElementsByClassName("tr-element").length + 1;
  var th = document.createElement("th");
  th.setAttribute("scope", "row");
  var propnode = document.createElement("span");
  propnode.innerText = rowIndex;
  th.appendChild(propnode);
  tr.appendChild(th);
  var td = document.createElement("td");
  propnode = document.createElement("span");
  propnode.innerText = elementLocator.tagName;
  td.appendChild(propnode);
  tr.appendChild(td);
  td = document.createElement("td");
  var xpathDiv = document.createElement("div");
  xpathDiv.setAttribute("class", "path-input input-group");
  var xpathInput = document.createElement("input");
  xpathInput.setAttribute("class", "form-control");
  xpathInput.type = "text";
  xpathInput.value = elementLocator.xpath;
  xpathInput.id = "xpath" + rowIndex;
  var xpathSpan = document.createElement("span");
  xpathSpan.setAttribute("class", "input-group-btn");
  var xpathButton = document.createElement("button");
  xpathButton.setAttribute("class", "btn btn-secondary");
  xpathButton.setAttribute("type", "button");
  xpathButton.setAttribute("title", "Copy");
  var copyIcon = document.createElement("i");
  copyIcon.setAttribute("class", "fa fa-clone");
  copyIcon.setAttribute("aria-hidden", "true");
  xpathButton.appendChild(copyIcon);
  xpathButton.onclick = function () {
    var input = document.getElementById(xpathInput.id);
    input.select();
    document.execCommand("copy");
  };
  xpathSpan.appendChild(xpathButton);
  xpathDiv.appendChild(xpathInput);
  xpathDiv.appendChild(xpathSpan);
  td.appendChild(xpathDiv);
  if (checkElementLocator.xpathIsDuplicated) {
    var duplicatedSpan = document.createElement("span");
    duplicatedSpan.setAttribute("class", "badge badge-warning");
    duplicatedSpan.innerText = "Duplicated";
    td.appendChild(duplicatedSpan);
  }
  tr.appendChild(td);
  td = document.createElement("td");
  var cssDiv = document.createElement("div");
  cssDiv.setAttribute("class", "path-input input-group");
  var cssInput = document.createElement("input");
  cssInput.setAttribute("class", "form-control");
  cssInput.type = "text";
  cssInput.value = elementLocator.cssSelector;
  cssInput.id = "css" + rowIndex;
  var cssSpan = document.createElement("span");
  cssSpan.setAttribute("class", "input-group-btn");
  var cssButton = document.createElement("button");
  cssButton.setAttribute("class", "btn btn-secondary");
  cssButton.setAttribute("type", "button");
  cssButton.setAttribute("title", "Copy");
  cssButton.appendChild(copyIcon.cloneNode());
  cssButton.onclick = function () {
    var input = document.getElementById(cssInput.id);
    input.select();
    document.execCommand("copy");
  };
  cssSpan.appendChild(cssButton);
  cssDiv.appendChild(cssInput);
  cssDiv.appendChild(cssSpan);
  td.appendChild(cssDiv);
  if (checkElementLocator.cssSelectorIsDuplicated) {
    var duplicatedSpan = document.createElement("span");
    duplicatedSpan.setAttribute("class", "badge badge-warning");
    duplicatedSpan.innerText = "Duplicated";
    td.appendChild(duplicatedSpan);
  }
  tr.appendChild(td);
  td = document.createElement("td");
  var detailsButton = document.createElement("button");
  detailsButton.setAttribute("class", "btn btn-secondary");
  detailsButton.setAttribute("type", "button");
  detailsButton.setAttribute("title", "Details");
  var detailsIcon = document.createElement("i");
  detailsIcon.setAttribute("class", "fa fa-search");
  detailsIcon.setAttribute("aria-hidden", "true");
  detailsButton.appendChild(detailsIcon);
  if (!elementLocator.attributes || elementLocator.attributes.length == 0) {
    detailsButton.setAttribute("disabled", "true");
  }
  td.appendChild(detailsButton);
  var attributeCountSpan = document.createElement("span");
  attributeCountSpan.setAttribute("class", "badge badge-pill badge-info");
  attributeCountSpan.innerText = elementLocator.attributes.length.toString();
  td.appendChild(attributeCountSpan);
  tr.appendChild(td);
  td = document.createElement("td");
  var deleteButton = document.createElement("button");
  deleteButton.setAttribute("class", "btn btn-danger");
  deleteButton.setAttribute("type", "button");
  deleteButton.setAttribute("title", "Delete");
  var deleteIcon = document.createElement("i");
  deleteIcon.setAttribute("class", "fa fa-trash");
  deleteIcon.setAttribute("aria-hidden", "true");
  deleteButton.appendChild(deleteIcon);
  td.appendChild(deleteButton);
  tr.appendChild(td);
  tr.onclick = function () {
    sendRunTimeMessage(
      new ElementsLocatorObj(
        null,
        null,
        new ElementLocator(null, elementLocator.cssSelector)
      )
    );
  };
  detailsButton.onclick = function () {
    if (elementLocator.attributes.length > 0) {
      addDetailsTable(checkElementLocator, rowIndex);
    }
  };
  deleteButton.onclick = () => deleteElement(elementLocator, tr);
  document.getElementById("paths").appendChild(tr);
}
function deleteElement(element, elementsTableTr) {
  hideDetailsRows();
  elementsTableTr.classList.add("hidden");
  reOrderRowNumbers();
  chrome.runtime.getBackgroundPage((eventPage) => {
    eventPage.deleteElement(new ElementsLocatorObj(null, null, element));
    eventPage.updateBadge();
  });
  if (
    document.querySelectorAll('#paths > tr:not([class*="hidden"])').length == 0
  ) {
    showNOElementsFoundLabel();
  }
}
function reOrderRowNumbers() {
  var rows = document.querySelectorAll(
    '#paths > tr:not([class*="hidden"]) > th > span'
  );
  for (var index = 0; index < rows.length; index++) {
    rows[index].innerText = index + 1;
  }
}
function hideDetailsRows() {
  var detailsTables = document.querySelectorAll('tr[class*="trDetails"]');
  for (var index = 0; index < detailsTables.length; index++) {
    detailsTables[index].style.display = "none";
  }
}
function showNOElementsFoundLabel() {
  document.getElementById("elementsTable").style.display = "none";
  document.getElementById("noElementsFoundDiv").style.display = "block";
  var lastupdate = document.querySelector("#header > p:nth-child(2)");
  if (lastupdate) {
    lastupdate.style.display = "none";
  }
}
function addDetailsTable(checkElementLocator, tableIndex) {
  var tableID = "detailsTable" + tableIndex;
  if (document.getElementById(tableID)) {
    var tr = document.getElementsByClassName("trDetails" + tableIndex)[0];
    if (tr && tr.style.display == "none") {
      hideDetailsRows();
      tr.style.display = "table-row";
    } else {
      hideDetailsRows();
    }
    return;
  }
  hideDetailsRows();
  var trDetails = document.createElement("tr");
  trDetails.setAttribute("class", "trDetails" + tableIndex);
  var tdDetails = document.createElement("td");
  tdDetails.setAttribute("class", "tdDetails");
  tdDetails.setAttribute(
    "colspan",
    document.querySelectorAll("#elementsTableHeader > thead > tr > th").length
  );
  var tableDetails = document
    .getElementsByClassName("detailsTableHidden")[0]
    .cloneNode(!0);
  tableDetails.classList.remove("detailsTableHidden");
  tableDetails.setAttribute("id", tableID);
  tdDetails.appendChild(tableDetails);
  trDetails.appendChild(tdDetails);
  document
    .getElementById("paths")
    .insertBefore(
      trDetails,
      document.querySelectorAll(".tr-element")[tableIndex]
    );
  var detailsRows = document.querySelector("#" + tableID + " #detailsRows");
  for (
    var index = 0;
    index < checkElementLocator.elementLocator.attributes.length;
    index++
  ) {
    var detailsTr = document.createElement("tr");
    var detailsSpan = document.createElement("span");
    detailsSpan.innerText = index + 1;
    var detailsTd = document.createElement("td");
    detailsTd.appendChild(detailsSpan);
    detailsTr.appendChild(detailsTd);
    detailsSpan = document.createElement("span");
    detailsSpan.innerText =
      checkElementLocator.elementLocator.attributes[index].name;
    detailsTd = document.createElement("td");
    detailsTd.appendChild(detailsSpan);
    detailsTr.appendChild(detailsTd);
    detailsSpan = document.createElement("span");
    detailsSpan.innerText =
      checkElementLocator.elementLocator.attributes[index].value;
    detailsTd = document.createElement("td");
    detailsTd.appendChild(detailsSpan);
    detailsTr.appendChild(detailsTd);
    detailsRows.appendChild(detailsTr);
  }
}
function setThWidths() {
  if (document.querySelector("#paths > tr:nth-child(1) > th")) {
    var ths = document.querySelectorAll(
      "#elementsTableHeader > thead > tr > th"
    );
    var columns = document.querySelectorAll("#paths > tr > td");
    for (var index = 1; index < ths.length; index++) {
      ths[index].style.width = columns[index - 1].offsetWidth + "px";
    }
  }
}
function setLastUpdateDateTime(dateTime) {
  var lastupdate = document.querySelector("#header > p:nth-child(2)");
  if (lastupdate && dateTime) {
    var lastupdateDateTime = document.querySelector(
      "#header > p:nth-child(2) span"
    );
    var date =
      new Date(dateTime).toLocaleDateString() +
      " " +
      new Date(dateTime).toLocaleTimeString();
    lastupdateDateTime.innerText = date.replace(new RegExp(/\./g, "g"), "/");
    lastupdate.style.display = "inline-block";
  }
}
