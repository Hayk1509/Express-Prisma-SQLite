# Express Prisma SQLite API Usage with Postman

This guide explains how to use the Express Prisma SQLite API with Postman. The API provides endpoints for managing authors and books.

## Setting up Postman

1. Open Postman.
2. Import the provided collection by clicking on the 'Import' button in Postman.
3. Paste the link to the collection or upload the JSON file.

## Available Endpoints

### Author Endpoints

1. **Get Authors**
   - Method: `GET`
   - URL: `localhost:8080/api/authors`
   - Description: Retrieves a list of all authors.

2. **Get Single Author**
   - Method: `GET`
   - URL: `localhost:8080/api/authors/{id}`
   - Description: Retrieves details of a specific author by ID.

3. **Post Author**
   - Method: `POST`
   - URL: `localhost:8080/api/authors`
   - Body: 
     ```json
     {
       "firstName": "FirstName",
       "lastName": "LastName"
     }
     ```
   - Description: Creates a new author.

4. **Delete Author**
   - Method: `DELETE`
   - URL: `localhost:8080/api/authors/{id}`
   - Description: Deletes an author by ID.

5. **Update Author**
   - Method: `PUT`
   - URL: `localhost:8080/api/authors/{id}`
   - Body: 
     ```json
     {
       "firstName": "UpdatedFirstName",
       "lastName": "UpdatedLastName"
     }
     ```
   - Description: Updates an existing author's details.

### Book Endpoints

1. **Get Books**
   - Method: `GET`
   - URL: `localhost:8080/api/books`
   - Description: Retrieves a list of all books.

2. **Get Single Book**
   - Method: `GET`
   - URL: `localhost:8080/api/books/{id}`
   - Description: Retrieves details of a specific book by ID.

3. **Post Book**
   - Method: `POST`
   - URL: `localhost:8080/api/books`
   - Body:
     ```json
     {
       "title": "BookTitle",
       "isFiction": true/false,
       "datePublished": "YYYY-MM-DD",
       "authorId": AuthorId
     }
     ```
   - Description: Creates a new book.

4. **Delete Book**
   - Method: `DELETE`
   - URL: `localhost:8080/api/books/{id}`
   - Description: Deletes a book by ID.

5. **Update Book**
   - Method: `PUT`
   - URL: `localhost:8080/api/books/{id}`
   - Body:
     ```json
     {
       "title": "UpdatedBookTitle",
       "isFiction": true/false,
       "datePublished": "YYYY-MM-DD"
     }
     ```
   - Description: Updates an existing book's details.

## Using the API

To use the API, select the desired endpoint in Postman, modify the URL parameters or body as needed, and send the request. The API will respond with the relevant data or a confirmation of the action taken.
