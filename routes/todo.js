const express = require('express');
const ToDo = require('../Model/ToDo');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// GET route to fetch user's to-do items
router.get('/', protect, async (req, res) => {
  try {
    const todos = await ToDo.find({ _id: { $in: req.user.todos } });
    console.log("data fatched successfully");
    res.json(todos);
  } catch (err) {
    console.log(err);
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// POST route to add a new to-do item
router.post('/add', protect, async (req, res) => {
  const { title, description, completed } = req.body;

  try {
    const newToDo = new ToDo({
      title,
      description,
      completed,
    });

    const savedToDo = await newToDo.save();
    
    // Add the to-do item to the user's to-do list
    req.user.todos.push(savedToDo);
    await req.user.save();

    res.status(201).json({ msg: 'To-do item added successfully', toDo: savedToDo });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
