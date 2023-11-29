const axios = require('axios');

const loginForm = document.getElementById('submitLogin');

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const username = document.getElementById('inputEmail').value;
    const password = document.getElementById('inputPassword').value;

    await axios.post('/login', {
        email: username,
        password: password
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
});
