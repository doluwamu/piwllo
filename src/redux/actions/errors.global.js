export const connectionError =
  "Operation `users.findOne()` buffering timed out after 10000ms" ||
  "Operation `users.findOne()` buffering timed out after 10000msx" ||
  "getaddrinfo ENOTFOUND cluster0-shard-00-01.bdyrn.mongodb.net" ||
  `Could not connect to any servers in your MongoDB Atlas cluster. One common reason is that you're trying to access the database from an IP that isn't whitelisted. Make sure your current IP address is on your Atlas cluster's IP whitelist: https://docs.atlas.mongodb.com/security-whitelist/` ||
  "getaddrinfo ENOTFOUND cluster0-shard-00-02.bdyrn.mongodb.net";

export const serverErrors =
  "Request failed with status code 500" ||
  `Could not connect to any servers in your MongoDB Atlas cluster. One common reason is that you're trying to access the database from an IP that isn't whitelisted. Make sure your current IP address is on your Atlas cluster's IP whitelist: https://docs.atlas.mongodb.com/security-whitelist/`;

export const cloudinaryError = "Stale request - reported time";

export const cloudinaryErrorMessage =
  "Your clock seems to be backwards. Please reset it and try again";

export const connectionErrorMessage =
  "Ooops, Something went wrong with your connection :(";

export const jwtErrors = "jwt expired" || "jwt malformed";
