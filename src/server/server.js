const express = require("express")
const bodyParser = require("body-parser")
var cors = require('cors')
const db = require("../database/database")

const app = express()
const PORT = 4321

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const api = require("./routes/api")
app.use("/api", api)
const auth = require("./routes/auth")
app.use("/auth", auth)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`)
})
