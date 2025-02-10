import dotenv from "dotenv";
dotenv.config();

import { AppDataSource } from "./data-source";
import express from "express";
import cors from "cors";

const app = express();

import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import medicamentosRouter from "./routes/medicamentos.routes";

import authenticate from "./middleware/authenticate";

import Role from "./entity/Role";
import Permission from ".entity/Permission";

app.use(cors());
app.use(express.json());

app.use("/users", authenticate, userRouter);
app.use("/login", authRouter);
app.use("/medicamentos", medicamentosRouter);

AppDataSource.initialize()
  .then(async () => {
    app.listen(3000, () => {
      console.log("Servidor rodando na porta http://localhost:3000");
    });
  })
  .catch((error) => console.log(error));
