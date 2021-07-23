const express = require("express");
const jwt = require("jsonwebtoken");
const { config } = require("./config");

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }));

app.post("/api/auth/token", function(req, res) {
    const { email, username, name } = req.body;
    const token = jwt.sign({ sub: username, email, name }, config.authJwtSecret);
    res.json({ access_token: token });
  });

app.post("/api/auth/verify", function(req, res, next) {
    const { access_token } = req.body;
    try {
      const decoded = jwt.verify(access_token, config.authJwtSecret);
      res.json({ message: "the access token is valid", username: decoded.sub });
    } catch (err) {
      next(err);
    }
  });

  const port = process.env.PORT || 8090;

  app.listen(port, function() {
    console.log(`JWT API is runing on: http://localhost:${port}`);
});
  