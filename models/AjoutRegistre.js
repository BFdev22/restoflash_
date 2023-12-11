const dotenv = require('dotenv');
dotenv.config();

const host = process.env.HOST;
const username = localStorage.getItem('username');

const connectedUser = document.getElementById('connectedUser');
connectedUser.innerHTML = username;

document.getElementById('submitRegistre').addEventListener('click', function(){
        
    const monToken = localStorage.getItem('monToken');
    const userid = localStorage.getItem('userid');

    const qte = document.getElementById('qte').value;
    const date = document.getElementById('date').value;

    const dataRegistre = {
        quantite: qte,
        date: date,
        userId: userid
    }
    
    fetch(`${host}/registres`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + monToken
        },
        body: JSON.stringify(dataRegistre)
    })
    .then(response => {
        // Vérifier le statut de la réponse
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status} - ${response.statusText}`);
        }
    
        // Afficher l'alerte uniquement si la réponse est réussie
        alert('Registre créé avec succès');
        window.location.assign('../views/home.html');
    })
    .catch(error => {
        // Vérifier si l'erreur est due à un problème réseau
        if (error.message.includes('Failed to fetch')) {
            console.error('Erreur réseau. Vérifiez votre connexion internet.');
        } else {
            // Afficher l'erreur spécifique
            console.error(error.message);
        }
    });
});