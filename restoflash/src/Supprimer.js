import React, { useState, useEffect } from "react";
import urlAPI from "./axios.config";

export default  function Supprimer() {
  const [users, setUsers] = useState([]);

  const token = localStorage.getItem("Token");

  const config = {
    headers: { Authorization: `Bearer ${token}`  },
  };

  useEffect(() => {
    // Récupérer tous les utilisateurs depuis votre API
    const fetchUsers = async () => {
      try {
        const response = await urlAPI.get("/users",config);
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
    <div>
      <h1>Utilisateurs avec le rôle de cuisinier :</h1>
      <ul>
        {chefs.map((chef) => (
          <li key={chef.id}>
            {chef.nom} {chef.prenom}
            <button onClick={() => deleteUser(chef.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

