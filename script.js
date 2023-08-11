const peopleInSpace = document.querySelector("[data-js='people-in-space']");
const listOfPeople = document.querySelector("[data-js='list-of-people']");
const allButton = document.querySelector("[data-js='all-button']");
const issButton = document.querySelector("[data-js='iss-button']");
const tiangongButton = document.querySelector("[data-js='tiangong-button']");

// function to creating list on Dom
function updatePeopleList(peopleArray) {
  peopleArray.forEach((person) => {
    const listElement = document.createElement("li");
    listElement.textContent = person.name;
    listOfPeople.appendChild(listElement);
    peopleInSpace.textContent = peopleArray.length;
  });
}

async function getPeopleInSpace() {
  const response = await fetch("http://api.open-notify.org/astros.json");
  const data = await response.json();

  updatePeopleList(data.people);

  issButton.addEventListener("click", () => {
    const issPeople = data.people.filter((person) => person.craft === "ISS");
    listOfPeople.innerHTML = "";
    updatePeopleList(issPeople);
  });

  tiangongButton.addEventListener("click", () => {
    const tiangongPeople = data.people.filter(
      (person) => person.craft === "Tiangong"
    );
    listOfPeople.innerHTML = "";
    updatePeopleList(tiangongPeople);
  });

  allButton.addEventListener("click", () => {
    listOfPeople.innerHTML = "";
    updatePeopleList(data.people);
  });
}

getPeopleInSpace();
