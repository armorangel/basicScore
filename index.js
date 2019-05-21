const express = require('express');

const app = express();

app.get("/api/greeting", (req,res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 9000;

app.listen(PORT);