import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import urlAPI from "./axios.config";
import "./Supprimer.css"
export default function Supprimer() {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate([]);

  const username = localStorage.getItem("Username");
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` },
  };
  const logout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("UserId");
    localStorage.removeItem("Username");
    navigate("/Login");
  };

  useEffect(() => {
    // Récupérer tous les utilisateurs depuis votre API
    const fetchUsers = async () => {
      try {
        const response = await urlAPI.get("/users", config);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Filtrer les utilisateurs ayant le rôle de cuisinier
  const chefs = users.filter((user) => user.role === 1);

  // Fonction pour supprimer un utilisateur par son ID
  const deleteUser = async (userId) => {
    try {
      const response = await urlAPI.delete(`/users/${userId}`, config);
      console.log("User deleted:", response.data);
      // Mettre à jour la liste des utilisateurs après la suppression
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <section id="fixed-bars">
      <div id="menu">
        {/* DEBUT SIDEBAR */}
        <div id="side-bar">
          <div id="logo-dashboard">
            <img src="logo-departement.png" />
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
            <p id="username">{username}</p>
          </div>
        </div>

        <section id="content">
        <div id="right-title">
          <h1>Utilisateurs avec le rôle de cuisinier :</h1>
        </div>
        <div class="right-content" id="right-content">
          <ul>
            {chefs.map((chef) => (
              <li key={chef.id}>
                {chef.nom} {chef.prenom}
                <button onClick={() => deleteUser(chef.id)}>Supprimer</button>
              </li>
            ))}
          </ul>
        </div>
        </section>
      </section>
    </section>
  );
}
