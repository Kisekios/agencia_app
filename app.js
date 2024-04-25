const express = require('express')
const app = express()
const path = require('path')

const PORT = process.env.PORT ?? 1234
app.disable('x-powered-by')

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

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
