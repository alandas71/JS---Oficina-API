import { Router } from "express";

import AgendamentoController from "../Controllers/AgendamentoController";
import VeiculoController from "../Controllers/VeiculoController";
import ServicoController from "../Controllers/ServicoController";
import ServicoAdicionalController from "../Controllers/ServicoAdicionalController";
import ServicoVeiculoController from "../Controllers/ServicoVeiculoController";
import AvaliacaoClienteController from "../Controllers/AvaliacaoClienteController";
import OficinaController from "../Controllers/OficinaController";
import MarcaVeiculoController from "../Controllers/MarcaVeiculoController";

import ValidateAgendamentoCreation from "../Middlewares/AgendamentoMiddleware";
import ValidateServicoVeiculoCreation from "../Middlewares/ServicoVeiculoMiddleware";
import ValidateVeiculoCreation from "../Middlewares/VeiculoMiddleware";
import ValidateAvaliacaoClienteCreation from "../Middlewares/AvaliacaoClienteMiddleware";

const avaliacaoClienteController = new AvaliacaoClienteController();
const agendamentoController = new AgendamentoController();
const veiculoController = new VeiculoController();
const oficinaController = new OficinaController();
const servicoController = new ServicoController();
const servicoAdicionalController = new ServicoAdicionalController();
const servicoVeiculoController = new ServicoVeiculoController();
const marcaVeiculoController = new MarcaVeiculoController();

const router = Router();

router.get("/v1/agendamentos", agendamentoController.getAgendamentos.bind(agendamentoController)); // Listar todos os agendamentos
router.get("/v1/agendamentos/:id", agendamentoController.getAgendamento.bind(agendamentoController)); // Obter um agendamento específico pelo ID
router.get("/v1/agendamentos/resumo/:id", agendamentoController.getAgendamentoResumo.bind(agendamentoController)); // Obter o resumo de um agendamento específico pelo ID
router.get("/v1/agendamentos/status/:cpf/:placa", agendamentoController.getAgendamentosStatus.bind(agendamentoController)); // Obter o status de agendamentos por cpf e placa
router.post("/v1/agendamentos", ValidateAgendamentoCreation, agendamentoController.createAgendamento.bind(agendamentoController)); // Criar um novo agendamento
router.put("/v1/agendamentos/:id", agendamentoController.updateAgendamento.bind(agendamentoController)); // Atualizar um agendamento específico pelo ID
router.delete("/v1/agendamentos/:id", agendamentoController.deleteAgendamento.bind(agendamentoController)); // Excluir um agendamento específico pelo ID

router.get("/v1/marcas", marcaVeiculoController.getMarcasVeiculos.bind(marcaVeiculoController)); // Listar todas as marcas de carro populares do Brasil
router.get("/v1/marcas/:id/veiculo", marcaVeiculoController.getMarcaInfo.bind(marcaVeiculoController)); // Listar todas as oficinas

router.get("/v1/oficina", oficinaController.getOficinas.bind(oficinaController)); // Listar todas as oficinas
router.get("/v1/oficina/:id", oficinaController.getOficina.bind(oficinaController)); // Listar uma oficina pelo ID

router.post("/v1/servicos", ValidateServicoVeiculoCreation, servicoVeiculoController.createServicoVeiculo.bind(servicoVeiculoController)); // Criar um novo serviço veicular
router.get("/v1/servico", servicoController.getServicos.bind(servicoController)); // Listar todos os serviços

router.get("/v1/servico/adicional", servicoAdicionalController.getServicosAdicionais.bind(servicoAdicionalController)); // Listar todos os serviços adicionais

router.post("/v1/avaliacoes", ValidateAvaliacaoClienteCreation, avaliacaoClienteController.createAvaliacaoCliente.bind(avaliacaoClienteController)); // Avaliação feita pelo cliente

router.get("/v1/veiculos", veiculoController.getVeiculos.bind(veiculoController)); // Listar todos os veiculos
router.get("/v1/veiculos/:id", veiculoController.getVeiculo.bind(veiculoController)); // Obter um veiculo específico pelo ID
router.post("/v1/veiculos", ValidateVeiculoCreation, veiculoController.createVeiculo.bind(veiculoController)); // Criar um novo veiculo
router.put("/v1/veiculos/:id", veiculoController.updateVeiculo.bind(veiculoController)); // Atualizar um veiculo específico pelo ID
router.delete("/v1/veiculos/:id", veiculoController.deleteVeiculo.bind(veiculoController)); // Excluir um veiculo específico pelo ID

export default router;
