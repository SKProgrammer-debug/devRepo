const environment = process.env.APP_ENVIRONMENT || 'local';
console.log("ENVIRONMENT:", environment);

require("dotenv").config({ path: `./environments/.env.${environment}` });
const server = require("./src/server");

const SERVER_PORT = process.env.SERVER_PORT;
const env = process.env.ENV_NAME || "dev";


const src = server;
module.exports = src;