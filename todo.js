const express = require('express');
const jwt = require ('jsonwebtoken');
const { authMiddleware } = require('./todoAppMiddleware');
const app = express();
app.use(express.json());
const USERS = [];
let TODOS = [];
let CURRENT_USER_ID = 1;
let CURRENT_TODO_ID = 1;
app.post('/signup', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	const userExist = USERS.find((u) => {
		return u.username === username;
	});
	if (userExist) {
		res.status(403).json({
			message: 'user already exists!!!',
		});
		return;
	}
	USERS.push({
		id: CURRENT_USER_ID++,
		username: username,
		password: password,
	});
	res.json({
		message: 'you signed up successfully',
		id: CURRENT_USER_ID - 1,
	});
});
app.post('/signin', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	const userExist = USERS.find((u) => {
		return u.username === username && u.password === password;
	});
	if (!userExist) {
		res.status(403).json({
			message: ' your username or password is incorrect!!!',
		});
		return;
	}
	const token = jwt.sign({ userId: userExist.id }, 'dev123');
	res.json({
		token: token,
		message: ' you signed in sucessfully !!!',
	});
});
app.post('/todo', authMiddleware, (req, res) => {
	const userId = req.userId;
	const title = req.body.title;
	const description = req.body.description;
	TODOS.push({
		id: CURRENT_TODO_ID++,
		title: title,
		description: description,
		userId: userId,
	});
	res.json({
		message: 'todo made!!!',
	});
});
app.delete('/todo/:todoId', authMiddleware, (req, res) => {
	const todoId = parseInt(req.params.todoId);
	const userId = req.userId;
	TODOS = TODOS.filter((t) => !(t.userId === userId && t.id === todoId));
	// or : TODOS = TODOS.filter(
	//(t) => t.userId !== userId || t.id !== todoId)
	res.json({
		message: 'todo deleted!!!',
	});
});
app.get('/todos', authMiddleware, (req, res) => {
	const userId = req.userId;
	const userTodos = TODOS.filter((t) => t.userId === userId);
	res.json({
		todos: userTodos,
		message: ' here are your todos',
	});
});
app.listen(3001);
