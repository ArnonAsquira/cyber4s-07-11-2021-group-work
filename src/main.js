import axios from 'axios';
import style from './styles.css';
import * as globalVR from './utils/globalVariebls';
import * as EL from './utils/renderContents';

globalVR.navBarDisplayPhoneBook.addEventListener('click', EL.getPhoneBook);

globalVR.navBarDisplayEntry.addEventListener('click', EL.displaySearchEntryForm);

globalVR.navBarCreateNewEntry.addEventListener('click', EL.displayCreateNewEntryForm);