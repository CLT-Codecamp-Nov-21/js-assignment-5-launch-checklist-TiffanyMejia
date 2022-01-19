// Write your helper functions here!
try {
    require('isomorphic-fetch');
    } catch (e) {
        // do nothing
       }
    

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let missionTarget = document.getElementById("missionTarget");
    
     // Here is the HTML formatting for our mission target div.
    missionTarget.innerHTML = `
     
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}"> `;    
}


//checks the values of the form 

function validateInput(testInput) {
    if (testInput === "") {
        return "Empty";
    } else if (isNaN(Number(testInput))) {
        return "Not a Number";
    } else {
        return "Is a Number";
    }           
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
   //create validation function

    if (pilot === "" || copilot === "" || fuelLevel === "" || cargoLevel === "") {
        alert("All fields are required!");
        return;
    }  else if (validateInput(pilot) !== 'Not a Number' || validateInput(copilot) !== 'Not a Number' || validateInput(fuelLevel) === 'Not a Number' || validateInput(cargoLevel) === 'Not a Number') {//(validateInput(fuelLevel) !== "Is a Number" || validateInput(cargoLevel) !== "Is a Number"){
        alert("Make sure to enter valid information for each field!");
        return;
} 

//define all variables

let fuelStatus = document.getElementById("fuelStatus");

let cargoStatus = document.getElementById("cargoStatus");

let launchStatus = document.getElementById("launchStatus");

let pilotStatus = document.getElementById("pilotStatus");
pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;

let copilotStatus = document.getElementById("copilotStatus");
copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;

fuelLevel = Number(fuelLevel);
cargoLevel = Number(cargoLevel);






//launch status, ready or not ready

let canLaunch = true;

if (fuelLevel < 10000) {
    fuelStatus.innerHTML = "Fuel level too low for launch";
    canLaunch = false;
    
}else{
    fuelStatus.innerHTML = "Fuel level high enough for launch";
    }

if(cargoLevel > 10000) {
    cargoStatus.innerHTML = "Cargo mass too heavy for launch";
    canLaunch = false;

} else {
    cargoStatus.innerHTML = "Cargo mass low enough for launch";
}

if (canLaunch) {
    launchStatus.innerHTML = "Shuttle is Ready for Launch";
    launchStatus.style.color = "rgb(65, 159, 106)";
} else {
    launchStatus.innerHTML = "Shuttle Not Ready for Launch";
    launchStatus.style.color = "rgb(199, 37, 78)";
}


   list.style.visibility = "visible";

}



//pull the JSON file
async function myFetch() {
    let planetsReturned;
    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json();
    })
    return planetsReturned;
}

//return a random planet
function pickPlanet(planets) {
    let randomPlanet = Math.floor(Math.random() * planets.length);
    return planets[randomPlanet]; 

}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
