const express = require('express')
const router = new express.Router()

router.post('/users', (req, res) => {
    res.status(201).send()
})

router.get('/users', (req, res) => {
    res.status(200).send([
        {name: 'User1'},
        {name: 'User2'}
    ])
})

router.get('/users/:id', (req, res) => {
    console.log(req.params.id)
    const user = {name: 'User'}
    res.status(200).send(user)
})

router.patch('/users/:id', (req,res) => {
    res.send(req.params.id)
})

router.delete('/users/:id', (req,res) => {
    res.send(req.params.id)
})

module.exports = router