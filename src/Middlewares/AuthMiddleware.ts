import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import { Administracao } from "Models/AdministracaoModel";

interface AuthCreateRequest extends Request {
  Administracao: Administracao;
  body: {
    [key: string]: any;
  };
}

function authenticateToken(req: AuthCreateRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(401).json({ message: "Token não fornecido" });

  jwt.verify(token, process.env.JWT_SECRET, (err: any, Administracao: Administracao) => {
    if (err) return res.status(403).json({ message: "Token inválido" });

    req.Administracao = Administracao;
    next();
  });
}

export default authenticateToken;

