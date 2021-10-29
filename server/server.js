const express = require('express')
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')

let app = express()

// Creating a dataPath
let dataPath = path.join(__dirname, '../formdata.json')

// The initial hello! from the home route
// app.get('/', (req, res) => {
//     res.send('Hello from the Web Server Side!')
// })

// Middleware to log request URLs
app.use((req, res, next) => {
    console.log(req.url)
    next()
})

// Using bodyParser to read form data
app.use(bodyParser.urlencoded({extended:false}))

// Posting the index.html formsubmissions data into the formdata.json file
app.post('/formsubmissions', (req, res) => {
    fs.readFile(dataPath, (err, data) => {
        if(err) throw err
        let array = JSON.parse(data)
        array.push(req.body)
        fs.writeFile(dataPath, JSON.stringify(array), (err) => {
            if(err) throw err
            console.log('Name appended!')
        })
    })
    
    res.send('Thanks!')
})

app.use(express.static(path.join(__dirname, '../public')))
// Setting up listening port
app.listen(3000)