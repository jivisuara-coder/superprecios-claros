const express = require("express");
const productos = require("./productos.json");

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
app.get("/v1/buscar", (req, res) => {
  const q = (req.query.q || "").toLowerCase().trim();

  if (!q) {
    return res.status(400).json({
      error: "Debes enviar un término de búsqueda usando ?q="
    });
  }

  const resultados = productos.productos
    .filter((p) =>
      p.nombre.toLowerCase().includes(q) ||
      p.marca.toLowerCase().includes(q) ||
      p.supermercado.toLowerCase().includes(q)
    )
    .sort((a, b) => a.precio - b.precio);
const masBarato = resultados[0] || null;
const masCaro = resultados.length > 1 ? resultados[resultados.length - 1] : null;

const ahorro = masBarato && masCaro
  ? masCaro.precio - masBarato.precio
  : 0;

const porcentajeAhorro = masBarato && masCaro && masCaro.precio > 0
  ? Number(((ahorro / masCaro.precio) * 100).toFixed(1))
  : 0;
  

  res.json({
    busqueda: q,
    cantidad: resultados.length,
    resultados,
   mas_barato: masBarato,
ahorro: ahorro,
porcentaje_ahorro: porcentajeAhorro 
  });
});
app.get("/v1/productos", (req, res) => {
  res.json(productos);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Superprecios Claros API ejecutándose en puerto ${PORT}`);
});
