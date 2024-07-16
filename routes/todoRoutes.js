const express = require('express');
const router = express.Router();

// Hardcoded test data 
let todos = [
  { id: 1, title: 'Do laundry', description: 'Wash clothes and hang to dry', state: 'incomplete' },
  { id: 2, title: 'Buy groceries', description: 'Milk, bread', state: 'incomplete' },
  { id: 3, title: 'Read book', description: 'GITA', state: 'completed' }
];

// CRUD 
router.get('/', (req, res) => {
  res.json(todos);
});

router.get('/:id', (req, res) => {
  const todo = todos.find(todo => todo.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send('The todo with the given ID was not found.');
  res.json(todo);
});

router.post('/', (req, res) => {
  const { title, description, state } = req.body;
  const todo = { id: todos.length + 1, title, description, state };
  todos.push(todo);
  res.json(todo);
});

router.put('/:id', (req, res) => {
  const todo = todos.find(todo => todo.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send('The todo with the given ID was not found.');

  todo.title = req.body.title;
  todo.description = req.body.description;
  todo.state = req.body.state;


  res.json(todo);
});

router.delete('/:id', (req, res) => {
  const todoIndex = todos.findIndex(todo => todo.id === parseInt(req.params.id));
  if (todoIndex === -1) return res.status(404).send('The todo with the given ID was not found.');

  todos.splice(todoIndex, 1);
  res.json({ message: 'Todo deleted' });
});

module.exports = router;
