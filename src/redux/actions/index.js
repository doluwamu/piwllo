import axios from "axios";

const userDetails = JSON.parse(localStorage.getItem("userDetails")) || "";
console.log(userDetails);

export const piwlloUserPostInstance = axios.create({
  baseURL: "https://piwllo-server.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${userDetails.token}`,
  },
});

export const piwlloUserGetInstance = axios.create({
  baseURL: "https://piwllo-server.herokuapp.com",
  headers: {
    Authorization: `Bearer ${userDetails.token}`,
  },
});

export const piwlloAuthInstance = axios.create({
  baseURL: "https://piwllo-server.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
  },
});
