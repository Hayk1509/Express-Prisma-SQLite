// Importing the BookService module to handle the business logic.
import * as BookService from "./book.service";

// Importing necessary types from Express.
import type { Request, Response } from "express";
// Importing validation utilities from express-validator.
import { body, validationResult } from "express-validator";

// Importing express to create router.
import express from "express";

// Creating a new router for handling book routes.
export const bookRouter = express.Router();

// GET endpoint for listing all books.
// It uses the listBooks function from the BookService module.
bookRouter.get("/", async (request: Request, response: Response) => {
  try {
    const books = await BookService.listBooks();
    return response.status(200).json(books);
  } catch (error) {
    return response.status(500).send({ error: error });
  }
});

// GET endpoint for fetching a single book by its id.
// The id is taken from the route parameters.
bookRouter.get("/:id", async (request: Request, response: Response) => {
  const id = parseInt(request.params.id, 10);
  try {
    const book = await BookService.getBook(id);
    return response.status(200).json(book);
  } catch (error) {
    return response.status(500).send({ error: error });
  }
});

// POST endpoint for creating a new book.
// It performs validation checks and then uses the createBooks function from BookService.
bookRouter.post("/", async (request: Request, response: Response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }
  const { title, isFiction, datePublished, authorId } = request.body;
  try {
    const book = await BookService.createBooks({
      title,
      isFiction,
      datePublished,
      authorId,
    });
    return response.status(201).json(book);
  } catch (error) {
    return response.status(500).send({ error: error });
  }
});

// PUT endpoint for updating an existing book.
// This endpoint allows updating partial book details.
bookRouter.put("/:id", async (request: Request, response: Response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }
  const { title, isFiction, datePublished, authorId } = request.body;
  const id = parseInt(request.params.id, 10);
  try {
    const book = await BookService.updateBooks(
      { title, isFiction, datePublished, authorId },
      id
    );
    return response.status(200).json(book);
  } catch (error) {
    return response.status(500).send({ error: error });
  }
});

// DELETE endpoint for removing a book by its id.
// It uses the deleteBooks function from BookService to remove the specified book.
bookRouter.delete("/:id", async (request: Request, response: Response) => {
  const id = parseInt(request.params.id, 10);
  try {
    await BookService.deleteBooks(id);
    return response.status(200).json({ message: "Book deleted" });
  } catch (error) {
    return response.status(500). send({ error: error });
  }
});
