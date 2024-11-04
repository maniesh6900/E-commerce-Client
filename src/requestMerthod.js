import axios from "axios";

const  BASE_URL  = "http://localhost:4000"
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTk4NDQ4Zjc0Y2Q0ZDZmOTA3ZGRkOSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcyNzI1Mzk0MiwiZXhwIjoxNzI3NTEzMTQyfQ.Ps9kK5V7AAVVte1O-w-4J5pTjir-uLPdceWEJa9AY3M"

export const publicRequest = axios.create({
    baseURL: BASE_URL,
  });

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: { token: `Bearer ${TOKEN}` },
  });

