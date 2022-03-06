import app from "./app.js";
import connectToMongoDB from "./utils/connectToMongoDB.js";
import logger from "./utils/logger.js";
import { configSettings } from "./config.js";

const PORT = configSettings.PORT || 9999;

const startServer = async () => {
  await connectToMongoDB();
  app.listen(PORT, () => {
    logger.info(`
      ################################################
      🛡️  Server listening on port: ${PORT} 🛡️
      ################################################
      SERVER IN ${process.env.NODE_ENV} MODE
    `);
  });
};

startServer();

export default app;
