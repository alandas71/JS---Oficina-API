import { Router } from "express";

import AgendamentoController from "../Controllers/AgendamentoController";
import VeiculoController from "../Controllers/VeiculoController";
import ServicoController from "../Controllers/ServicoController";
import ServicoAdicionalController from "../Controllers/ServicoAdicionalController";
import ServicoVeiculoController from "../Controllers/ServicoVeiculoController";
import AvaliacaoClienteController from "../Controllers/AvaliacaoClienteController";
import OficinaController from "../Controllers/OficinaController";
import MarcaVeiculoController from "../Controllers/MarcaVeiculoController";
import AuthController from "../Controllers/AuthController";
import AgendamentoServicoAdicionalController from "../Controllers/AgendamentoServicoAdicionalController";
import VeiculoFotosController from "../Controllers/VeiculoFotosController";
import AdministracaoController from "../Controllers/AdministracaoController";

import { ValidateAgendamentoCreation, ValidateAgendamentoUpdate} from "../Middlewares/AgendamentoMiddleware";
import ValidateServicoVeiculoCreation from "../Middlewares/ServicoVeiculoMiddleware";
import ValidateVeiculoCreation from "../Middlewares/VeiculoMiddleware";
import ValidateAvaliacaoClienteCreation from "../Middlewares/AvaliacaoClienteMiddleware";
import ValidateAgendamentoServicoAdicionalCreation from "../Middlewares/AgendamentoServicoAdicionalMiddleware";
import authenticateToken from "../Middlewares/AuthMiddleware";

const authController = new AuthController();
const veiculoFotosController = new VeiculoFotosController();
const avaliacaoClienteController = new AvaliacaoClienteController();
const agendamentoController = new AgendamentoController();
const veiculoController = new VeiculoController();
const oficinaController = new OficinaController();
const servicoController = new ServicoController();
const servicoAdicionalController = new ServicoAdicionalController();
const servicoVeiculoController = new ServicoVeiculoController();
const marcaVeiculoController = new MarcaVeiculoController();
const agendamentoServicoAdicionalController = new AgendamentoServicoAdicionalController();
const administracaoController = new AdministracaoController();

const router = Router();

router.post("/v1/login", authController.Login.bind(authController));

router.get("/v1/agendamentos", authenticateToken, agendamentoController.getAgendamentos.bind(agendamentoController)); // Listar todos os agendamentos
router.get("/v1/agendamentos/arquivados", authenticateToken, agendamentoController.getAgendamentosArquivados.bind(agendamentoController)); // Listar todos os agendamentos arquivados
router.get("/v1/agendamentos/:id", agendamentoController.getAgendamento.bind(agendamentoController)); // Obter um agendamento específico pelo ID
router.get("/v1/agendamentos/resumo/:id", agendamentoController.getAgendamentoResumo.bind(agendamentoController)); // Obter o resumo de um agendamento específico pelo ID
router.get("/v1/agendamentos/status/:cpf/:placa", agendamentoController.getAgendamentosStatus.bind(agendamentoController)); // Obter o status de agendamentos por cpf e placa
router.post("/v1/agendamentos", ValidateAgendamentoCreation, agendamentoController.createAgendamento.bind(agendamentoController)); // Criar um novo agendamento
router.put("/v1/agendamentos/:id", authenticateToken, ValidateAgendamentoUpdate, agendamentoController.updateAgendamento.bind(agendamentoController)); // Atualizar um agendamento específico pelo ID
router.put("/v1/agendamentos/prazo/:id", authenticateToken, agendamentoController.updatePrazoAgendamento.bind(agendamentoController)); // Atualizar um agendamento específico pelo ID
router.delete("/v1/agendamentos/:id", authenticateToken, agendamentoController.deleteAgendamento.bind(agendamentoController)); // Excluir um agendamento específico pelo ID

router.post("/v1/agendamentos/servico/adicional", authenticateToken, agendamentoServicoAdicionalController.createAgendamentoServicoAdicional.bind(agendamentoServicoAdicionalController)); // Cria um novo agendamento de servço adicional
router.put("/v1/agendamentos/servico/adicional/:id", authenticateToken, agendamentoServicoAdicionalController.updateAgendamentoServicoAdicional.bind(agendamentoServicoAdicionalController)); // Atualiza o agendamento de um servço adicional

router.get("/v1/marcas", marcaVeiculoController.getMarcasVeiculos.bind(marcaVeiculoController)); // Listar todas as marcas de carro populares do Brasil
router.get("/v1/marcas/:id/veiculo", marcaVeiculoController.getMarcaInfo.bind(marcaVeiculoController)); // Listar todas as oficinas

router.get("/v1/oficina", oficinaController.getOficinas.bind(oficinaController)); // Listar todas as oficinas
router.get("/v1/oficina/:id", oficinaController.getOficina.bind(oficinaController)); // Listar uma oficina pelo ID
router.post("/v1/oficina", authenticateToken, oficinaController.createOficina.bind(oficinaController)); // Criar oficina
router.put("/v1/oficina/:id", authenticateToken, oficinaController.updateOficina.bind(oficinaController)); // Atualiar uma oficina pelo ID
router.delete("/v1/oficina/:id", authenticateToken, oficinaController.deleteOficina.bind(oficinaController)); // Excluir uma oficina pelo ID

router.get("/v1/administracao", authenticateToken, administracaoController.getAdministracoes.bind(administracaoController)); // Listar todas as administracoes
router.get("/v1/administracao/:id", authenticateToken, administracaoController.getAdministracao.bind(administracaoController)); // Listar uma administracao pelo ID
router.post("/v1/administracao", authenticateToken, administracaoController.createAdministracao.bind(administracaoController)); // Criar administracao
router.put("/v1/administracao/:id", authenticateToken, administracaoController.updateAdministracao.bind(administracaoController)); // Atualiar uma administracao pelo ID
router.delete("/v1/administracao/:id", authenticateToken, administracaoController.deleteAdministracao.bind(administracaoController)); // Excluir uma administracao pelo ID

router.post("/v1/servicos", ValidateServicoVeiculoCreation, servicoVeiculoController.createServicoVeiculo.bind(servicoVeiculoController)); // Criar um novo serviço veicular
router.put("/v1/servicos/:id", authenticateToken, servicoVeiculoController.updateUserServicoVeiculo.bind(servicoVeiculoController)); // Atualiza um serviço veicular pela situação

router.get("/v1/servico", servicoController.getServicos.bind(servicoController)); // Listar todos os serviços

router.get("/v1/servico/adicional", servicoAdicionalController.getServicosAdicionais.bind(servicoAdicionalController)); // Listar todos os serviços adicionais
router.get("/v1/servico/adicional/filtro/:id", servicoAdicionalController.getServicoAdicionalFiltroCliente.bind(servicoAdicionalController)); // Listar todos os serviços adicionais
router.post("/v1/servico/adicional", authenticateToken, ValidateAgendamentoServicoAdicionalCreation, servicoAdicionalController.createServicoAdicional.bind(servicoAdicionalController)); // Criar um novo serviço adicional

router.get("/v1/avaliacoes", authenticateToken, avaliacaoClienteController.getAvaliacaoCliente.bind(avaliacaoClienteController)); // Obetém todas as avaliações feitas
router.post("/v1/avaliacoes", ValidateAvaliacaoClienteCreation, avaliacaoClienteController.createAvaliacaoCliente.bind(avaliacaoClienteController)); // Avaliação feita pelo cliente

router.put("/v1/veiculo/fotos/:id", authenticateToken, veiculoFotosController.updateVeiculoFotos.bind(veiculoFotosController)); // Atualizar o checklist de fotos

export default router;
