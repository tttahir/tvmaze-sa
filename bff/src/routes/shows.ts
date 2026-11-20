import { Router } from "express";
import { searchShows } from "../api/tvMaze.ts";

export const showsRouter = Router();

showsRouter.get("/", async (request, response) => {
  const { q } = request.query;

  if (typeof q !== "string" || !q.trim()) {
    response.status(400).json({ message: "A search query is required" });
    return;
  }

  try {
    response.json(await searchShows(q.trim()));
  } catch {
    response.status(502).json({ message: "Failed to fetch shows from TVmaze" });
  }
});
