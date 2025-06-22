import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;

console.log(baseUrl)

export const api = axios.create({
  baseURL:baseUrl,
  headers:{
    Accept:'application/json'
  }
});