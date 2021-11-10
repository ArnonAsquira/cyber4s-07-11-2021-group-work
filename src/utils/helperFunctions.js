import * as globalVr from './globalVariebls';
// generic create element function
export function createElement(tagName, children = [], classes = [], attributes = {}) {
    let newEl = document.createElement(tagName);
    for(let child of children){
        if(typeof(child) === "string"){
            child = document.createTextNode(child);
        }
         newEl.append(child);
    }
    for(let cls of classes){
        newEl.classList.add(cls);
    }
    for(let attr in attributes){
        newEl.setAttribute(attr, attributes[attr]);
    }
    return newEl
}

// clear contents from contents div

export function clearContents() {
    Array.from(globalVr.ContentsDiv.children).forEach(child => {
        child.remove();
    })
}

export function createLoader() {
    const loaderDiv = document.querySelector('.loader');
    loaderDiv.hidden = false;
}

export function removeLoader() {
    const loaderDiv = document.querySelector('.loader');
    loaderDiv.hidden = true;
}