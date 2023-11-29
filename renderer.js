const { ipcRenderer } = require('electron');



ipcRenderer.on('login-successful', () => {
    alert('Authentification réussie !');
});

ipcRenderer.on('login-failed', () => {
    alert('Échec de l\'authentification. Veuillez vérifier vos informations de connexion.');
});