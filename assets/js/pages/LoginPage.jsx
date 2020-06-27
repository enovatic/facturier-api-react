import React, { useState, useContext } from "react";
import AuthAPI from "../services/authAPI";
import AuthContext from "../contexts/AuthContext";
import Field from "../components/forms/Field";

const LoginPage = ({ history }) => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  // Gestion des champs
  const handleChange = ({ currentTarget }) => {
    const { value, name } = currentTarget;

    setCredentials({ ...credentials, [name]: value });
  };

  // Gestion du submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await AuthAPI.authenticate(credentials);

      setError("");
      setIsAuthenticated(true);
      history.replace("/customers");
    } catch (error) {
      setError(
        "Aucun compte ne possede cette adresse ou les informations ne correspondent pas!"
      );
    }
  };

  return (
    <>
      <div className="jumbotron">
        <h1>Connexion à l'application</h1>

        <form action="" onSubmit={handleSubmit}>
          <Field
            label="Adresse Email"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            placeholder="Adresse Email de connexion"
            error={error}
          />
          <Field
            label="Mot de passe"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            type="password"
            id="password"
            error=""
          />
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Je me connecte
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
