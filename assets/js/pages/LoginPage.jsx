import React, { useState, useContext } from "react";
import AuthAPI from "../services/authAPI";
import AuthContext from "../contexts/AuthContext";

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
          <div className="form-group">
            <label htmlFor="username">Adresse Email</label>
            <input
              value={credentials.username}
              type="email"
              className={"form-control" + (error && " is-invalid")}
              placeholder="Adresse email de connexion"
              name="username"
              id="username"
              onChange={handleChange}
            />
            {error && <p className="invalid-feedback">{error}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              value={credentials.password}
              type="password"
              className="form-control"
              placeholder="Mot de passe"
              name="password"
              id="password"
              onChange={handleChange}
            />
          </div>
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
