import express, { Request, Response, NextFunction } from "express";
import { AppError } from "./app/error/appError";
import { routes } from "./app/routes/index.routes";

const app = express();
app.use(express.json());
app.use(routes);
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

app.listen(3000, () => {
  console.log("server online");
});
