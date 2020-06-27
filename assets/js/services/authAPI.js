import axios from "axios";
import jwtDecode from "jwt-decode";

// Déconnexion (suppression du token LocalStorage et sur Axios)
function logout() {
  window.localStorage.removeItem("authToken");
  delete axios.defaults.headers["Authorization"];
}

/**
 *  Requete HTTP d'authentification et stockage du token dans le storage et Axios
 * @param {object} credentials
 */

function authenticate(credentials) {
  return axios
    .post("http://localhost:8000/api/login_check", credentials)
    .then((response) => response.data.token)
    .then((token) => {
      // Je stocke le token dans mon localStorage
      window.localStorage.setItem("authToken", token);
      // On prévient Axios qu'on a maintenant un header par défaut sur toutes nos futures requetes HTTP
      setAxiosToken(token);
    });
}

/**
 *  Positionne le token JWt avec Axios
 * @param {string} credentials
 */

function setAxiosToken(token) {
  axios.defaults.headers["Authorization"] = "Bearer " + token;
}

/**
 * Mise en place lors du chargement de l'application
 */

function setup() {
  // Voir si on as un token
  const token = window.localStorage.getItem("authToken");
  // Si le token est valide

  if (token) {
    const { exp: expiration } = jwtDecode(token);
    if (expiration * 1000 > new Date().getTime()) {
      setAxiosToken(token);
    }
  }
}
/**
 * Permet de savoir si on est authentifié ou pas
 * @return boolean
 */

function isAuthenticated() {
  const token = window.localStorage.getItem("authToken");
  if (token) {
    const { exp: expiration } = jwtDecode(token);
    if (expiration * 1000 > new Date().getTime()) {
      return true;
    }
    return false;
  }
  return false;
}

export default {
  authenticate,
  logout,
  setup,
  isAuthenticated,
};
