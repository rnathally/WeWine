import axios from "axios";

const api = axios.create({
  baseURL: "http://SEU_BACKEND_AQUI.com", // ⬅ TROCA SOMENTE ISTO DEPOIS
});

export default api;
