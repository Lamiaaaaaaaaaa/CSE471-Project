const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    res.json({mssg: 'GET all stories'})
})

router.get('/:id', (req, res) => {
    res.json({mssg: 'GET single story'})
})

router.post('/', (req, res) => {
    res.json({mssg: 'POST a new story'})
})

router.delete('/:id', (req, res) => {
    res.json({mssg: 'Delete a story'})
})

router.put('/:id', (req, res) => {
    res.json({mssg: 'update a story'})
})

module.exports = router