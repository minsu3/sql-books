let sqlite3 = require('sqlite3');
let database = new sqlite3.Database('./database.db');

// book table attributes 
// - title (text)
// - author (text)
// - image (text)
// release_date (text)
// - page_count (integer)

const createTableBooksQuery = 
	`CREATE TABLE IF NOT EXISTS books (
		title TEXT, 
		author_id TEXT, 
		image TEXT, 
		release_date TEXT, 
		page_count INTEGER)`;

// Author table attributes
// - name
const createTableAuthorsQuery = `
	CREATE TABLE IF NOT EXISTS authors (
		name TEXT)`;

// Category table attributes
// - name 
const createTableCategoriesQuery = `
	CREATE TABLE IF NOT EXISTS categories (
		name TEXT)`;

// Books-Categories JOIN table attributes 
// - book_id 
// - category_id 
const createTableBooksCategoriesQuery = `
	CREATE TABLE IF NOT EXISTS books_categories ( 
		book_id INTEGER,
		category_id INTEGER)`;


database.run(createTableBooksQuery, error => {
	if(error) {
		console.log(new Error("Create books table failed"), error);
	}
	else {
		console.log("Create books table succeeded");
	}
});

database.run(createTableAuthorsQuery, error => {
	if(error) {
		console.log(new Error("Create authors table failed"), error);
	}
	else {
		console.log("Create authors table succeeded");
	}
});

database.run(createTableCategoriesQuery, error => {
	if(error) {
		console.log(new Error("Create categories table failed"), error);
	}
	else {
		console.log("Create categories table succeeded");
	}
});

database.run(createTableBooksCategoriesQuery, error => {
	if(error) {
		console.log(new Error("Create books categories table failed"), error);
	}
	else {
		console.log("Create books categories table succeeded");
	}
});

module.exports = database;

