/* eslint-disable no-undef */
const express = require('express')
const app = express()
const path = require('path')

const destinos = require('./public/destinos.json')

const PORT = process.env.PORT ?? 1234
app.disable('x-powered-by')
app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

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
    /* res.status(404).sendFile(path.join(__dirname, 'public', 'en_proceso.html')) */
})

app.get('/plan-turistico/:id', (req, res) => {
  const { id } = req.params
  const destino = destinos.find(x => x.id === id)
  if (destino) return res.sendFile(path.join(__dirname, 'public', 'destino.html'))
  /* res.status(404).sendFile(path.join(__dirname, 'public', 'en_proceso.html')) */
})

app.get('/blog', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'en_proceso.html'))
})

app.get('/sobre-nosotros', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'en_proceso.html'))
})

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
