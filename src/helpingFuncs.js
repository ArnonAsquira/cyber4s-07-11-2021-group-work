
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
        tdId.textContent = contact.identifier;
        tdName.textContent = contact.name;
        tdNumber.textContent = contact.number;
        tr.append(tdId,tdName,tdNumber)
        table.append(tr);
    }
    return table;
}


module.exports = {createElement, deleteForm , createTable}