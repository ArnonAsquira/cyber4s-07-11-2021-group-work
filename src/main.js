import './styles.css'
// const url= 'http://localhost:3000'
const url= 'https://omer-phonebook.herokuapp.com'
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
        const table = createTable([data.data]);
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


//helping funcs
function createElement(elem, className){
    const created = document.createElement(elem);
    created.classList.add(className);
    return created;
}
function deleteForm(){
        const formtoDel = document.getElementsByTagName('form');
        if(formtoDel.length == 0) return 
        formtoDel[0].remove();
}
function createTable(data){
    const table = createElement("table", "contactTable");
    const trheaders = createElement('tr', 'tr');
    const thId = createElement('th', 'th')
    const thName = createElement('th', 'th')
    const thnumber = createElement('th', 'th')
    thId.textContent = 'ID'
    thName.textContent = 'Name'
    thnumber.textContent = 'Number'
    trheaders.append(thId, thName , thnumber)
    table.append(trheaders);
    for(let contact of data){
        const tr = createElement('tr', 'tr');
        const tdId = createElement('td', 'td')
        const tdName = createElement('td', 'td')
        const tdNumber = createElement('td', 'td')
        tdId.textContent = contact.id;
        tdName.textContent = contact.name;
        tdNumber.textContent = contact.number;
        tr.append(tdId,tdName,tdNumber)
        table.append(tr);
    }
    return table;
}
