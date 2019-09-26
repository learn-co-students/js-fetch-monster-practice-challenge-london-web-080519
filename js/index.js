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
const monsterContainer = document.querySelector('#monster-container')
const forwardBtn = document.querySelector('#forward')
const backBtn = document.querySelector('#back')  
forwardBtn.dataset.id = 1
backBtn.dataset.id = 1

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
    API.get(url, limit, page).then(monsterList => monsterList.forEach(renderMonsters))
}

function renderMonsters(monster){
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
        monsterContainer.append(div)   
}

// ----- page handler ----- //
forwardBtn.addEventListener('click', () => handleClick(forwardBtn, 1))
backBtn.addEventListener('click', () => handleClick(backBtn, -1))

function handleClick(button, num){
    event.preventDefault()
    if (button.dataset.id > 0 && button.dataset.id < 21) {
        forwardBtn.dataset.id = parseInt(forwardBtn.dataset.id) + num
        backBtn.dataset.id = parseInt(backBtn.dataset.id) + num
        getMonsters(baseURL, 50, `${button.dataset.id}`)
    }
}

// ----- create monsters ----- //
function handleCreateClick(event) {
    event.preventDefault()
    let newMonster = {
        name: event.target['name'].value,
        age: event.target['age'].value,
        description: event.target['description'].value,
    }
    API.post(baseURL, newMonster).then(monster => renderMonsterOnClient(monster))
}

function renderMonsterOnClient(monster) {
    if (monsterContainer.childElementCount < 49) {
        renderMonsters(monster)
    }
}

// ----- ON LOAD ----- //
createForm()
getMonsters(baseURL, 50, 1)