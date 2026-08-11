/**
 * VerifCar · data.js
 * Banco de dados flat centralizado — fonte única de verdade para todas as telas.
 * Consumo: <script src="data.js"></script>
 * Acesso:  window.DB.<entidade>
 *
 * Entidades:
 *   DB.sistema        — metadados do sistema
 *   DB.usuario        — usuário logado
 *   DB.unidades[]     — filiais e pátios
 *   DB.inspetores[]      — inspetores de campo
 *   DB.veiculos[]     — veículos verificados (referência)
 *   DB.verificacoes[] — registros de verificação (tabela principal)
 *   DB.alertas[]      — alertas gerados
 *   DB.ocorrencias[]  — boletins de ocorrência vinculados
 *   DB.mapa           — configuração e pontos do heatmap
 *   DB.configuracoes  — parâmetros do sistema (scoring, IA, integrações)
 */

const DB = (() => {

  // ── Sistema ──────────────────────────────────────────────
  const sistema = {
    versao:        'v2.4.1',
    estado:        'ES',
    empresa:         'Grupo Almeida · Rede',
    app_versao:    'v1.8.3',
    api_status:    'ONLINE',
    ultima_sync:   null, // preenchido em runtime pelo tick()
  };

  // ── Usuário logado ───────────────────────────────────────
  const usuario = {
    id:       'USR-001',
    nome:     'Marina Duarte',
    iniciais: 'GS',
    perfil:   'ADMIN',
    unidade:  'ES',
    online:   true,
  };

  // ── Filiais e pátios ────────────────────────────────
  const unidades = [
    { id: 'UND-01', nome: 'Vitória',    uf: 'ES', lat: -20.315, lng: -40.312, taxa_diverg: 3.4 },
    { id: 'UND-02', nome: 'Serra',      uf: 'ES', lat: -20.128, lng: -40.308, taxa_diverg: 4.2 },
    { id: 'UND-03', nome: 'Cariacica',  uf: 'ES', lat: -20.264, lng: -40.416, taxa_diverg: 5.2 },
    { id: 'UND-04', nome: 'Vila Velha', uf: 'ES', lat: -20.329, lng: -40.292, taxa_diverg: 8.8 },
    { id: 'UND-05', nome: 'Guarapari',  uf: 'ES', lat: -20.672, lng: -40.499, taxa_diverg: 2.2 },
    { id: 'UND-06', nome: 'Linhares',   uf: 'ES', lat: -19.391, lng: -40.064, taxa_diverg: 1.8 },
    { id: 'UND-07', nome: 'Colatina',   uf: 'ES', lat: -19.539, lng: -40.630, taxa_diverg: 1.3 },
    { id: 'UND-08', nome: 'Cachoeiro de Itapemirim', uf: 'ES', lat: -20.849, lng: -41.112, taxa_diverg: 1.3 },
    { id: 'UND-09', nome: 'São Mateus', uf: 'ES', lat: -18.722, lng: -39.859, taxa_diverg: 0.0 },
    { id: 'UND-10', nome: 'Aracruz',    uf: 'ES', lat: -19.819, lng: -40.274, taxa_diverg: 0.0 },
  ];

  // ── Inspetores ──────────────────────────────────────────────
  const inspetores = [
    { id: 'INSP-01', nome: 'Insp. Santos',   cod_func: 'INSP-22010', unidade_id: 'UND-01', iniciais: 'JS', aprovacao: 98.1, total_verif: 347 },
    { id: 'INSP-02', nome: 'Insp. Lima',     cod_func: 'INSP-22041', unidade_id: 'UND-03', iniciais: 'AL', aprovacao: 96.2, total_verif: 294 },
    { id: 'INSP-03', nome: 'Insp. Costa',    cod_func: 'INSP-31100', unidade_id: 'UND-04', iniciais: 'RC', aprovacao: 94.8, total_verif: 241 },
    { id: 'INSP-04', nome: 'Insp. Rocha',    cod_func: 'INSP-19902', unidade_id: 'UND-01', iniciais: 'MR', aprovacao: 91.3, total_verif: 198 },
    { id: 'INSP-05', nome: 'Insp. Ferreira', cod_func: 'INSP-28830', unidade_id: 'UND-02', iniciais: 'FF', aprovacao: 89.7, total_verif: 167 },
  ];

  // ── Veículos ─────────────────────────────────────────────
  const veiculos = [
    { id: 'VEI-01', marca: 'VW',       modelo: 'Gol 1.0',     ano: 2019, cor: 'Branco',         combustivel: 'Flex',   placa: 'ABC-1D23', vin: '9BWZZ377ZMG012967', renavam: '01123456780', proprietario: 'J. A. Silva'    },
    { id: 'VEI-02', marca: 'Ford',     modelo: 'Ka SE',        ano: 2021, cor: 'Prata',          combustivel: 'Flex',   placa: 'DEF-2E45', vin: '9BF1234AXM5678821', renavam: '01123456781', proprietario: 'M. B. Oliveira' },
    { id: 'VEI-03', marca: 'Honda',    modelo: 'HR-V EX',      ano: 2022, cor: 'Preto',          combustivel: 'Flex',   placa: 'GHI-3F67', vin: '93HRV850NMG234412', renavam: '01123456782', proprietario: 'C. R. Santos'   },
    { id: 'VEI-04', marca: 'Fiat',     modelo: 'Argo 1.3',     ano: 2020, cor: 'Vermelho',       combustivel: 'Flex',   placa: 'JKL-4G89', vin: '9BD195A4XL5678302', renavam: '01123456783', proprietario: 'M. O. Souza'    },
    { id: 'VEI-05', marca: 'Toyota',   modelo: 'Corolla',      ano: 2023, cor: 'Branco',         combustivel: 'Flex',   placa: 'MNO-5H01', vin: '9BR53BXXXMG123118', renavam: '01123456784', proprietario: 'P. F. Lima'     },
    { id: 'VEI-06', marca: 'Chevrolet',modelo: 'Onix 1.0',     ano: 2022, cor: 'Azul',           combustivel: 'Flex',   placa: 'PQR-6I23', vin: '9BG65KXXXNG445001', renavam: '01123456785', proprietario: 'A. C. Pereira'  },
    { id: 'VEI-07', marca: 'Fiat',     modelo: 'Strada',       ano: 2022, cor: 'Branco',         combustivel: 'Flex',   placa: 'STU-7J45', vin: '9BDKXX194MG518002', renavam: '01123456786', proprietario: 'R. T. Costa'    },
    { id: 'VEI-08', marca: 'VW',       modelo: 'Polo 1.0 TSI', ano: 2023, cor: 'Cinza',          combustivel: 'Gasolina', placa: 'VWX-8K67', vin: '9BWZZ123XNG789003', renavam: '01123456787', proprietario: 'F. M. Rocha'  },
    { id: 'VEI-09', marca: 'Ford',     modelo: 'Ranger',       ano: 2021, cor: 'Prata',          combustivel: 'Diesel', placa: 'YZA-9L89', vin: '9BF456ZXM5111004',  renavam: '01123456788', proprietario: 'S. V. Ferreira' },
    { id: 'VEI-10', marca: 'Honda',    modelo: 'Civic EXL',    ano: 2020, cor: 'Prata metálico', combustivel: 'Flex',   placa: 'GHT-3A12', vin: '9BD195B8XL5678302', renavam: '01123456789', proprietario: 'M. O. Souza'    },
    { id: 'VEI-11', marca: 'Porsche',  modelo: 'Taycan',       ano: 2024, cor: 'Preto',          combustivel: 'Elétrico', placa: 'STU-7C55', vin: '9BWZZ9YZNK444007', renavam: '01123456790', proprietario: 'L. A. Mendes'  },
    { id: 'VEI-12', marca: 'Toyota',   modelo: 'Hilux',        ano: 2023, cor: 'Branco',         combustivel: 'Diesel', placa: 'BCD-1M23', vin: '9BR53C2XMG555008',  renavam: '01123456791', proprietario: 'G. P. Alves'    },
    { id: 'VEI-13', marca: 'Renault',  modelo: 'Duster',       ano: 2022, cor: 'Laranja',        combustivel: 'Flex',   placa: 'EFG-2N45', vin: '9BF789NXM5666009',  renavam: '01123456792', proprietario: 'K. S. Nunes'    },
    { id: 'VEI-14', marca: 'Chevrolet',modelo: 'S10',          ano: 2021, cor: 'Cinza',          combustivel: 'Diesel', placa: 'HIJ-3O67', vin: '9BGXXXXNG777010',   renavam: '01123456793', proprietario: 'W. D. Barbosa'  },
    { id: 'VEI-15', marca: 'Fiat',     modelo: 'Cronos',       ano: 2021, cor: 'Branco',         combustivel: 'Flex',   placa: 'KLM-4P89', vin: '9BD195B8XM222005',  renavam: '01123456794', proprietario: 'T. R. Castro'   },
  ];

  // ── Verificações ─────────────────────────────────────────
  // status: 'ok' | 'warn' | 'err'
  // assinado: bool
  const verificacoes = [
    { id: 'VERIFCAR-9920', veiculo_id: 'VEI-01', inspetor_id: 'INSP-01', unidade_id: 'UND-01', data: '2026-03-23T14:35:00', score: 12,  status: 'ok',   duracao: '3m22s', qualidade_img: 97.1, assinado: true,  sha256: 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f600' },
    { id: 'VERIFCAR-9921', veiculo_id: 'VEI-02', inspetor_id: 'INSP-02', unidade_id: 'UND-03', data: '2026-03-23T14:22:00', score: 61,  status: 'warn', duracao: '4m05s', qualidade_img: 94.3, assinado: false, sha256: 'b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6b200' },
    { id: 'VERIFCAR-9922', veiculo_id: 'VEI-03', inspetor_id: 'INSP-01', unidade_id: 'UND-02', data: '2026-03-23T13:58:00', score: 8,   status: 'ok',   duracao: '3m14s', qualidade_img: 98.2, assinado: true,  sha256: 'c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6c300' },
    { id: 'VERIFCAR-9923', veiculo_id: 'VEI-04', inspetor_id: 'INSP-03', unidade_id: 'UND-04', data: '2026-03-23T13:41:00', score: 87,  status: 'err',  duracao: '5m10s', qualidade_img: 91.8, assinado: false, sha256: 'd4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6d400' },
    { id: 'VERIFCAR-9924', veiculo_id: 'VEI-05', inspetor_id: 'INSP-04', unidade_id: 'UND-01', data: '2026-03-23T13:15:00', score: 5,   status: 'ok',   duracao: '3m01s', qualidade_img: 99.1, assinado: true,  sha256: 'e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6e500' },
    { id: 'VERIFCAR-9925', veiculo_id: 'VEI-06', inspetor_id: 'INSP-02', unidade_id: 'UND-02', data: '2026-03-23T12:44:00', score: 22,  status: 'ok',   duracao: '3m44s', qualidade_img: 96.0, assinado: true,  sha256: 'f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6f600' },
    { id: 'VERIFCAR-9926', veiculo_id: 'VEI-07', inspetor_id: 'INSP-05', unidade_id: 'UND-03', data: '2026-03-23T12:20:00', score: 55,  status: 'warn', duracao: '4m30s', qualidade_img: 92.5, assinado: false, sha256: 'a7b3c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' },
    { id: 'VERIFCAR-9927', veiculo_id: 'VEI-08', inspetor_id: 'INSP-01', unidade_id: 'UND-01', data: '2026-03-23T11:50:00', score: 9,   status: 'ok',   duracao: '3m10s', qualidade_img: 97.8, assinado: true,  sha256: 'b8c4d5e6f7a2b3c4d5e6f7a2b3c4d5e6f7a2b3c4d5e6f7a2b3c4d5e6f7b800' },
    { id: 'VERIFCAR-9928', veiculo_id: 'VEI-10', inspetor_id: 'INSP-02', unidade_id: 'UND-03', data: '2026-03-23T14:22:00', score: 87,  status: 'err',  duracao: '4m12s', qualidade_img: 96.4, assinado: false, sha256: 'a7b3c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' },
    { id: 'VERIFCAR-9929', veiculo_id: 'VEI-09', inspetor_id: 'INSP-04', unidade_id: 'UND-04', data: '2026-03-22T16:45:00', score: 78,  status: 'err',  duracao: '4m55s', qualidade_img: 93.2, assinado: false, sha256: 'c9d5e6f7a2b3c4d5e6f7a2b3c4d5e6f7a2b3c4d5e6f7a2b3c4d5e6f7c900' },
    { id: 'VERIFCAR-9930', veiculo_id: 'VEI-11', inspetor_id: 'INSP-04', unidade_id: 'UND-01', data: '2026-03-22T15:10:00', score: 92,  status: 'err',  duracao: '5m22s', qualidade_img: 95.1, assinado: false, sha256: 'd0e6f7a2b3c4d5e6f7a2b3c4d5e6f7a2b3c4d5e6f7a2b3c4d5e6f7d000' },
    { id: 'VERIFCAR-9931', veiculo_id: 'VEI-12', inspetor_id: 'INSP-02', unidade_id: 'UND-02', data: '2026-03-22T14:30:00', score: 33,  status: 'ok',   duracao: '3m55s', qualidade_img: 96.7, assinado: true,  sha256: 'e1f7a2b3c4d5e6f7a2b3c4d5e6f7a2b3c4d5e6f7a2b3c4d5e6f7e100' },
    { id: 'VERIFCAR-9932', veiculo_id: 'VEI-13', inspetor_id: 'INSP-01', unidade_id: 'UND-03', data: '2026-03-22T13:50:00', score: 47,  status: 'warn', duracao: '4m12s', qualidade_img: 94.0, assinado: false, sha256: 'f2a2b3c4d5e6f7a2b3c4d5e6f7a2b3c4d5e6f7a2b3c4d5e6f7f200' },
    { id: 'VERIFCAR-9933', veiculo_id: 'VEI-14', inspetor_id: 'INSP-03', unidade_id: 'UND-04', data: '2026-03-22T12:10:00', score: 11,  status: 'ok',   duracao: '3m28s', qualidade_img: 97.3, assinado: true,  sha256: 'a3b4c5d6e7f8a3b4c5d6e7f8a3b4c5d6e7f8a3b4c5d6e7f8a3b4c5d6e7f800' },
    { id: 'VERIFCAR-9934', veiculo_id: 'VEI-15', inspetor_id: 'INSP-05', unidade_id: 'UND-02', data: '2026-03-22T10:55:00', score: 14,  status: 'ok',   duracao: '3m35s', qualidade_img: 95.8, assinado: true,  sha256: 'b4c5d6e7f8a3b4c5d6e7f8a3b4c5d6e7f8a3b4c5d6e7f8a3b4c5d6e7f800' },
  ];

  // ── Alertas ──────────────────────────────────────────────
  // tipo: 'err' (crítico) | 'warn' (atenção)
  const alertas = [
    { id: 'ALT-01', tipo: 'err',  verif_id: 'VERIFCAR-9921', texto: 'Divergência VIN · Ford Ka · Vitória',           meta: 'Há 12 min · Insp. Santos'  },
    { id: 'ALT-02', tipo: 'warn', verif_id: 'VERIFCAR-9926', texto: 'Adulteração suspeita · Fiat Uno · Cariacica',    meta: 'Há 34 min · Insp. Lima'    },
    { id: 'ALT-03', tipo: 'warn', verif_id: 'VERIFCAR-9932', texto: 'Inconsistência múltipla · VW Gol · Serra',       meta: 'Há 1h · Insp. Costa'       },
    { id: 'ALT-04', tipo: 'err',  verif_id: 'VERIFCAR-9928', texto: 'Divergência VIN · Honda Civic · Vila Velha',     meta: 'Há 2h · Insp. Rocha'       },
    { id: 'ALT-05', tipo: 'warn', verif_id: 'VERIFCAR-9923', texto: 'Raspagem detectada · Chevrolet Onix · Vitória',  meta: 'Há 3h · Insp. Ferreira'    },
  ];

  // ── Ocorrências (BO) ─────────────────────────────────────
  const ocorrencias = [
    { id: 'OC-01', numero: 'BO 2024/8821', tipo: 'Adulteração', unidade: 'Vila Velha', verif_ids: ['VERIFCAR-9928', 'VERIFCAR-9930'] },
    { id: 'OC-02', numero: 'BO 2024/9034', tipo: 'Adulteração', unidade: 'Serra',      verif_ids: ['VERIFCAR-9923', 'VERIFCAR-9926'] },
    { id: 'OC-03', numero: 'BO 2025/0112', tipo: 'Suspeita',    unidade: 'Cariacica',  verif_ids: ['VERIFCAR-9929']              },
  ];

  // ── Mapa ─────────────────────────────────────────────────
  const mapa = {
    lat:  -20.30039052470837,
    lng:  -40.31978045962121,
    zoom: 13,
    // intensidade derivada de taxa_diverg de cada unidade (0–1)
    pontos: [
      { label: 'Vila Velha', x: 62, y: 58, intensidade: 0.95 },
      { label: 'Vila Velha', x: 64, y: 55, intensidade: 0.75 },
      { label: 'Vila Velha', x: 60, y: 62, intensidade: 0.65 },
      { label: 'Cariacica',  x: 44, y: 50, intensidade: 0.70 },
      { label: 'Cariacica',  x: 46, y: 54, intensidade: 0.55 },
      { label: 'Cariacica',  x: 42, y: 48, intensidade: 0.50 },
      { label: 'Serra',      x: 72, y: 36, intensidade: 0.60 },
      { label: 'Serra',      x: 70, y: 32, intensidade: 0.45 },
      { label: 'Vitória',    x: 55, y: 42, intensidade: 0.45 },
      { label: 'Vitória',    x: 58, y: 38, intensidade: 0.35 },
      { label: 'Vitória',    x: 52, y: 45, intensidade: 0.30 },
      { label: 'Guarapari',  x: 38, y: 65, intensidade: 0.25 },
      { label: 'Linhares',   x: 78, y: 45, intensidade: 0.20 },
      { label: 'Colatina',   x: 50, y: 28, intensidade: 0.15 },
    ],
  };

  // ── Tendência (7 dias) ───────────────────────────────────
  const tendencia = {
    titulo:    'Tendência (7 dias)',
    labels:    ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    valores:   [40, 55, 70, 60, 82, 65, 90],
    destaques: [4, 6],
  };

  // ── KPIs globais ─────────────────────────────────────────
  const kpis = [
    { id: 'total_verif',    label: 'Total verificações', value: '1.247', change: '↑ 12%',   changeType: 'up',        color: 'blue'   },
    { id: 'pct_diverg',     label: '% Divergentes',      value: '4,2%',  change: '↑ 0,3%',  changeType: 'up-bad',    color: 'red'    },
    { id: 'score_medio',    label: 'Score médio risco',  value: '32',    change: '↓ 5pts',  changeType: 'down-good', color: 'amber'  },
    { id: 'tempo_medio',    label: 'Tempo médio',        value: '3m42s', change: '↓ 18s',   changeType: 'down-good', color: 'green'  },
    { id: 'qualidade_img',  label: 'Qualidade imagens',  value: '94%',   change: '↑ 2%',    changeType: 'up',        color: 'purple' },
  ];

  // ── Configurações ────────────────────────────────────────
  const configuracoes = {
    scoring: {
      limiar_atencao:  50,
      limiar_diverg:   75,
      peso_chassi:     40,
      peso_vin:        30,
      peso_vidros:     20,
      peso_placa:      10,
    },
    ia: {
      versao:            'v2.4.1',
      confianca_min_ocr: 80,
      modo_inferencia:   'Balanceado',
      acuracia_ocr:      98.7,
      detec_adulteracao: 94.2,
      reconhec_vin:      96.1,
      analise_vidros:    91.8,
      falsos_positivos:  2.3,
    },
    sessao: {
      timeout:          '1 hora',
      twofa:            true,
      login_govbr:      true,
      bloqueio_falhas:  5,
      troca_senha_dias: 180,
    },
    integracoes: {
      renavam:  'ONLINE',
      base_nacional: 'ONLINE',
      sinesp:   'DEGRADADO',
      base_oficial:'ONLINE',
      ssp:      'OFFLINE',
    },
  };

  // ════════════════════════════════════════════════════════
  //  Helpers — queries prontas para as telas usarem
  // ════════════════════════════════════════════════════════
  const helpers = {

    // Resolve FK: retorna objeto pelo id
    unidade:     id => unidades.find(u => u.id === id),
    inspetor:      id => inspetores.find(a => a.id === id),
    veiculo:     id => veiculos.find(v => v.id === id),
    verificacao: id => verificacoes.find(v => v.id === id),

    // Verificações recentes (n últimas, opcionalmente filtradas por status)
    verificacoes_recentes: (n = 10, status = null) => {
      let list = [...verificacoes].sort((a, b) => new Date(b.data) - new Date(a.data));
      if (status) list = list.filter(v => v.status === status);
      return list.slice(0, n);
    },

    // Alertas críticos (só err)
    alertas_criticos: () => alertas.filter(a => a.tipo === 'err'),

    // Contagens globais
    totais: () => ({
      verificacoes: verificacoes.length,
      ok:           verificacoes.filter(v => v.status === 'ok').length,
      warn:         verificacoes.filter(v => v.status === 'warn').length,
      err:          verificacoes.filter(v => v.status === 'err').length,
      pct_diverg:   ((verificacoes.filter(v => v.status === 'err').length / verificacoes.length) * 100).toFixed(1),
    }),

    // Dados da tabela prontos para renderizar (join verificacao + veiculo + inspetores + unidade)
    tabela_verif: (n = 10) => helpers.verificacoes_recentes(n).map(v => {
      const vei = helpers.veiculo(v.veiculo_id);
      const agt = helpers.inspetor(v.inspetor_id);
      const und = helpers.unidade(v.unidade_id);
      const d   = new Date(v.data);
      return {
        id:       v.id,
        vin:      vei ? vei.vin.slice(0, 8) + '...' + vei.vin.slice(-3) : '—',
        veiculo:  vei ? `${vei.marca} ${vei.modelo} ${vei.ano}` : '—',
        data:     d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }) + ' ' + d.toTimeString().slice(0, 5),
        inspetor:   agt ? agt.nome : '—',
        unidade:  und ? und.nome : '—',
        score:    v.score,
        status:   v.status,
      };
    }),

    // Ficha completa para dash-05-detalhe (join profundo)
    ficha: verif_id => {
      const v   = helpers.verificacao(verif_id);
      if (!v) return null;
      return {
        ...v,
        veiculo:  helpers.veiculo(v.veiculo_id),
        inspetor:   helpers.inspetor(v.inspetor_id),
        unidade:  helpers.unidade(v.unidade_id),
      };
    },

    // Score color helper
    score_color: s => s >= 75 ? 'var(--co-400)' : s >= 50 ? 'var(--am)' : 'var(--em)',
    badge_class: s => ({ ok: 'badge-ok', warn: 'badge-warn', err: 'badge-err' })[s] || 'badge-info',
    badge_label: s => ({ ok: 'Compatível', warn: 'Atenção', err: 'Divergente' })[s] || s,
  };

  // API pública
  return {
    sistema,
    usuario,
    unidades,
    inspetores,
    veiculos,
    verificacoes,
    alertas,
    ocorrencias,
    mapa,
    tendencia,
    kpis,
    configuracoes,
    ...helpers,
  };

})();