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

/**
 * Gets all users with the given prefix
 *
 * @param {String} prefix
 */
const searchUsers = async function(prefix){
	return new Promise(function(resolve, reject) {
		//TODO: error with regex try again later
		// var query = { user_name: { $regex: `/^${prefix}/` } };
		var query = { user_name: prefix };
		db.collection("User").find(query).toArray(function(err, result) {
			if (err) throw err;
			console.log(result);
			resolve(result);
		});
	});
}

/**
 * Gets all users with the given class tag
 *
 * @param {String} classtag
 */
 const searchUsersCT = async function(classtag){
	return new Promise(function(resolve, reject) {
		var query = { user_name: classtag };
		db.collection("User").find(query).toArray(function(err, result) {
			if (err) throw err;
			console.log(result);
			resolve(result);
		});
	});
}

module.exports = {
    startDatabaseConnection:startDatabaseConnection,
    closeDatabaseConnection:closeDatabaseConnection,
    createAccount:createAccount,
	getUserInfo:getUserInfo,
	accountEmailExists:accountEmailExists,
	searchUsers:searchUsers
}

/**
 * Update's the friendlist of the one recieving the friend request
 *
 * @param {String} receiver
 */
const updateFriendRequest = async function(curuser, receiver){
	//TODO: error checking on duplicate
	curUser = curuser
	console.log(receiver)
	var myquery = { user_name: receiver };
	var newvalue = { $push: {friend_request: curUser} };
	db.collection("User").updateOne(myquery, newvalue, function(err, res) {
	if (err) throw err;
		console.log(err);
	});
}

/**
 * Gets the study group with the given prefix
 *
 * @param {String} prefix
 */
const searchStudyGroup = async function(prefix){
  return new Promise(function(resolve, reject) {
    //TODO: error with regex try again later
    // var query = { Course_name: { $regex: `/^${prefix}/` } };
    var query = { Course_name: prefix };
    db.collection("Study_group").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      resolve(result);
    });
  });
}

/**
 * Gets the class tag with the given prefix
 *
 * @param {String} prefix
 */
const searchClassTag = async function(prefix){
	return new Promise(function(resolve, reject) {
	  //TODO: error with regex try again later
	  // var query = { Course_name: { $regex: `/^${prefix}/` } };
	  var query = { class_tag: prefix };
	  db.collection("Class_tag").find(query).toArray(function(err, result) {
		if (err) throw err;
		console.log(result);
		resolve(result);
	  });
	});
}

const handleAcceptReject = async function(data){
	curUser = data.curUser
	console.log(data)
	var myquery = { user_name: curUser };
	var remove = { $pull: {friend_request: data.data} };

	db.collection("User").findOneAndUpdate(myquery, remove, function(err, res) {
		if (err) throw err;
			console.log(err);
	});

	if (data.type == "acceptfr") {
		var newvalue = { $push: {friend: data.data} };
		db.collection("User").updateOne(myquery, newvalue, function(err, res) {
		if (err) throw err;
			console.log(err);
		});
		myquery = { user_name: data.data };
		newvalue = { $push: {friend: curUser} };
		db.collection("User").updateOne(myquery, newvalue, function(err, res) {
		if (err) throw err;
			console.log(err);
		});
	}
}

// ONLY USE TO POPULATE EMPTY DATABASE FOR TESTING
const populateDatabase = async function(){
	console.log("POPUlating database")
	var users = [
		{ user_name: "bob", password: "1234", email: "bob@gmail.com", schedule:[], major: "cs", study_group: [], direct_message: [], friend: [], friend_request: [], book_room:[] },
		{ user_name: "boby", password: "1234", email: "boby@gmail.com", schedule:[], major: "cs", study_group: [], direct_message: [], friend: [], friend_request: [], book_room:[]  },
		{ user_name: "tom", password: "1234", email: "tom@gmail.com", schedule:[], major: "cs", study_group: [], direct_message: [], friend: [], friend_request: [], book_room:[]  },
		{ user_name: "simp", password: "1234", email: "simp@gmail.com", schedule:[], major: "cs", study_group: [], direct_message: [], friend: [], friend_request: [], book_room:[]  }
	];

	db.collection("User").insertMany(users, function(err, res) {
		if (err) {
			console.log(err)
		};
	});

}

module.exports = {
	searchUsers,
	startDatabaseConnection,
	updateFriendRequest,
	populateDatabase,
	getUserInfo,
	handleAcceptReject,
	searchUsersCT,
	searchClassTag
}

