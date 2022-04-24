import axios from "axios";
// import {
//   connectionError,
//   connectionErrorMessage,
//   // jwtErrors,
// } from "./errors.global";

export const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("image", image);

  return await axios.post("/api/v1/upload", formData);
};
