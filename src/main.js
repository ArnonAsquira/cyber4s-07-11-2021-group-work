'use strict';
import './styles.css';
import {
  getPhonebookData,
  findContact,
  deleteContact,
  addContact,
  updateContact
} from './modules/serverRequests';
import { inputStyling } from './modules/inputStyling';

window.addEventListener('load', getPhonebookData);
userActionForm.addEventListener('submit', formAction);
userAction.addEventListener('input', inputStyling);

function formAction(event) {
  event.preventDefault();
  if (userAction.value === 'findContact') {
    findContact();
  }
  if (userAction.value === 'deleteContact') {
    deleteContact();
  }
  if (userAction.value === 'addContact') {
    addContact();
  }
  if (userAction.value === 'updateContact') {
    updateContact();
  }
}
