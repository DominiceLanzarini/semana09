import dotenv from "dotenv";
dotenv.config();

import { AppDataSource } from "./data-source";
import express from "express";
import cors from "cors";

import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import medicineRouter from "./routes/medicine.routes";
import rbacRouter from "./routes/rbac.routes";



const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/login", authRouter);
app.use("/medicine", medicineRouter);
app.use("/rbac", rbacRouter);

AppDataSource.initialize()
  .then(async () => {
    app.listen(process.env.PORT, () => {
      console.log("Servidor rodando na porta: ", process.env.PORT);
    });
  })
  .catch((error) => console.log(error));
