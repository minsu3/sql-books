// Require statements
let express = require('express');
let database = require('./database.js');
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
app.get('/api/books',  (request, response) => {
  // send all books as JSON response
  const getAllBooks = 'SELECT * FROM books';

  database.all(getAllBooks, (error, results) => {
    if(error) {
      console.log("Get all books table failed", error);
      response.sendStatus(500); //Internal Server Error
    }
    else {
      response.status(200).json(results);
    }
  });
});

// get one book
app.get('/api/books/:id',  (request, response) => {
  // find one book by its id
  const bookId = request.params.id;
  const getOneBook = `SELECT * FROM books WHERE books.oid = ?`;

  database.all(getOneBook, [bookId], (error, results) => {
    if(error) {
      console.log("Get one book from table failed", error);
      response.sendStatus(500);
    }
    else {
      response.status(200).json(results);
    }
  });
});

// create new book
app.post('/api/books', (request, response) => {
  // create new book with form data (`req.body`)
  const reqBody = [request.body.title, request.body.author_id, request.body.image, request.body.release_date, request.body.page_count];
  const createNewBook = 'INSERT INTO books VALUES (?, ?, ?, ?, ?)';

  database.run(createNewBook, reqBody, error => {
    if(error) {
      console.log(`Create new book with title: ${request.body.title} failed`);
      response.sendStatus(500);
    }
    else {
      console.log(`Successfully added new book ${request.body.title}`);
      response.sendStatus(200);
    }
  });
});

// update book
app.put('/api/books/:id', (request,response) => {
  // get book id from url params (`req.params`)
  const bookId = request.params.id;
  const updateOneBook = `UPDATE books SET TITLE = ? WHERE books.oid = ${bookId}`;

  // use the query string and req.body to run the query in the database
  database.run(updateOneBook, [request.body.title], error => {
    if(error) {
      console.log(`Update book with ID ${bookId} failed.`, error);
      response.sendStatus(500);
    }
    else {
      console.log(`Book with ID ${bookId} was updated successfully`);
      response.sendStatus(200);
    }
  });
});

// delete book
app.delete('/api/books/:id', (request, response) => {
  // get book id from url params (`req.params`)
  const bookId = [request.params.id];
  const deleteBooks = `DELETE FROM books WHERE ? = oid`;

  database.run(deleteBooks, bookId, error => {
    if(error) {
      console.log(`Delete from book with ID of ${bookId} failed`);
      response.sendStatus(500);
    }
    else{
      console.log(`Delete from book with ID of ${bookId} succeeded`);
      response.sendStatus(200);
    }
  });
});

////////////////////////
// TODO: AUTHOR ROUTES
////////////////////////

// 1. Write a route to retrieve all authors from the database
app.get('/api/authors', (request,response) => {
  const getAllAuthors = 'SELECT * FROM authors';

  database.all(getAllAuthors, (error, results) => {
    if(error) {
      console.log("Retrieving all authors failed");
      response.sendStatus(500);
    }
    else {
      console.log("Retrieving all authors succeeded");
      response.status(200).json(results);
    }
  })
})

// 2. Write a route to add a new author to the database
app.post('/api/authors', (request, response) => {
  const reqBody = [request.body.name];
  const addNewAuthor = 'INSERT INTO authors VALUES (?)';

  database.all(addNewAuthor, reqBody, error => {
    if(error) {
      console.log(`Adding new author ${request.body.name} to the database failed`);
      response.sendStatus(500);
    }
    else {
      console.log(`Adding new author ${request.body.name} to the database succeeded`);
      response.sendStatus(200);
    }
  });
});

// 3. (OPTIONAL) Write the rest of the RESTful routes for this entity for extra practice.

//get one author
app.get('/api/authors/:id', (request, response) => {
  const authorId = request.params.body;
  const retrieveOneAuthor = 'SELECT * FROM authors WHERE authors.oid = ?';

  database.all(retrieveOneAuthor, [authorId], (error, results) => {
    if(error) {
      console.log('Failed to retrieve one author from the table');
      response.sendStatut(500);
    } else {
      console.log('Succeeded retrieving one author from the table');
      response.status(200).json(results);
    }
  });
});

//Update author
app.put('/api/authors/:id', (request, response) => {
  const authorId = request.params.id;
  const updateOneAuthor = `UPDATE authors SET NAME = ? WHERE authors.oid = ${authorId}`;

  database.all(updateOneAuthor, [request.body.name], error => {
    if(error) {
      console.log(`Update author with name ${authorId} failed`, error);
      response.sendStatus(500);
    } else {
      console.log(`Update author with name ${authorId} succeeded`);
      response.sendStatus(200);
    }
  });
});

// Delete author
app.delete('/api/authors/:id', (request, response) => {
  // get book id from url params (`req.params`)
  const authorId = [request.params.id];
  const deleteAuthors = `DELETE FROM authors WHERE ? = oid`;

  database.run(deleteAuthors, authorId, error => {
    if(error) {
      console.log(`Delete from authors with ID of ${authorId} failed`);
      response.sendStatus(500);
    }
    else{
      console.log(`Delete from authors with ID of ${authorId} succeeded`);
      response.sendStatus(200);
    }
  });
});

//////////////////////////
// TODO: CATEGORY ROUTES
//////////////////////////

// 1. Add a route to retrieve all categories from the database
app.get('/api/categories', (request, response) => {
  const getAllCategories = "SELECT * FROM categories";

  database.all(getAllCategories, (error, results) => {
    if(error) {
      console.log("Get all categories from the database failed");
      response.sendStatus(500);
    }
    else {
      response.status(200).json(results);
    }
  });
});

// 2. Write a route to add a new category to the database
app.post('/api/categories', (request, response) => {
  reqBody = [request.body.name];
  const addNewCategory = 'INSERT INTO categories VALUES (?)';

  database.all(addNewCategory, reqBody, error => {
    if(error) {
      console.log(`Adding a new category ${request.body.name} to the database failed`);
      response.sendStatus(500);
    }
    else {
      console.log(`Adding a new category ${request.body.name} to the database succeeded`);
      response.sendStatus(200);
    }
  })
})
// 3. (OPTIONAL) Write the rest of the RESTful routes for this entity for extra practice.

//get one category 
app.get('/api/categories', (request, response) => {
  const categoryId = [request.params.id];
  const getOneCategory = 'SELECT * FROM categories WHERE categories.oid = ?'

  database.all(getOneCategory, [categoryId], (error, results) => {
    if (error) {
      console.log(`Select one category with ID of ${categoryId} failed`, error);
      response.sendStatus(500);
    } else {
      console.log(`Select one category with ID of ${categoryId} succeeded`);
      response.send(200).json(results);
    }
  });
});

//update category 
app.put('/api/categories/:id', (request, response) => {
  const categoryId = [request.params.id];
  const updateOneCategory = `UPDATE categories SET NAME = ? WHERE categories.oid = ${categoryId}`;

  database.run(updateOneCategory, [req.body.name], error => {
    if(error) {
      console.log(`Update one category with ID of ${categoryId} failed`, error);
      response.sendStatus(500);
    } else {
      console.log(`Update one category with ID of ${categoryId} succeeded`);
      response.sendStatus(200);
    }
  });
});

//delete category 
app.delete('/api/categories/:id', (request, response) => {
  const categoryId = [request.params.id];
  const deleteOneCategory = `DELETE FROM categories WHERE ? = oid`

  database.run(deleteOneCategory, categoryId, error => {
    if(error) {
      console.log(`Deleting one category with ID ${categoryId} failed`, error);
      response.sendStatus(500);
    } else {
      console.log(`Deleting one category with ID ${categoryId} succeeded`);
      response.status(200);
    }
  });
});

/////////////////////////////////////////////////
// TODO: BOOKS_CATEGORIES ROUTES (MANY TO MANY)
/////////////////////////////////////////////////

// Retrieve a book's categories using book ID 
app.get('/api/books/:id/categories',(request, response) => {
  const bookId = request.params.id;
  const queryString = "SELECT * FROM books_categories WHERE book_id = ?";

  database.all(queryString, [bookId], (error, results) => {
    if (error) {
      console.log(error);
      response.sendStatus(500); 
    }
    else {
      response.status(200).json(results);
    }
  })
});

//Retrieve all books categories 
app.get('/api/books_categories', (request, response) => {
  const queryString = `SELECT * FROM books_categories`

  database.all(queryString, (error, results)=>{
    if(error) {
      console.log(`Failed to select all book categories from books_categories table.`)
      res.sendStatus(500)
    } else {
      response.status(200).json(results)
    }
  })
})

// Create an association between a book and a category using the book ID 
app.post('/api/books/:id/categories', (request, response) => {
  const bookId = request.params.id;
  const catId = request.body.category_id;
  //const getBookTitle = `SELECT title FROM books WHERE books.oid = ?`;
  //let bookTitle = "";
  const insertString = "INSERT INTO books_categories VALUES (?, ?)"

  // database.all(getBookTitle, [bookId], (error, results) => {
  //   if (error) {
  //     console.log(`Error getting book title`);
  //     response.sendStatus(500);
  //   }
  //   else {
  //     console.log(`Creating association between book and category succeeded`);
  //     // [ { title: 'Romeo and Juliet' } ]
  //     bookTitle = results[0].title;
  //     console.log(bookTitle);
  //   }
  // });
  //database.run(insertString, [bookId, bookTitle, catId], error => {

  database.run(insertString, [bookId, catId], error => {
    if (error) {
      console.log(`Error in creating association between book and category`, error);
      response.sendStatus(500);
    }
    else {
      console.log(`Creating association between book and category succeeded`);
      response.sendStatus(200);
    }
  });
});

app.delete('/api/books_categories/:id', (request, response) => {
  const queryInsertion = [request.params.id]
  const queryString = 'DELETE FROM books_categories WHERE book_id = ?'

  database.run(queryString, queryInsertion, error=>{
    if(error) response.sendStatus(500)
    else response.sendStatus(200)
  })
})

// Start Server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

