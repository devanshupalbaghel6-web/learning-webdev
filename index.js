const express = require('express');
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('./todoMiddleware');
const app = express();
app.use(express.json());
let user_id = 1;
let organisation_id = 1;

const users = [];
const organisations = [];
const boards = [];
const issues = [];

//create end points
app.post('/signup', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	const userExists = users.find((user) => user.username === username);
	if (userExists) {
		res.status(403).json({
			message: 'user already exists!',
		});
		return;
	}
	users.push({
		username: username,
		password: password,
		id: user_id++,
	});
	res.json({
		message: 'you have signed up successfully!!!',
	});
});
app.post('/signin', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	const userExists = users.find(
		(user) => user.username === username && user.password === password,
	);
	if (!userExists) {
		res.status(403).json({
			message: 'Incorrect id or password!!',
		});
		return;
	}
	// create jwt for the user
	const token = jwt.sign(
		{
			userId: userExists.id,
		},
		'devanshu123',
	);
	res.json({
		token: token,
		message: 'you have signed in successfully!!!',
	});
});
app.post('/organisation', authMiddleware, (req, res) => {
	const userId = req.userId;
	organisations.push({
		id: organisation_id++,
		title: req.body.title,
		description: req.body.description,
		admin: userId,
		members: [],
	});
	res.json({
		message: 'org created!!!',
		id: organisation_id - 1,
	});
});
app.post('/add-member-to-organisation', authMiddleware, (req, res) => {
	const userId = req.userId;
	const organisationId = req.body.organisationId;
	const memberUserName = req.body.memberUserName;
	const organisationExists = organisations.find(
		(organisation) => organisation.id === organisationId,
	);
	if (!organisationExists || organisationExists.admin !== userId) {
		res.status(403).json({
			message:
				'Organisation does not exist or you are not the admin of this organisation',
		});
		return;
	}
	const userExists = users.find((user) => user.username === memberUserName);
	if (!userExists) {
		res.status(403).json({
			message: 'User does not exist',
		});
		return;
	}
	const checkIfMemberExists = organisationExists.members.find(
		(member) => member === userExists.id,
	);
	if (checkIfMemberExists) {
		res.status(403).json({
			message: 'User is already a member of this organisation',
		});
		return;
	}

	organisationExists.members.push(userExists.id);
	res.json({
		message: 'Member added successfully',
	});
});
app.post('/boards', (req, res) => {});
app.post('/issues', (req, res) => {});
// get end points
app.get('/organisation', authMiddleware, (req, res) => {
	const userId = req.userId;
	const organisationId = req.body.organisationId;
	const organisationExists = organisations.find(
		(org) => org.id === organisationId,
	);
	if (!organisationExists || organisationExists.admin !== userId) {
		res.status(403).json({
			message:
				' organisation doesnot exist or you are not the admin of the organisation',
		});
		return;
	}
	res.json({
		organisation: {
			...organisationExists,
			members: organisationExists.members.map((memberId) => {
				const user = users.find((user) => user.id === memberId);

				return {
					id: user.id,
					username: user.username,
				};
			}),
		},
	});
});
app.get('/boards', (req, res) => {});
app.get('/issues', (req, res) => {});
app.get('/users', (req, res) => {});
//update
app.put('/issues', (req, res) => {});
//delete
app.delete('/users', authMiddleware, (req, res) => {
	const userId = req.userId;
	const organisationId = req.body.organisationId;
	const memberUserName = req.body.memberUserName;
	const organisationExists = organisations.find(
		(organisation) => organisation.id === organisationId,
	);
	if (!organisationExists || organisationExists.admin !== userId) {
		res.status(403).json({
			message:
				'Organisation does not exist or you are not the admin of this organisation',
		});
		return;
	}
	const userExists = users.find((user) => user.username === memberUserName);
	if (!userExists) {
		res.status(403).json({
			message: 'User does not exist',
		});
		return;
	}
	const checkIfMemberExists = organisationExists.members.find(
		(member) => member === userExists.id,
	);
	if (!checkIfMemberExists) {
		res.status(403).json({
			message: 'User is not a member of this organisation',
		});
		return;
	}
	console.log(checkIfMemberExists);

	organisationExists.members = organisationExists.members.filter(
		(memberId) => memberId !== checkIfMemberExists,
	);
	res.json({
		message: 'Member removed successfully',
	});
});

app.listen(3000);
