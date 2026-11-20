import express from "express";
import { allowFrontendOrigin } from "./middleware/allowFrontendOrigin.ts";
import { showsRouter } from "./routes/shows.ts";

const port = Number(process.env.BFF_PORT);
const host = process.env.NODE_ENV === "production" ? "0.0.0.0" : "127.0.0.1";

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("BFF_PORT must be an integer between 1 and 65535");
}

const app = express();

app.use("/api", allowFrontendOrigin);
app.use("/api/shows", showsRouter);

app.get("/api/health-checks", (_request, response) => {
  response.json({ isHealthy: true });
});

app.listen(port, host, () => {
  console.log(`BFF is running at http://${host}:${port}`);
});
