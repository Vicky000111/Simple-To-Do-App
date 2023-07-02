const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
require("dotenv").config();

app.use(express.json());

const db = require("./db/db");

const PORT = process.env.PORT || 8000;

app.use("/", require("./routes/routes"));

db.then(() => {
  console.log("Connected To MongoDB");
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}).catch((err) => {
  console.log(err);
});
