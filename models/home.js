const dotenv = require('dotenv');
dotenv.config();

const host = process.env.HOST;

// Récupérer le token depuis le localStorage
const monToken = localStorage.getItem('monToken');
const userid = localStorage.getItem('userid');
const username = localStorage.getItem('username');

const connectedUser = document.getElementById('connectedUser');
connectedUser.innerHTML = username;

const tableRegistre = document.querySelector('#table_registre');

fetch(`${host}/registres`, {
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + monToken
    }
})
.then(response => {
    // Vérifier le statut de la réponse
    if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status} - ${response.statusText}`);
    }

    // Convertir la réponse en JSON
    return response.json();
})
.then(data => {
    
    data.forEach((element) => {
        const getDate = new Date(element.date);
        const year = getDate.getFullYear();
        const month = getDate.getMonth() + 1;
        const day = getDate.getDay() < 10 ? '0' + getDate.getDay() : getDate.getDay();
        const finalDate = day + '/' + month + '/' + year;
        tableRegistre.innerHTML += `
            <tr>
                <td>${finalDate}</td>
                <td>${element.quantite}</td>
                <td class="text-center"><a class="btn edit" data-qte="${element.quantite}" data-date="${finalDate}" data-bs-toggle="modal" data-bs-target="#modalEditRegistre"><i class="fas fa-pencil me-1"></i></a></td>
                <td class="text-center"><i class="fas fa-trash me-1"></i></td>
            </tr>
    `;  
    })
})
.catch(error => {
    // Gérer les erreurs
    console.error(error.message);
});

const editButton = document.querySelectorAll('.edit');
editButton.forEach(function(button) {
    button.addEventListener('click', function(event) {
        // Récupérer les valeurs de data-qte et data-date du bouton cliqué
        const qteValue = event.target.getAttribute('data-qte');
        const dateValue = event.target.getAttribute('data-date');

        // Log les valeurs dans la console (vous pouvez faire autre chose avec ces valeurs)
        console.log('Quantité:', qteValue);
        console.log('Date:', dateValue);
    });
});

