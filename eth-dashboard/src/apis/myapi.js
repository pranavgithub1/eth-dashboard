import axios from "axios";
const host = "localhost";
const port = 8080
export default axios.create({
    baseURL: `http://${host}:${port}/api/v1`
})