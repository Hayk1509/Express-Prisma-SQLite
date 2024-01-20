// Importing the Author type from the author service.
import type { Author } from "../author/author.service";
// Importing the database instance for Prisma ORM.
import { db } from "../utils/db.server";

// Defining the structure of a Book entity.
type Book = {
  id: number;
  title: string;
  isFiction: boolean;
  datePublished: Date;
  author?: Author; // Optional author object
};

// Defining the structure for creating a new Book entity.
type NewBook = {
  title: string;
  isFiction: boolean;
  datePublished: Date;
  authorId: number; // Reference to the associated author's ID
};

// Function to list all books from the database.
export const listBooks = async (): Promise<Book[]> => {
  return db.book.findMany({
    select: {
      id: true,
      title: true,
      isFiction: true,
      datePublished: true,
      author: {
        select:{
            id: true,
            firstName: true,
            lastName: true
        }
      },
    },
  });
};

// Function to get a single book by its ID.
export const getBook = async (id: number): Promise<Book | null> => {
  return db.book.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      isFiction: true,
      datePublished: true,
      author: {
        select:{
            id: true,
            firstName: true,
            lastName: true
        }
      },
    },
  });
};

// Function to create a new book in the database.
export const createBooks = async (book: NewBook): Promise<Book> => {
    console.log(book); // Logging the book object for debugging
  const { title, isFiction, datePublished, authorId } = book;
  const parseDate : Date = new Date(book.datePublished); // Parsing the date

  return db.book.create({
    data: {
      title,
      isFiction,
      datePublished: parseDate,
      authorId,
    },
    select: {
      id: true,
      title: true,
      isFiction: true,
      datePublished: true,
      author: {
        select:{
            id: true,
            firstName: true,
            lastName: true
        }
      }
      
    },
  });
};

// Function to update an existing book's details.
export const updateBooks = async (
  book: Partial<NewBook>,
  id: number
): Promise<Book> => {
  const { title, isFiction, datePublished, authorId } = book;

  return db.book.update({
    where: {
      id,
    },
    data: {
        ...(title !== undefined && { title }),
        ...(isFiction !== undefined && { isFiction }),
        ...(datePublished !== undefined && { datePublished }),
        ...(authorId !== undefined && { authorId }),
    },
    select: {
      id: true,
      title: true,
      isFiction: true,
      datePublished: true,
      authorId: true,
    },
  });
};

// Function to delete a book from the database by its ID.
export const deleteBooks = async (id: number): Promise<void> => {
  await db.book.delete({
    where: {
      id,
    },
  });
};
