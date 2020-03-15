const path = require("path");
const config = require("dotenv").config({ path: ".env" });
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const PORT = process.env.PORT || 4240;
const { startRequestInterval } = require("./utils/interval");

const routes = require("./routes");

require("dotenv").config();

const app = express()
  .use(helmet())
  .use(cors())
  .use(logger("short"))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use("/api", routes);

// Start interval of checking plant notifications
startRequestInterval();

// Start server
app.listen(PORT, () => console.log("Making some magic on port ", PORT));
