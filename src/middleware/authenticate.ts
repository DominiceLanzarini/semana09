import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const authenticate = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const token = request.headers.authorization.split(" ")[1];
    // "bearer iaheuhuihauhsdiua"

    if (!token) {
      response.status(401).json("Não autorizado!");
      return;
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch {
    response.status(500).json("Erro ao processar solicitação!");
  }
};

export default authenticate;
