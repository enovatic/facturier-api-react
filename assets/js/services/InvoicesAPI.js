import axios from "axios";

function findAll() {
  return axios
    .get("http://127.0.0.1:8000/api/invoices")
    .then((Response) => Response.data["hydra:member"]);
}

function deleteInvoice(id) {
  return axios.delete("http://127.0.0.1:8000/api/invoices/" + id);
}

function find(id) {
  return axios
    .get("http://127.0.0.1:8000/api/invoices/" + id)
    .then((response) => response.data);
}

function update(id, invoice) {
  return axios.put(
    "http://127.0.0.1:8000/api/invoices/" + id,
    {
      ...invoice,
      customer: `/api/customers/${invoice.customer}`,
    }
    // TODO : Flash Notification de Succès
  );
}

function create(invoice) {
  return axios.post("http://127.0.0.1:8000/api/invoices", {
    ...invoice,
    customer: `/api/customers/${invoice.customer}`,
  });
}

export default {
  findAll,
  delete: deleteInvoice,
  find,
  update,
  create,
};
