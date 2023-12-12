import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import { useState, useEffect } from "react";
// import axios from "axios";
import urlAPI from "./axios.config";

export default function Create() {
    const updateAPIData = () => {
        axios.put(``, {
            firstName,
             lastName,
             checkbox
        })
    }

  return (
    <section id="fixed-bars">
      <div id="menu">
        {/* DEBUT SIDEBAR */}
        <div id="side-bar">
          <div id="logo-dashboard">
            <img src="LOGO-departement.png" />
          </div>
          <div id="menu-side">
            <ul id="navlink">
              <li>
                <span class="material-symbols-outlined">grid_view</span>
                <p>
                  <a href="/dashboard">Dashboard</a>
                </p>
              </li>
              <li>
                <span class="material-symbols-outlined">add</span>
                <p>
                  <a href="ajouter">Ajouter</a>
                </p>
              </li>
              <li>
                <span class="material-symbols-outlined">cycle</span>
                <p>
                  <a href="modifier">Modifier</a>
                </p>
              </li>
              <li>
                <span class="material-symbols-outlined">remove</span>
                <p>
                  <a href="supprimer">Supprimer</a>
                </p>
              </li>
            </ul>
          </div>
          <div id="logout">
            <div id="btn-logout">
              <span class="material-symbols-outlined">logout</span>
              <h4>Déconnexion </h4>
            </div>
          </div>
        </div>
        {/* FIN SIDEBAR */}
      </div>
      <section id="right-content">
        <div id="log-info">
          <span class="material-symbols-outlined">person</span>
          <div id="name-email">
            <p id="username">Username</p>
            <p id="email">adresse@gmail.com</p>
          </div>
        </div>

        <section id="content">
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Field>
              <label>Nom</label>
              <input
                onChange={(e) => setNom(e.target.value)}
                value={Nom}
                type="text"
                placeholder="Nom"
              />
            </Form.Field>
            <Form.Field>
              <label>Prénom</label>
              <input
                onChange={(e) => setPrenom(e.target.value)}
                value={Prenom}
                type="text"
                placeholder="Prénom"
              />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={Email}
                type="email"
                placeholder="exemple@gmail.com"
              />
            </Form.Field>
            <Form.Field>
              <label>Mot de passe</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={Password}
                type="password"
                placeholder="Mot de passe"
              />
            </Form.Field>
            <Form.Field>
              <label>Etablissement</label>
              <input
                onChange={(e) => setEtablissment(e.target.value)}
                value={Etablissement}
                type="number"
                placeholder="Etablissement"
              />
            </Form.Field>
            <Form.Field>
              <label>Rôle</label>
              <input
                onChange={(e) => setRole(e.target.value)}
                value={Role}
                type="number"
                placeholder="0"
              />
            </Form.Field>
            <Button type="submit">Modifier</Button>
          </Form>
        </section>
      </section>
    </section>
  );
}
