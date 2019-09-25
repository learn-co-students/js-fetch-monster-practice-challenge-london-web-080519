window.addEventListener("DOMContentLoaded", event => {
	getMonsters(1);
	getForm();
});

// API
API = { get, post };

function get(page) {
	return fetch(`${MONSTERS_URL}?_limit=50&_page=${page}`).then(response =>
		response.json(),
	);
}

function post(url, data) {
	return fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accepts: "application/json",
		},
		body: JSON.stringify(data),
	}).then(response => response.json());
}

// CONSTANTS
const MONSTERS_URL = "http://localhost:3000/monsters/";
const formContainer = document.querySelector("#create-monster");
const container = document.querySelector("#monster-container");
const previousPage = document.querySelector("#back");
const nextPage = document.querySelector("#forward");
page = 1;

// FUNCTIONS

function getMonsters(page) {
	container.innerText = "";
	API.get(page).then(renderMonsters);
}

function renderMonsters(monsters) {
	monsters.forEach(monster => createCard(monster));
}

function createCard(monster) {
	let div = document.createElement("div");

	let h2 = document.createElement("h2");
	h2.innerText = monster.name;

	let h4 = document.createElement("h4");
	h4.innerHTML = `Age: ${monster.age}`;

	let p = document.createElement("p");
	p.innerText = `Bio: ${monster.description}`;

	div.append(h2, h4, p);
	container.appendChild(div);
}

function handlePageChangeClick(event) {
	if (event.target.id == "forward") {
		page++;
		API.get(page).then(response => {
			if (response.length == 0) {
				alert("There are no more monsters!");
				page--;
			} else {
				getMonsters(page);
			}
		});
	} else {
		if (page == 1) {
			alert("There are no more monsters!");
		} else {
			page--;
			getMonsters(page);
		}
	}
}

function getForm() {
	let form = document.createElement("form");
	form.addEventListener("submit", createMonster);

	let nameInput = document.createElement("input");
	nameInput.setAttribute("placeholder", "name...");

	let ageInput = document.createElement("input");
	ageInput.setAttribute("placeholder", "age...");

	let descriptionInput = document.createElement("input");
	descriptionInput.setAttribute("placeholder", "description...");

	let createButton = document.createElement("button");
	createButton.setAttribute("type", "submit");
	createButton.innerText = "Create";

	form.append(nameInput, ageInput, descriptionInput, createButton);
	formContainer.appendChild(form);
}

function createMonster() {
	event.preventDefault();
	let newMonster = {
		name: event.target[0].value,
		age: event.target[1].value,
		description: event.target[2].value,
	};
	API.post(MONSTERS_URL, newMonster);
}

// EVENT LISTENERS
previousPage.addEventListener("click", handlePageChangeClick);
nextPage.addEventListener("click", handlePageChangeClick);
