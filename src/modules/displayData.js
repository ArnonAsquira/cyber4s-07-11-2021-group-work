'use strict';
import { Notyf } from 'notyf';

export function displayData(data) {
  phonebookInfo.textContent = '';
  for (const contact in data) {
    const tableRow = document.createElement('tr');
    tableRow.append(createTableElement(data[contact].name));
    tableRow.append(createTableElement(data[contact].number));
    phonebookInfo.append(tableRow);
  }
}

function createTableElement(text) {
  const tableElement = document.createElement('td');
  tableElement.textContent = text;
  tableElement.classList.add('tableElem');
  return tableElement;
}

export function notify(text) {
  const notyf = new Notyf();
  notyf.success(text);
  inputName.value = '';
  inputPhoneNumber.value = '';
}
