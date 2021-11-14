'use strict';
import axios from 'axios';
import swal from 'sweetalert';
import { displayData, notify } from './displayData';
const baseUrl = 'https://phonebook-online-app.herokuapp.com/';

export function getPhonebookData() {
  axios.get(`${baseUrl}api/persons`).then((response) => {
    displayData(response.data);
  });
}

export function findContact() {
  axios
    .get(`${baseUrl}api/persons/${inputName.value}`)
    .then((res) => {
      swal(`Contact:`, `Name: ${res.data.name}\nNumber: ${res.data.number}`);
    })
    .catch((err) => {
      swal(`Error: ${err.response.status}`, `${err.response.data}`, 'error');
    });
}

export function deleteContact() {
  axios
    .delete(`${baseUrl}api/persons/${inputName.value}`)
    .then((response) => {
      displayData(response.data);
      notify('Contact succesfully deleted.');
    })
    .catch((err) => {
      swal(`Error: ${err.response.status}`, `${err.response.data}`, 'error');
    });
}

export function addContact() {
  axios
    .post(`${baseUrl}api/persons`, {
      name: inputName.value,
      number: inputPhoneNumber.value,
    })
    .then((res) => {
      console.log(res.data);

      displayData(res.data);
      notify('Contact succesfully added!');
    })
    .catch(async (err) => {
      if (err.response.status === 409) {
        const update = swal(`Error: ${err.response.status}`, `${err.response.data}`, 'error', {
          buttons: { cancel: true, confirm: true },
        });
        if (await update) {
          updateContact()
        }
        return;
      }
      swal(`Error: ${err.response.status}`, `${err.response.data}`, 'error');
    });
}

export function updateContact() {
  axios
    .put(`${baseUrl}api/persons`, {
      name: inputName.value,
      number: inputPhoneNumber.value,
    })
    .then((res) => {
      displayData(res.data);
      notify('Contact succesfully updated!');
    })
    .catch((err) => {
      swal(`Error: ${err.response.status}`, `${err.response.data}`, 'error');
    });
}
