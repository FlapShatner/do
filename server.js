const express = require('express')
const app = express()
const port = 3000

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
 res.sendFile(__dirname + '/index.html', (err) => {
  if (err) {
   res.status(500).send(err)
  }
 })
})

app.listen(port, () => {
 console.log(`Server listening at http://localhost:${port}`)
})
