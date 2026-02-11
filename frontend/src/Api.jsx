import axios from "axios";

const url = "https://to-do-backend-wqsz.onrender.com";
// const url = "http://localhost:3000"

const userUrl = axios.create({
  baseURL: `${url}/auth`,
  withCredentials: true,
});

const taskUrl = axios.create({
    baseURL : `${url}/api/v1/task`,
    withCredentials : true
})

const subTaskUrl = axios.create({
    baseURL : `${url}/api/v1/subtask`,
    withCredentials : true
})

export {userUrl, taskUrl, subTaskUrl}
