const express = require('express')
const router = new express.Router()
const User = require('../models/users')

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(400).send({message: 'Usuário não encontrado.'})
        }
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/users/:id', async (req,res) => {
    const updateFields = Object.keys(req.body)
    const allowedUpdateFields = ['name','email','password','age']
    const isValidOperation = updateFields.every((update) => allowedUpdateFields.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({error: 'A atualização de um ou mas campos informados não é permitida.'})
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if (!user) {
            res.status(404).send({message: 'Usuário não encontrado.'})
        }
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete('/users/:id', async (req,res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            res.status(404).send({message: 'Usuário não encontrado.'})
        }
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router