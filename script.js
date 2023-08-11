const peopleInSpaceElement = document.querySelector(
  "[data-js='people-in-space']"
);
const listOfPeopleElement = document.querySelector(
  "[data-js='list-of-people']"
);
const allButtonElement = document.querySelector("[data-js='all-button']");
const issButtonElement = document.querySelector("[data-js='iss-button']");
const tiangongButtonElement = document.querySelector(
  "[data-js='tiangong-button']"
);

// Create list on the DOM
function updatePeopleList(peopleArray) {
  listOfPeopleElement.innerHTML = "";

  peopleArray.forEach((person) => {
    const listElement = document.createElement("li");
    listElement.textContent = person.name;
    listOfPeopleElement.appendChild(listElement);
  });

  peopleInSpaceElement.textContent = peopleArray.length;
}

// Fetch data
async function fetchPeopleInSpace() {
  const response = await fetch("http://api.open-notify.org/astros.json");
  const { people } = await response.json();
  return people;
}

// Event handler function
function handleButtonClick(data, craftType) {
  const filteredPeople = craftType
    ? data.filter((person) => person.craft === craftType)
    : data;
  updatePeopleList(filteredPeople);
}

// Attach event listeners using "IIFE"
(async function () {
  const peopleData = await fetchPeopleInSpace();

  issButtonElement.addEventListener("click", () =>
    handleButtonClick(peopleData, "ISS")
  );
  tiangongButtonElement.addEventListener("click", () =>
    handleButtonClick(peopleData, "Tiangong")
  );
  allButtonElement.addEventListener("click", () =>
    handleButtonClick(peopleData)
  );

  // Initial population of people list
  updatePeopleList(peopleData);
})();
