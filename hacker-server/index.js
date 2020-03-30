const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.set("view engine", "pug");
app.use(express.urlencoded());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render(__dirname + "/views/index");
});

const port = 8001;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
