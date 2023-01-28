const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

fetch('trajets.json')
    .then(response => response.json())
    .then(trajets => {
        const trajet = trajets.find(trajet => trajet.id === id);
        const trajetDetails = document.getElementById('trajetDetails');
        trajetDetails.innerHTML = `<h1>Trajet Details</h1>
    <p>Id: ${trajet.id}</p>
    <p>Firstname: ${trajet.firstname}</p>
    <p>Lastname: ${trajet.lastname}</p>
    <p>Transport: ${trajet.transport}</p>
    <p>TransportObject: ${JSON.stringify(trajet.transportObject)}</p>`;
    });

fetch("trajets.json")
    .then((response) => response.json())
    .then((data) => {
        // Get the current index from the query string
        const index = new URLSearchParams(window.location.search).get("index");

        // Get the current trajet object
        const trajet = data[index];

        // Display the data in the HTML elements with corresponding ids
        document.getElementById("firstname").value = trajet.firstname;
        document.getElementById("lastname").value = trajet.lastname;
        document.getElementById("transport").value = trajet.transport;
        document.getElementById("passagers").value = trajet.transportObject.passagers;
        document.getElementById("distance").value = trajet.transportObject.distance;
        document.getElementById("consommationPersonneKm").value = trajet.transportObject.consommationPersonneKm;
        document.getElementById("consommationTotale").value = trajet.transportObject.consommationTotale;
    });

// Handle form submission
document.getElementById("form").addEventListener("submit", (event) => {
    event.preventDefault();

    // Get the current index from the query string
    const index = new URLSearchParams(window.location.search).get("index");

    // Get the updated data from the form elements
    const updatedTrajet = {
        firstname: document.getElementById("firstname").value,
        lastname: document.getElementById("lastname").value,
        transport: document.getElementById("transport").value,
        transportObject: {
            passagers: document.getElementById("passagers").value,
            distance: document.getElementById("distance").value,
            consommationPersonneKm: document.getElementById("consommationPersonneKm").value,
            consommationTotale: document.getElementById("consommationTotale").value
        },
    };
});

const { ipcRenderer } = require('electron');

// Send the updated data to the main process when the form is submitted
document.getElementById("form").addEventListener("submit", (event) => {
    event.preventDefault();

    // Send the updated data to the main process
    ipcRenderer.send("update-trajet", index, updatedTrajet);
});

// Listen for the update event from the main process
ipcRenderer.on("trajet-updated", (event, index) => {
    // Show a message that the trajet has been updated
    alert("Trajet has been updated!");
});
