import * as helpers from './helperFunctions'
import axios from 'axios';
import * as globalVr from './globalVariebls';

const baserurl = 'https://group-work-notes.herokuapp.com';

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
  const entryObj = {name: document.querySelector('.create-entry-name').value, number: document.querySelector('.create-entry-number').value};
  // checking for update request
  if (await checkForExistingName(entryObj.name)) {
     const existingEntry = await checkForExistingName(entryObj.name);
      updateEntry(entryObj, existingEntry['id']);
      return
  }
  try {
    await axios.post(`${baserurl}/api/persons`, entryObj);
    alert('entry made')
  } catch(error) {
    console.log(error.response.data);
    alert(error.response.data || 'request failed failed');
  }
}

// deleting entry function
async function deleteEntry(id) {
    await axios.delete(`${baserurl}/api/persons/${id}`);
}

// create a table with headers given as parameters
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
        const deleteButton = helpers.createElement('td', ['delete'], ['delete-Entry-td'], {'data-id': entry.id});
        deleteButton.addEventListener('click', async (e) => {
            const id = e.target.getAttribute('data-id');
            try {
               await deleteEntry(id);
                // location.reload();
            } catch (error) {
                console.log(error.response);
                alert('delete failed');
            }
        })
        const tr = helpers.createElement('tr', [name, number, deleteButton], [], {});
        backgroundCounter % 2 === 0 ? tr.style.backgroundColor = 'green': tr.style.backgroundColor = 'blue';
        table.appendChild(tr);
        backgroundCounter ++;
    })
}


// check for existing name
async function checkForExistingName(name) {
    const entries = await phoneBookEntries;
    const entry = entries.find(entry => name === entry.name);
    return entry;
}
// update entry
async function updateEntry(entry, id) {
      try {
        console.log(id)
        console.log(entry);
        console.log(`${baserurl}/api/persons/${id}`);
        await axios.put(`${baserurl}/api/persons/${id}`, entry);
      } catch(error) {
          console.log(error.response.data);
          alert('couldnnt update entry');
      }
}

const phoneBookEntries =  getPhoneBook();