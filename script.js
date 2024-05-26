document.addEventListener("DOMContentLoaded", function() {
    // Fonction pour mettre à jour la date et l'heure
    function updateDateTime() {
        var now = new Date();
        var datetimeString = now.toLocaleDateString('fr-FR') + ' ' + now.toLocaleTimeString('fr-FR');
        document.getElementById('datetime').textContent = datetimeString;
    }

    // Fonction pour récupérer la température depuis l'API et la mettre à jour
    function updateTemperature() {
        fetch('http://localhost:3000/temperature')
            .then(response => response.json())
            .then(data => {
                document.getElementById('temperature').textContent = data.temperature;
            })
            .catch(error => console.error('Error fetching temperature:', error));
    }

    // Mettre à jour la date, l'heure et la température toutes les secondes
    setInterval(function() {
        updateDateTime();
        updateTemperature();
    }, 1000);

    // Initialiser les données au chargement de la page
    updateDateTime();
    updateTemperature();
});
