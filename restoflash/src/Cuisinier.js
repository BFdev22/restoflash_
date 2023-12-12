import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import urlAPI from "./axios.config";

function UserList() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

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
    urlAPI
      .get("users", config)
      .then((response) => {
        setUsers(response.data);
        filterUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const filterUsers = (data) => {
    const filteredData = data.filter((user) => user.role === 1);
    setFilteredUsers(filteredData);
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
          <div>
            <h1>Liste des utilisateurs ayant le rôle 1 (cuisiniers)</h1>
            <ul>
              {filteredUsers.map((user) => (
                <li key={user.id}>
                  {user.nom} - {user.prenom} - Rôle: {user.role}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </section>
    </section>
  );
}

export default UserList;
