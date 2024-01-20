import * as AuthorService from "./author.service";

import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import express from "express";

export const authorRouter = express.Router();

authorRouter.get("/", async (request: Request, response: Response) => {
  try {
    const authoors = await AuthorService.listAuthors();
    return response.status(200).json(authoors);
  } catch (error) {
    return response.status(500).send({ error: error });
  }
});
authorRouter.get("/:id", async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id, 10);
  try {
    const author = await AuthorService.getAuthor(id);
    if (author) response.status(200).json(author);
    return response.status(404).json("Author could not be found");
  } catch (error) {
    return response.status(500).send({ error: error });
  }
});
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
authorRouter.delete("/:id", async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id, 10);
  try {
    await AuthorService.deleteAuthor(id);
    return response.status(201).json("Author successfully deleted");
  } catch (error) {
    return response.status(500).send({ error: error });
  }
});
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
    const id: number = parseInt(request.params.id, 10);
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
