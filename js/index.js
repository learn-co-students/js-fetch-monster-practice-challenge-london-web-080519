//api

API = { get, post };

function get(url, num ) {
  return fetch(`${url}${num}`).then(resp => resp.json());
}

function post(url, data) {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(resp => resp.json());
}

//CONSTANTS
const formDiv = document.querySelector("#create-monster");
const monsterContainer = document.querySelector("#monster-container");
const backBtn = document.querySelector("#back");
const forwardBtn = document.querySelector("#forward");
const baseURL = "http://localhost:3000/monsters/?_limit=50&_page=";
const mainURL = "http://localhost:3000/monsters/"
let pageNum = 1

//create form

document.addEventListener("DOMContentLoaded", createForm);

function createForm() {
  let form = document.createElement("form");
  form.id = "monster-form";
  let formName = document.createElement("input");

  let formAge = document.createElement("input");
  let formDesc = document.createElement("input");
  let submitBtn = document.createElement("button");
  formName.id = "form-name"
  formDesc.id = "form-desc"
  formAge.id = "form-age"
  formName.placeholder = "name...";
  formAge.placeholder = "age...";
  formDesc.placeholder = "description...";
  submitBtn.innerText = "Create";
  formDiv.appendChild(form);
  form.append(formName, formAge, formDesc, submitBtn);
  submitBtn.addEventListener("click", handleSubmitClick)

  //   form.addEventListener("click")
}


function handleSubmitClick(){
    event.preventDefault()
    inputForm = document.querySelector("#monster-form")
    newName = document.querySelector("#form-name")
    newAge = document.querySelector("#form-desc")
    newDesc = document.querySelector("#form-desc")
    let name = newName.value
    let age = newAge.value
    let description = newDesc.value 
    let data = {
        name, 
        age, 
        description
    }
    API.post(mainURL, data).then(console.log)
}

//rendermonsters

document.addEventListener("DOMContentLoaded", getMonsters(baseURL, pageNum));

function getMonsters(url, pageNum) {
  API.get(url, pageNum).then(monsters => monsters.forEach(renderMonsters));
}

function renderMonsters(monster) {
  let monsterDiv = document.createElement("div");
  let h2 = document.createElement("h2");
  let h3 = document.createElement("h3");
  let p = document.createElement("p");
  h2.innerText = monster.name;
  h3.innerText = monster.age;
  p.innerText = monster.description;
  monsterContainer.append(monsterDiv);
  monsterDiv.append(h2, h3, p);
}

// increment decrement page 

forwardBtn.addEventListener("click", () => handleForwardBtnClick())

function handleForwardBtnClick(){
    pageNum++
    removeChildren(monsterContainer)
    getMonsters(baseURL, pageNum)
}
backBtn.addEventListener("click", handleBackButtonClick)

function handleBackButtonClick(){
    if (pageNum === 0){
        alert("You cannot go back a page")
    } else {
        pageNum--
        removeChildren(monsterContainer)
        getMonsters(baseURL, pageNum)
    }
}

function removeChildren(node){
    
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
      }
}