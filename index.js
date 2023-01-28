const { ipcRenderer } = require('electron');

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
    // Send the updated trajet data to the main process
    ipcRenderer.send("update-trajet", index, updatedTrajet);
});

ipcRenderer.on("trajet-updated", (event, index) => {
    // Show a message to the user
    alert(`Trajet ${index + 1} updated!`);

    // Close the current window
    window.close();
});


