// ----- API FUNCTIONS ----- //
const baseURL = 'http://localhost:3000/monsters/'

const API = {get, post}

function get(url, _limit, _page){
    return fetch(`${url}?_limit=${_limit}&_page=${_page}`).then(response => response.json())
}

function post(url, data){
    const configObj = {
        method: "POST",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(data)
    }
    return fetch(url, configObj).then(response => response.json())
}

// ----- CONSTANTS ----- //
const createMonster = document.querySelector('#create-monster')
const newMonster = document.querySelector("#new-monster")
newMonster.style.display = "hidden"
const monsterContainer = document.querySelector('#monster-container')
const forwardBtn = document.querySelector('#forward')
const backBtn = document.querySelector('#back')  
let pageNumber = 1
// forwardBtn.dataset.id = 1
// backBtn.dataset.id = 1

// ----- FUNCTIONS ----- //

// ----- render page ----- // 
// create form //
function createForm(){
    let monsterForm = document.createElement('form')
    createMonster.append(monsterForm)  
    // name
    let monsterName = document.createElement('input')
    monsterName.id = 'name'
    monsterName.name = 'name'
    monsterName.placeholder = 'name..'
    // age
    let monsterAge = document.createElement('input')
    monsterAge.innerText = 'age..'
    monsterAge.id = 'age'
    monsterAge.name = 'age'
    monsterAge.placeholder = 'age..'
    // description
    let monsterDesc = document.createElement('input')
    monsterDesc.innerText = 'description..'
    monsterDesc.id = 'description'
    monsterDesc.name = 'description'
    monsterDesc.placeholder = 'description..'
    //button
    let createBtn = document.createElement('input')
    createBtn.type = 'submit'
    createBtn.value = 'Create'
    //event listener
    monsterForm.addEventListener('submit', () => handleCreateClick(event))
    //append 
    monsterForm.append(monsterName, monsterAge, monsterDesc, createBtn)
    createMonster.append(monsterForm)
}

// monsters //
function getMonsters(url, limit, page){
    API.get(url, limit, page).then(monsterList => monsterList.forEach(monster => {
        monsterContainer.append(renderMonster(monster))
    }))
}

function renderMonster(monster){
        // clear previous render
        while (monsterContainer.childElementCount > 49) {
            monsterContainer.removeChild(monsterContainer.firstChild)
        }
        // div  
        let div = document.createElement('div')
        div.id = `monster-${monster.id}`
        //h2
        let h2 = document.createElement('h2')
        h2.innerText = monster.name
        //age (bold)
        let age = document.createElement('h4')
        age.innerText = `Age: ${monster.age}`
        //description
        let description = document.createElement('p')
        description.innerText = `Description: ${monster.description}`
        //append
        div.append(h2, age, description)
        return div  
}

// ----- page handler ----- //
forwardBtn.addEventListener('click', handleClick)
backBtn.addEventListener('click', handleClick)

function handleClick(event){
    event.preventDefault()
    if (event.target.innerText === "=>" && pageNumber < 21) {
        pageNumber ++
        getMonsters(baseURL, 50, pageNumber)
    } else if (event.target.innerText === "<=" && pageNumber > 0) {
        pageNumber --
        getMonsters(baseURL, 50, pageNumber)
    }
}

// ----- create monsters ----- //
function handleCreateClick(event) {
    event.preventDefault()
    let monsterObject = {
        name: event.target['name'].value,
        age: event.target['age'].value,
        description: event.target['description'].value,
    }
    API.post(baseURL, monsterObject).then(monster => {
        while (newMonster.firstChild) {
            newMonster.firstChild.remove()
        }
        newMonster.style.display = "block"
        newMonster.append(renderMonster(monster))
    })
}

function renderMonsterOnClient(monster) {
    if (monsterContainer.childElementCount < 49) {
        renderMonsters(monster)
    }
}

// ----- ON LOAD ----- //
createForm()
getMonsters(baseURL, 50, 1)