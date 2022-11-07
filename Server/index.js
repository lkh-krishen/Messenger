var express = require("express");
var app = express();
var path = require("path");
var fs = require("fs");
var cors = require("cors");
var DBConnection = require("./db/DBConnection");

const workerRoutes = require("./routes/worker_routes");
const managerRoutes = require("./routes/manager_routes");
const messageRoutes = require("./routes/message_routes");
const fileRoutes = require("./routes/file_routes");
var port = 8081 || 8080;

DBConnection();

app.use(cors());
app.use(express.json());

app.use("/workers", workerRoutes);
app.use("/managers", managerRoutes);
app.use("/messages", messageRoutes);
app.use("/file", fileRoutes);
app.use("/", (req, res) => {
  res.status(200).json({ it: "works" });
});


app.listen(port, () =>
  console.log(`Server listening on port ${port}`)
);
