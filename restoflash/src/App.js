import './App.css';


  

function App() {
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
          <table>
            <thead id="row-info">
              <tr>
                <td>Employé</td>
                <td>Date</td>
                <td>Quantité</td>
              </tr>
            </thead>
            <tbody id="liste">
              <tr>
                <td>Giraud</td>
                <td>Pierre</td>
                <td>28</td>
              </tr>
              <tr>
                <td>Joly</td>
                <td>Pauline</td>
                <td>27</td>
              </tr>
              <tr>
                <td>Joly</td>
                <td>Pauline</td>
                <td>27</td>
              </tr>
              <tr>
                <td>Joly</td>
                <td>Pauline</td>
                <td>27</td>
              </tr>
              <tr>
                <td>Joly</td>
                <td>Pauline</td>
                <td>27</td>
              </tr>
              <tr>
                <td>Joly</td>
                <td>Pauline</td>
                <td>27</td>
              </tr>
              <tr>
                <td>Joly</td>
                <td>Pauline</td>
                <td>27</td>
              </tr>
              <tr>
                <td>Joly</td>
                <td>Pauline</td>
                <td>27</td>
              </tr>
              <tr>
                <td>Joly</td>
                <td>Pauline</td>
                <td>27</td>
              </tr>
              <tr>
                <td>Joly</td>
                <td>Pauline</td>
                <td>27</td>
              </tr>
              <tr>
                <td>Joly</td>
                <td>Pauline</td>
                <td>27</td>
              </tr>
              <tr>
                <td>Joly</td>
                <td>Pauline</td>
                <td>27</td>
              </tr>
              <tr>
                <td>Joly</td>
                <td>Pauline</td>
                <td>27</td>
              </tr>
              <tr>
                <td>Joly</td>
                <td>Pauline</td>
                <td>27</td>
              </tr>
              <tr>
                <td>Joly</td>
                <td>Pauline</td>
                <td>27</td>
              </tr>
              <tr>
                <td>Joly</td>
                <td>Pauline</td>
                <td>27</td>
              </tr>
              <tr>
                <td>Joly</td>
                <td>Pauline</td>
                <td>27</td>
              </tr>
              <tr>
                <td>Joly</td>
                <td>Pauline</td>
                <td>27</td>
              </tr>
              <tr>
                <td>Joly</td>
                <td>Pauline</td>
                <td>27</td>
              </tr>
            </tbody>
          </table>
        </section>
      </section>
    </section>
  );
}


export default App;
