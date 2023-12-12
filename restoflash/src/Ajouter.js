import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useState, useEffect } from "react";
// import axios from "axios";
import urlAPI from "./axios.config";
import { useNavigate } from "react-router-dom";

export default function Ajouter() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [etablissements, setEtablissment] = useState([]);
  const [etablissementId, setEtablissmentId] = useState([]);
  const [role, setRole] = useState("");
  const navigate = useNavigate([]);

  const logout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("UserId");
    localStorage.removeItem("Username");
    navigate("/Login");
  };
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` },
  };
  const lsEtablissement = async () => {
    try {
      //const response = await urlAPI.get("/etablissements/:etablissementId", config);
      const response = await urlAPI.get("/etablissements", config);
      console.log("etab list:", response.data)
      setEtablissment(response.data);
    } catch (error) {
      console.log("get registres error: ", error);
    }
  };
  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault(); // Vérifie si l'événement existe avant d'appeler preventDefault
    }
    try {
      console.log("ici", etablissementId)
      if (!nom || !prenom || !email || !password || !etablissementId || !role) {
        // Vérifie si tous les champs sont remplis
        console.log("Veuillez remplir tous les champs.");
        return;
      }
      //e.preventDefault(); Il est ou le terminal du server please ?
      
      const response = await urlAPI.post("/users", {
        nom,
        prenom,
        email,
        password,
        etablissementId,
        role,
      });
      console.log("response users: ", response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    //handleSubmit();
    lsEtablissement();
  }, []);

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
                  <a href="/ajouter">Ajouter</a>
                </p>
              </li>
              <li>
              <span class="material-symbols-outlined">person</span>
                <p>
                  <a href="/cuisiniers">Voir Cuisiniers</a>
                </p>
              </li>
              <li>
              <span class="material-symbols-outlined">update</span>
                <p>
                  <a href="/modifier">Modifier</a>
                </p>
              </li>
              <li>
                <span class="material-symbols-outlined">delete</span>
                <p>
                  <a href="/supprimer">Supprimer</a>
                </p>
              </li>
            </ul>
          </div>
          <div id="logout">
            <div id="btn-logout">
            <span class="material-symbols-outlined">logout</span>
            <button
                style={{
                  backgroundColor: "transparent",
                  backgroundRepeat: "no-repeat",
                  border: "none",
                  cursor: "pointer",
                  overflow: "hidden",
                  outline: "none",
                  fontWeight: "bold",
                  fontSize: 14,
                }}
                onClick={() => logout()}
              >
                Déconnexion{" "}
              </button>
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
          <Form className="create-form" onSubmit={(e) => handleSubmit(e)}>
            <Form.Field>
              <label>Nom</label>
              <input
                onChange={(e) => setNom(e.target.value)}
                value={nom}
                type="text"
                placeholder="Nom"
              />
            </Form.Field>
            <Form.Field>
              <label>Prénom</label>
              <input
                onChange={(e) => setPrenom(e.target.value)}
                value={prenom}
                type="text"
                placeholder="Prénom"
              />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="exemple@gmail.com"
              />
            </Form.Field>
            <Form.Field>
              <label>Mot de passe</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Mot de passe"
              />
            </Form.Field>
            <Form.Field>
              <label>
                Etablissement
                <select
                  name="etablissement"
                  onChange={(e) => setEtablissmentId(e.target.value)} 
                  value={etablissementId}
                >
                  {etablissements.map((etablissement) => (
                    <option key={etablissement.id} value={etablissement.id}>
                      {etablissement.nomEtablissement}
                    </option>
                  ))}
                  {/* Faut pas faire de map ici ou peut etre que si lol */}
                  
                </select>
              </label>
            </Form.Field>
            <Form.Field>
              <label>Rôle</label>
              <input
                onChange={(e) => setRole(e.target.value)}
                value={role}
                type="number"
                placeholder="0"
              />
            </Form.Field>
            <Button type="submit">Submit</Button>
          </Form>
        </section>
      </section>
    </section>
  );
}
