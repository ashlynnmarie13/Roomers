require("dotenv").config();
const express = require("express");
const massive = require("massive");

const port = 3001;

const app = express();

app.listen(port, () => console.log(`I am listening on port ${port}`));
