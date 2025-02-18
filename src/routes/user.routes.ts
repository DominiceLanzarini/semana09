import { Request, Response, Router } from "express";
import { AppDataSource } from "../data-source";
import bcrypt from "bcrypt";
import User from "../entity/User";
import roleAuthorization from "../middleware/roleAuthorization";
import authenticate from "../middleware/authenticate";

const userRouter = Router();

const userRepository = AppDataSource.getRepository(User);

// criar usuário no db
userRouter.post(
  "/",
  authenticate(["criarUsuario"]),
  async (req: Request, res: Response) => {
    try {
      const userBody = req.body;

      if (
        !userBody ||
        !userBody.firstName ||
        !userBody.lastName ||
        !userBody.age ||
        !userBody.email ||
        !userBody.password
      ) {
        res.status(400).json("Preencha todos os dados!");
        return;
      }

      const salt = await bcrypt.genSalt(10);
      const senhaCriptografada = await bcrypt.hash(userBody.password, salt);

      userBody.password = senhaCriptografada;

      await userRepository.save(userBody);
      res.status(201).json(userBody);
      return;
    } catch (ex) {
      res.status(500).json("Não foi possível executar a solicitação!");
    }
  }
);

// listar usuarios
userRouter.get(
  "/",
  authenticate(["listarUsuario"]),
  async (req: Request, res: Response) => {
    try {
      const result = await userRepository.find();

      res.status(200).json(result);
    } catch (ex) {
      res.status(500).json("Não foi possível executar a solicitação!");
    }
  }
);

userRouter.put(
  "/:id",
  authenticate(["atualizarUsuario"]),
  async (req: Request, res: Response) => {
    try {
      let user =
        (await userRepository.findOne({
          where: {
            id: Number(req.params.id),
          },
        })) ?? new User();

      if (user.id == null) {
        res.status(400).json("Usuário não encontrado!");
        return;
      }

      let userUpdate = req.body as User;

      Object.assign(user, userUpdate);

      await userRepository.save(user);

      res.status(200).json(user);
    } catch (ex) {
      res.status(500).send("Ocorreu um erro ao executar a solicitação");
    }
  }
);

userRouter.delete(
  "/:id",
  authenticate(["deletarUsuario"]),
  async (req: Request, res: Response) => {
    try {
      let id = Number(req.params.id);

      const user = await userRepository.findOne({
        where: {
          id: id,
        },
      });

      if (!user) {
        res.status(400).json("Usuário não encontrado!");
        return;
      }

      await userRepository.delete(id);

      res.status(200).json("Usuário removido com sucesso!");
    } catch (ex) {
      res.status(500).send("Ocorreu um erro ao executar a solicitação");
    }
  }
);

export default userRouter;
