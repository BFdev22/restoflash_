const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');

const host = process.env.HOST;
const username = localStorage.getItem('username');

const connectedUser = document.getElementById('connectedUser');
connectedUser.innerHTML = username;
const monToken = localStorage.getItem('monToken');

document.getElementById('submitRegistre').addEventListener('click', function(){
        
    
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

document.getElementById('logout').addEventListener('click', function(){
    // Supprimer le token du localStorage
    localStorage.removeItem('monToken');
    localStorage.removeItem('username');
    localStorage.removeItem('userid');
    localStorage.removeItem('user');

    window.location.assign('../index.html')// Rediriger vers la page de connexion

    console.log('Vous êtes déconnecté.');
});

function estTokenExpire(token) {

    if (token) {
        try {
            // Déchiffrer le token pour obtenir ses informations
            const decodedToken = jwt.decode(token);

            // Comparer la date d'expiration avec la date actuelle
            const maintenant = Math.floor(Date.now() / 1000); // Temps actuel en secondes
            return decodedToken.exp < maintenant;
        } catch (erreur) {
            // En cas d'erreur lors du décodage, considérez le token comme expiré
            return true;
        }
    }

    // Si le token n'est pas présent, le considérer comme expiré
    return true;
}

if (estTokenExpire(monToken)) {
    localStorage.removeItem('monToken');
    localStorage.removeItem('username');
    localStorage.removeItem('userid');
    localStorage.removeItem('user');

    window.location.assign('../index.html');
} else {
    console.log('Le token est valide.');
}