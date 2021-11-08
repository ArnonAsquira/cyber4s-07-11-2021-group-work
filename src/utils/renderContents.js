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
    createSearchEntryForm();
}

// creating the search by id form
function createSearchEntryForm() {
   const input = helpers.createElement('input', [], ['search-entry-input'], {placeholder: 'search by id'});
   const button = helpers.createElement('button', ['search'], ['search-entry-button'], {type: 'button'});
   button.addEventListener('click', searchEntryById);
   const form = helpers.createElement('form', [input, button], ['search-entry-form'], {});
   globalVr.ContentsDiv.appendChild(form);
}

// search entry by id

async function searchEntryById(e) {
    const id = document.querySelector('.search-entry-input').value;
    const entryObj = await axios.get(`${baserurl}/api/persons/${id}`);
    console.log(entryObj);
    displayPhoneBook(entryObj.data);
}