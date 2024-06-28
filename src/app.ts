import cors from "cors";
import express, { Application } from "express";
import { Request, Response } from "express";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// routes
app.use("/api", router);

app.get("/", (request: Request, response: Response) => {
  response.status(200).send("Meeting room booking system server is running!");
});

// error handler
app.use(globalErrorHandler);
app.use(notFound);

export default app;
