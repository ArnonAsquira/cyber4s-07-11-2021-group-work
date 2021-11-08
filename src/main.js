import axios from 'axios';
import style from './styles.css';
import * as globalVR from './utils/globalVariebls';
import * as EL from './utils/renderContents';

// displays phone book
globalVR.navBarDisplayPhoneBook.addEventListener('click', EL.getPhoneBook);

// creates the search form 
globalVR.navBarDisplayEntry.addEventListener('click', EL.displaySearchEntryForm);

// creates a new entry form 
globalVR.navBarCreateNewEntry.addEventListener('click', EL.displayCreateNewEntryForm);

// deletes entry with given id
globalVR.navBarDeleateEntry.addEventListener('click', EL.displayDeleteEntryForm);