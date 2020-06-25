import axios from "axios";

function findAll() {
  return axios
    .get("http://127.0.0.1:8000/api/customers")
    .then((Response) => Response.data["hydra:member"]);
}

function deleteCustomer(id) {
  return axios.delete("http://127.0.0.1:8000/api/customers/" + id);
}

export default {
  findAll,
  delete: deleteCustomer,
};
