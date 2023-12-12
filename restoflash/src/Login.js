import { useEffect, useState } from "react";
import "./Login.css";
import urlAPI from "./axios.config";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  //console.log("errorMessage: ", errorMessage);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await urlAPI.post("/connexion", { email, password });

      localStorage.setItem("Token", response.data.token);
      localStorage.setItem("UserId", response.data.userid);
      localStorage.setItem("Username", response.data.username);
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="Login">
      <div id="div-img">
        <img src="logo-departement.png" />
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <h1>Connexion</h1>
        </div>
        <div id="login-input">
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            placeholder="Email"
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            placeholder="Mot de Passe"
          />
        </div>
        <div style={{ color: "red" }}>{errorMessage ? errorMessage : null}</div>
        <div id="login-submit">
          <input type="submit" value="Envoyer" />
        </div>

        <div id="extra-form">
          <p id="forgotten-password">
            <a href="">Mot de passe oublié?</a>
          </p>
          <div id="remember-me">
            <input type="checkbox" name="remeber me" />
            <p>Se souvenir de moi</p>
          </div>
        </div>
      </form>
    </div>
  );
}
export default Login;