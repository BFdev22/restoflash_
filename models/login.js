const axios = require('axios');
const dotenv = require('dotenv');
const { response } = require('express');

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
        .then(data => {
            localStorage.setItem('monToken', data.token)
            localStorage.setItem('userid', data.userid)
            localStorage.setItem('username', data.username)
            window.location.assign('./views/home.html');
        })
        .catch(error => console.error('Erreur lors de la requête :', error));
        // Stocker le token dans le localStorage
        
        
        

        // Supprimer le token du localStorage (par exemple, lors de la déconnexion)
        // localStorage.removeItem('monToken');
});
