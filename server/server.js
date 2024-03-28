const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");

const connectDB = require("./config/db");

dotenv.config({ path: "./.env" });
const PORT = process.env.PORT || 5000;

const app = express();

const corsOptions = {
  origin: ["http://localhost:3000"],
  optionsSuccessStatus: 200,
};

dotenv.config({ path: "./.env" });

const server = http.createServer(app);

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

connectDB();

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send(`Server running on port ${PORT}`);
});
