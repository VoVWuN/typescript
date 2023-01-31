import { Author } from "./author.js";

export type Review = [string, number, string];

export enum IGenre {
  Fantasy = 1,
  Adventure,
  Horror,
}

export type BookAuthor = Pick<Author, "firstName" | "lastName">;