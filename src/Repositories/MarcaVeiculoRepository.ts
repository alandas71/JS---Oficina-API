import axios from "axios";

class MarcaVeiculoRepository {
  async getMarcaVeiculos(): Promise<any> {
    return await axios.get(`${process.env.CARS_API_URL}carros/marcas`);
  }

  async getMarcaInfo(id: number): Promise<any> {
    return await axios.get(`${process.env.CARS_API_URL}carros/marcas/${id}/modelos`)
  }
}

export default MarcaVeiculoRepository;
