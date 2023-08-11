const peopleInSpace = document.querySelector("[data-js='people-in-space']");
const listOfPeople = document.querySelector("[data-js='list-of-people']");

async function getPeopleInSpace() {
  const response = await fetch("http://api.open-notify.org/astros.json");

  const data = await response.json();

  console.log("data: ", data);
  peopleInSpace.textContent = data.number;

  console.log("People Names:: ", data.people);

  data.people.forEach((people) => {
    const listElement = document.createElement("li");
    listElement.textContent = people.name;
    listOfPeople.appendChild(listElement);
  });

  // data.people (an array)
  // loop over them (using forEach)
  // for each item in the array use
  // document.createElement("li")
  // add the name of the person to the element
  // append element to the dom
}

getPeopleInSpace();
