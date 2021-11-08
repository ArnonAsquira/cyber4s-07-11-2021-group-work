import * as helpers from './helperFunctions'
import axios from 'axios';

const baserurl = 'https://group-work-notes.herokuapp.com'

// requesting phone book from server 
export async function getPhoneBook(e) {
    const phoneBookObj = await axios.get(`${baserurl}/api/persons`);
    displayPhoneBook(phoneBookObj.data);
}

// creating a ul to display the phone book entries
function displayPhoneBook(phoneBookObj) {
    if (document.querySelector('.phoneBook-ul')) {
        document.querySelector('.phoneBook-ul').remove();
    }
    const PhoneBookDiv = helpers.createElement('ul', [], ['phoneBook-ul'], {});
    phoneBookObj.forEach(entry => {
       const newEntry =  helpers.createElement('li', [`Name: ${entry.name} Number: ${entry.number} id: ${entry.id}`], ['entry-li'], {});
       PhoneBookDiv.appendChild(newEntry);
    });
    document.getElementById('contents').appendChild(PhoneBookDiv);
}