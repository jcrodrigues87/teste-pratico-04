import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const apiCep = axios.create({
  baseURL: "https://viacep.com.br/ws",
});
