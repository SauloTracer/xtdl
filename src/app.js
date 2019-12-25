const express = require('express')
const userRouter = require('./routes/users')
const taskRouter = require('./routes/tasks')
require('./db/mongoose')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)

app.listen(port, () => {
    console.log(`Server up and running. Listening to port ${port}`)
}) 