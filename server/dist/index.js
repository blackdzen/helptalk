import http from 'http';
import app from './app.js';
import config from './utils/config.js';
import logger from './utils/logger.js';
http.createServer(app).listen(config.PORT, () => {
    logger.info(`Server get enable, and listen ${config.PORT} port`);
});
