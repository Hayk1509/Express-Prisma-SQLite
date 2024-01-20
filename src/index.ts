// Importing dotenv to load environment variables from a .env file.
import * as dotenv from "dotenv";

// Importing necessary modules from express.
import express, { Request, Response } from "express";

// Importing routers for authors and books.
import { authorRouter } from "./author/author.router";
import { bookRouter } from "./book/book.router";
// Importing the cors middleware to enable Cross-Origin Resource Sharing.
import cors from "cors";

// Initializing dotenv to load environment variables.
dotenv.config();

// Checking if the PORT environment variable is set, and exiting if not set.
if (!process.env.PORT) {
    process.exit(1);
}

// Parsing the PORT environment variable to a number.
const PORT: number = parseInt(process.env.PORT as string, 10);

// Creating an Express application instance.
const app = express();

// Using the cors middleware to allow cross-origin requests.
app.use(cors());

// Using express.json() middleware to parse JSON bodies in requests.
app.use(express.json());

// Starting the server to listen on the specified PORT.
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Registering the authorRouter to handle routes starting with "/api/authors".
app.use("/api/authors", authorRouter);

// Registering the bookRouter to handle routes starting with "/api/books".
app.use("/api/books", bookRouter);
