import * as helpers from './helperFunctions'
import axios from 'axios';
import * as globalVr from './globalVariebls';

const baserurl = 'https://group-work-notes.herokuapp.com'

// requesting phone book from server 
export async function getPhoneBook() {
    const phoneBookObj = await axios.get(`${baserurl}/api/persons`);
    return phoneBookObj.data;
}

// logging in the entries to the phoneBook
export function displayPhoneBook(phoneBookObj) {
   helpers.clearContents();
   const table = createTable(['name', 'number']);
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
        console.log(entryObj);
        displayPhoneBook([entryObj.data]);
    } catch(error) {
        alert(error.response.data);
    }
}

// display crate new entry form 
export function displayCreateNewEntryForm(e) {
    helpers.clearContents();
    createForm(searchEntryDetailToserver, [{class: 'create-entry-name', placeholder: 'name'}, {class: 'create-entry-number', placeholder: 'number'}], 'enter');
}

// sends the entry object to the server
async function searchEntryDetailToserver() {
  const entryObj = {name: document.querySelector('.create-entry-name').value, number: document.querySelector('.create-entry-number').value};
  try {
    await axios.post(`${baserurl}/api/persons`, entryObj);
    alert('entry made')
  } catch(error) {
    alert(error.response.data || 'request failed failed');
  }
}
// creates delete form
export function displayDeleteEntryForm() {
    helpers.clearContents();
    createForm(deleteEntry, [{class: 'delete-entry-id', placeholder: 'id'}], 'delete');
}

async function deleteEntry() {
    const id = document.querySelector('.delete-entry-id').value;
    try {
        console.log(id);
        await axios.delete(`${baserurl}/api/persons/${id}`);
    } catch(error) {
       alert(error.response.data || 'delete failed'); 
    }
}


function createTable(tableHeaders) {
    const mainTR = document.createElement('tr');
    const table = helpers.createElement('table', [mainTR], ['phoneBook-table'], {});
    tableHeaders.forEach(header => {
        const tableHeader = helpers.createElement('th', [header], [], {});
        table.firstElementChild.appendChild(tableHeader);
    })
    return table;
}

function logEntriesToTabel(phoneBookEntries, table) {
    let backgroundCounter = 1;
    phoneBookEntries.forEach(entry => { 
        const name = helpers.createElement('td', [entry.name], [], {});
        const number = helpers.createElement('td', [entry.number], [], {});
        const deleteButton = helpers.createElement('td', ['delete'], ['delete-Entry-td'], {"data-id": phoneBookEntries.id})
        const tr = helpers.createElement('tr', [name, number, deleteButton], [], {});
        backgroundCounter % 2 === 0 ? tr.style.backgroundColor = 'green': tr.style.backgroundColor = 'blue';
        table.appendChild(tr);
        backgroundCounter ++;
    })
}
