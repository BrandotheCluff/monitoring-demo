const express = require('express')
const path = require('path')
const app = express()

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '5c40ac9221e74a18b36301c2de390541',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
    rollbar.info('html file served successfully.')
})

let students = []

app.post('/api/student', (req, res)=>{
    let {name} = req.body
    name = name.trim()

    students.push(name)

    rollbar.log('Student added successfully', {author: 'Scott', type: 'manual entry'})

    res.status(200).send(students)
})


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
})




app.use(rollbar.errorHandler())
app.use(express.json())

const port = process.env.PORT || 4545

app.listen(port, () => console.log(`All systems go on ${port}`))