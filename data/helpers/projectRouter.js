const express = require('express');

const Projects = require('./projectModel.js');

const router = express.Router();

router.use((req, res, next) => {
    console.log('Hubs Router, whoo!')
    next();
  })

//url /api/projects  
router.get('/', async (req, res) => {
    try {
        const projects = await Projects.get(req.params.id);
        res.status(200).json(projects); 
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error retrieving the posts'
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const project = await Projects.update(req.params.id, req.body);
        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({ message:'The project could not be found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error updating project'
        });
    }
});

module.exports = router;