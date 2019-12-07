const express = require('express')

const app = express()
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server up and running. Listening to port ${port}`)
})