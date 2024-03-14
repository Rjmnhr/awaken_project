import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://awakenbackend-nm19gij4.b4a.run", // Replace with your API base URL
  // baseURL: "http://localhost:8003",
});

export default AxiosInstance;
