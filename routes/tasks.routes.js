const express = require('express')
const Task = require('../models/Task.model');
const Project = require('../models/Project.model');
const router = express.Router();



router.post("/", (req, res) => {
  const { project_id, name, due_date, priority } = req.body;

  if(!name){
    return res.status(400).json({ message: "Name is required"});
  }

  Project.findOne({ _id: project_id, user: req.user.id })
  .then((project) => {
    if(!project){
      return res.status(400).json({ message: "Invalid Project id"});
    }
    Task.create({ name, due_date, priority, project })
    .then(task => res.status(200).json(task))
    .catch(err => res.status(500).json(err))
  })
  .catch(err => res.status(500).json(err))
})

router.put("/:id", (req, res) => {
  const { id } = req.params;
  Task.findByIdAndUpdate( id, req.body, { new: true })
  .then(task => {
    if(!task) {
      return res.status(404).json();
    }
    res.status(200).json(task)
  })
  .catch(err => res.status(500).json(err))
})

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Task.findByIdAndRemove(id)
  .then((task) => {
    if(!task) {
      return res.status(404).json();
    }
    res.status(200).json({ message: `Task ${task.id} deleted 🗑`})
  })
  .catch(err => res.status(500).json(err))
})


module.exports = router;