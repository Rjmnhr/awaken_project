import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://awakenbackend-e14a4ayo.b4a.run", // Replace with your API base URL
  // baseURL: "http://localhost:8003",
});

export default AxiosInstance;
