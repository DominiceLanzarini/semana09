// validação do token do usuário autenticado
// autorização de role

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import PayloadJwt from "../classes/PayloadJwt";
import Role from "../entity/Role";
import { Permission } from "../entity/Permission";

const authenticate = (permissionsList: string[]) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      const token = request.headers.authorization.split(" ")[1];
      // "bearer iaheuhuihauhsdiua"

      if (!token) {
        response.status(401).json("Não autorizado!");
        return;
      }

      const payload = jwt.verify(token, process.env.JWT_SECRET) as PayloadJwt; //verifica se o token foi manipulado ou não

      const roles = JSON.parse(payload.roles); //dados do payload

      let hasPermission = false;

      roles.map((r: Role) => {

        if (r.description == "admin") {
          hasPermission = true;
          return;
        }

        r.permissions.map((p: Permission) => {
          if (permissionsList.includes(p.description)) {
            hasPermission = true;
          }
        });
      });

      if (!hasPermission) {
        response
          .status(401)
          .json("Usuário não possui autorização para acessar este recurso!");
        return;
      }

      next();
    } catch {
      response.status(401).json("Erro ao processar autenticação!");
    }
  };
};

export default authenticate;
