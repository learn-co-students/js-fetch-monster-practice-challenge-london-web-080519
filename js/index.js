


const limit = 50
var page = 1
//const url = `http://localhost:3000/monsters/?_limit=${limit}&_page=${page}`;

function get(inputPage){
  
    if (inputPage < 1 ){inputPage = 1}

     return fetch(`http://localhost:3000/monsters/?_limit=50&_page=${inputPage}`).then(response => {
        window.page = response.url.split('=')[2];
        console.log(page);
        return response.json()
}
     )
}

function post(data) {
    return fetch(`http://localhost:3000/monsters/`, {
        method: "POST",
        headers: {"Content-Type": "application/json", Accept: "application/json"},
        body: JSON.stringify(data)
    }).then(response => response.json());
}


const monsterDiv = document.querySelector(`#monster-container`);
const listDiv = document.createElement('div')
listDiv.id = 'listdiv'    
const formDiv = document.querySelector(`#create-monster`)
//formDiv.style.height = '100px';
monsterDiv.append(listDiv)


function renderForm(){
    
    const form = document.createElement(`form`)
    const nameInput = document.createElement(`input`)
    const ageInput = document.createElement(`input`)
    const descInput = document.createElement(`input`)
    const submit = document.createElement(`button`)
    
    nameInput.setAttribute(`type`,`text`)
    nameInput.setAttribute(`placeholder`,`name...`)
    ageInput.setAttribute(`type`,`text`)
    ageInput.setAttribute(`placeholder`,`age...`)
    descInput.setAttribute(`type`,`text`)
    descInput.setAttribute(`placeholder`,`description...`)


    submit.innerText = 'Create'

    formDiv.append(form)
    form.append(nameInput, ageInput, descInput, submit)

   form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    console.log('hello')
    let newMonster = {
        name: event.target[0].value,
        age: event.target[1].value,
        description: event.target[2].value
    }

    post(newMonster).then(() => {
        event.target.reset();
    })
    


   })



}



function renderMonsters(data){

    const monsterUl = document.createElement('div')
    monsterUl.id = 'monsterUl'
    listDiv.append(monsterUl)

    console.log(page)

    let monsterLiName = document.createElement('h2')
    monsterLiName.innerText = `${data.name}`
    let monsterLiAge = document.createElement('h4')
    monsterLiAge.innerText = `Age: ${data.age}`
    let monsterLiDesc = document.createElement('p')
    monsterLiDesc.innerText = `Bio: ${data.description}`
    
    monsterUl.append(monsterLiName, monsterLiAge,monsterLiDesc);

}

const forwardBtn = document.querySelector(`#forward`)
const backBtn = document.querySelector(`#back`)

forwardBtn.addEventListener('click', () => {
    let currentPage = page
    currentPage ++
    console.log(currentPage)

    while (listDiv.hasChildNodes()) {
        listDiv.removeChild(listDiv.firstChild);}

        //window.page = currentPage

    get(currentPage).then(monsterList => monsterList.forEach(renderMonsters))//.forEach(renderMonsters)//monsterList.data[0].forEach(renderMonsters))

})

backBtn.addEventListener('click', () => {
    let currentPage = page
    currentPage --
    console.log(currentPage)

    while (listDiv.hasChildNodes()) {
        listDiv.removeChild(listDiv.firstChild);}


    get(currentPage).then(monsterList => monsterList.forEach(renderMonsters))//.forEach(renderMonsters)//monsterList.data[0].forEach(renderMonsters))

})


document.body.onload = renderForm()
document.body.onload = get(0).then(monsterList => monsterList.forEach(renderMonsters))//.forEach(renderMonsters)//monsterList.data[0].forEach(renderMonsters))
//console.log(monsterList.data))






//function pageMove(page)