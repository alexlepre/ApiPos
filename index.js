const express = require('express');
const apicache = require('apicache');
const cache = apicache.middleware;

const app = express();

const resultados = {
  pessoas: [{ id: 1, nome: "Marcelo" }, { id: 2, nome: "João" }, { id: 3, nome: "Maria" }],
  carros: [{ id: 1, modelo: "Fusca" }, { id: 2, modelo: "Gol" }, { id: 3, modelo: "Palio" }],
  animais: [{ id: 1, nome: "Cachorro" }, { id: 2, nome: "Gato" }, { id: 3, nome: "Papagaio" }]
};

const cacheMiddleware = cache('5 minutes');

function clearCache(req, res, next) {
  apicache.clear('pessoas');
  apicache.clear('carros');
  apicache.clear('animais');
  next();
}

app.get('/pessoas', clearCache, cacheMiddleware, (req, res) => {
  res.json(resultados.pessoas);
});

app.get('/carros', clearCache, cacheMiddleware, (req, res) => {
  res.json(resultados.carros);
});

app.get('/animais', clearCache, cacheMiddleware, (req, res) => {
  res.json(resultados.animais);
});

app.get('/pessoas/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const pessoa = resultados.pessoas.find((p) => p.id === id);
  if (pessoa) {
    res.json(pessoa);
  } else {
    res.status(404).send('Pessoa não encontrada');
  }
});

app.get('/carros/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const carro = resultados.carros.find((c) => c.id === id);
  if (carro) {
    res.json(carro);
  } else {
    res.status(404).send('Carro não encontrado');
  }
});

app.get('/animais/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const animal = resultados.animais.find((a) => a.id === id);
  if (animal) {
    res.json(animal);
  } else {
    res.status(404).send('Animal não encontrado');
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor Express rodando na porta ${PORT}`);
});
