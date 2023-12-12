import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useState } from "react";
import axios from "axios";
import urlAPI from "./axios.config";

export default function Ajouter() {
  const [Nom, setNom] = useState("");
  const [Prenom, setPrenom] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Etablissement, setEtablissment] = useState("");
  const [Role, setRole] = useState("");
  const postData = () => {
    console.log(Nom);
    console.log(Prenom);
    console.log(Email);
    console.log(Password);
    console.log(Etablissement);
    console.log(Role);
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await urlAPI.post("/users", {
        Nom,
        Prenom,
        Email,
        Password,
        Etablissement,
        Role,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <Form>
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
      <Button onClick={postData} type="submit">
        Submit
      </Button>
    </Form>
  );
}
