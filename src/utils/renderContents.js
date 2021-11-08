import * as helpers from './helperFunctions'
import axios from 'axios';
import * as globalVr from './globalVariebls';

const baserurl = 'https://group-work-notes.herokuapp.com'

// requesting phone book from server 
export async function getPhoneBook(e) {
    const phoneBookObj = await axios.get(`${baserurl}/api/persons`);
    displayPhoneBook(phoneBookObj.data);
}

// creating a ul to display the phone book entries
function displayPhoneBook(phoneBookObj) {
   helpers.clearContents();
    const PhoneBookDiv = helpers.createElement('ul', [], ['phoneBook-ul'], {});
    if (Array.from(phoneBookObj).length > 1) {
        phoneBookObj.forEach(entry => {
            const newEntry =  helpers.createElement('li', [`Name: ${entry.name} Number: ${entry.number} id: ${entry.id}`], ['entry-li'], {});
            PhoneBookDiv.appendChild(newEntry);
         });
    }else {
        const newEntry = helpers.createElement('li', [`Name: ${phoneBookObj.name} Number: ${phoneBookObj.number} id: ${phoneBookObj.id}`], ['entry-li'], {});
        PhoneBookDiv.appendChild(newEntry);
    }
    document.getElementById('contents').appendChild(PhoneBookDiv);
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
async function searchEntryById(e) {
    const id = document.querySelector('.search-entry-input').value;
    try {
        const entryObj = await axios.get(`${baserurl}/api/persons/${id}`);
        displayPhoneBook(entryObj.data);
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