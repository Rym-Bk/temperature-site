document.addEventListener("DOMContentLoaded", function() {
    let currentPage = 1;
    const rowsPerPage = 10;
    let allData = [];

    // Fonction pour récupérer et afficher l'historique des températures
    function fetchHistory() {
        fetch('http://localhost:3000/history')
            .then(response => response.json())
            .then(data => {
                allData = data; // Stocker toutes les données
                displayTable(data, currentPage, rowsPerPage);
                setupPagination(data, rowsPerPage);
            })
            .catch(error => console.error('Error fetching history:', error));
    }

    // Fonction pour afficher le tableau paginé
    function displayTable(data, page, rows) {
        const tableBody = document.getElementById('history-table').querySelector('tbody');
        tableBody.innerHTML = ''; // Effacer les lignes existantes du tableau

        const start = (page - 1) * rows;
        const end = start + rows;
        const paginatedData = data.slice(start, end);

        paginatedData.forEach(entry => {
            const row = document.createElement('tr');
            const dateCell = document.createElement('td');
            const tempCell = document.createElement('td');

            const date = new Date(entry.timestamp);
            dateCell.textContent = date.toLocaleString('fr-FR');
            tempCell.textContent = entry.temperature;

            row.appendChild(dateCell);
            row.appendChild(tempCell);
            tableBody.appendChild(row);
        });
    }

    // Fonction pour configurer la pagination
    function setupPagination(data, rows) {
        const pagination = document.querySelector('.pagination');
        pagination.innerHTML = ''; // Effacer les boutons de pagination existants

        const pageCount = Math.ceil(data.length / rows);
        for (let i = 1; i <= pageCount; i++) {
            const btn = paginationButton(i, data);
            pagination.appendChild(btn);
        }
    }

    // Fonction pour créer un bouton de pagination
    function paginationButton(page, data) {
        const button = document.createElement('button');
        button.textContent = page;

        if (currentPage === page) button.classList.add('active');

        button.addEventListener('click', function() {
            currentPage = page;
            displayTable(data, currentPage, rowsPerPage);

            let currentBtn = document.querySelector('.pagination button.active');
            currentBtn.classList.remove('active');

            button.classList.add('active');
        });

        return button;
    }

    // Fonction pour aller à la page précédente
    function prevPage() {
        if (currentPage > 1) {
            currentPage--;
            displayTable(allData, currentPage, rowsPerPage);
        }
    }

    // Fonction pour aller à la page suivante
    function nextPage() {
        const pageCount = Math.ceil(allData.length / rowsPerPage);
        if (currentPage < pageCount) {
            currentPage++;
            displayTable(allData, currentPage, rowsPerPage);
        }
    }

    // Fonction pour filtrer le tableau par date
    function filterTable() {
        const input = document.getElementById('search').value;
        const filteredData = allData.filter(entry => {
            const date = new Date(entry.timestamp);
            const dateString = date.toLocaleDateString('fr-CA'); // Format YYYY-MM-DD
            return dateString === input;
        });

        currentPage = 1; // Reset to first page
        displayTable(filteredData, currentPage, rowsPerPage);
        setupPagination(filteredData, rowsPerPage);
    }

    document.getElementById('search').addEventListener('change', filterTable);

    fetchHistory();
});
