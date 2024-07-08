import axios from "axios";

// const API_HOST = process.env.API_HOST;

// console.log({ API_HOST });

const instance = axios.create({
	baseURL: `http://localhost:8080`,
	timeout: 10000, // Adjust timeout as needed
});

export default instance;
