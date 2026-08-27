const express = require("express");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    message: "Superprecios Claros API funcionando"
  });
});

app.get("/v1/health", (req, res) => {
  res.json({
    ok: true,
    status: "online",
    service: "superprecios-claros"
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Superprecios Claros API ejecutándose en puerto ${PORT}`);
});
