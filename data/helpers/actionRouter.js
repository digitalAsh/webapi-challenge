const express = require('express');

const Actions = require('./actionModel.js');

const router = express.Router();

router.use((req, res, next) => {
    console.log('Action Router, whoo!')
    next();
  })

router.get('/', async (req, res) => {
    try {
        const actions = await Actions.get(req.params.id);
        res.status(200).json(actions);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error retrieving the actions'
        });
    }
});

router.post('/', async (req, res) => {
    const newAction = req.body;

    if(newAction) {
        try {
            const action = await Actions.insert(req.body);
            res.status(201).json(action);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Error adding the action'
            });
        }
    } else {
        res.status(400).json({
            err: 'text property missing'
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const action = await Actions.update(req.params.id, req.body);
        if (action) {
            res.status(200).json(action);
        } else {
            res.status(404).json({ message:'The project could not be found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error updating action'
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const count = await Actions.remove(req.params.id)
        if (count > 0) {
            res.status(200).json({ message: 'The action has been nuked' });
        } else {
            res.status(404).json({ message: 'The action could not be found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error removing action'
        });
    }
});

module.exports = router;