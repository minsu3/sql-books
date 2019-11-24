// Require statements
let express = require('express');
let database = require('./database.js')
let app = express();


// Middleware
app.use(express.json());


// Configuration Variables
const port = 3000;


// Routes
app.get('/', (request, response) => {
  response.send('Visit /api/books to see our list of titles');
});

////////////////////
//  BOOK ROUTES  
///////////////////




// get all books
app.get('/api/books',  (req, res) => {
  // send all books as JSON response
  const getAllBooks = 'SELECT * FROM books';

  database.all(getAllBooks, (error, results) => {
    if(error) {
      console.log("Get all books table failed", error)
      res.sendStatus(500);
    }
    else {
      res.status(200).json(results);
    }
  });
});




// get one book
app.get('/api/books/:id',  (req, res) => {
  // find one book by its id
  const getOneBook = 'SELECT * FROM books WHERE '
});





// create new book
app.post('/api/books',  (req, res) => {
  // create new book with form data (`req.body`)

});




// update book
app.put('/api/books/:id', (req,res) => {
  // get book id from url params (`req.params`)
  const bookId = req.params.id;
  const updateOneBook = `UPDATE books SET TITLE = ? WHERE books.oid = ${bookId}`;

  // use the query string and req.body to run the query in the database
  database.run(updateOneBook, [req.body.title], error => {
    if(error) {
      console.log(`Update book with ID ${bookId} failed.`, error);
      res.sendStatus(500);
    }
    else {
      console.log(`Book with ID ${bookId} was updated successfully`)
      res.sendStatus(200);
    }
  });
});



// delete book
app.delete('/api/books/:id', (req, res) => {
  // get book id from url params (`req.params`)

});

////////////////////////
// TODO: AUTHOR ROUTES
////////////////////////

// 1. Write a route to retrieve all authors from the database

// 2. Write a route to add a new author to the database

// 3. (OPTIONAL) Write the rest of the RESTful routes for this entity for extra practice.



//////////////////////////
// TODO: CATEGORY ROUTES
//////////////////////////

// 1. Add a route to retrieve all categories from the database

// 2. Write a route to add a new category to the database

// 3. (OPTIONAL) Write the rest of the RESTful routes for this entity for extra practice.



/////////////////////////////////////////////////
// TODO: BOOKS_CATEGORIES ROUTES (MANY TO MANY)
/////////////////////////////////////////////////

// Retrieve a book's categories using book ID 
app.get('/api/books/:id/categories',(req, res) => {
  const bookId = req.params.id;
  const queryString = "SELECT * FROM books_categories WHERE book_id = ?";

  database.all(queryString, [bookId], (error, results) => {
    if (error) {
      console.log(error);
      res.sendStatus(500) //Internal Server Error
    }
    else {
      res.status(200).json(results);
    }
  })
});

// Create an association between a book and a category using the book ID 
app.post('/api/books/:id/categories', (req, res) => {
  const bookId = req.params.id;
  const catId = req.body.category_id
  const insertString = "INSERT INTO books_categories VALUES (?, ?)"

  database.run(insertString, [bookId, catId], error => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    }
    else {
      res.sendStatus(200)
    }
  })
});



// Start Server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

