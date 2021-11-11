import * as helpers from './helperFunctions'
import axios from 'axios';
import * as globalVr from './globalVariebls';
import Swal from 'sweetalert2';

// import parsePhoneNumber from 'libphonenumber-js';
import {
    isValidPhoneNumber,
    parsePhoneNumber
  } from 'libphonenumber-js';

// base url
const baserurl = 'https://group-work-notes.herokuapp.com';

// requesting phone book from server 
export async function getPhoneBook() {
    const phoneBookObj = await axios.get(`${baserurl}/api/persons`);
    return phoneBookObj.data;
}

// logging in the entries to the phoneBook
export function displayPhoneBook(phoneBookObj) {
   helpers.clearContents();
   helpers.createLoader();
   const table = createTable(['name', 'number', 'sort AZ']);
   logEntriesToTabel(phoneBookObj, table)
   document.getElementById('contents').appendChild(table);
}

// search entry by id form
export function displaySearchEntryForm(e) {
    helpers.clearContents();
    createForm(searchEntryById, [{class: 'search-entry-input', placeholder: 'enter id'}], 'search');
}

// creating the search by id form
function createForm(EventListener, inputs =[], buttomText) {
   const button = helpers.createElement('button', [buttomText], ['search-entry-button'], {type: 'button'});
   button.addEventListener('click', EventListener);
   const form = helpers.createElement('form', [button], ['search-entry-form'], {});
   inputs.forEach((input) => {
    const newInput = helpers.createElement('input', [], [input.class], {placeholder: input.placeholder});
    form.insertBefore(newInput, button);
})
   globalVr.ContentsDiv.appendChild(form);
}

// search entry by id
export async function searchEntryById(id) {
    const name = id;
    console.log(name);
    try {
        const entryObj = await axios.get(`${baserurl}/api/persons/${name}`);
        if (entryObj.data.length < 1 || !entryObj) throw 'invalid request'
        displayPhoneBook(entryObj.data);
    } catch(error) {
        alert(error);
    }
}

// display crate new entry form 
export function displayCreateNewEntryForm() {
    helpers.clearContents();
    createForm(createhEntryDetailToserver, [{class: 'create-entry-name', placeholder: 'name'}, {class: 'create-entry-number', placeholder: 'number'}], 'enter');
}

// sends the entry object to the server
async function createhEntryDetailToserver(e) {
   helpers.createLoader();
  if (!isValidPhoneNumber(document.querySelector('.create-entry-number').value, 'IL')) {
    alert('this is not a valid phone number');
    helpers.removeLoader();
    return;
  }
  const entryObj = {name: document.querySelector('.create-entry-name').value, number: document.querySelector('.create-entry-number').value};
  try {
    const res = await axios.post(`${baserurl}/api/persons`, entryObj);
    if (res.status === 201) {
        updateEntry(entryObj, res.data);
        helpers.removeLoader();
        Swal.fire('entry updated')
    }
    helpers.removeLoader();
    alert('entry made');
  } catch(error) {
    console.log(error);
    helpers.removeLoader();
    alert('request failed');
  }
}

// deleting entry function
async function deleteEntry(id) {
    helpers.createLoader();
    await axios.delete(`${baserurl}/api/persons/${id}`);
    helpers.removeLoader();
}

// create a table with headers given as parameters
function createTable(tableHeaders) {
    const mainTR = document.createElement('tr');
    const table = helpers.createElement('table', [mainTR], ['phoneBook-table'], {});
    tableHeaders.forEach(header => {
        const tableHeader = helpers.createElement('th', [header], [], {head: header});
        table.firstElementChild.appendChild(tableHeader);
    })
    return table;
}
//  log phoneBook entries to the 
function logEntriesToTabel(phoneBookEntries, table) {
    helpers.createLoader();
    let backgroundCounter = 1;
    phoneBookEntries.forEach(entry => { 
        const name = helpers.createElement('td', [entry.name], [], {'data-name': entry.name});
        const number = helpers.createElement('td', [entry.number], [], {});
        const deleteButton = helpers.createElement('td', ['delete'], ['delete-Entry-td'], {'data-id': entry.id});
        deleteButton.addEventListener('click', async (e) => {
            const id = e.target.getAttribute('data-id');
            try {
               await deleteEntry(id);
                location.reload();
            } catch (error) {
                console.log(error.response);
                alert('delete failed');
            }
        })
        const tr = helpers.createElement('tr', [name, number, deleteButton], ['entry-row'], {});
        backgroundCounter % 2 === 0 ? tr.style.backgroundColor = 'green': tr.style.backgroundColor = 'blue';
        table.appendChild(tr);
        backgroundCounter ++;
    })
    helpers.removeLoader();
}
// update entry
async function updateEntry(entry, id) {
      try {
        await axios.put(`${baserurl}/api/persons/${id}`, entry);
      } catch(error) {
          alert('couldnnt update entry');
      }
}
