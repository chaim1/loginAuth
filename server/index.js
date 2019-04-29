const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 3000;
const app = express();
const jwt = require("jsonwebtoken");
const JWT_KEY = "afsdl;adsf809sdfj3l42ktwer";

app.use(cors());
app.use(bodyParser.json());

app.use(function(req, res, next) {
  if (req.path === "/login") {
    next();
  } else if (!req.headers.authorization) {
    return res.status(403).json({ error: "No credentials sent!" });
  } else {
    try {
      const token = jwt.verify(
        req.headers.authorization.replace("Bearer ", ""),
        JWT_KEY
      );
      console.log(token);

      next();
    } catch (ex) {
      const e = ex;
      return res.status(401).json({ error: "Bad credentials" });
    }
  }
});

app.post("/login", (req, res, next) => {
  const postData = req.body;
  console.log(postData);

  if (postData.Name === "me" && postData.Password === "abc123") {
    const token = jwt.sign({ username: "me" }, JWT_KEY);
    res.json(token);
  } else {
    res.status(401).json("go away");
  }
});

app.post("/signup", (req, res, next) => {
  console.log(req.body);
});

app.listen(PORT, function() {
  console.log("server started at port " + PORT);
});
