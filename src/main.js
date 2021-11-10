import './styles.css'
// const url= 'http://localhost:3000' //- for local testing
const url= 'https://omer-phonebook.herokuapp.com'
//helping funcs
const {createElement, deleteForm , createTable} = require('./helpingFuncs');
//elements
const root = document.getElementById('root');

// Creating Elements //
//get All
const getAllBtn = createElement('button', 'axiosBtn')
getAllBtn.textContent = 'Get All'
//phoneBook info
const getPhoneInfoBtn = createElement('button', 'axiosBtn')
getPhoneInfoBtn.textContent = 'Get Info'
//userInfo
const userIdInput = createElement('input', 'userIdInput')
userIdInput.placeholder = 'Enter User ID'
const getUserInfoBtn = createElement('button', 'axiosBtn')
getUserInfoBtn.textContent = 'Get User Info'
//createUser
const createBtn = createElement('button', 'axiosBtn')
createBtn.textContent = 'Create User'
//deleteUser
const deleteBtn = createElement('button', 'axiosBtn')
deleteBtn.textContent = 'Delete User'

//outputSect
const outputSect = createElement('div', "ouputSect");

root.append(getAllBtn, getPhoneInfoBtn, getUserInfoBtn , createBtn , deleteBtn, userIdInput, outputSect);

// Event Listeners
getAllBtn.addEventListener('click',async ()=>{
    deleteForm();
    const data = await axios.get(`${url}/api/persons`);
    outputSect.textContent = 'Contact List';
    const table = createTable(data.data);
    outputSect.append(table);
})
getPhoneInfoBtn.addEventListener('click',async ()=>{
    deleteForm();
    const data = await axios.get(`${url}/info`);
    outputSect.innerHTML = (data.data);
})
getUserInfoBtn.addEventListener('click',async ()=>{
    deleteForm();
    try {    
        const id= userIdInput.value;
        if(id){
        const data = await axios.get(`${url}/api/persons/${id}`);
        outputSect.textContent = 'Contact Details';
        const table = createTable([data.data[0]]);
        outputSect.append(table);
        } else{
            outputSect.textContent = 'Must Enter User ID';
        }
    } catch (error) {
        outputSect.textContent = "User Doesn't Exist!";
    }
})
createBtn.addEventListener('click',async ()=>{
    outputSect.textContent = '';
    const form = createElement('form', 'form');
    const nameInput = createElement('input', 'formInput')
    const numberInput = createElement('input', 'formInput')
    const submitBtn = createElement('button', 'axiosBtn')
    nameInput.placeholder ='Enter Name';
    numberInput.placeholder='Enter Number';
    submitBtn.textContent = 'Submit'
    form.append(nameInput, numberInput , submitBtn);
    root.append(form);
    submitBtn.addEventListener('click', async(e)=>{
        try {
            e.preventDefault();
            const name = nameInput.value;
            const number = numberInput.value;
            const data = await axios.post(`${url}/api/persons`, {name, number})
            outputSect.innerHTML = 'User Created Successfully';
            form.remove();
        } catch (error) {
            outputSect.textContent = error.response.data;
            form.remove();
        }
    })
})
deleteBtn.addEventListener('click',async ()=>{
    deleteForm();
    const id= userIdInput.value;
    if(id){
    const data = await axios.delete(`${url}/api/persons/${id}`);
    outputSect.innerHTML = JSON.stringify(data.data);
    } else{
        outputSect.textContent = 'Must Enter User ID';
    }
})