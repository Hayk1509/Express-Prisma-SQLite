// Importing the AuthorService module to handle author related business logic.
import * as AuthorService from "./author.service";

// Importing necessary types from Express for request and response objects.
import type { Request, Response } from "express";
// Importing validation utilities from express-validator for request body validation.
import { body, validationResult } from "express-validator";

// Importing express to create a router.
import express from "express";

// Creating a new router for handling author routes.
export const authorRouter = express.Router();

// GET endpoint for listing all authors.
// It uses the listAuthors function from the AuthorService module.
authorRouter.get("/", async (request: Request, response: Response) => {
  try {
    const authors = await AuthorService.listAuthors();
    return response.status(200).json(authors);
  } catch (error) {
    return response.status(500).send({ error: error });
  }
});

// GET endpoint for fetching a single author by their id.
// The id is taken from the route parameters.
authorRouter.get("/:id", async (request: Request, response: Response) => {
  const id = parseInt(request.params.id, 10);
  try {
    const author = await AuthorService.getAuthor(id);
    if (author) {
      return response.status(200).json(author);
    } else {
      return response.status(404).json("Author could not be found");
    }
  } catch (error) {
    return response.status(500).send({ error: error });
  }
});

// POST endpoint for creating a new author.
// It validates the request body and then uses the createAuthors function from AuthorService.
authorRouter.post(
  "/",
  body("firstName").isString(),
  body("lastName").isString(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const { firstName, lastName } = request.body;
    try {
      const author = await AuthorService.createAuthors({ firstName, lastName });
      return response.status(201).json(author);
    } catch (error) {
      return response.status(500).send({ error: error });
    }
  }
);

// DELETE endpoint for removing an author by their id.
// It uses the deleteAuthor function from AuthorService to remove the specified author.
authorRouter.delete("/:id", async (request: Request, response: Response) => {
  const id = parseInt(request.params.id, 10);
  try {
    await AuthorService.deleteAuthor(id);
    return response.status(201).json("Author successfully deleted");
  } catch (error) {
    return response.status(500).send({ error: error });
  }
});

// PUT endpoint for updating an existing author's details.
// This endpoint also performs validation checks on the request body.
authorRouter.put(
  "/:id",
  body("firstName").isString(),
  body("lastName").isString(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const { firstName, lastName } = request.body;
    const id = parseInt(request.params.id, 10);
    try {
      const author = await AuthorService.updateAuthors(
        { firstName, lastName },
        id
      );
      return response.status(201).json(author);
    } catch (error) {
      return response.status(500).send({ error: error });
    }
  }
);
