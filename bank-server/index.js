const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.set("view engine", "pug");
app.use(express.urlencoded());
app.use(cookieParser());

const user = {
  username: "bob",
  password: "password"
};

const authCookie = Math.random().toString();

app.get("/", (req, res) => {
  res.render(__dirname + "/views/index");
});

app.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  if (username === user.username && password === user.password) {
    res.cookie("bankAuthCookie", authCookie, {
      maxAge: 900000,
      httpOnly: true
    });
    console.log("cookie created successfully");
    res.redirect("/send-money");
  } else {
    res.render(__dirname + "/views/index");
  }
});

app.get("/send-money", (req, res) => {
  const cookie = req.cookies.bankAuthCookie;
  if (cookie === authCookie) {
    res.render(__dirname + "/views/send-money");
  } else {
    res.redirect("/");
  }
});

app.post("/send-money", (req, res) => {
  const cookie = req.cookies.bankAuthCookie;
  if (cookie === authCookie) {
    const { recipient, amount } = req.body;
    res.render(__dirname + "/views/send-money-success", { amount, recipient });
  } else {
    res.status(401).render(__dirname + "/views/unauthorized");
  }
});

const port = 3001;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
