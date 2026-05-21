// ============================================================
// AMIGO PET SHOP - SISTEMA COMPLETO
// Versão: 3.0
// ============================================================

// ============================================================
// 1. CONFIGURAÇÕES E MAPEAMENTOS
// ============================================================

// Mapeamento de tipos de pet
const PET_MAP = {
    'cachorro': { tipo: 'cachorro', nome: 'Cachorro', icone: '🐕' },
    'gato':      { tipo: 'gato',      nome: 'Gato',      icone: '🐈' },
    'passaro':   { tipo: 'passaro',   nome: 'Pássaro',   icone: '🐦' },
    'peixe':     { tipo: 'peixe',     nome: 'Peixe',     icone: '🐠' },
    'outro':     { tipo: 'outro',     nome: 'Outros pets', icone: '🐾' }
};

// Mapeamento de CID para acessibilidade
const CID_MAP = {
    'F90':   { tipo: 'tdah',        nome: 'TDAH',         adaptacao: 'foco',   cor: '#4a90e2' },
    'F84':   { tipo: 'autismo',     nome: 'Autismo',      adaptacao: 'sensorial', cor: '#50c878' },
    'F81':   { tipo: 'dislexia',    nome: 'Dislexia',     adaptacao: 'leitura', cor: '#e8a838' },
    'H53.5': { tipo: 'daltonismo',  nome: 'Daltonismo',   adaptacao: 'cores',  cor: '#8B4513' },
    'H54':   { tipo: 'baixa-visao', nome: 'Baixa visão',  adaptacao: 'fonte',  cor: '#2c3e50' },
    'H90':   { tipo: 'surdez',      nome: 'Surdez',       adaptacao: 'visual', cor: '#3498db' },
    'G80':   { tipo: 'motora',      nome: 'Motora',       adaptacao: 'acessibilidade', cor: '#e74c3c' }
};

// ============================================================
// 2. PRODUTOS PADRÃO (25 ITENS)
// ============================================================
const PRODUTOS_PADRAO = [
    { id: 1,  nome: 'Ração Premium para Cães', desc: 'Ração super premium com nutrientes balanceados.', preco: 129.90, img: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=400', tags: ['cachorro', 'racao'], estoque: 50 },
    { id: 2,  nome: 'Brinquedo Mordedor', desc: 'Brinquedo de borracha natural resistente.', preco: 29.90, img: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400', tags: ['cachorro', 'brinquedo'], estoque: 100 },
    { id: 3,  nome: 'Cama Redonda Felpuda', desc: 'Cama macia e confortável para seu pet.', preco: 89.90, img: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=400', tags: ['cachorro', 'gato', 'cama'], estoque: 30 },
    { id: 4,  nome: 'Arranhador para Gatos', desc: 'Arranhador de sisal com plataforma.', preco: 79.90, img: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=400', tags: ['gato', 'brinquedo'], estoque: 25 },
    { id: 5,  nome: 'Ração para Gatos Adultos', desc: 'Ração completa com sabor de salmão.', preco: 99.90, img: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=400', tags: ['gato', 'racao'], estoque: 40 },
    { id: 6,  nome: 'Gaiola para Pássaros', desc: 'Gaiola espaçosa com poleiros e comedouros.', preco: 189.90, img: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400', tags: ['passaro', 'acessorio'], estoque: 10 },
    { id: 7,  nome: 'Aquário 20 Litros', desc: 'Aquário completo com filtro e iluminação LED.', preco: 249.90, img: 'https://images.unsplash.com/photo-1535594428893-47441e1f96e0?w=400', tags: ['peixe', 'aquario'], estoque: 8 },
    { id: 8,  nome: 'Shampoo Antipulgas', desc: 'Shampoo veterinário hipoalergênico.', preco: 39.90, img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400', tags: ['cachorro', 'gato', 'higiene'], estoque: 60 },
    { id: 9,  nome: 'Coleira Antifugas', desc: 'Coleira que repele pulgas e carrapatos por 6 meses.', preco: 59.90, img: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400', tags: ['cachorro', 'acessorio'], estoque: 45 },
    { id: 10, nome: 'Ração para Peixes', desc: 'Flocos nutritivos para peixes ornamentais.', preco: 19.90, img: 'https://images.unsplash.com/photo-1535594428893-47441e1f96e0?w=400', tags: ['peixe', 'racao'], estoque: 80 },
    { id: 11, nome: 'Bebedouro Automático', desc: 'Bebedouro com filtro e capacidade para 2 litros.', preco: 79.90, img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400', tags: ['cachorro', 'gato', 'acessorio'], estoque: 20 },
    { id: 12, nome: 'Kit de Escovação', desc: 'Kit com escova e pente para remoção de pelos mortos.', preco: 34.90, img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400', tags: ['cachorro', 'gato', 'higiene'], estoque: 55 },
    { id: 13, nome: 'Brinquedo Interativo', desc: 'Brinquedo que libera petiscos.', preco: 49.90, img: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400', tags: ['cachorro', 'gato', 'brinquedo'], estoque: 70 },
    { id: 14, nome: 'Caminha Térmica', desc: 'Cama com cobertor térmico removível.', preco: 119.90, img: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=400', tags: ['cachorro', 'gato', 'cama'], estoque: 15 },
    { id: 15, nome: 'Vermífugo Oral', desc: 'Vermífugo de amplo espectro.', preco: 29.90, img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400', tags: ['cachorro', 'gato', 'medicamento'], estoque: 90 },
    { id: 16, nome: 'Tapete Higiênico', desc: 'Tapete absorvente com 5 camadas.', preco: 39.90, img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400', tags: ['cachorro', 'higiene'], estoque: 65 },
    { id: 17, nome: 'Fonte de Água para Gatos', desc: 'Fonte com filtro e água corrente.', preco: 129.90, img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400', tags: ['gato', 'acessorio'], estoque: 12 },
    { id: 18, nome: 'Perfume para Pets', desc: 'Perfume suave e duradouro.', preco: 24.90, img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400', tags: ['cachorro', 'gato', 'higiene'], estoque: 85 },
    { id: 19, nome: 'Peitoral Ajustável', desc: 'Peitoral acolchoado com refletores.', preco: 49.90, img: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400', tags: ['cachorro', 'acessorio'], estoque: 35 },
    { id: 20, nome: 'Coleira com GPS', desc: 'Coleira inteligente com rastreamento via app.', preco: 299.90, img: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400', tags: ['cachorro', 'acessorio'], estoque: 5 },
    { id: 21, nome: 'Snack Natural', desc: 'Biscoitos naturais de frango e batata doce.', preco: 19.90, img: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=400', tags: ['cachorro', 'alimento'], estoque: 120 },
    { id: 22, nome: 'Ninho para Pássaros', desc: 'Ninho de madeira natural.', preco: 34.90, img: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400', tags: ['passaro', 'acessorio'], estoque: 18 },
    { id: 23, nome: 'Termostato para Aquário', desc: 'Aquecedor com controle digital.', preco: 79.90, img: 'https://images.unsplash.com/photo-1535594428893-47441e1f96e0?w=400', tags: ['peixe', 'acessorio'], estoque: 14 },
    { id: 24, nome: 'Mordedor de Corda', desc: 'Brinquedo de corda natural para cães.', preco: 24.90, img: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400', tags: ['cachorro', 'brinquedo'], estoque: 75 },
    { id: 25, nome: 'Escova Desembaraçante', desc: 'Escova profissional para pelos longos.', preco: 29.90, img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400', tags: ['cachorro', 'gato', 'higiene'], estoque: 50 }
];

// Serviços padrão (Banho & Tosa)
const SERVICOS_PADRAO = [
    { id: 1, nome: 'Banho', desc: 'Limpeza completa com produtos especiais hipoalergênicos', preco: 49.90, duracao: 30 },
    { id: 2, nome: 'Tosa', desc: 'Tosa higiênica ou estilizada conforme sua preferência', preco: 59.90, duracao: 45 },
    { id: 3, nome: 'Banho + Tosa', desc: 'Pacote completo com desconto especial', preco: 89.90, duracao: 60 },
    { id: 4, nome: 'Pacote Luxo', desc: 'Banho, tosa, hidratação profunda e escovação', preco: 149.90, duracao: 90 }
];

// ============================================================
// 3. VARIÁVEIS GLOBAIS
// ============================================================
let usuario = null;
let carrinho = [];
let pedidos = [];
let wishlist = [];
let appointments = [];
let produtos = [];
let servicos = [];
let filtroAtivo = 'todos';
let termoBusca = '';
let selectedService = null;
let currentCaptcha = '';
let regCurrentCaptcha = '';
let isTranscriptActive = false;
let transcriptRecognition = null;
let adminEditandoProduto = null;
let adminEditandoServico = null;

// ============================================================
// 4. FUNÇÕES DE UTILIDADE
// ============================================================

// Exibir mensagem toast
function showToast(msg, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    
    if (type === 'error') toast.style.background = '#e74c3c';
    else if (type === 'warning') toast.style.background = '#f39c12';
    else toast.style.background = '#7fb77e';
    
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// Exibir mensagem no formulário
function showMessage(elementId, msg, isError = true) {
    const msgDiv = document.getElementById(elementId);
    if (!msgDiv) return;
    
    msgDiv.textContent = msg;
    msgDiv.className = 'message ' + (isError ? 'error' : 'success');
    msgDiv.style.display = 'block';
    
    setTimeout(() => msgDiv.style.display = 'none', 4000);
}

// Obter adaptação do CID
function getAdaptacaoCID(cid) {
    if (!cid) return null;
    const cidCode = cid.toUpperCase().split('.')[0];
    return CID_MAP[cidCode] || null;
}

// Fechar todos os modais
function fecharTodosModais() {
    const overlay = document.getElementById('modalOverlay');
    if (overlay) overlay.classList.remove('show');
    
    document.querySelectorAll('.cart-modal.open, .profile-modal.show, .product-modal.show, .orders-modal.show, .wishlist-modal.show, .checkout-modal.show, .bath-modal.show, .appointments-modal.show, .admin-modal.show').forEach(modal => {
        modal.classList.remove('open', 'show');
    });
}

// ============================================================
// 5. CAPTCHA
// ============================================================
function gerarCaptcha() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
}

function atualizarCaptcha() {
    currentCaptcha = gerarCaptcha();
    const captchaElement = document.getElementById('captchaImage');
    if (captchaElement) captchaElement.textContent = currentCaptcha;
}

function atualizarRegCaptcha() {
    regCurrentCaptcha = gerarCaptcha();
    const captchaElement = document.getElementById('regCaptchaImage');
    if (captchaElement) captchaElement.textContent = regCurrentCaptcha;
}

function validarCaptcha(input, expected, elementId) {
    if (input !== expected) {
        showMessage(elementId, 'Código de segurança inválido!', true);
        return false;
    }
    return true;
}

// ============================================================
// 6. INICIALIZAÇÃO DE DADOS
// ============================================================
function inicializarDados() {
    // Inicializar produtos
    if (!localStorage.getItem('amigopet_produtos')) {
        produtos = [...PRODUTOS_PADRAO];
        localStorage.setItem('amigopet_produtos', JSON.stringify(produtos));
    } else {
        produtos = JSON.parse(localStorage.getItem('amigopet_produtos'));
    }
    
    // Inicializar serviços
    if (!localStorage.getItem('amigopet_servicos')) {
        servicos = [...SERVICOS_PADRAO];
        localStorage.setItem('amigopet_servicos', JSON.stringify(servicos));
    } else {
        servicos = JSON.parse(localStorage.getItem('amigopet_servicos'));
    }
    
    // Inicializar usuários padrão (admin e funcionário)
    if (!localStorage.getItem('amigopet_usuarios')) {
        const usuariosPadrao = [
            { id: 'admin_1', nome: 'Administrador', email: 'admin@amigopet.com', senha: 'admin123', tipo: 'admin', tipoPet: 'cachorro', cid: '', bio: 'Administrador do sistema' },
            { id: 'func_1', nome: 'Carlos Funcionário', email: 'func@amigopet.com', senha: 'func123', tipo: 'funcionario', tipoPet: 'cachorro', cid: '', bio: 'Funcionário' }
        ];
        localStorage.setItem('amigopet_usuarios', JSON.stringify(usuariosPadrao));
    }
}

// ============================================================
// 7. TRANSCRIÇÃO DE TELA (COMANDOS DE VOZ)
// ============================================================
function iniciarTranscricao() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        showToast('Seu navegador não suporta transcrição de voz', 'error');
        return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    transcriptRecognition = new SpeechRecognition();
    transcriptRecognition.continuous = true;
    transcriptRecognition.interimResults = true;
    transcriptRecognition.lang = 'pt-BR';
    
    transcriptRecognition.onresult = (event) => {
        const transcript = document.getElementById('transcriptContent');
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const text = event.results[i][0].transcript;
            
            if (event.results[i].isFinal) {
                const item = document.createElement('div');
                item.className = 'transcript-item';
                item.innerHTML = `<i class="fas fa-microphone"></i> ${text}`;
                transcript.appendChild(item);
                transcript.scrollTop = transcript.scrollHeight;
                
                // Comandos de voz para navegação
                const lowerText = text.toLowerCase();
                if (lowerText.includes('início')) mudarPagina('home');
                else if (lowerText.includes('banho')) mudarPagina('bath');
                else if (lowerText.includes('perfil')) abrirPerfil();
                else if (lowerText.includes('pedidos')) mostrarPedidos();
                else if (lowerText.includes('favoritos')) mostrarWishlist();
                else if (lowerText.includes('sair')) fazerLogout();
                else if (lowerText.includes('admin') && usuario?.tipo === 'admin') abrirAdmin();
            }
        }
    };
    
    transcriptRecognition.onerror = (event) => {
        console.error('Erro na transcrição:', event.error);
        if (event.error === 'not-allowed') showToast('Permissão de microfone negada', 'error');
    };
    
    transcriptRecognition.start();
    isTranscriptActive = true;
    
    document.getElementById('startTranscriptBtn').classList.add('hidden');
    document.getElementById('stopTranscriptBtn').classList.remove('hidden');
    document.getElementById('transcriptPanel').classList.add('show');
    showToast('Transcrição ativada! Fale comandos como "Início", "Banho", "Perfil"', 'success');
}

function pararTranscricao() {
    if (transcriptRecognition) {
        transcriptRecognition.stop();
        transcriptRecognition = null;
    }
    isTranscriptActive = false;
    document.getElementById('startTranscriptBtn').classList.remove('hidden');
    document.getElementById('stopTranscriptBtn').classList.add('hidden');
    showToast('Transcrição desativada', 'info');
}

// ============================================================
// 8. ACESSIBILIDADE (TEMAS, FONTES, ETC)
// ============================================================
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    showToast(document.body.classList.contains('dark-mode') ? 'Tema escuro ativado' : 'Tema claro ativado', 'success');
}

function toggleHighContrast() {
    document.body.classList.toggle('high-contrast');
    localStorage.setItem('contrast', document.body.classList.contains('high-contrast') ? 'high' : 'normal');
    showToast(document.body.classList.contains('high-contrast') ? 'Alto contraste ativado' : 'Alto contraste desativado', 'success');
}

function toggleDaltonism() {
    document.body.classList.remove('deuteranopia', 'protanopia');
    document.body.classList.toggle('daltonism');
    localStorage.setItem('daltonism', document.body.classList.contains('daltonism') ? 'active' : 'inactive');
    showToast(document.body.classList.contains('daltonism') ? 'Modo daltonismo ativado' : 'Modo daltonismo desativado', 'success');
}

function toggleDeuteranopia() {
    document.body.classList.remove('daltonism', 'protanopia');
    document.body.classList.toggle('deuteranopia');
    showToast('Modo Deuteranopia (verde-vermelho) ativado', 'success');
}

function toggleProtanopia() {
    document.body.classList.remove('daltonism', 'deuteranopia');
    document.body.classList.toggle('protanopia');
    showToast('Modo Protanopia (vermelho-verde) ativado', 'success');
}

function increaseFont() {
    let currentSize = parseFloat(localStorage.getItem('fontSize') || '1');
    if (currentSize < 1.3) {
        currentSize += 0.05;
        document.body.style.fontSize = `${currentSize}rem`;
        localStorage.setItem('fontSize', currentSize);
        showToast(`Fonte aumentada para ${Math.round(currentSize * 100)}%`, 'success');
    } else {
        showToast('Tamanho máximo da fonte atingido', 'warning');
    }
}

function decreaseFont() {
    let currentSize = parseFloat(localStorage.getItem('fontSize') || '1');
    if (currentSize > 0.8) {
        currentSize -= 0.05;
        document.body.style.fontSize = `${currentSize}rem`;
        localStorage.setItem('fontSize', currentSize);
        showToast(`Fonte diminuída para ${Math.round(currentSize * 100)}%`, 'success');
    } else {
        showToast('Tamanho mínimo da fonte atingido', 'warning');
    }
}

function resetAccessibility() {
    document.body.classList.remove('dark-mode', 'high-contrast', 'daltonism', 'deuteranopia', 'protanopia');
    document.body.style.fontSize = '';
    localStorage.removeItem('theme');
    localStorage.removeItem('contrast');
    localStorage.removeItem('daltonism');
    localStorage.removeItem('fontSize');
    showToast('Preferências de acessibilidade redefinidas', 'success');
}

function carregarPreferenciasAcessibilidade() {
    if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark-mode');
    if (localStorage.getItem('contrast') === 'high') document.body.classList.add('high-contrast');
    if (localStorage.getItem('daltonism') === 'active') document.body.classList.add('daltonism');
    const fontSize = localStorage.getItem('fontSize');
    if (fontSize) document.body.style.fontSize = `${fontSize}rem`;
}

// ============================================================
// 9. AUTENTICAÇÃO (LOGIN, CADASTRO, LOGOUT)
// ============================================================
function fazerLogin(email, senha, tipo, securityCode) {
    if (!validarCaptcha(securityCode, currentCaptcha, 'authMessage')) return false;
    
    const usuarios = JSON.parse(localStorage.getItem('amigopet_usuarios') || '[]');
    const user = usuarios.find(u => u.email === email && u.senha === senha && u.tipo === tipo);
    
    if (user) {
        usuario = {
            id: user.id,
            nome: user.nome,
            email: user.email,
            tipo: user.tipo,
            tipoPet: user.tipoPet || 'cachorro',
            cid: user.cid || '',
            bio: user.bio || ''
        };
        localStorage.setItem('amigopet_usuario', JSON.stringify(usuario));
        carregarCarrinho();
        carregarPedidos();
        carregarWishlist();
        carregarAppointments();
        aplicarAdaptacaoCID();
        return true;
    }
    return false;
}

function fazerRegistro(nome, email, senha, confirmar, tipoPet, cid, bio, securityCode) {
    if (!validarCaptcha(securityCode, regCurrentCaptcha, 'authMessage')) {
        return { success: false, error: 'Código de segurança inválido!' };
    }
    
    const usuarios = JSON.parse(localStorage.getItem('amigopet_usuarios') || '[]');
    if (usuarios.find(u => u.email === email)) {
        return { success: false, error: 'E-mail já cadastrado!' };
    }
    if (senha.length < 6) {
        return { success: false, error: 'Senha deve ter no mínimo 6 caracteres!' };
    }
    if (senha !== confirmar) {
        return { success: false, error: 'As senhas não coincidem!' };
    }
    
    const novoUsuario = {
        id: 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        senha: senha,
        tipo: 'cliente',
        tipoPet: tipoPet,
        cid: cid || '',
        bio: bio || ''
    };
    usuarios.push(novoUsuario);
    localStorage.setItem('amigopet_usuarios', JSON.stringify(usuarios));
    
    usuario = {
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        tipo: 'cliente',
        tipoPet: novoUsuario.tipoPet,
        cid: novoUsuario.cid,
        bio: novoUsuario.bio
    };
    localStorage.setItem('amigopet_usuario', JSON.stringify(usuario));
    
    carrinho = [];
    pedidos = [];
    wishlist = [];
    appointments = [];
    salvarCarrinho();
    salvarPedidos();
    salvarWishlist();
    salvarAppointments();
    aplicarAdaptacaoCID();
    
    return { success: true };
}

function aplicarAdaptacaoCID() {
    if (!usuario || !usuario.cid) return;
    const adaptacao = getAdaptacaoCID(usuario.cid);
    if (adaptacao) {
        if (adaptacao.tipo === 'daltonism') toggleDaltonism();
        if (adaptacao.tipo === 'baixa-visao') increaseFont();
        showToast(`Experiência adaptada para ${adaptacao.nome} 🐾`, 'success');
    }
}

function fazerLogout() {
    salvarCarrinho();
    salvarPedidos();
    salvarWishlist();
    salvarAppointments();
    if (isTranscriptActive) pararTranscricao();
    
    usuario = null;
    carrinho = [];
    pedidos = [];
    wishlist = [];
    appointments = [];
    filtroAtivo = 'todos';
    termoBusca = '';
    localStorage.removeItem('amigopet_usuario');
    
    document.getElementById('authScreen').classList.remove('hidden');
    document.getElementById('appScreen').classList.add('hidden');
    document.getElementById('adminScreen').classList.add('hidden');
    
    fecharTodosModais();
    showToast('Logout realizado!');
}

// ============================================================
// 10. AGENDAMENTOS (BANHO & TOSA)
// ============================================================
function salvarAppointments() {
    if (usuario && appointments) localStorage.setItem(`appointments_${usuario.id}`, JSON.stringify(appointments));
}

function carregarAppointments() {
    if (usuario) {
        const saved = localStorage.getItem(`appointments_${usuario.id}`);
        if (saved) appointments = JSON.parse(saved);
    }
}

function abrirBanhoTosa() {
    if (!usuario) {
        showToast('Faça login para agendar', 'warning');
        return;
    }
    selectedService = null;
    document.querySelectorAll('.service-card').forEach(card => card.classList.remove('selected'));
    document.getElementById('petName').value = '';
    document.getElementById('appointmentDate').value = '';
    document.getElementById('appointmentTime').value = '';
    document.getElementById('bathObservations').value = '';
    document.getElementById('bathModal').classList.add('show');
    document.getElementById('modalOverlay').classList.add('show');
}

function selecionarServico(service) {
    selectedService = service;
    document.querySelectorAll('.service-card').forEach(card => card.classList.remove('selected'));
    document.querySelector(`.service-card[data-service="${service}"]`).classList.add('selected');
}

function agendarBanhoTosa(event) {
    event.preventDefault();
    if (!selectedService) {
        showToast('Selecione um serviço!', 'error');
        return;
    }
    
    const petName = document.getElementById('petName').value.trim();
    const date = document.getElementById('appointmentDate').value;
    const time = document.getElementById('appointmentTime').value;
    
    if (!petName || !date || !time) {
        showToast('Preencha todos os campos!', 'error');
        return;
    }
    
    const servicoEncontrado = servicos.find(s => {
        if (selectedService === 'banho') return s.nome === 'Banho';
        if (selectedService === 'tosa') return s.nome === 'Tosa';
        if (selectedService === 'completo') return s.nome === 'Banho + Tosa';
        if (selectedService === 'luxo') return s.nome === 'Pacote Luxo';
        return false;
    });
    
    const appointment = {
        id: 'APT_' + Date.now(),
        petName: petName,
        serviceId: servicoEncontrado?.id || 1,
        serviceName: servicoEncontrado?.nome || selectedService,
        price: servicoEncontrado?.preco || 49.90,
        date: date,
        time: time,
        observations: document.getElementById('bathObservations').value,
        status: 'Confirmado',
        createdAt: new Date().toLocaleString('pt-BR')
    };
    
    appointments.unshift(appointment);
    salvarAppointments();
    showToast(`Agendamento realizado! ${appointment.serviceName} para ${petName}`, 'success');
    fecharBanhoTosa();
}

function fecharBanhoTosa() {
    document.getElementById('bathModal').classList.remove('show');
    document.getElementById('modalOverlay').classList.remove('show');
}

function mostrarAppointments() {
    const modal = document.getElementById('appointmentsModal');
    const content = document.getElementById('appointmentsContent');
    
    if (!appointments || !appointments.length) {
        content.innerHTML = `<div class="empty-state"><i class="fas fa-calendar-times"></i><h3>Nenhum agendamento</h3><p>🐾 Agende um banho e tosa para seu pet!</p></div>`;
    } else {
        content.innerHTML = appointments.map(apt => `
            <div class="appointment-card">
                <div><strong>🐾 ${apt.petName}</strong></div>
                <div><i class="fas fa-cut"></i> ${apt.serviceName}</div>
                <div><i class="fas fa-calendar"></i> ${new Date(apt.date).toLocaleDateString('pt-BR')} às ${apt.time}</div>
                <div><i class="fas fa-tag"></i> R$ ${apt.price.toFixed(2).replace('.', ',')}</div>
                ${apt.observations ? `<div><i class="fas fa-comment"></i> ${apt.observations}</div>` : ''}
                <div class="status confirmed">${apt.status}</div>
                <button class="cancel-appointment" onclick="cancelarAgendamento('${apt.id}')">Cancelar</button>
            </div>
        `).join('');
    }
    modal.classList.add('show');
    document.getElementById('modalOverlay').classList.add('show');
}

function cancelarAgendamento(id) {
    appointments = appointments.filter(apt => apt.id !== id);
    salvarAppointments();
    mostrarAppointments();
    showToast('Agendamento cancelado', 'warning');
}

function fecharAppointmentsModal() {
    document.getElementById('appointmentsModal').classList.remove('show');
    document.getElementById('modalOverlay').classList.remove('show');
}

// ============================================================
// 11. CARRINHO DE COMPRAS
// ============================================================
function salvarCarrinho() {
    if (usuario && carrinho) localStorage.setItem(`carrinho_${usuario.id}`, JSON.stringify(carrinho));
}

function carregarCarrinho() {
    if (usuario) {
        const saved = localStorage.getItem(`carrinho_${usuario.id}`);
        if (saved) {
            carrinho = JSON.parse(saved);
            atualizarContadorCarrinho();
        }
    }
}

function salvarPedidos() {
    if (usuario && pedidos) localStorage.setItem(`pedidos_${usuario.id}`, JSON.stringify(pedidos));
}

function carregarPedidos() {
    if (usuario) {
        const saved = localStorage.getItem(`pedidos_${usuario.id}`);
        if (saved) pedidos = JSON.parse(saved);
    }
}

function salvarWishlist() {
    if (usuario && wishlist) localStorage.setItem(`wishlist_${usuario.id}`, JSON.stringify(wishlist));
}

function carregarWishlist() {
    if (usuario) {
        const saved = localStorage.getItem(`wishlist_${usuario.id}`);
        if (saved) wishlist = JSON.parse(saved);
    }
}

function atualizarContadorCarrinho() {
    const total = carrinho.reduce((s, i) => s + i.quantidade, 0);
    const cartCount = document.getElementById('cartCount');
    if (cartCount) cartCount.textContent = total;
}

function adicionarAoCarrinho(produto) {
    if (!usuario) {
        showToast('Faça login para adicionar ao carrinho', 'warning');
        return;
    }
    
    const existente = carrinho.find(i => i.id === produto.id);
    if (existente) {
        existente.quantidade++;
    } else {
        carrinho.push({ ...produto, quantidade: 1 });
    }
    salvarCarrinho();
    atualizarContadorCarrinho();
    renderCarrinho();
    showToast(`${produto.nome} adicionado ao carrinho!`);
}

function removerDoCarrinho(produtoId) {
    carrinho = carrinho.filter(i => i.id !== produtoId);
    salvarCarrinho();
    atualizarContadorCarrinho();
    renderCarrinho();
}

function atualizarQuantidade(produtoId, novaQtd) {
    const item = carrinho.find(i => i.id === produtoId);
    if (item) {
        if (novaQtd <= 0) {
            removerDoCarrinho(produtoId);
        } else {
            item.quantidade = novaQtd;
            salvarCarrinho();
            atualizarContadorCarrinho();
            renderCarrinho();
        }
    }
}

function calcularFrete(subtotal) {
    return subtotal >= 150 ? 0 : 12.90;
}

function renderCarrinho() {
    const container = document.getElementById('cartItems');
    if (!container) return;
    
    if (!carrinho || !carrinho.length) {
        container.innerHTML = '<div class="empty-state"><i class="fas fa-shopping-cart"></i><p>Seu carrinho está vazio</p><p>🐾 Adicione produtos para seu pet!</p></div>';
        document.getElementById('cartSubtotal').innerHTML = 'R$ 0,00';
        document.getElementById('cartFrete').innerHTML = 'R$ 0,00';
        document.getElementById('cartTotal').innerHTML = 'R$ 0,00';
        return;
    }
    
    let subtotal = 0;
    container.innerHTML = carrinho.map(item => {
        const itemTotal = item.preco * item.quantidade;
        subtotal += itemTotal;
        return `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.nome}</h4>
                    <div class="cart-item-price">R$ ${item.preco.toFixed(2).replace('.', ',')}</div>
                    <div class="cart-item-quantity">
                        <button class="qty-btn" onclick="atualizarQuantidade(${item.id}, ${item.quantidade - 1})">-</button>
                        <span>${item.quantidade}</span>
                        <button class="qty-btn" onclick="atualizarQuantidade(${item.id}, ${item.quantidade + 1})">+</button>
                    </div>
                </div>
                <div class="cart-item-total">
                    R$ ${itemTotal.toFixed(2).replace('.', ',')}
                    <button class="remove-item" onclick="removerDoCarrinho(${item.id})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `;
    }).join('');
    
    const frete = calcularFrete(subtotal);
    const total = subtotal + frete;
    
    document.getElementById('cartSubtotal').innerHTML = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    document.getElementById('cartFrete').innerHTML = frete === 0 ? 'Grátis' : `R$ ${frete.toFixed(2).replace('.', ',')}`;
    document.getElementById('cartTotal').innerHTML = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function finalizarCompra() {
    if (!carrinho || !carrinho.length) {
        showToast('Carrinho vazio!', 'error');
        return;
    }
    
    const subtotal = carrinho.reduce((s, i) => s + (i.preco * i.quantidade), 0);
    const frete = calcularFrete(subtotal);
    const total = subtotal + frete;
    const novoPedido = {
        id: 'ORD_' + Date.now(),
        data: new Date().toLocaleString('pt-BR'),
        itens: [...carrinho],
        subtotal: subtotal,
        frete: frete,
        total: total,
        status: 'Confirmado'
    };
    pedidos.unshift(novoPedido);
    salvarPedidos();
    
    const modal = document.getElementById('checkoutModal');
    const content = document.getElementById('checkoutContent');
    content.innerHTML = `
        <div class="checkout-success">
            <div class="success-icon"><i class="fas fa-check-circle"></i></div>
            <h3>Compra finalizada com sucesso!</h3>
            <p>Pedido #${novoPedido.id}</p>
            <div class="order-summary">
                <div>Subtotal: <strong>R$ ${subtotal.toFixed(2).replace('.', ',')}</strong></div>
                <div>Frete: <strong>${frete === 0 ? 'Grátis' : 'R$ ' + frete.toFixed(2).replace('.', ',')}</strong></div>
                <div>Total: <strong>R$ ${total.toFixed(2).replace('.', ',')}</strong></div>
                <div>Status: <span class="order-status">${novoPedido.status}</span></div>
            </div>
            <p class="delivery-info">📦 Prazo de entrega: 2-5 dias úteis</p>
            <p class="delivery-info">🐾 Obrigado por comprar com a Amigo Pet!</p>
            <button onclick="window.print()" class="btn-ghost" style="margin: 10px;"><i class="fas fa-print"></i> Imprimir Comprovante</button>
            <button onclick="fecharCheckoutModal();" class="btn-submit">Fechar</button>
        </div>
    `;
    modal.classList.add('show');
    document.getElementById('modalOverlay').classList.add('show');
    
    carrinho = [];
    salvarCarrinho();
    atualizarContadorCarrinho();
    renderCarrinho();
    fecharCarrinho();
    showToast('Compra finalizada com sucesso!', 'success');
}

function fecharCheckoutModal() {
    document.getElementById('checkoutModal').classList.remove('show');
    document.getElementById('modalOverlay').classList.remove('show');
}

function abrirCarrinho() {
    renderCarrinho();
    document.getElementById('cartModal').classList.add('open');
    document.getElementById('modalOverlay').classList.add('show');
}

function fecharCarrinho() {
    document.getElementById('cartModal').classList.remove('open');
    document.getElementById('modalOverlay').classList.remove('show');
}

// ============================================================
// 12. PERFIL DO USUÁRIO
// ============================================================
function abrirPerfil() {
    if (!usuario) {
        showToast('Usuário não logado!', 'error');
        return;
    }
    
    document.getElementById('profileNome').value = usuario.nome || '';
    document.getElementById('profileEmail').value = usuario.email || '';
    document.getElementById('profileTipoPet').value = usuario.tipoPet || 'cachorro';
    document.getElementById('profileCid').value = usuario.cid || '';
    document.getElementById('profileBio').value = usuario.bio || '';
    document.getElementById('profileModal').classList.add('show');
    document.getElementById('modalOverlay').classList.add('show');
}

function fecharPerfil() {
    document.getElementById('profileModal').classList.remove('show');
    document.getElementById('modalOverlay').classList.remove('show');
}

function atualizarPerfil(nome, email, tipoPet, cid, bio) {
    if (!usuario) return;
    
    const usuarios = JSON.parse(localStorage.getItem('amigopet_usuarios') || '[]');
    const index = usuarios.findIndex(u => u.id === usuario.id);
    if (index !== -1) {
        usuarios[index].nome = nome;
        usuarios[index].email = email;
        usuarios[index].tipoPet = tipoPet;
        usuarios[index].cid = cid;
        usuarios[index].bio = bio;
        localStorage.setItem('amigopet_usuarios', JSON.stringify(usuarios));
    }
    
    usuario.nome = nome;
    usuario.email = email;
    usuario.tipoPet = tipoPet;
    usuario.cid = cid;
    usuario.bio = bio;
    localStorage.setItem('amigopet_usuario', JSON.stringify(usuario));
    
    aplicarAdaptacaoCID();
    aplicarPerfil();
    renderFilters();
    renderProdutos();
    showToast('Perfil atualizado com sucesso!', 'success');
}

function aplicarPerfil() {
    if (!usuario) return;
    
    const perfil = PET_MAP[usuario.tipoPet] || { nome: 'Cachorro', icone: '🐕' };
    const adaptacao = getAdaptacaoCID(usuario.cid);
    const roleNames = { admin: '👑 Administrador', funcionario: '✂️ Funcionário', cliente: '🐾 Cliente' };
    
    document.getElementById('sidebarUserName').innerHTML = usuario.nome || 'Usuário';
    document.getElementById('sidebarUserPet').innerHTML = `${perfil.icone} ${perfil.nome}`;
    
    const roleElement = document.getElementById('sidebarUserRole');
    if (roleElement) {
        roleElement.innerHTML = `<span class="role-badge ${usuario.tipo}">${roleNames[usuario.tipo] || roleNames.cliente}</span>`;
    }
    
    const cidElement = document.getElementById('sidebarUserCid');
    if (cidElement) {
        if (usuario.cid) {
            const cidInfo = adaptacao || { nome: 'CID Informado' };
            cidElement.innerHTML = `<i class="fas fa-id-card"></i> ${usuario.cid} - ${cidInfo.nome}`;
        } else {
            cidElement.innerHTML = '';
        }
    }
    
    document.getElementById('heroTitle').innerHTML = `Olá, ${(usuario.nome || 'Usuário').split(' ')[0]}! 🐾`;
    document.getElementById('heroText').innerHTML = adaptacao ? `Loja adaptada para ${adaptacao.nome}` : `Produtos para ${perfil.nome}`;
}

// ============================================================
// 13. PRODUTOS (EXIBIÇÃO, FILTROS, BUSCA)
// ============================================================
function abrirDetalhesProduto(produto) {
    const isInWishlist = wishlist.includes(produto.id);
    const produtoJson = JSON.stringify(produto).replace(/"/g, '&quot;');
    
    document.getElementById('productModalContent').innerHTML = `
        <div class="product-detail">
            <div class="product-detail-img">
                <img src="${produto.img}" alt="${produto.nome}" onerror="this.src='https://via.placeholder.com/400x300?text=Produto+Pet'">
            </div>
            <div class="product-detail-info">
                <h3>${produto.nome}</h3>
                <div class="product-tags">
                    ${produto.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                </div>
                <p class="product-detail-desc">${produto.desc}</p>
                <div class="product-price">R$ ${produto.preco.toFixed(2).replace('.', ',')}</div>
                <div class="product-actions">
                    <button class="btn" onclick="adicionarAoCarrinho(${produtoJson}); fecharProductModal();">
                        <i class="fas fa-cart-plus"></i> Adicionar ao carrinho
                    </button>
                    <button class="btn-wishlist ${isInWishlist ? 'active' : ''}" onclick="toggleWishlist(${produto.id}); fecharProductModal();">
                        <i class="fas fa-heart"></i> ${isInWishlist ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                    </button>
                </div>
            </div>
        </div>
    `;
    document.getElementById('productModal').classList.add('show');
    document.getElementById('modalOverlay').classList.add('show');
}

function fecharProductModal() {
    document.getElementById('productModal').classList.remove('show');
    document.getElementById('modalOverlay').classList.remove('show');
}

function mostrarPedidos() {
    const content = document.getElementById('ordersContent');
    
    if (!pedidos || !pedidos.length) {
        content.innerHTML = `<div class="empty-state"><i class="fas fa-shopping-bag"></i><p>Você ainda não tem pedidos</p><p>🐾 Que tal comprar algo para seu pet?</p></div>`;
    } else {
        content.innerHTML = pedidos.map(pedido => `
            <div class="order-card">
                <div class="order-header">
                    <span><strong>#${pedido.id}</strong></span>
                    <span class="order-date">${pedido.data}</span>
                    <span class="order-status-badge confirmed">${pedido.status}</span>
                </div>
                <div class="order-items">
                    ${pedido.itens.map(item => `
                        <div class="order-item">
                            <span>${item.quantidade}x ${item.nome}</span>
                            <span>R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="order-total">
                    <strong>Total: R$ ${pedido.total.toFixed(2).replace('.', ',')}</strong>
                </div>
            </div>
        `).join('');
    }
    document.getElementById('ordersModal').classList.add('show');
    document.getElementById('modalOverlay').classList.add('show');
}

function fecharOrdersModal() {
    document.getElementById('ordersModal').classList.remove('show');
    document.getElementById('modalOverlay').classList.remove('show');
}

function mostrarWishlist() {
    const content = document.getElementById('wishlistContent');
    
    if (!wishlist || !wishlist.length) {
        content.innerHTML = `<div class="empty-state"><i class="fas fa-heart"></i><p>Sua lista de desejos está vazia</p><p>🐾 Adicione produtos que seu pet vai amar!</p></div>`;
    } else {
        const produtosWishlist = produtos.filter(p => wishlist.includes(p.id));
        content.innerHTML = produtosWishlist.map(produto => `
            <div class="wishlist-item">
                <img src="${produto.img}" alt="${produto.nome}">
                <div class="wishlist-item-info">
                    <h4>${produto.nome}</h4>
                    <div class="wishlist-item-price">R$ ${produto.preco.toFixed(2).replace('.', ',')}</div>
                    <div class="wishlist-actions">
                        <button class="btn" onclick="adicionarAoCarrinho(${JSON.stringify(produto).replace(/"/g, '&quot;')}); fecharWishlistModal();">Comprar</button>
                        <button class="btn-ghost" onclick="toggleWishlist(${produto.id}); fecharWishlistModal();">Remover</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    document.getElementById('wishlistModal').classList.add('show');
    document.getElementById('modalOverlay').classList.add('show');
}

function fecharWishlistModal() {
    document.getElementById('wishlistModal').classList.remove('show');
    document.getElementById('modalOverlay').classList.remove('show');
}

function toggleWishlist(produtoId) {
    const index = wishlist.indexOf(produtoId);
    if (index === -1) {
        wishlist.push(produtoId);
        showToast('Adicionado aos favoritos!', 'success');
    } else {
        wishlist.splice(index, 1);
        showToast('Removido dos favoritos', 'info');
    }
    salvarWishlist();
    renderProdutos();
}

function filtrarProdutos() {
    let prods = [...produtos];
    
    if (termoBusca) {
        const searchLower = termoBusca.toLowerCase();
        prods = prods.filter(p =>
            p.nome.toLowerCase().includes(searchLower) ||
            p.desc.toLowerCase().includes(searchLower) ||
            p.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
    }
    
    if (filtroAtivo === 'meu-perfil' && usuario) {
        const perfil = PET_MAP[usuario.tipoPet] || { tipo: 'cachorro' };
        prods = prods.filter(p => p.tags.includes(perfil.tipo));
    } else if (filtroAtivo !== 'todos') {
        prods = prods.filter(p => p.tags.includes(filtroAtivo));
    }
    
    return prods;
}

function renderProdutos() {
    const container = document.getElementById('productsGrid');
    const prods = filtrarProdutos();
    
    if (!prods.length) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>Nenhum produto encontrado</h3>
                <p>Tente buscar por outro termo ou categoria</p>
                <button onclick="limparBusca(); limparFiltros();" class="btn-submit" style="width: auto; margin-top: 15px;">Limpar busca</button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = prods.map(produto => `
        <div class="product-card" onclick="abrirDetalhesProduto(${JSON.stringify(produto).replace(/"/g, '&quot;')})">
            <img src="${produto.img}" alt="${produto.nome}" onerror="this.src='https://via.placeholder.com/400x200?text=Produto+Pet'">
            <div class="body">
                <h3>${produto.nome}</h3>
                <div class="tags">
                    ${produto.tags.slice(0, 2).map(tag => `<span class="tag">#${tag}</span>`).join('')}
                </div>
                <p class="desc">${produto.desc.substring(0, 80)}${produto.desc.length > 80 ? '...' : ''}</p>
                <div class="price">R$ ${produto.preco.toFixed(2).replace('.', ',')}</div>
                <button class="btn" onclick="event.stopPropagation(); adicionarAoCarrinho(${JSON.stringify(produto).replace(/"/g, '&quot;')})">
                    <i class="fas fa-cart-plus"></i> Comprar
                </button>
            </div>
        </div>
    `).join('');
}

function renderFilters() {
    const container = document.getElementById('filters');
    const perfil = PET_MAP[usuario?.tipoPet || 'cachorro'] || { nome: 'Cachorro' };
    
    const filtros = [
        { id: 'todos', nome: 'Todos os produtos', icon: 'fa-store' },
        { id: 'meu-perfil', nome: `Meu pet (${perfil.nome})`, icon: 'fa-paw' },
        { id: 'cachorro', nome: 'Cachorro', icon: 'fa-dog' },
        { id: 'gato', nome: 'Gato', icon: 'fa-cat' },
        { id: 'passaro', nome: 'Pássaro', icon: 'fa-dove' },
        { id: 'peixe', nome: 'Peixe', icon: 'fa-fish' },
        { id: 'racao', nome: 'Ração', icon: 'fa-bowl-food' },
        { id: 'brinquedo', nome: 'Brinquedos', icon: 'fa-baseball' },
        { id: 'cama', nome: 'Camas', icon: 'fa-bed' },
        { id: 'higiene', nome: 'Higiene', icon: 'fa-soap' },
        { id: 'medicamento', nome: 'Medicamentos', icon: 'fa-capsules' },
        { id: 'acessorio', nome: 'Acessórios', icon: 'fa-collar' }
    ];
    
    container.innerHTML = filtros.map(f => `
        <button class="chip ${filtroAtivo === f.id ? 'active' : ''}" onclick="mudarFiltro('${f.id}')">
            <i class="fas ${f.icon}"></i> ${f.nome}
        </button>
    `).join('');
}

function mudarFiltro(filtro) {
    filtroAtivo = filtro;
    renderFilters();
    renderProdutos();
}

function realizarBusca() {
    termoBusca = document.getElementById('searchInput').value.trim();
    document.getElementById('clearSearch').classList.toggle('hidden', !termoBusca);
    renderProdutos();
}

function limparBusca() {
    termoBusca = '';
    document.getElementById('searchInput').value = '';
    document.getElementById('clearSearch').classList.add('hidden');
    renderProdutos();
}

function limparFiltros() {
    filtroAtivo = 'todos';
    termoBusca = '';
    document.getElementById('searchInput').value = '';
    document.getElementById('clearSearch').classList.add('hidden');
    renderFilters();
    renderProdutos();
    showToast('Filtros limpos', 'info');
}

function mudarPagina(pagina) {
    document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));
    const activeItem = document.querySelector(`.menu-item[data-page="${pagina}"]`);
    if (activeItem) activeItem.classList.add('active');
    
    if (pagina === 'home') {
        renderProdutos();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (pagina === 'bath') {
        abrirBanhoTosa();
    } else if (pagina === 'profile') {
        abrirPerfil();
    } else if (pagina === 'orders') {
        mostrarPedidos();
    } else if (pagina === 'wishlist') {
        mostrarWishlist();
    } else if (pagina === 'appointments') {
        mostrarAppointments();
    }
}

// ============================================================
// 14. ADMIN - DASHBOARD
// ============================================================
function abrirAdmin() {
    if (!usuario || (usuario.tipo !== 'admin' && usuario.tipo !== 'funcionario')) {
        showToast('Acesso restrito a administradores e funcionários!', 'error');
        return;
    }
    document.getElementById('authScreen').classList.add('hidden');
    document.getElementById('appScreen').classList.add('hidden');
    document.getElementById('adminScreen').classList.remove('hidden');
    carregarAdminDashboard();
}

function carregarAdminDashboard() {
    const stats = {
        produtos: produtos.length,
        servicos: servicos.length,
        usuarios: JSON.parse(localStorage.getItem('amigopet_usuarios') || '[]').length,
        pedidos: pedidos.length,
        agendamentos: appointments.length,
        faturamento: pedidos.reduce((sum, p) => sum + p.total, 0)
    };
    
    document.getElementById('adminContent').innerHTML = `
        <div class="admin-stats">
            <div class="admin-stat-card"><div class="stat-info"><h3>${stats.produtos}</h3><p>Produtos</p></div><div class="stat-icon"><i class="fas fa-box"></i></div></div>
            <div class="admin-stat-card"><div class="stat-info"><h3>${stats.servicos}</h3><p>Serviços</p></div><div class="stat-icon"><i class="fas fa-cut"></i></div></div>
            <div class="admin-stat-card"><div class="stat-info"><h3>${stats.usuarios}</h3><p>Usuários</p></div><div class="stat-icon"><i class="fas fa-users"></i></div></div>
            <div class="admin-stat-card"><div class="stat-info"><h3>${stats.pedidos}</h3><p>Pedidos</p></div><div class="stat-icon"><i class="fas fa-shopping-cart"></i></div></div>
            <div class="admin-stat-card"><div class="stat-info"><h3>${stats.agendamentos}</h3><p>Agendamentos</p></div><div class="stat-icon"><i class="fas fa-calendar-check"></i></div></div>
            <div class="admin-stat-card"><div class="stat-info"><h3>R$ ${stats.faturamento.toFixed(2).replace('.', ',')}</h3><p>Faturamento</p></div><div class="stat-icon"><i class="fas fa-dollar-sign"></i></div></div>
        </div>
        <div class="admin-table">
            <h3 style="padding: 16px;">Últimos Pedidos</h3>
            ${pedidos.length ? `
                <table>
                    <thead><tr><th>Pedido</th><th>Data</th><th>Total</th><th>Status</th></tr></thead>
                    <tbody>${pedidos.slice(0,5).map(p => `
                        <tr><td>${p.id}</td><td>${p.data}</td><td>R$ ${p.total.toFixed(2).replace('.', ',')}</td><td>${p.status}</td></tr>
                    `).join('')}</tbody>
                </table>
            ` : '<p style="padding:16px;">Nenhum pedido ainda</p>'}
        </div>
    `;
}

// ============================================================
// 15. ADMIN - PRODUTOS (CRUD)
// ============================================================
function carregarAdminProdutos() {
    document.getElementById('adminContent').innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
            <h2><i class="fas fa-box"></i> Gerenciar Produtos</h2>
            <button class="btn-primary" onclick="abrirAdminProductModal()" style="width:auto;">+ Adicionar Produto</button>
        </div>
        <div class="admin-table">
            <table>
                <thead><tr><th>ID</th><th>Produto</th><th>Preço</th><th>Estoque</th><th>Tags</th><th>Ações</th></tr></thead>
                <tbody>${produtos.map(p => `
                    <tr>
                        <td>${p.id}</td>
                        <td><strong>${p.nome}</strong><br><small>${p.desc.substring(0,50)}...</small></td>
                        <td>R$ ${p.preco.toFixed(2).replace('.', ',')}</td>
                        <td>${p.estoque || 0}</td>
                        <td>${p.tags.join(', ')}</td>
                        <td class="admin-actions">
                            <button class="btn-icon edit" onclick="editarProduto(${p.id})"><i class="fas fa-edit"></i></button>
                            <button class="btn-icon delete" onclick="excluirProduto(${p.id})"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                `).join('')}</tbody>
            </table>
        </div>
    `;
}

function abrirAdminProductModal(produto = null) {
    adminEditandoProduto = produto;
    const modal = document.getElementById('adminProductModal');
    const title = document.getElementById('adminProductModalTitle');
    
    if (produto) {
        title.textContent = 'Editar Produto';
        document.getElementById('adminProdNome').value = produto.nome;
        document.getElementById('adminProdDesc').value = produto.desc;
        document.getElementById('adminProdPreco').value = produto.preco;
        document.getElementById('adminProdImg').value = produto.img;
        document.getElementById('adminProdTags').value = produto.tags.join(',');
        document.getElementById('adminProdEstoque').value = produto.estoque || 0;
        document.getElementById('adminProdId').value = produto.id;
    } else {
        title.textContent = 'Adicionar Produto';
        document.getElementById('adminProdNome').value = '';
        document.getElementById('adminProdDesc').value = '';
        document.getElementById('adminProdPreco').value = '';
        document.getElementById('adminProdImg').value = '';
        document.getElementById('adminProdTags').value = '';
        document.getElementById('adminProdEstoque').value = '10';
        document.getElementById('adminProdId').value = '';
    }
    modal.classList.add('show');
    document.getElementById('modalOverlay').classList.add('show');
}

function fecharAdminProductModal() {
    document.getElementById('adminProductModal').classList.remove('show');
    document.getElementById('modalOverlay').classList.remove('show');
    adminEditandoProduto = null;
}

function salvarProduto(event) {
    event.preventDefault();
    const id = document.getElementById('adminProdId').value;
    const nome = document.getElementById('adminProdNome').value;
    const desc = document.getElementById('adminProdDesc').value;
    const preco = parseFloat(document.getElementById('adminProdPreco').value);
    const img = document.getElementById('adminProdImg').value || 'https://via.placeholder.com/400x200?text=Produto+Pet';
    const tags = document.getElementById('adminProdTags').value.split(',').map(t => t.trim().toLowerCase());
    const estoque = parseInt(document.getElementById('adminProdEstoque').value);
    
    if (id) {
        const index = produtos.findIndex(p => p.id == id);
        if (index !== -1) {
            produtos[index] = { ...produtos[index], nome, desc, preco, img, tags, estoque };
        }
    } else {
        const novoId = Math.max(...produtos.map(p => p.id), 0) + 1;
        produtos.push({ id: novoId, nome, desc, preco, img, tags, estoque });
    }
    
    localStorage.setItem('amigopet_produtos', JSON.stringify(produtos));
    fecharAdminProductModal();
    carregarAdminProdutos();
    renderProdutos();
    showToast('Produto salvo com sucesso!', 'success');
}

function editarProduto(id) {
    const produto = produtos.find(p => p.id === id);
    if (produto) abrirAdminProductModal(produto);
}

function excluirProduto(id) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
        produtos = produtos.filter(p => p.id !== id);
        localStorage.setItem('amigopet_produtos', JSON.stringify(produtos));
        carregarAdminProdutos();
        renderProdutos();
        showToast('Produto excluído!', 'success');
    }
}

// ============================================================
// 16. ADMIN - SERVIÇOS (CRUD)
// ============================================================
function carregarAdminServicos() {
    document.getElementById('adminContent').innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
            <h2><i class="fas fa-cut"></i> Gerenciar Serviços</h2>
            <button class="btn-primary" onclick="abrirAdminServiceModal()" style="width:auto;">+ Adicionar Serviço</button>
        </div>
        <div class="admin-table">
            <table>
                <thead><tr><th>ID</th><th>Serviço</th><th>Descrição</th><th>Preço</th><th>Duração</th><th>Ações</th></tr></thead>
                <tbody>${servicos.map(s => `
                    <tr>
                        <td>${s.id}</td>
                        <td><strong>${s.nome}</strong></td>
                        <td>${s.desc}</td>
                        <td>R$ ${s.preco.toFixed(2).replace('.', ',')}</td>
                        <td>${s.duracao} min</td>
                        <td class="admin-actions">
                            <button class="btn-icon edit" onclick="editarServico(${s.id})"><i class="fas fa-edit"></i></button>
                            <button class="btn-icon delete" onclick="excluirServico(${s.id})"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                `).join('')}</tbody>
            </table>
        </div>
    `;
}

function abrirAdminServiceModal(servico = null) {
    adminEditandoServico = servico;
    const modal = document.getElementById('adminServiceModal');
    const title = document.getElementById('adminServiceModalTitle');
    
    if (servico) {
        title.textContent = 'Editar Serviço';
        document.getElementById('adminServNome').value = servico.nome;
        document.getElementById('adminServDesc').value = servico.desc;
        document.getElementById('adminServPreco').value = servico.preco;
        document.getElementById('adminServDuracao').value = servico.duracao;
        document.getElementById('adminServId').value = servico.id;
    } else {
        title.textContent = 'Adicionar Serviço';
        document.getElementById('adminServNome').value = '';
        document.getElementById('adminServDesc').value = '';
        document.getElementById('adminServPreco').value = '';
        document.getElementById('adminServDuracao').value = '30';
        document.getElementById('adminServId').value = '';
    }
    modal.classList.add('show');
    document.getElementById('modalOverlay').classList.add('show');
}

function fecharAdminServiceModal() {
    document.getElementById('adminServiceModal').classList.remove('show');
    document.getElementById('modalOverlay').classList.remove('show');
    adminEditandoServico = null;
}

function salvarServico(event) {
    event.preventDefault();
    const id = document.getElementById('adminServId').value;
    const nome = document.getElementById('adminServNome').value;
    const desc = document.getElementById('adminServDesc').value;
    const preco = parseFloat(document.getElementById('adminServPreco').value);
    const duracao = parseInt(document.getElementById('adminServDuracao').value);
    
    if (id) {
        const index = servicos.findIndex(s => s.id == id);
        if (index !== -1) {
            servicos[index] = { ...servicos[index], nome, desc, preco, duracao };
        }
    } else {
        const novoId = Math.max(...servicos.map(s => s.id), 0) + 1;
        servicos.push({ id: novoId, nome, desc, preco, duracao });
    }
    
    localStorage.setItem('amigopet_servicos', JSON.stringify(servicos));
    fecharAdminServiceModal();
    carregarAdminServicos();
    showToast('Serviço salvo com sucesso!', 'success');
}

function editarServico(id) {
    const servico = servicos.find(s => s.id === id);
    if (servico) abrirAdminServiceModal(servico);
}

function excluirServico(id) {
    if (confirm('Tem certeza que deseja excluir este serviço?')) {
        servicos = servicos.filter(s => s.id !== id);
        localStorage.setItem('amigopet_servicos', JSON.stringify(servicos));
        carregarAdminServicos();
        showToast('Serviço excluído!', 'success');
    }
}

// ============================================================
// 17. ADMIN - USUÁRIOS
// ============================================================
function carregarAdminUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem('amigopet_usuarios') || '[]');
    document.getElementById('adminContent').innerHTML = `
        <h2><i class="fas fa-users"></i> Gerenciar Usuários</h2>
        <div class="admin-table">
            <table>
                <thead><tr><th>Nome</th><th>E-mail</th><th>Tipo</th><th>Pet</th><th>Ações</th></tr></thead>
                <tbody>${usuarios.map(u => `
                    <tr>
                        <td><strong>${u.nome}</strong></td>
                        <td>${u.email}</td>
                        <td>${u.tipo === 'admin' ? '👑 Admin' : u.tipo === 'funcionario' ? '✂️ Funcionário' : '🐾 Cliente'}</td>
                        <td>${u.tipoPet || '-'}</td>
                        <td class="admin-actions"><button class="btn-icon delete" onclick="excluirUsuarioAdmin('${u.id}')"><i class="fas fa-trash"></i></button></td>
                    </tr>
                `).join('')}</tbody>
            </table>
        </div>
    `;
}

function excluirUsuarioAdmin(id) {
    if (id === usuario?.id) {
        showToast('Você não pode excluir sua própria conta!', 'error');
        return;
    }
    if (confirm('Excluir este usuário permanentemente?')) {
        let usuarios = JSON.parse(localStorage.getItem('amigopet_usuarios') || '[]');
        usuarios = usuarios.filter(u => u.id !== id);
        localStorage.setItem('amigopet_usuarios', JSON.stringify(usuarios));
        carregarAdminUsuarios();
        showToast('Usuário excluído!', 'success');
    }
}

// ============================================================
// 18. ADMIN - PEDIDOS
// ============================================================
function carregarAdminPedidos() {
    document.getElementById('adminContent').innerHTML = `
        <h2><i class="fas fa-shopping-cart"></i> Gerenciar Pedidos</h2>
        <div class="admin-table">
            <table>
                <thead><tr><th>Pedido</th><th>Data</th><th>Itens</th><th>Total</th><th>Status</th><th>Ações</th></tr></thead>
                <tbody>${pedidos.map(p => `
                    <tr>
                        <td>${p.id}</td>
                        <td>${p.data}</td>
                        <td>${p.itens.reduce((s,i)=>s+i.quantidade,0)} itens</td>
                        <td>R$ ${p.total.toFixed(2).replace('.', ',')}</td>
                        <td>
                            <select onchange="atualizarStatusPedido('${p.id}', this.value)">
                                <option ${p.status === 'Confirmado' ? 'selected' : ''}>Confirmado</option>
                                <option ${p.status === 'Enviado' ? 'selected' : ''}>Enviado</option>
                                <option ${p.status === 'Entregue' ? 'selected' : ''}>Entregue</option>
                                <option ${p.status === 'Cancelado' ? 'selected' : ''}>Cancelado</option>
                            </select>
                        </td>
                        <td><button class="btn-icon" onclick="verDetalhesPedido('${p.id}')"><i class="fas fa-eye"></i></button></td>
                    </tr>
                `).join('')}</tbody>
            </table>
        </div>
    `;
}

function atualizarStatusPedido(id, status) {
    const pedido = pedidos.find(p => p.id === id);
    if (pedido) {
        pedido.status = status;
        salvarPedidos();
        showToast(`Pedido ${id} atualizado para ${status}`, 'success');
    }
}

function verDetalhesPedido(id) {
    const pedido = pedidos.find(p => p.id === id);
    if (pedido) {
        alert(`Pedido: ${pedido.id}\nData: ${pedido.data}\n\nItens:\n${pedido.itens.map(i => `${i.quantidade}x ${i.nome} - R$ ${(i.preco * i.quantidade).toFixed(2)}`).join('\n')}\n\nTotal: R$ ${pedido.total.toFixed(2)}`);
    }
}

// ============================================================
// 19. ADMIN - AGENDAMENTOS
// ============================================================
function carregarAdminAgendamentos() {
    document.getElementById('adminContent').innerHTML = `
        <h2><i class="fas fa-calendar-check"></i> Gerenciar Agendamentos</h2>
        <div class="admin-table">
            <table>
                <thead><tr><th>Pet</th><th>Serviço</th><th>Data</th><th>Horário</th><th>Status</th><th>Ações</th></tr></thead>
                <tbody>${appointments.map(a => `
                    <tr>
                        <td><strong>${a.petName}</strong></td>
                        <td>${a.serviceName}</td>
                        <td>${new Date(a.date).toLocaleDateString('pt-BR')}</td>
                        <td>${a.time}</td>
                        <td>
                            <select onchange="atualizarStatusAgendamento('${a.id}', this.value)">
                                <option ${a.status === 'Confirmado' ? 'selected' : ''}>Confirmado</option>
                                <option ${a.status === 'Realizado' ? 'selected' : ''}>Realizado</option>
                                <option ${a.status === 'Cancelado' ? 'selected' : ''}>Cancelado</option>
                            </select>
                        </td>
                        <td><button class="btn-icon delete" onclick="excluirAgendamento('${a.id}')"><i class="fas fa-trash"></i></button></td>
                    </tr>
                `).join('')}</tbody>
            </table>
        </div>
    `;
}

function atualizarStatusAgendamento(id, status) {
    const agendamento = appointments.find(a => a.id === id);
    if (agendamento) {
        agendamento.status = status;
        salvarAppointments();
        showToast(`Agendamento ${id} atualizado para ${status}`, 'success');
    }
}

function excluirAgendamento(id) {
    if (confirm('Excluir este agendamento?')) {
        appointments = appointments.filter(a => a.id !== id);
        salvarAppointments();
        carregarAdminAgendamentos();
        showToast('Agendamento excluído!', 'success');
    }
}

// ============================================================
// 20. ADMIN - RELATÓRIOS
// ============================================================
function carregarAdminRelatorios() {
    const topProdutos = {};
    pedidos.forEach(p => {
        p.itens.forEach(i => {
            topProdutos[i.nome] = (topProdutos[i.nome] || 0) + i.quantidade;
        });
    });
    
    document.getElementById('adminContent').innerHTML = `
        <h2><i class="fas fa-chart-bar"></i> Relatórios</h2>
        <div class="admin-stats">
            <div class="admin-stat-card"><div class="stat-info"><h3>R$ ${pedidos.reduce((s,p)=>s+p.total,0).toFixed(2).replace('.',',')}</h3><p>Faturamento Total</p></div></div>
            <div class="admin-stat-card"><div class="stat-info"><h3>${pedidos.length}</h3><p>Total de Pedidos</p></div></div>
            <div class="admin-stat-card"><div class="stat-info"><h3>${produtos.length}</h3><p>Produtos</p></div></div>
            <div class="admin-stat-card"><div class="stat-info"><h3>${appointments.length}</h3><p>Agendamentos</p></div></div>
        </div>
        <div class="admin-table">
            <h3 style="padding: 16px;">Produtos Mais Vendidos</h3>
            <table>
                <thead><tr><th>Produto</th><th>Quantidade</th></tr></thead>
                <tbody>${Object.entries(topProdutos).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([nome, qtd]) => `
                    <tr><td>${nome}</td><td>${qtd} unidades</td></tr>
                `).join('')}</tbody>
            </table>
        </div>
        <button class="btn-primary" onclick="exportarRelatorio()" style="margin-top:20px;width:auto;"><i class="fas fa-download"></i> Exportar Relatório (CSV)</button>
    `;
}

function exportarRelatorio() {
    let csv = "Pedido,Data,Total,Status\n";
    pedidos.forEach(p => {
        csv += `${p.id},${p.data},${p.total},${p.status}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `relatorio_pedidos_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    showToast('Relatório exportado!', 'success');
}

// ============================================================
// 21. ADMIN - CONFIGURAÇÕES
// ============================================================
function carregarAdminConfig() {
    document.getElementById('adminContent').innerHTML = `
        <h2><i class="fas fa-cog"></i> Configurações</h2>
        <div class="form-card"><h3>Aparência</h3><button class="btn-ghost" onclick="toggleDarkMode()" style="margin:5px;"><i class="fas fa-moon"></i> Alternar Tema Escuro</button><button class="btn-ghost" onclick="resetAccessibility()" style="margin:5px;"><i class="fas fa-undo"></i> Resetar Acessibilidade</button></div>
        <div class="form-card"><h3>Dados</h3><button class="btn-danger" onclick="resetarDados()" style="background:#e74c3c;"><i class="fas fa-trash"></i> Resetar Todos os Dados</button><p class="hint">⚠️ Isso irá restaurar produtos, serviços e usuários padrão.</p></div>
    `;
}

function resetarDados() {
    if (confirm('ATENÇÃO: Isso irá apagar todos os dados personalizados e restaurar os valores padrão. Esta ação não pode ser desfeita! Deseja continuar?')) {
        localStorage.clear();
        inicializarDados();
        produtos = [...PRODUTOS_PADRAO];
        servicos = [...SERVICOS_PADRAO];
        pedidos = [];
        appointments = [];
        showToast('Dados resetados com sucesso! Faça login novamente.', 'success');
        setTimeout(() => location.reload(), 2000);
    }
}

// ============================================================
// 22. MENU DINÂMICO
// ============================================================
function carregarMenu() {
    const menu = document.getElementById('sidebarMenu');
    if (!menu) return;
    
    if (usuario.tipo === 'admin') {
        menu.innerHTML = `
            <div class="menu-item active" data-page="home"><i class="fas fa-home"></i><span>Início</span></div>
            <div class="menu-item" data-page="admin" onclick="abrirAdmin()"><i class="fas fa-crown"></i><span>Administração</span></div>
            <div class="menu-item" data-page="bath"><i class="fas fa-shower"></i><span>Banho & Tosa</span></div>
            <div class="menu-item" data-page="profile"><i class="fas fa-user"></i><span>Meu Perfil</span></div>
            <div class="menu-item" data-page="orders"><i class="fas fa-shopping-bag"></i><span>Meus Pedidos</span></div>
            <div class="menu-item" data-page="wishlist"><i class="fas fa-heart"></i><span>Lista de Desejos</span></div>
            <div class="menu-item" data-page="appointments"><i class="fas fa-calendar-check"></i><span>Meus Agendamentos</span></div>
        `;
    } else if (usuario.tipo === 'funcionario') {
        menu.innerHTML = `
            <div class="menu-item active" data-page="home"><i class="fas fa-home"></i><span>Início</span></div>
            <div class="menu-item" data-page="admin" onclick="abrirAdmin()"><i class="fas fa-chart-line"></i><span>Painel</span></div>
            <div class="menu-item" data-page="bath"><i class="fas fa-shower"></i><span>Banho & Tosa</span></div>
            <div class="menu-item" data-page="profile"><i class="fas fa-user"></i><span>Meu Perfil</span></div>
            <div class="menu-item" data-page="appointments"><i class="fas fa-calendar-check"></i><span>Agendamentos</span></div>
        `;
    } else {
        menu.innerHTML = `
            <div class="menu-item active" data-page="home"><i class="fas fa-home"></i><span>Início</span></div>
            <div class="menu-item" data-page="bath"><i class="fas fa-shower"></i><span>Banho & Tosa</span></div>
            <div class="menu-item" data-page="profile"><i class="fas fa-user"></i><span>Meu Perfil</span></div>
            <div class="menu-item" data-page="orders"><i class="fas fa-shopping-bag"></i><span>Meus Pedidos</span></div>
            <div class="menu-item" data-page="wishlist"><i class="fas fa-heart"></i><span>Lista de Desejos</span></div>
            <div class="menu-item" data-page="appointments"><i class="fas fa-calendar-check"></i><span>Meus Agendamentos</span></div>
        `;
    }
    
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const page = item.dataset.page;
            if (page === 'admin') abrirAdmin();
            else mudarPagina(page);
        });
    });
}

function iniciarLoja() {
    aplicarPerfil();
    carregarCarrinho();
    carregarPedidos();
    carregarWishlist();
    carregarAppointments();
    carregarMenu();
    renderFilters();
    renderProdutos();
}

// ============================================================
// 23. NAVEGAÇÃO ADMIN
// ============================================================
document.addEventListener('click', (e) => {
    const adminLink = e.target.closest('[data-admin-page]');
    if (adminLink) {
        e.preventDefault();
        const page = adminLink.dataset.adminPage;
        document.querySelectorAll('.admin-nav-item').forEach(item => item.classList.remove('active'));
        adminLink.classList.add('active');
        if (page === 'dashboard') carregarAdminDashboard();
        else if (page === 'produtos') carregarAdminProdutos();
        else if (page === 'servicos') carregarAdminServicos();
        else if (page === 'usuarios') carregarAdminUsuarios();
        else if (page === 'pedidos') carregarAdminPedidos();
        else if (page === 'agendamentos') carregarAdminAgendamentos();
        else if (page === 'relatorios') carregarAdminRelatorios();
        else if (page === 'config') carregarAdminConfig();
    }
});

// ============================================================
// 24. EVENTOS E INICIALIZAÇÃO
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    inicializarDados();
    carregarPreferenciasAcessibilidade();
    atualizarCaptcha();
    atualizarRegCaptcha();
    
    const savedUser = localStorage.getItem('amigopet_usuario');
    if (savedUser) {
        usuario = JSON.parse(savedUser);
        document.getElementById('authScreen').classList.add('hidden');
        document.getElementById('appScreen').classList.remove('hidden');
        iniciarLoja();
    }
    
    // Eventos de acessibilidade
    document.getElementById('accessibilityBtn').addEventListener('click', () => document.getElementById('accessibilityMenu').classList.toggle('show'));
    document.getElementById('closeAccessibility').addEventListener('click', () => document.getElementById('accessibilityMenu').classList.remove('show'));
    document.getElementById('darkModeBtn').addEventListener('click', toggleDarkMode);
    document.getElementById('highContrastBtn').addEventListener('click', toggleHighContrast);
    document.getElementById('daltonismBtn').addEventListener('click', toggleDaltonism);
    document.getElementById('deuteranopiaBtn').addEventListener('click', toggleDeuteranopia);
    document.getElementById('protanopiaBtn').addEventListener('click', toggleProtanopia);
    document.getElementById('increaseFontBtn').addEventListener('click', increaseFont);
    document.getElementById('decreaseFontBtn').addEventListener('click', decreaseFont);
    document.getElementById('resetAccessBtn').addEventListener('click', resetAccessibility);
    document.getElementById('startTranscriptBtn').addEventListener('click', iniciarTranscricao);
    document.getElementById('stopTranscriptBtn').addEventListener('click', pararTranscricao);
    document.getElementById('closeTranscript').addEventListener('click', () => {
        document.getElementById('transcriptPanel').classList.remove('show');
        if (isTranscriptActive) pararTranscricao();
    });
    
    // Captcha refresh
    document.getElementById('refreshCaptcha').addEventListener('click', atualizarCaptcha);
    document.getElementById('refreshRegCaptcha').addEventListener('click', atualizarRegCaptcha);
    
    // Toggle password visibility
    document.querySelectorAll('.toggle-password').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = document.getElementById(btn.dataset.target);
            if (target.type === 'password') {
                target.type = 'text';
                btn.innerHTML = '<i class="fas fa-eye-slash"></i>';
            } else {
                target.type = 'password';
                btn.innerHTML = '<i class="fas fa-eye"></i>';
            }
        });
    });
    
    // Tabs autenticação
    document.querySelectorAll('.auth-tab').forEach(tab => tab.addEventListener('click', () => {
        document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        document.querySelectorAll('.auth-form').forEach(form => form.classList.add('hidden'));
        document.getElementById(`${tab.dataset.tab}Form`).classList.remove('hidden');
        if (tab.dataset.tab === 'login') atualizarCaptcha();
        else atualizarRegCaptcha();
    }));
    
    // Login form
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const tipo = document.getElementById('loginTipo').value;
        if (fazerLogin(document.getElementById('loginEmail').value.trim(), document.getElementById('loginSenha').value, tipo, document.getElementById('loginSecurityCode').value)) {
            showMessage('authMessage', '✅ Login realizado! Redirecionando...', false);
            setTimeout(() => {
                document.getElementById('authScreen').classList.add('hidden');
                document.getElementById('appScreen').classList.remove('hidden');
                iniciarLoja();
            }, 1000);
        } else {
            showMessage('authMessage', 'E-mail, senha, tipo ou código inválidos!', true);
        }
    });
    
    // Register form
    document.getElementById('registerForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const result = fazerRegistro(
            document.getElementById('regNome').value.trim(),
            document.getElementById('regEmail').value.trim(),
            document.getElementById('regSenha').value,
            document.getElementById('regConfirmarSenha').value,
            document.getElementById('regTipoPet').value,
            document.getElementById('regCid').value,
            document.getElementById('regBio').value,
            document.getElementById('regSecurityCode').value
        );
        if (result.success) {
            showMessage('authMessage', '✅ Cadastro realizado! Redirecionando...', false);
            setTimeout(() => {
                document.getElementById('authScreen').classList.add('hidden');
                document.getElementById('appScreen').classList.remove('hidden');
                iniciarLoja();
            }, 1000);
        } else {
            showMessage('authMessage', result.error, true);
        }
    });
    
    // Botões principais
    document.getElementById('cartBtn').addEventListener('click', abrirCarrinho);
    document.getElementById('closeCart').addEventListener('click', fecharCarrinho);
    document.getElementById('checkoutBtn').addEventListener('click', finalizarCompra);
    document.getElementById('logoutBtn').addEventListener('click', fazerLogout);
    document.getElementById('modalOverlay').addEventListener('click', fecharTodosModais);
    document.getElementById('closeProfileModal').addEventListener('click', fecharPerfil);
    document.getElementById('closeProductModal').addEventListener('click', fecharProductModal);
    document.getElementById('closeOrdersModal').addEventListener('click', fecharOrdersModal);
    document.getElementById('closeWishlistModal').addEventListener('click', fecharWishlistModal);
    document.getElementById('closeCheckoutModal').addEventListener('click', fecharCheckoutModal);
    document.getElementById('closeBathModal').addEventListener('click', fecharBanhoTosa);
    document.getElementById('closeAppointmentsModal').addEventListener('click', fecharAppointmentsModal);
    document.getElementById('searchInput').addEventListener('input', realizarBusca);
    document.getElementById('clearSearch').addEventListener('click', limparBusca);
    document.getElementById('clearFilters').addEventListener('click', limparFiltros);
    
    // Profile form
    document.getElementById('profileForm').addEventListener('submit', (e) => {
        e.preventDefault();
        atualizarPerfil(
            document.getElementById('profileNome').value,
            document.getElementById('profileEmail').value,
            document.getElementById('profileTipoPet').value,
            document.getElementById('profileCid').value,
            document.getElementById('profileBio').value
        );
        fecharPerfil();
    });
    
    document.getElementById('editProfileBtn').addEventListener('click', (e) => {
        e.stopPropagation();
        abrirPerfil();
    });
    document.getElementById('userProfile').addEventListener('click', (e) => {
        if (e.target !== document.getElementById('editProfileBtn')) abrirPerfil();
    });
    document.getElementById('bathForm').addEventListener('submit', agendarBanhoTosa);
    document.querySelectorAll('.service-card').forEach(card => card.addEventListener('click', () => selecionarServico(card.dataset.service)));
    
    // Admin forms
    document.getElementById('adminProductForm').addEventListener('submit', salvarProduto);
    document.getElementById('adminServiceForm').addEventListener('submit', salvarServico);
});

// ============================================================
// 25. EXPORTAÇÃO DE FUNÇÕES GLOBAIS
// ============================================================
window.abrirAdmin = abrirAdmin;
window.carregarAdminDashboard = carregarAdminDashboard;
window.carregarAdminProdutos = carregarAdminProdutos;
window.carregarAdminServicos = carregarAdminServicos;
window.carregarAdminUsuarios = carregarAdminUsuarios;
window.carregarAdminPedidos = carregarAdminPedidos;
window.carregarAdminAgendamentos = carregarAdminAgendamentos;
window.carregarAdminRelatorios = carregarAdminRelatorios;
window.carregarAdminConfig = carregarAdminConfig;
window.abrirAdminProductModal = abrirAdminProductModal;
window.fecharAdminProductModal = fecharAdminProductModal;
window.abrirAdminServiceModal = abrirAdminServiceModal;
window.fecharAdminServiceModal = fecharAdminServiceModal;
window.editarProduto = editarProduto;
window.excluirProduto = excluirProduto;
window.editarServico = editarServico;
window.excluirServico = excluirServico;
window.excluirUsuarioAdmin = excluirUsuarioAdmin;
window.atualizarStatusPedido = atualizarStatusPedido;
window.verDetalhesPedido = verDetalhesPedido;
window.atualizarStatusAgendamento = atualizarStatusAgendamento;
window.excluirAgendamento = excluirAgendamento;
window.exportarRelatorio = exportarRelatorio;
window.resetarDados = resetarDados;
window.cancelarAgendamento = cancelarAgendamento;
window.adicionarAoCarrinho = adicionarAoCarrinho;
window.removerDoCarrinho = removerDoCarrinho;
window.atualizarQuantidade = atualizarQuantidade;
window.toggleWishlist = toggleWishlist;
window.fazerLogout = fazerLogout;
window.mudarPagina = mudarPagina;
window.limparBusca = limparBusca;
window.limparFiltros = limparFiltros;
window.fecharCheckoutModal = fecharCheckoutModal;
window.fecharProductModal = fecharProductModal;
window.fecharWishlistModal = fecharWishlistModal;
window.fecharOrdersModal = fecharOrdersModal;