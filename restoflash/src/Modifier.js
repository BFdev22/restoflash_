import React, { useState, useEffect } from "react";
import urlAPI from "./axios.config";

function Modifier() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updatedNom, setUpdatedNom] = useState("");
  const [updatedPrenom, setUpdatedPrenom] = useState("");

  useEffect(() => {
    // Récupérer tous les utilisateurs depuis votre API
    const fetchUsers = async () => {
      try {
        const response = await urlAPI.get("/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Filtrer les utilisateurs ayant le rôle de cuisinier
  const chefs = users.filter((user) => user.role === 1);

  // Fonction pour afficher le formulaire de modification d'un utilisateur
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setUpdatedNom(user.nom);
    setUpdatedPrenom(user.prenom);
  };

  // Fonction pour mettre à jour les détails d'un utilisateur
  const updateUser = async () => {
    try {
      const response = await urlAPI.put(
        `/users/${selectedUser.id}`,
        {
          nom: updatedNom,
          prenom: updatedPrenom,
        }
      );
      console.log("User updated:", response.data);
      // Mise à jour des détails de l'utilisateur dans la liste
      const updatedUsers = users.map((user) =>
        user.id === selectedUser.id ? { ...user, nom: updatedNom, prenom: updatedPrenom } : user
      );
      setUsers(updatedUsers);
      setSelectedUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div>
      <h1>Utilisateurs avec le rôle de cuisinier :</h1>
      <ul>
        {chefs.map((chef) => (
          <li key={chef.id}>
            {chef.nom} {chef.prenom}
            <button onClick={() => handleEditUser(chef)}>Modifier</button>
          </li>
        ))}
      </ul>

      {selectedUser && (
        <div>
          <h2>Modifier les détails de {selectedUser.nom} {selectedUser.prenom}</h2>
          <input
            type="text"
            value={updatedNom}
            onChange={(e) => setUpdatedNom(e.target.value)}
          />
          <input
            type="text"
            value={updatedPrenom}
            onChange={(e) => setUpdatedPrenom(e.target.value)}
          />
          <button onClick={updateUser}>Enregistrer les modifications</button>
        </div>
      )}
    </div>
  );
}

export default Modifier;
