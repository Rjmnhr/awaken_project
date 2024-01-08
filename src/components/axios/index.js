import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://awakenbackendnew-sjn7gyfg.b4a.run", // Replace with your API base URL
  // baseURL: "http://localhost:8003",
});

export default AxiosInstance;
