const MongoClient = require('mongodb').MongoClient; // Framework to communicate with mongodb
const Binary = require('mongodb').Binary;           // Framework to store binary data in mongodb
const uri = "mongodb+srv://hyuen:cs407@cluster0.tw2mu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"    // Mongo DB uri
const client = new MongoClient(uri, { useNewUrlParser: true });

const router = require("express").Router();

// Global vars for Mongo DB connection
var connection, db;

/*
 * Function that connects to database
 *
 * @return {int} returns value depending on successful db connection (-1 = Cannot connect to database, 0 = Connected) 
 */
const startDatabaseConnection = async function() {
	try {
		connection = await client.connect();
		db = connection.db('purdue_pete');
        console.log('database conencted');
	}catch(err){
		console.log(err.stack);
		return -1;
	}

	return 0;
}

/*
 * Closes the database connection
 *
 * @return {int} returns value depending whether or not connection was closed successfully (-1 = Cannot close connection to database, 0 = Disconnected) 
 */
const closeDatabaseConnection = async function() {
	try {
		connection.close();
	}catch(err){
		console.log(err.stack);
		return -1;
	}
	
	return 0;
}

/**
 * Creates a new user account and adds it to the database
 * 
 * @param {String} username
 * @param {String} email
 * @param {String} major 
 * @param {String} pass 
 * @return {Int} returns success value. (-1 = account creation failed, 0 = account creation success)
 */
const createAccount = async function(username, email, major, pass) {
	// create a JSON user object
	const user = {
		"user_name":username,
		"password":pass,
		"email":email,
		"schedule":[],
		"major":major,
		"study_group":[],
		"direct_message":[],
		"friend":[],
		"friend_request":[],
		"book_room":[]
	}

	let emailExists;
	
	try {
		emailExists = await accountEmailExists();
		
		if(emailExists === -1){	return -1; }
		if(!emailExists){
			// add a new user to the database
			 await db.collection('User').insertOne(user);
		}
	} catch (error) {
		console.log(err.stack);
		return -1;		
	}

	return 0;
}

/**
 * Gets all information about a user for the profile page
 * 
 * @param {String} email 
 */
const getUserInfo = async function(email){
	let userExists, info;


}

/*
 * Summary. Function that checks if email exists in database
 *
 * @param {String} mail The email of the account which the password is being extracted
 * @return {int} Returns a value depending on if email exists (-1 = Cannot connect to database, 0 = Does not Exist, 1 = Exists) 
 */
const accountEmailExists = async function(mail) {
	let emailExists;

	try {
		// this line depends on the mongodb: 
		emailExists = await db.collection('User').find({email: mail}).limit(1).count(true);
	} catch (err) {
		console.log(err.stack);
		return -1;
	}

	return emailExists;
}

module.exports = {
    startDatabaseConnection:startDatabaseConnection,
    closeDatabaseConnection:closeDatabaseConnection,
    createAccount:createAccount,
	getUserInfo:getUserInfo,
	accountEmailExists:accountEmailExists
}