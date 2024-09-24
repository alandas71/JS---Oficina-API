import { Router } from "express";
import AgendamentoController from "../Controllers/AgendamentoController";
import VeiculoController from "../Controllers/VeiculoController";

const agendamentoController = new AgendamentoController();
const veiculoController = new VeiculoController();

const router = Router();

router.get("/v1/agendamentos", agendamentoController.getAgendamentos.bind(agendamentoController)); // Listar todos os agendamentos
router.get("/v1/agendamentos/:id", agendamentoController.getAgendamento.bind(agendamentoController)); // Obter um agendamento específico pelo ID
router.post("/v1/agendamentos", agendamentoController.createAgendamento.bind(agendamentoController)); // Criar um novo agendamento
router.put("/v1/agendamentos/:id", agendamentoController.updateAgendamento.bind(agendamentoController)); // Atualizar um agendamento específico pelo ID
router.delete("/v1/agendamentos/:id", agendamentoController.deleteAgendamento.bind(agendamentoController)); // Excluir um agendamento específico pelo ID

router.get("/v1/veiculos", veiculoController.getVeiculos.bind(veiculoController)); // Listar todos os veiculos
router.get("/v1/veiculos/:id", veiculoController.getVeiculo.bind(veiculoController)); // Obter um veiculo específico pelo ID
router.post("/v1/veiculos", veiculoController.createVeiculo.bind(veiculoController)); // Criar um novo veiculo
router.put("/v1/veiculos/:id", veiculoController.updateVeiculo.bind(veiculoController)); // Atualizar um veiculo específico pelo ID
router.delete("/v1/veiculos/:id", veiculoController.deleteVeiculo.bind(veiculoController)); // Excluir um veiculo específico pelo ID

export default router;
