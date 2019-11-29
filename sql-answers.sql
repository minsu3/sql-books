-- Get the longest book by page_count
SELECT 
	books.title, 
	max(length(books.page_count)) 
FROM 
	books 

-- Selects the book titles based on a given category id 
SELECT 
	books.title, 
	categories.name 
FROM books 
JOIN books_categories 
	ON books.oid = books_categories.book_id 
JOIN categories 
	ON categories.oid = books_categories.category_id
WHERE categories.oid = 3

-- Sum up the page count of the books associated with the theater category
SELECT 
	SUM(books.page_count)
FROM books
JOIN books_categories
	ON books.oid = books_categories.book_id
JOIN categories 
	ON categories.oid = books_categories.category_id
WHERE category_id = 3 


-- Sum up the number of books associated with both the fiction and tragedy categories
SELECT 
	count(books.title)
FROM books
JOIN books_categories 
	ON books.oid = books_categories.book_id
JOIN categories 
	ON books_categories.category_id = categories.oid
WHERE 
	categories.name = "Fiction" 
	OR categories.name = "Tragedy"


-- Select one author and return all of categories their books are associated with
SELECT 
	books.title, 
	authors.name
FROM authors
JOIN books
ON 
	books.author_id = authors.oid 
WHERE 
	authors.name = "William Shakespeare"


-- Create a hometown column for the authors table and set all of the values to "unknown".
INSERT INTO authors ("HomeTown")
VALUES (NULL)