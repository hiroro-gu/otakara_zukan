import applyCaseMiddleware from "axios-case-converter";
import axios from "axios";

const options = {
  ignoreHeaders: true
}

const baseURL = process.env.REACT_APP_API_BASE_URL

const client = applyCaseMiddleware(axios.create({
  baseURL: baseURL,
  withCredentials: true,
}), options);

export default client;
