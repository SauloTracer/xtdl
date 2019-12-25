const express = require('express')
const Task = require('../models/tasks')

const router = new express.Router()

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(400).send({message: 'Tarefa não encontrada.'})
        }
        res.status(200).send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/tasks/:id', async (req,res) => {
    const updateFields = Object.keys(req.body)
    const allowedUpdateFields = ['title','description','completed','periodicity','tags']
    const isValidOperation = updateFields.every((update) => allowedUpdateFields.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({error: 'A atualização de um ou mas campos informados não é permitida.'})
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if (!task) {
            res.status(404).send({message: 'Tarefa não encontrada.'})
        }
        res.status(200).send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete('/tasks/:id', async (req,res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) {
            res.status(404).send({message: 'Tarefa não encontrada.'})
        }
        res.status(200).send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router