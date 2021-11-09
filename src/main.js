import axios from 'axios';
import style from './styles.css';
import * as globalVR from './utils/globalVariebls';
import * as EL from './utils/renderContents';

// displays phone book
globalVR.navBarDisplayPhoneBook.addEventListener('click', async (e) => {
    const phoneBook = await EL.getPhoneBook();
    EL.displayPhoneBook(phoneBook);
});

// creates the search form 
const searchEntryButton = document.getElementById('search-entry-button')
searchEntryButton.addEventListener('click', async (e) => {
    const name = document.getElementById('search-entry-input').value;
    await EL.searchEntryById(name);
});

// creates a new entry form 
globalVR.navBarCreateNewEntry.addEventListener('click', async (e) => {
    EL.displayCreateNewEntryForm();
});

// deletes entry with given id
globalVR.navBarDeleateEntry.addEventListener('click', EL.displayDeleteEntryForm);