'use strict';

export function inputStyling() {
  if (userAction.value === 'addContact' || userAction.value === 'updateContact') {
    withPhoneNumberInput();
  } else {
    withoutPhoneNumberInput();
  }
}

function withPhoneNumberInput() {
  inputName.style['width'] = '25vw';
  inputPhoneNumber.closest('div').hidden = false;
}

function withoutPhoneNumberInput() {
  inputName.style['width'] = '50vw';
  inputPhoneNumber.closest('div').hidden = true;
}
