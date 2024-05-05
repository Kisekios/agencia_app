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
  res.sendFile(path.join(__dirname, 'public', 'nacionales.html'))
})

app.get('/internacionales', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'internacionales.html'))
})

app.get('/destino/:id', (req, res) => {
  const { id } = req.params
  const destino = destinos.find(x => x.id === id)
  if (destino) return res.sendFile(path.join(__dirname, 'public', 'destino.html'))/* res.json(destino) */
  res.status(404).json({ message: 'Destino no encontrado' })
})

app.get('/plan-turistico/:id', (req, res) => {
  const { id } = req.params
  const destino = destinos.find(x => x.id === id)
  if (destino) return res.sendFile(path.join(__dirname, 'public', 'planes.html'))/* res.json(destino) */
  res.status(404).json({ message: 'Destino no encontrado' })
})

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
