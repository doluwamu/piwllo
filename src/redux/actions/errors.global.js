export const connectionError =
  "Operation `users.findOne()` buffering timed out" ||
  "getaddrinfo ENOTFOUND" ||
  `Could not connect to any servers in your MongoDB Atlas cluster.`;

export const serverErrors =
  "Request failed with status code 500" ||
  `Could not connect to any servers in your MongoDB Atlas cluster.`;

export const cloudinaryError = "Stale request - reported time";

export const cloudinaryErrorMessage =
  "Your clock seems to be backwards. Please reset it and try again";

export const connectionErrorMessage =
  "Ooops, Something went wrong with your connection :(";

export const jwtErrors = "jwt expired" || "jwt malformed";
