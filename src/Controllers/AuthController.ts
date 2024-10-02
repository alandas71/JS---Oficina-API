import { Request, Response } from "express";
import generateToken from "../helpers/generateToken";
import AdministracaoRepository from "../Repositories/AdministracaoRepository";

class AuthController {
    private administracaoRepository: AdministracaoRepository;

    constructor () {
        this.administracaoRepository = new AdministracaoRepository();
    }

    async Login(req: Request, res: Response): Promise<void> {
        try {
            const { Usuario, Senha } = req.body;
            const usuarioExiste = await this.administracaoRepository.getAdministracaoLogin(Usuario, Senha);
            if (usuarioExiste) {
            const token = generateToken(Usuario);
            res.status(200).json({ token });
            } else {
            res.status(401).json({ message: "Credenciais inválidas" });
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Erro interno no servidor." });
        }
    }
}

export default AuthController;