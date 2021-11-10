import axios from 'axios';
import style from './styles.css';
import * as globalVR from './utils/globalVariebls';
import * as EL from './utils/renderContents';
import {createLoader, removeLoader} from './utils/helperFunctions';

removeLoader();
// displays phone book
globalVR.navBarDisplayPhoneBook.addEventListener('click', async (e) => {
    createLoader();
    const phoneBook = await EL.getPhoneBook();
    EL.displayPhoneBook(phoneBook);
    removeLoader();
});

// creates the search form 
const searchEntryButton = document.getElementById('search-entry-button')
searchEntryButton.addEventListener('click', async (e) => {
    createLoader();
    const name = document.getElementById('search-entry-input').value;
    await EL.searchEntryById(name);
    removeLoader();
});

// creates a new entry form 
globalVR.navBarCreateNewEntry.addEventListener('click', async (e) => {
    EL.displayCreateNewEntryForm();
});