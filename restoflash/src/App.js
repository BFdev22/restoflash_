import { useNavigate } from "react-router-dom";
import "./App.css";
import urlAPI from "./axios.config";
import { useEffect, useState } from "react";
import moment from "moment";

function App() {
  const navigate = useNavigate([]);

  const username = localStorage.getItem("Username");
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` },
  };

  const [registres, setRegistres] = useState([]);

  const logout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("UserId");
    localStorage.removeItem("Username");
    navigate("/Login");
  };

  const getRegistres = async () => {
    try {
      const response = await urlAPI.get("registres", config);
      setRegistres(response.data);
    } catch (error) {
      console.log("get registres error: ", error);
    }
  };

  useEffect(() => {
    getRegistres();
  }, []);

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
          <table>
            <thead id="row-info">
              <tr>
                <td>Employé</td>
                <td>Date</td>
                <td>Quantité</td>
              </tr>
            </thead>
            <tbody id="liste">
              {registres.map((registre, i) => {
                const dateFormatee = moment(registre.date).format("DD/MM/YYYY");
                return (
                  <tr key={i}>
                    <td>
                      {registre.user.prenom} {registre.user.nom}
                    </td>
                    <td>{dateFormatee}</td>
                    <td>{registre.quantite}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </section>
    </section>
  );
}

export default App;