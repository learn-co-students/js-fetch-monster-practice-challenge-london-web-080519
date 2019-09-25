document.addEventListener("DOMContentLoaded", function() {
  start();
});

//API calls
function get(url) {
    return fetch(url + currentPage).then(resp => resp.json())
}



API = { get}

// constants
let currentPage = 1;
const pageLimit = 50;
const allMonsters = `http://localhost:3000/monsters`;
const limitMonsters = `${allMonsters}/?_limit=${pageLimit}&_page=`;
const monsterContainer = document.querySelector("#monster-container");
const backButton = document.querySelector("#back");
const forwardButton = document.querySelector("#forward");

function start() {
    createNewMonsterForm()
    getAndShowAllMonsters(limitMonsters)


    backButton.addEventListener('click', () => {
        currentPage = currentPage > 1 ? currentPage - 1 : currentPage
        getAndShowAllMonsters(limitMonsters)
      })

      forwardButton.addEventListener('click', () => {
        const upperLimit = allMonsters.length / pageLimit
        currentPage = currentPage > upperLimit ? currentPage + 1 : currentPage
        getAndShowAllMonsters(limitMonsters)
      })    
}
const getAndShowAllMonsters = monsters => {
    API.get(monsters).then(monsters => showAllMonsters(monsters))
};

const showAllMonsters = monsters => {
    while (monsterContainer.firstChild)
    monsterContainer.removeChild(monsterContainer.firstChild)

    monsters.forEach(monster => renderMonsterCard(monster))
}

const renderMonsterCard = monster => {
  const monsterCard = document.createElement("div");

  const monsterName = document.createElement("h2");
  monsterName.innerText = monster.name 

  const monsterAge = document.createElement("h4");
  monsterAge.innerText = monster.age;

  const monsterDescription = document.createElement("p");
  monsterDescription.innerText = monster.description;

  monsterCard.append(monsterName, monsterAge, monsterDescription);
  monsterContainer.append(monsterCard);
};

const createNewMonsterForm = () => {
    const newMonsterForm = document.createElement('form')
    newMonsterForm.addEventListener('submit', submitForm)
  
    const nameInput = document.createElement('input')
    nameInput.placeholder = "Name"
    nameInput.name = "name"
  
    const ageInput = document.createElement('input')
    ageInput.placeholder = "Age"
    ageInput.name = "age"
  
    const descriptionInput = document.createElement('input')
    descriptionInput.placeholder = "Description"
    descriptionInput.name = "description"
  
    const submitButton = document.createElement('input')
    submitButton.value = "Unleash the Kraken"
    submitButton.type = "submit"
  
    newMonsterForm.append(ageInput, nameInput, descriptionInput, submitButton)
    document.querySelector('#create-monster').append(newMonsterForm)
  }

  const submitForm = (event) => {
    event.preventDefault()
    
    const newMonsterObj = {
      name: event.target.name.value,
      age: event.target.age.value,
      description: event.target.description.value,
    }
    createNewMonsterForm.reset
    fetch(allMonsters, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(newMonsterObj),
    })

    
  }

// client
