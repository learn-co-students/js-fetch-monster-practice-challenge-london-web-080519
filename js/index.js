const BASE_URL = 'http://localhost:3000/monsters/'
const LIMIT_QUERY = num => `_limit=${num}`
const PAGE_QUERY = num => `_page=${num}`

function get(url) {
    return fetch(url).then(resp => resp.json())
}

function post(url, data) {
    const configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(data)
    }
    return fetch(url, configObj).then(resp => resp.json())
}

const API = {
    get, post
}

document.addEventListener('DOMContentLoaded', () => {
    // Vars and Constants -----
    const createMonsterFormDiv = document.querySelector('div#create-monster')
    const monsterContainerDiv = document.querySelector('div#monster-container')
    let currentPage;
    const forwardBtn = document.querySelector('button#forward')
    const backBtn = document.querySelector('button#back')
    const limitSelect = document.querySelector('#limit')
    let currentLimit = document.querySelector('#limit').value


    // Main Functions -----
    // Create Monster Form
    function createNewMonsterForm() {
        let form = document.createElement('form')
        form.addEventListener('submit', handleNewMonsterFormSubmit)

        let p = document.createElement('p')
        p.innerText = "Create Monster"

        let name = document.createElement('input')
        name.id = 'name'
        name.placeholder = 'name...'

        let age = document.createElement('input')
        age.id = 'age'
        age.placeholder = 'age...'

        let description = document.createElement('input')
        description.id = 'description'
        description.placeholder = 'description...'

        let submitBtn = document.createElement('button')
        submitBtn.innerText = "Create"

        form.append(p, name, age, description, submitBtn)

        return form
    }

    // Append form to page on load

    function renderForm() {
        createMonsterFormDiv.append(createNewMonsterForm())
    }

    // Post new monster
    function handleNewMonsterFormSubmit(e) {
        e.preventDefault()
        const name = e.target[0].value
        const age = e.target[1].value
        const description = e.target[2].value
        // e.target.reset()
        if (name.length !== 0 && age.length !== 0 && description.length !== 0) {
            const data = {
                name, age, description
            }
            API.post(BASE_URL, data).then(handleRenderAfterCreate)
        } else {
            const form = document.querySelector('form')
            let message = document.createElement('p')
            message.style.color = 'red'
            message.style.backgroundColor = 'black'
            message.innerText = "Values cannot be blank"
            form.prepend(message)
            setTimeout(() => {
                message.remove()
            }, 2000)
        }
    }

    function handleRenderAfterCreate(monster) {
        const numOfMonstersDisplaying = monsterContainerDiv.children.length
        if (numOfMonstersDisplaying < currentLimit) {
            monsterContainerDiv.append(createMonsterDiv(monster))
        }
    }


    // Get And Render Monsters

    function createMonsterDiv(monster) {
        let monsterDiv = document.createElement('div')

        let name = document.createElement('h2')
        name.innerText = monster.name

        let age = document.createElement('h4')
        age.innerText = "Age: " + monster.age

        let description = document.createElement('p')
        description.innerText = monster.description

        monsterDiv.append(name, age, description)

        return monsterDiv
    }

    function createAndAppendAllMonsterDivs(monsters) {
        removeExistingMonsters()
        monsters.forEach(monster => {
            monsterContainerDiv.append(createMonsterDiv(monster))
        })
    }

    function removeExistingMonsters() {
        while (monsterContainerDiv.firstChild) monsterContainerDiv.removeChild(monsterContainerDiv.firstChild)
    }

    function getAndRenderMonsters(limit, page) {
        currentPage = page
        getMonsters(limit, page).then(createAndAppendAllMonsterDivs)
    }

    function getMonsters(limit, page) {
        return API.get(`${BASE_URL}?${LIMIT_QUERY(limit)}&${PAGE_QUERY(page)}`)
    }

    // Next Page buttons
    // Forward
    function handleForwardButtonClick(e) {
        getMonsters(currentLimit, ++currentPage).then(monsters => {
            if (monsters.length > 0) {
                createAndAppendAllMonsterDivs(monsters)
            } else {
                currentPage--
            }
        })
    }

    // Back
    function handleBackButtonClick(e) {
        getMonsters(currentLimit, --currentPage).then(monsters => {
            if (currentPage > 0) {
                createAndAppendAllMonsterDivs(monsters)
            } else {
                currentPage++
            }
        })
    }
   
    // Change Limit of monster results on each page
    function handleLimitSelectChange(e) {
        currentLimit = e.target.value
        getAndRenderMonsters(currentLimit, 1)
    }


    // event listeners and actions ------
    
    renderForm()
    getAndRenderMonsters(currentLimit, 1)

    forwardBtn.addEventListener('click', handleForwardButtonClick)
    backBtn.addEventListener('click', handleBackButtonClick)
    limitSelect.addEventListener('change', handleLimitSelectChange)
    

})