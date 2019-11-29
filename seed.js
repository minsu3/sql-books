// require our database when running this file
const db = require('./database.js');


// The following list of books will be used to populate the books table
const categories_list = [
  { name: "Fiction" },
  { name: "Non-Fiction" },
  { name: "Theatre" },
  { name: "Comedy" },
  { name: "Tragedy" },
  { name: "Romance" },
  { name: "Adventure" },
  { name: "Self-Help" }
];
const authors_list = [
  { name: "Harper Lee" },
  { name: "F Scott Fitzgerald" },
  { name: "Victor Hugo" },
  { name: "Jules Verne" },
  { name: "Sheryl Sandberg" },
  { name: "Tim Ferriss" },
  { name: "John Steinbeck" },
  { name: "William Shakespeare" }
];
const books_list = [
  {
    title: "To Kill a Mockingbird",
    author_id: 1,
    image: "https://s3-us-west-2.amazonaws.com/sandboxapi/to_kill_a_mockingbird.jpg",
    release_date: "July 11, 1960",
    page_count: 100
  },
  {
    title: "The Great Gatsby",
    author_id: 2,
    image: "https://s3-us-west-2.amazonaws.com/sandboxapi/great_gatsby.jpg",
    release_date: "April 10, 1925",
    page_count: 200
  },
  {
    title: "Les Miserables",
    author_id: 3,
    image: "https://s3-us-west-2.amazonaws.com/sandboxapi/les_miserables.jpg",
    release_date: "Unknown 1862",
    page_count: 300
  },
  {
    title: "Around the World in 80 Days",
    author_id: 4,
    image: "https://s3-us-west-2.amazonaws.com/sandboxapi/around_the_world_in_80_days.jpg",
    release_date: "January 30, 1873",
    page_count: 400
  },
  {
    title: "Lean In",
    author_id: 5,
    image: "https://s3-us-west-2.amazonaws.com/sandboxapi/lean_in.jpg",
    release_date: "March 11, 2013",
    page_count: 500
  },
  {
    title: "The Four Hour Workweek",
    author_id: 6,
    image: "https://s3-us-west-2.amazonaws.com/sandboxapi/four_hour_work_week.jpg",
    release_date: "April 1, 2007",
    page_count: 600
  },
  {
    title: "Of Mice and Men",
    author_id: 7,
    image: "https://s3-us-west-2.amazonaws.com/sandboxapi/of_mice_and_men.jpg",
    release_date: "Unknown 1937",
    page_count: 700
  },
  {
    title: "Romeo and Juliet",
    author_id: 8,
    image: "https://s3-us-west-2.amazonaws.com/sandboxapi/romeo_and_juliet.jpg",
    release_date: "Unknown 1597",
    page_count: 800
  },
  {
    title: "Twelfth Night",
    author_id: 8,
    image: "sampleImage.jpg",
    release_date: "Unknown 1597",
    page_count: 900
  },
  {
    title: "Midsummer's Night Dream",
    author_id: 8,
    image: "sampleImage.jpg",
    release_date: "Unknown 1597",
    page_count: 900
  },
  {
    title: "Macbeth",
    author_id: 8,
    image: "sampleImage.jpg",
    release_date: "Unknown 1597",
    page_count: 1000
  }
];

// const deleteAuthors = 'DELETE FROM authors';
// const deleteBooks = 'DELETE FROM books';
// const deleteCategories = 'DELETE FROM categories';
// const insertIntoAuthors = 'INSERT INTO authors (name) VALUES (?)';
// const insertIntoBooks = 'INSERT INTO books (title, author_id, image, release_date, page_count) VALUES (?, ?, ?, ?, ?)';
// const insertIntoCategories = 'INSERT INTO categories (name) VALUES (?)';

// db.run(deleteAuthors, error => {
//   if (error) console.log(new Error('Could not delete authors'), error);
//   else {
//     authors_list.forEach(author => {
//       db.run(insertIntoAuthors, [author.name], error => {
//         if (error) console.log(new Error('Could not add authors'), error);
//         else {
//           console.log(`${author.name} successfully added to the database!`);
//         }
//       });
//     });
//     db.run(deleteBooks, error => {
//       if (error) console.log(new Error('Could not delete books'), error);
//       else {
//         books_list.forEach(book => {
//           db.run(insertIntoBooks, [book.title, book.author_id, book.image, book.release_date, book.page_count], error => {
//             if (error) console.log(new Error('Could not add books'), error);
//             else {
//               console.log(`${book.title} successfully added to the database!`);
//             }
//           });
//         });
//         db.run(deleteCategories, error => {
//           if (error) console.log(new Error('Could not delete categories'), error);
//           else {
//             categories_list.forEach(cat => {
//               db.run(insertIntoCategories, [cat.name], error => {
//                 if (error) console.log(new Error('Could not add category'), error);
//                 else {
//                   console.log(`${cat.name} successfully added to the database!`);
//                 }
//               });
//             });
//           }
//         });
//       }
//     });
//   }
// });


db.serialize(()=> {

  // Drop the 'books' table
  const dropBooksTableQuery = 'DROP TABLE IF EXISTS books';
  db.run(dropBooksTableQuery, error=> { 
    if(error) console.error("Error dropping 'books' table");
    else console.log("Dropped 'books' table");
  })

  // (Re)create the 'books' table
  const createBooksTableQuery = 'CREATE TABLE books (title TEXT, author_id TEXT, image TEXT, release_date TEXT, page_count INTEGER)';
  db.run(createBooksTableQuery, error=> {
    if(error) console.error("Error creating 'books' table");
    else console.log("Created 'books' table");
  })

  // Insert each book
  const insertBooksQuery = 'INSERT INTO books VALUES (?, ?, ?, ?, ?)';
  for(let book of books_list) {
    let bookData = [book.title, book.author_id, book.image, book.release_date, book.page_count];
    db.run(insertBooksQuery, bookData, error=> {
      if(error) console.log("Could not insert book", book, error);
      else console.log(`Inserted ${book.title} into 'books'`);
    })
  }

  // Drop the 'authors' table
  const dropAuthorsTableQuery = 'DROP TABLE IF EXISTS authors';
  db.run(dropAuthorsTableQuery, error=> { 
    if(error) console.error("Error dropping 'authors' table");
    else console.log("Dropped 'authors' table");
  })

  // (Re)create the 'books' table
  const createAuthorsTableQuery = 'CREATE TABLE authors (name TEXT)';
  db.run(createAuthorsTableQuery, error=> {
    if(error) console.error("Error creating 'authors' table");
    else console.log("Created 'authors' table");
  })

  const insertAuthorsQuery = 'INSERT INTO authors VALUES (?)';
  for(let author of authors_list) {
    let authorData = [author.name];
    db.run(insertAuthorsQuery, authorData, error=> {
      if(error) console.log("Could not insert author", author, error);
      else console.log(`Inserted ${author.name} into 'authors'`);
    })
  }

  const dropCategoriesTableQuery = 'DROP TABLE IF EXISTS categories';
  db.run(dropCategoriesTableQuery, error=> {
  	if(error) console.error("Error dropping 'categories' table");
  	else console.log("Dropped 'categories' table");
  })

  const createCategoriesTableQuery = 'CREATE TABLE categories (name TEXT)';
  db.run(createCategoriesTableQuery, error=> {
  	if(error) console.error("Error creating 'categories' table");
  	else console.log("Created 'categories' table");
  })

  const insertCategoriesQuery = 'INSERT INTO categories VALUES (?)';
  for(let category of categories_list) {
  	let categoryData = [category.name];
  	db.run(insertCategoriesQuery, categoryData, error=> {
  		if(error) console.log("Could not insert category", category, error);
  		else console.log(`Inserted ${category.name} into 'categories'`)
  	})
  }

  const dropBooksCategoriesTableQuery = 'DROP TABLE IF EXISTS books_categories';
  db.run(dropBooksCategoriesTableQuery, error=> {
  	if(error) console.error("Error dropping 'books categories' table");
  	else console.log("Dropped 'books categories' table");
  })

  const createBooksCategoriesTableQuery = 'CREATE TABLE books_categories (book_id INTEGER, category_id INTEGER)';
  db.run(createBooksCategoriesTableQuery, error=> {
  	if(error) console.error("Error creating 'books categories' table");
  	else console.log("Created 'books categories' table");
  })

})












