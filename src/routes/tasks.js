const express = require('express')
const router = new express.Router()

router.post('/tasks', (req, res) => {
    res.status(201).send()
})

router.get('/tasks', (req, res) => {
    res.status(200).send([
        {name: 'Task1'},
        {name: 'Task2'}
    ])
})

router.get('/tasks/:id', (req, res) => {
    console.log(req.params.id)
    const task = {name: 'Task'}
    res.status(200).send(task)
})

router.patch('/tasks/:id', (req,res) => {
    res.send(req.params.id)
})

router.delete('/tasks/:id', (req,res) => {
    res.send(req.params.id)
})

module.exports = router