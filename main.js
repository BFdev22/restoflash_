const path = require('node:path');
const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv');
const url = require('url');

dotenv.config();

const port = process.env.PORT;

const { app, BrowserWindow, ipcMain } = require('electron');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true, // Activez l'intégration de Node.js
            contextIsolation: false, // Désactivez l'isolation de contexte
            preload: __dirname + '/preload.js'
        }
    });

    win.loadFile('./views/home.html');
    win.loadURL('http://localhost:3000');
};

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });

    // Gestion des événements IPC du processus de rendu vers le processus principal
    ipcMain.on('some-event-from-renderer', (event, arg) => {
        console.log(arg); // Afficher les données reçues du processus de rendu
    });
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});