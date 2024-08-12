/* eslint-disable no-undef */
const express = require('express')
const app = express()
const path = require('path')

const destinos = require('./public/destinos.json')

const PORT = process.env.PORT || 3000
app.disable('x-powered-by')
app.use(express.json())

const ACCEPTED_ORIGINS = [
  'http://www.enmodovacaciones.com/',
  'http://enmodovacaciones.com/',
  'http://213.218.240.150/',
  'http://localhost:3000'
]

app.use(express.static(path.join(__dirname, 'public')))

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', ACCEPTED_ORIGINS);
  next();
});

app.get('/informacion', (req, res) => {
  const origin = req.header('origin')
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
  }
  res.sendFile(path.join(__dirname, 'public', 'informacion.json'))
})

app.get('/destinos', (req, res) => {
  const origin = req.header('origin')
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
  }
  res.sendFile(path.join(__dirname, 'public', 'destinos.json'))
})

app.get('/nosotros', (req, res) => {
  const origin = req.header('origin')
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
  }

  const nosotros = require('./public/blog.json');

  res.json(nosotros[0]);
})

app.get('/terminos-y-condiciones', (req, res) => {
  const origin = req.header('origin')
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
  }

  const nosotros = require('./public/blog.json');

  res.json(nosotros[1]);
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/nacionales', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'destinos.html'))
})

app.get('/internacionales', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'destinos.html'))
})

app.get('/destino/:id', (req, res) => {
  const { id } = req.params
  const destino = destinos.find(x => x.id === id)
  if (destino) return res.sendFile(path.join(__dirname, 'public', 'destino.html'))
})

app.get('/plan-turistico/:id', (req, res) => {
  const { id } = req.params
  const destino = destinos.find(x => x.id === id)
  if (destino) return res.sendFile(path.join(__dirname, 'public', 'destino.html'))
})

app.get('/blog', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'en_proceso.html'))
})

app.get('/sobre-nosotros', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'blog.html'))
})

app.get('/TyC', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'blog.html'))
})

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
