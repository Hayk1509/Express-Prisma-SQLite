// Importing PrismaClient from the Prisma ORM package.
import { PrismaClient } from "@prisma/client";

// Declaring a variable to hold the PrismaClient instance.
let db: PrismaClient;

// Declaring a global variable in the Node.js global namespace.
// This is used to ensure a single instance of PrismaClient.
declare global {
  var __db: PrismaClient | undefined;
}

// If the global instance of PrismaClient doesn't exist, create a new one.
// This check ensures that only one instance of PrismaClient is created and reused,
// which is a recommended practice for Prisma in a long-running application like a server.
if (!global.__db) {
  global.__db = new PrismaClient();
}

// Assign the global PrismaClient instance to the local db variable.
db = global.__db;

// Exporting the db variable for use in other parts of the application.
export { db };
