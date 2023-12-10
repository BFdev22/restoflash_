
const dotenv = require('dotenv');
dotenv.config();
const jquery = require('jquery');
const jwt = require('jsonwebtoken');

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
            // const getDate = new Date(element.date);
            // const year = getDate.getFullYear();
            // const month = getDate.getMonth() + 1;
            // const day = getDate.getDay() < 10 ? '0' + getDate.getDay() : getDate.getDay();
            // const finalDate = day + '/' + month + '/' + year;
            const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
            const dateFormatee = new Date(element.date).toLocaleDateString('fr-CA', options);
            tableRegistre.innerHTML += `
            <tr>
                <td>${dateFormatee}</td>
                <td>${element.quantite}</td>
                <td class="text-center"><a class="btn edit" onclick="modifier(${element.id})"><i class="fas fa-pencil me-1"></i></a></td>
                <td class="text-center"><a class="btn delete" onclick="deleteRegistre(${element.id})"><i class="fas fa-trash me-1"></i></a></td>
            </tr>
    `;
        })
    })
    .catch(error => {
        // Gérer les erreurs
        console.error(error.message);
    });

function modifier(id) {
    fetch(`${host}/registres/${id}`, {
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
            const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
            const dateFormatee = new Date(data.date).toLocaleDateString('fr-CA', options);
            const qte = document.getElementById('qteEdit');
            const date = document.getElementById('dateEdit');
            qte.value = data.quantite;
            date.value = dateFormatee;
            var myModal = new bootstrap.Modal(document.getElementById('modalEditRegistre'));
            myModal.show();

            document.getElementById('editRegistre').addEventListener('click', function () {
                const data = {
                    quantite: qte.value,
                    date: date.value
                };

                putEdit(id, data);
            });
            console.log(data);
        })
        .catch(error => {
            // Gérer les erreurs
            console.error(error.message);
        });
}

function putEdit(id, data) {
    fetch(`${host}/registres/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + monToken
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            // Vérifier le statut de la réponse
            if (!response.ok) {
                alert('Erreur lors de la modification');
                throw new Error(`Erreur HTTP: ${response.status} - ${response.statusText}`);
            }

            alert('Modification effectué');
            window.location.reload();
            // Convertir la réponse en JSON
            return response.json();
        })
        .catch(error => {
            // Gérer les erreurs
            console.error(error.message);
        });
}

function deleteRegistre(id) {
    var myModal = new bootstrap.Modal(document.getElementById('confirmDelete'));
    myModal.show();

    document.getElementById('deleteRegistre').addEventListener('click', function () {
        fetch(`${host}/registres/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + monToken
            }
        })
            .then(response => {
                // Vérifier le statut de la réponse
                if (!response.ok) {
                    alert('Erreur lors de la suppression');
                    throw new Error(`Erreur HTTP: ${response.status} - ${response.statusText}`);
                }

                alert('Suppression effectué');
                window.location.reload();
                // Convertir la réponse en JSON
                return response.json();
            })
            .catch(error => {
                // Gérer les erreurs
                console.error(error.message);
            });
    });
}

document.getElementById('logout').addEventListener('click', function () {
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
