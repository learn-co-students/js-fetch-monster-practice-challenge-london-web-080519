// API
get = url => fetch(url).then(resp => resp.json());

post = (url, data) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(resp => resp.json())
}

const API = { get, post };

// CONSTANTS
const monstersUrl = "http://localhost:3000/monsters";
const monsterDiv = document.querySelector("div#monster-container");
const createMonsterDiv = document.querySelector("div#create-monster");
const backButton = document.querySelector("button#back");
const forwardButton = document.querySelector("button#forward");
let page = 1;

// FUNCTIONS

function handleSubmit(event) {
  newMonster = {
    name: event.target["name"].value,
    age: event.target["age"].value,
    description: event.target["description"].value
  }

  API.post(monstersUrl, newMonster).then(promise => pageToDisplay())
}

createForm = () => {
  while (createMonsterDiv.firstChild) {
    createMonsterDiv.firstChild.remove();
  }
  let monsterForm = document.createElement("form")
  monsterForm.id = "monster-form"

  let inputName = document.createElement("input");
  inputName.id = "name";
  inputName.placeholder = "name...";

  let inputAge = document.createElement("input");
  inputAge.id = "age";
  inputAge.placeholder = "age...";

  let inputDescription = document.createElement("input");
  inputDescription.id = "description";
  inputDescription.placeholder = "description...";

  let createButton = document.createElement("input");
  createButton.type = "submit";
  createButton.id = "create-monster";
  createButton.value = "Create";

  monsterForm.append(inputName, inputAge, inputDescription, createButton);
  createMonsterDiv.append(monsterForm);

  monsterForm.addEventListener("submit", event => {
    event.preventDefault()
    handleSubmit(event)
  });
};

appendMonster = monster => {
  let monsterH2 = document.createElement("h2");
  monsterH2.innerText = monster.name;

  let monsterH4 = document.createElement("h4");
  monsterH4.innerText = `Age: ${monster.age}`;

  let monsterP = document.createElement("p");
  monsterP.innerText = monster.description;

  monsterDiv.append(monsterH2, monsterH4, monsterP);
};

renderMonsters = monsters => {
  while (monsterDiv.firstChild) {
    monsterDiv.firstChild.remove();
  }
  monsters.forEach(appendMonster);
  createForm();
};

pageToDisplay = () => {
  forwardButton.addEventListener("click", event => {
    page++;
    API.get(`${monstersUrl}/?_limit=50&_page=${page}`).then(renderMonsters);
  });

  backButton.addEventListener("click", event => {
    page === 1 ? page : page--;
    API.get(`${monstersUrl}/?_limit=50&_page=${page}`).then(renderMonsters);
  });

  API.get(`${monstersUrl}/?_limit=50&_page=${page}`).then(renderMonsters);
};

// EVENT LISTENER

document.body.onload = pageToDisplay();
