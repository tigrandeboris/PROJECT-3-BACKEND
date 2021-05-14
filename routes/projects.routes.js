const express = require('express');
const Project = require('../models/Project.model');
const Task = require('../models/Task.model');
const router = express.Router();


router.get("/", (req, res) => {
    Project.find({ user: req.user.id })
    .then(projects =>  res.status(200).json(projects))
    .catch(err => res.status(500).json(err))
})

router.get("/:id", (req, res) => {
    const { id } = req.params;
    Project.findOne({ _id: id, user: req.user.id  }) /*.populate('tasks')*/
    .then(project => {
        if(!project) {
            return res.status(404).json();
        }
        Task.find({project})
        .then((tasks) => {
            project.tasks = tasks;
            res.status(200).json(project)
        })
    })
    .catch(err => res.status(500).json(err))
})

router.post("/", (req, res) => {
    const { name, due_date } = req.body;

    if(!name){
        return res.status(400).json({ message: "Name is required"});
    }

    Project.create({ name, due_date, user: req.user.id  })
    .then(project => res.status(200).json(project))
    .catch(err => res.status(500).json(err))
})

router.put("/:id", (req, res) => {
    const { id } = req.params;
    Project.findOneAndUpdate({ _id: id, user: req.user.id  }, req.body, { new: true })
    .then(project => {
        if(!project) {
            return res.status(404).json();
        }
        res.status(200).json(project)
    })
    .catch(err => res.status(500).json(err))
})

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    Project.findOneAndRemove({ _id: id, user: req.user.id  })
    .then((project) => {
        if(!project) {
            return res.status(404).json();
        }
        res.status(200).json({ message: `Project ${project.id} deleted 🗑`})
    })
    .catch(err => res.status(500).json(err))
})


module.exports = router;