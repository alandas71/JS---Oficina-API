import { Request, Response } from "express";
import MarcaVeiculoRepository from "../Repositories/MarcaVeiculoRepository";

class MarcaVeiculoController {
  private marcasBrasil: string[] = [
    "Chevrolet", "Fiat", "Ford", "Volkswagen", "Renault", "Honda",
    "Toyota", "Hyundai", "Nissan", "Jeep", "Peugeot", "Citroën",
    "BMW", "BYD", "Mercedes-Benz", "Audi", "Kia", "Mitsubishi",
    "Volkswagen", "Chrysler", "Subaru", "Land Rover", "Mazda", 
    "Dodge", "Land Rover", "Troller", "Foton", "Lifan", 
    "JAC Motors", "Porsche", "Volvo", "Changan", "Great Wall",
    "Ravon", "Nissan", "Smart", "SsangYong", "Fiorino",
    "Chevrolet", "Honda", "Fiat", "Renault", "Caoa Chery"
  ];

  private marcaVeiculoRepository: MarcaVeiculoRepository;

  constructor() {
    this.marcaVeiculoRepository = new MarcaVeiculoRepository();
  }

  async getMarcasVeiculos(req: Request, res: Response): Promise<void> {
    try {
      const { data } = await this.marcaVeiculoRepository.getMarcaVeiculos();

      const marcasNoBrasil = data.filter((marca: { nome: string }) => 
        this.marcasBrasil.includes(marca.nome)
      );

      res.status(200).json(marcasNoBrasil);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async getMarcaInfo(req: Request, res: Response): Promise<void> {
    try {
      const id: number = Number(req.params.id);
      const { data } = await this.marcaVeiculoRepository.getMarcaInfo(id);

      if (!data) {
        res.status(404).json({ message: "Informação da marca não encontrada." });
        return;
      }

      res.status(200).json(data.modelos);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }
}

export default MarcaVeiculoController;
