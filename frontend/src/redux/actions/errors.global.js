export const connectionError =
  "Operation `users.findOne()` buffering timed out after 10000ms" ||
  "Operation `users.findOne()` buffering timed out after 10000msx" ||
  "getaddrinfo ENOTFOUND cluster0-shard-00-01.bdyrn.mongodb.net" ||
  "Could not connect to any servers in your MongoDB Atlas cluster. One common reason is that you're trying to access the database from an IP that isn't whitelisted. Make sure your current IP address is on your Atlas cluster's IP whitelist: https://docs.atlas.mongodb.com/security-whitelist/";

export const connectionErrorMessage =
  "Ooops, Something went wrong with your connection :(";
