import { useEffect, useState } from "react";
import "./Login.css";
import urlAPI from "./axios.config";

function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
  
  
    const handleSubmit = async (e)=>{
      
      
      try {
        e.preventDefault()
        const response = await urlAPI.post("/connexion", {email, password});
        console.log(response)
        
      } catch (error) {
        console.log(error)
      }
    }
    useEffect(()=>{
      //handleSubmit();
    },[])
    return (
      <div className="Login">
        <div id="div-img">
          <img src="LOGO-departement .png" />
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <h1>Connexion</h1>
          </div>
          <div id="login-input">
            <input type="text"
             onChange={(e) => setEmail(e.target.value)} 
             value={email} 
             required
             placeholder="Email" />
            <input type="password"
             onChange={(e) => setPassword(e.target.value)} 
             value={password} 
             required
            placeholder="Mot de Passe" />
          </div>
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