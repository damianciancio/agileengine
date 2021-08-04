import axios from "axios";

const instance = axios.create({
  baseURL: "http://interview.agileengine.com"
});

export default instance;