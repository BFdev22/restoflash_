const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();
const host = process.env.HOST;

const login = document.getElementById('submitLogin');

login.addEventListener("click", function (event) {
    event.preventDefault();
    const username = document.getElementById('inputEmail').value;
    const password = document.getElementById('inputPassword').value;

    fetch(`${host}/connexion`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: username,
            password: password
        })
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Erreur lors de la requête :', error));
});
