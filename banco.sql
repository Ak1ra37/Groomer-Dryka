-- ============================================================
-- AMIGO PET SHOP - Banco de dados completo
-- Versão: 3.0 (Integrada com o sistema)
-- ============================================================

-- Criar banco de dados (se não existir)
CREATE DATABASE IF NOT EXISTS amigo_pet 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE amigo_pet;

-- ============================================================
-- 1. TABELA: usuarios (completa com tipos de acesso)
-- ============================================================
DROP TABLE IF EXISTS usuarios;
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo ENUM('admin', 'funcionario', 'cliente') DEFAULT 'cliente',
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    cid VARCHAR(20),
    tipo_acessibilidade VARCHAR(50),
    tipo_pet ENUM('cachorro', 'gato', 'passaro', 'peixe', 'outro') DEFAULT 'cachorro',
    bio TEXT,
    foto_url VARCHAR(500),
    documento VARCHAR(20) UNIQUE,
    telefone VARCHAR(20),
    endereco TEXT,
    cidade VARCHAR(100),
    estado VARCHAR(2),
    cep VARCHAR(10),
    cargo VARCHAR(100),
    setor VARCHAR(100),
    email_verificado BOOLEAN DEFAULT FALSE,
    ativo BOOLEAN DEFAULT TRUE,
    ultimo_acesso TIMESTAMP NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_tipo (tipo),
    INDEX idx_cid (cid),
    INDEX idx_documento (documento),
    INDEX idx_ativo (ativo),
    INDEX idx_tipo_pet (tipo_pet)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 2. TABELA: produtos (completa para pet shop)
-- ============================================================
DROP TABLE IF EXISTS produtos;
CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    preco_promocional DECIMAL(10,2),
    imagem_url VARCHAR(500),
    imagem_thumbnail VARCHAR(500),
    tags VARCHAR(255),
    categoria VARCHAR(50),
    tipo_pet VARCHAR(50) COMMENT 'cachorro, gato, passaro, peixe, todos',
    fabricante VARCHAR(100),
    codigo_barras VARCHAR(50),
    peso DECIMAL(8,2),
    dimensoes VARCHAR(100),
    estoque INT DEFAULT 10,
    estoque_minimo INT DEFAULT 3,
    vendidos INT DEFAULT 0,
    avaliacao_media DECIMAL(3,2) DEFAULT 0,
    total_avaliacoes INT DEFAULT 0,
    destaque BOOLEAN DEFAULT FALSE,
    ativo BOOLEAN DEFAULT TRUE,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_categoria (categoria),
    INDEX idx_tipo_pet (tipo_pet),
    INDEX idx_preco (preco),
    INDEX idx_destaque (destaque),
    INDEX idx_ativo (ativo),
    INDEX idx_tags (tags(191)),
    FULLTEXT idx_busca (nome, descricao)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 3. TABELA: servicos (Banho & Tosa)
-- ============================================================
DROP TABLE IF EXISTS servicos;
CREATE TABLE servicos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    duracao INT DEFAULT 30 COMMENT 'Duração em minutos',
    imagem_url VARCHAR(500),
    ativo BOOLEAN DEFAULT TRUE,
    ordem INT DEFAULT 0,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_ativo (ativo),
    INDEX idx_preco (preco),
    INDEX idx_ordem (ordem)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 4. TABELA: pets (animais dos clientes)
-- ============================================================
DROP TABLE IF EXISTS pets;
CREATE TABLE pets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    especie VARCHAR(50) NOT NULL,
    raca VARCHAR(100),
    idade INT,
    peso DECIMAL(5,2),
    cor VARCHAR(50),
    foto_url VARCHAR(500),
    observacoes TEXT,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    INDEX idx_usuario (usuario_id),
    INDEX idx_especie (especie)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 5. TABELA: agendamentos (serviços agendados)
-- ============================================================
DROP TABLE IF EXISTS agendamentos;
CREATE TABLE agendamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    servico_id INT NOT NULL,
    pet_id INT NULL,
    pet_nome VARCHAR(100) NOT NULL,
    pet_especie VARCHAR(50),
    pet_raca VARCHAR(100),
    pet_idade INT,
    data_agendamento DATE NOT NULL,
    hora_agendamento TIME NOT NULL,
    observacoes TEXT,
    status ENUM('pendente', 'confirmado', 'realizado', 'cancelado') DEFAULT 'pendente',
    valor DECIMAL(10,2) NOT NULL,
    funcionario_id INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (servico_id) REFERENCES servicos(id) ON DELETE CASCADE,
    FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE SET NULL,
    FOREIGN KEY (funcionario_id) REFERENCES usuarios(id) ON DELETE SET NULL,
    
    INDEX idx_usuario (usuario_id),
    INDEX idx_data (data_agendamento),
    INDEX idx_status (status),
    INDEX idx_funcionario (funcionario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 6. TABELA: carrinho
-- ============================================================
DROP TABLE IF EXISTS carrinho;
CREATE TABLE carrinho (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    produto_id INT NOT NULL,
    quantidade INT DEFAULT 1,
    data_adicao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE,
    UNIQUE KEY uk_usuario_produto (usuario_id, produto_id),
    INDEX idx_usuario (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 7. TABELA: pedidos
-- ============================================================
DROP TABLE IF EXISTS pedidos;
CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    numero_pedido VARCHAR(20) UNIQUE,
    total_produtos DECIMAL(10,2) NOT NULL,
    total_frete DECIMAL(10,2) DEFAULT 0,
    total_desconto DECIMAL(10,2) DEFAULT 0,
    total DECIMAL(10,2) NOT NULL,
    status ENUM('pendente', 'confirmado', 'processando', 'enviado', 'entregue', 'cancelado') DEFAULT 'pendente',
    metodo_pagamento VARCHAR(50),
    status_pagamento VARCHAR(50),
    endereco_entrega TEXT,
    observacoes TEXT,
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    INDEX idx_usuario (usuario_id),
    INDEX idx_numero_pedido (numero_pedido),
    INDEX idx_status (status),
    INDEX idx_data_pedido (data_pedido)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 8. TABELA: itens_pedido
-- ============================================================
DROP TABLE IF EXISTS itens_pedido;
CREATE TABLE itens_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT NOT NULL,
    produto_id INT NOT NULL,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10,2) NOT NULL,
    preco_total DECIMAL(10,2) NOT NULL,
    desconto_item DECIMAL(10,2) DEFAULT 0,
    
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
    FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE,
    INDEX idx_pedido (pedido_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 9. TABELA: favoritos (lista de desejos)
-- ============================================================
DROP TABLE IF EXISTS favoritos;
CREATE TABLE favoritos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    produto_id INT NOT NULL,
    data_adicao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE,
    UNIQUE KEY uk_usuario_produto (usuario_id, produto_id),
    INDEX idx_usuario (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 10. TABELA: avaliacoes
-- ============================================================
DROP TABLE IF EXISTS avaliacoes;
CREATE TABLE avaliacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    produto_id INT NOT NULL,
    pedido_id INT NOT NULL,
    nota INT NOT NULL CHECK (nota BETWEEN 1 AND 5),
    titulo VARCHAR(200),
    comentario TEXT,
    aprovada BOOLEAN DEFAULT FALSE,
    data_avaliacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
    INDEX idx_produto (produto_id),
    INDEX idx_nota (nota)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 11. TABELA: cupons
-- ============================================================
DROP TABLE IF EXISTS cupons;
CREATE TABLE cupons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(50) UNIQUE NOT NULL,
    descricao VARCHAR(255),
    tipo ENUM('percentual', 'fixo') DEFAULT 'percentual',
    valor DECIMAL(10,2) NOT NULL,
    valor_minimo DECIMAL(10,2) DEFAULT 0,
    quantidade INT DEFAULT 1,
    usados INT DEFAULT 0,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_codigo (codigo),
    INDEX idx_ativo (ativo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 12. TABELA: cupons_usados
-- ============================================================
DROP TABLE IF EXISTS cupons_usados;
CREATE TABLE cupons_usados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cupon_id INT NOT NULL,
    usuario_id INT NOT NULL,
    pedido_id INT NOT NULL,
    data_uso TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (cupon_id) REFERENCES cupons(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
    INDEX idx_cupon (cupon_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 13. TABELA: sessoes (autenticação)
-- ============================================================
DROP TABLE IF EXISTS sessoes;
CREATE TABLE sessoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    token VARCHAR(255) UNIQUE NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultima_atividade TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_expiracao TIMESTAMP NULL,
    
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    INDEX idx_token (token),
    INDEX idx_usuario (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 14. TABELA: avisos (comunicados do sistema)
-- ============================================================
DROP TABLE IF EXISTS avisos;
CREATE TABLE avisos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    conteudo TEXT NOT NULL,
    importancia ENUM('normal', 'importante', 'urgente') DEFAULT 'normal',
    destino ENUM('todos', 'clientes', 'funcionarios', 'admin') DEFAULT 'todos',
    criado_por INT,
    data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (criado_por) REFERENCES usuarios(id) ON DELETE SET NULL,
    INDEX idx_destino (destino),
    INDEX idx_importancia (importancia),
    INDEX idx_data (data)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 15. TABELA: mensagens (chat)
-- ============================================================
DROP TABLE IF EXISTS mensagens;
CREATE TABLE mensagens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    remetente_id INT NOT NULL,
    remetente_tipo VARCHAR(20) NOT NULL,
    destinatario_tipo VARCHAR(20) DEFAULT 'geral',
    destinatario_id INT NULL,
    mensagem TEXT NOT NULL,
    lida BOOLEAN DEFAULT FALSE,
    data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (remetente_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    INDEX idx_remetente (remetente_id),
    INDEX idx_destinatario (destinatario_tipo),
    INDEX idx_data (data),
    INDEX idx_lida (lida)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 16. TABELA: newsletter
-- ============================================================
DROP TABLE IF EXISTS newsletter;
CREATE TABLE newsletter (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    nome VARCHAR(100),
    ativo BOOLEAN DEFAULT TRUE,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 17. TABELA: configuracoes
-- ============================================================
DROP TABLE IF EXISTS configuracoes;
CREATE TABLE configuracoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    chave VARCHAR(100) UNIQUE NOT NULL,
    valor TEXT,
    tipo VARCHAR(50),
    descricao VARCHAR(255),
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_chave (chave)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 18. TABELA: logs_acesso
-- ============================================================
DROP TABLE IF EXISTS logs_acesso;
CREATE TABLE logs_acesso (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NULL,
    ip_address VARCHAR(45),
    endpoint VARCHAR(100),
    metodo VARCHAR(10),
    user_agent TEXT,
    status_code INT,
    tempo_resposta INT,
    data_acesso TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_usuario (usuario_id),
    INDEX idx_data (data_acesso),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TRIGGERS
-- ============================================================

DELIMITER //

-- Trigger para atualizar estoque ao adicionar ao carrinho
DROP TRIGGER IF EXISTS verificar_estoque//
CREATE TRIGGER verificar_estoque
BEFORE INSERT ON carrinho
FOR EACH ROW
BEGIN
    DECLARE estoque_atual INT;
    SELECT estoque INTO estoque_atual FROM produtos WHERE id = NEW.produto_id;
    IF estoque_atual < NEW.quantidade THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Estoque insuficiente';
    END IF;
END//

-- Trigger para calcular total do item do pedido
DROP TRIGGER IF EXISTS calcular_total_item//
CREATE TRIGGER calcular_total_item
BEFORE INSERT ON itens_pedido
FOR EACH ROW
BEGIN
    SET NEW.preco_total = NEW.quantidade * NEW.preco_unitario - NEW.desconto_item;
END//

-- Trigger para atualizar estoque após pedido
DROP TRIGGER IF EXISTS atualizar_estoque_pedido//
CREATE TRIGGER atualizar_estoque_pedido
AFTER INSERT ON itens_pedido
FOR EACH ROW
BEGIN
    UPDATE produtos 
    SET estoque = estoque - NEW.quantidade,
        vendidos = vendidos + NEW.quantidade
    WHERE id = NEW.produto_id;
END//

-- Trigger para gerar número do pedido
DROP TRIGGER IF EXISTS gerar_numero_pedido//
CREATE TRIGGER gerar_numero_pedido
BEFORE INSERT ON pedidos
FOR EACH ROW
BEGIN
    IF NEW.numero_pedido IS NULL THEN
        SET NEW.numero_pedido = CONCAT(
            'PED-',
            DATE_FORMAT(NOW(), '%Y%m%d'),
            '-',
            LPAD(FLOOR(RANDOM() * 10000), 4, '0')
        );
    END IF;
END//

-- Trigger para atualizar avaliação média do produto
DROP TRIGGER IF EXISTS atualizar_avaliacao_media//
CREATE TRIGGER atualizar_avaliacao_media
AFTER INSERT ON avaliacoes
FOR EACH ROW
BEGIN
    DECLARE media DECIMAL(3,2);
    DECLARE total INT;
    
    SELECT AVG(nota), COUNT(*) INTO media, total 
    FROM avaliacoes 
    WHERE produto_id = NEW.produto_id AND aprovada = TRUE;
    
    UPDATE produtos 
    SET avaliacao_media = COALESCE(media, 0),
        total_avaliacoes = total
    WHERE id = NEW.produto_id;
END//

DELIMITER ;

-- ============================================================
-- PROCEDURES
-- ============================================================

DELIMITER //

-- Procedure para relatório de vendas
DROP PROCEDURE IF EXISTS relatorio_vendas//
CREATE PROCEDURE relatorio_vendas(IN data_inicio DATE, IN data_fim DATE)
BEGIN
    SELECT 
        DATE(p.data_pedido) AS data,
        COUNT(DISTINCT p.id) AS total_pedidos,
        SUM(p.total) AS faturamento,
        COUNT(ip.id) AS itens_vendidos,
        AVG(p.total) AS ticket_medio
    FROM pedidos p
    LEFT JOIN itens_pedido ip ON p.id = ip.pedido_id
    WHERE DATE(p.data_pedido) BETWEEN data_inicio AND data_fim
    AND p.status NOT IN ('cancelado')
    GROUP BY DATE(p.data_pedido)
    ORDER BY data DESC;
END//

-- Procedure para relatório de produtos mais vendidos
DROP PROCEDURE IF EXISTS produtos_mais_vendidos//
CREATE PROCEDURE produtos_mais_vendidos(IN limite INT)
BEGIN
    SELECT 
        p.id,
        p.nome,
        SUM(ip.quantidade) AS total_vendido,
        SUM(ip.preco_total) AS receita_total
    FROM produtos p
    JOIN itens_pedido ip ON p.id = ip.produto_id
    JOIN pedidos pd ON ip.pedido_id = pd.id
    WHERE pd.status NOT IN ('cancelado')
    GROUP BY p.id, p.nome
    ORDER BY total_vendido DESC
    LIMIT limite;
END//

-- Procedure para agendamentos do dia
DROP PROCEDURE IF EXISTS agendamentos_do_dia//
CREATE PROCEDURE agendamentos_do_dia(IN data_consulta DATE)
BEGIN
    SELECT 
        a.id,
        u.nome AS cliente_nome,
        a.pet_nome,
        s.nome AS servico_nome,
        a.hora_agendamento,
        a.status,
        f.nome AS funcionario_nome
    FROM agendamentos a
    JOIN usuarios u ON a.usuario_id = u.id
    JOIN servicos s ON a.servico_id = s.id
    LEFT JOIN usuarios f ON a.funcionario_id = f.id
    WHERE a.data_agendamento = data_consulta
    ORDER BY a.hora_agendamento;
END//

DELIMITER ;

-- ============================================================
-- EVENTOS PROGRAMADOS
-- ============================================================

SET GLOBAL event_scheduler = ON;

-- Limpar logs antigos (a cada 30 dias)
DROP EVENT IF EXISTS limpar_logs_antigos;
DELIMITER //
CREATE EVENT limpar_logs_antigos
ON SCHEDULE EVERY 1 MONTH
DO
BEGIN
    DELETE FROM logs_acesso WHERE data_acesso < DATE_SUB(NOW(), INTERVAL 90 DAY);
    DELETE FROM sessoes WHERE ultima_atividade < DATE_SUB(NOW(), INTERVAL 7 DAY);
END//

-- Limpar carrinhos abandonados (diariamente)
DROP EVENT IF EXISTS limpar_carrinhos_abandonados;
CREATE EVENT limpar_carrinhos_abandonados
ON SCHEDULE EVERY 1 DAY
DO
BEGIN
    DELETE FROM carrinho 
    WHERE data_adicao < DATE_SUB(NOW(), INTERVAL 7 DAY);
END//

DELIMITER ;

-- ============================================================
-- DADOS INICIAIS
-- ============================================================

-- Usuários padrão
INSERT INTO usuarios (tipo, nome, email, senha, cid, tipo_pet, email_verificado, ativo) VALUES
('admin', 'Administrador', 'admin@amigopet.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'F90', 'cachorro', TRUE, TRUE),
('funcionario', 'Carlos Silva', 'funcionario@amigopet.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '', 'cachorro', TRUE, TRUE),
('cliente', 'Ana Oliveira', 'cliente@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'F84', 'gato', TRUE, TRUE);

-- Serviços padrão (Banho & Tosa)
INSERT INTO servicos (nome, descricao, preco, duracao, ordem) VALUES
('Banho', 'Limpeza completa com produtos especiais hipoalergênicos', 49.90, 30, 1),
('Tosa', 'Tosa higiênica ou estilizada conforme sua preferência', 59.90, 45, 2),
('Banho + Tosa', 'Pacote completo com desconto especial', 89.90, 60, 3),
('Pacote Luxo', 'Banho, tosa, hidratação profunda e escovação', 149.90, 90, 4);

-- Produtos padrão
INSERT INTO produtos (nome, descricao, preco, imagem_url, tags, categoria, tipo_pet, estoque, destaque) VALUES
('Ração Premium para Cães', 'Ração super premium com nutrientes balanceados', 129.90, 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=400', 'cachorro,racao', 'Alimentação', 'cachorro', 50, TRUE),
('Brinquedo Mordedor', 'Brinquedo de borracha natural resistente', 29.90, 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400', 'cachorro,brinquedo', 'Brinquedos', 'cachorro', 100, FALSE),
('Cama Redonda Felpuda', 'Cama macia e confortável para seu pet', 89.90, 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=400', 'cachorro,gato,cama', 'Conforto', 'todos', 30, TRUE),
('Arranhador para Gatos', 'Arranhador de sisal com plataforma', 79.90, 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=400', 'gato,brinquedo', 'Brinquedos', 'gato', 25, FALSE),
('Ração para Gatos', 'Ração completa com sabor de salmão', 99.90, 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=400', 'gato,racao', 'Alimentação', 'gato', 40, TRUE),
('Gaiola para Pássaros', 'Gaiola espaçosa com poleiros', 189.90, 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400', 'passaro,acessorio', 'Acessórios', 'passaro', 10, FALSE),
('Aquário 20 Litros', 'Aquário completo com filtro e iluminação LED', 249.90, 'https://images.unsplash.com/photo-1535594428893-47441e1f96e0?w=400', 'peixe,aquario', 'Acessórios', 'peixe', 8, TRUE),
('Shampoo Antipulgas', 'Shampoo veterinário hipoalergênico', 39.90, 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400', 'cachorro,gato,higiene', 'Higiene', 'todos', 60, FALSE);

-- Avisos iniciais
INSERT INTO avisos (titulo, conteudo, importancia, destino, criado_por) VALUES
('🐾 Bem-vindos ao Amigo Pet Shop!', 'Estamos muito felizes em ter vocês aqui. Conheçam nossos produtos e serviços exclusivos para seu pet!', 'importante', 'todos', 1),
('✂️ Novos horários de funcionamento', 'Agora estamos abertos de segunda a sábado, das 8h às 19h. Agende já o banho e tosa do seu pet!', 'normal', 'todos', 1),
('🎉 Promoção de verão', '20% de desconto em todos os serviços de banho e tosa durante o mês de janeiro!', 'urgente', 'clientes', 1);

-- Configurações padrão
INSERT INTO configuracoes (chave, valor, tipo, descricao) VALUES
('site_nome', 'Amigo Pet Shop', 'texto', 'Nome do site'),
('site_descricao', 'O melhor pet shop para seu amigo!', 'texto', 'Descrição do site'),
('email_contato', 'contato@amigopet.com', 'email', 'Email de contato'),
('frete_gratis_minimo', '150', 'numero', 'Valor mínimo para frete grátis'),
('taxa_frete_padrao', '12.90', 'numero', 'Taxa de frete padrão'),
('horario_funcionamento', 'Segunda a Sábado: 8h às 19h', 'texto', 'Horário de funcionamento'),
('telefone_contato', '(11) 99999-9999', 'texto', 'Telefone para contato'),
('whatsapp', '5511999999999', 'texto', 'Número do WhatsApp');

-- Cupons promocionais
INSERT INTO cupons (codigo, descricao, tipo, valor, valor_minimo, quantidade, data_inicio, data_fim) VALUES
('PET10', '10% de desconto na primeira compra', 'percentual', 10.00, 50.00, 1000, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 365 DAY)),
('FRETEGRATIS', 'Frete grátis em compras acima de R$150', 'fixo', 0, 150.00, 500, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 180 DAY)),
('AMIGOPET', 'Desconto especial para clientes fiéis', 'percentual', 15.00, 100.00, 200, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 90 DAY));

-- Mensagem inicial do chat
INSERT INTO mensagens (remetente_id, remetente_tipo, destinatario_tipo, mensagem) VALUES
(1, 'admin', 'geral', '🐾 Bem-vindo ao Amigo Pet Shop! Estamos aqui para ajudar você e seu pet. Qualquer dúvida, é só chamar!');

-- ============================================================
-- VIEWS
-- ============================================================

-- View de produtos com avaliação
DROP VIEW IF EXISTS vw_produtos_completos;
CREATE VIEW vw_produtos_completos AS
SELECT 
    p.*,
    COALESCE(AVG(a.nota), 0) AS avaliacao_media_calc,
    COUNT(a.id) AS total_avaliacoes_calc
FROM produtos p
LEFT JOIN avaliacoes a ON p.id = a.produto_id AND a.aprovada = TRUE
GROUP BY p.id;

-- View de agendamentos do dia
DROP VIEW IF EXISTS vw_agendamentos_hoje;
CREATE VIEW vw_agendamentos_hoje AS
SELECT 
    a.id,
    u.nome AS cliente_nome,
    a.pet_nome,
    s.nome AS servico_nome,
    a.hora_agendamento,
    a.status,
    f.nome AS funcionario_nome
FROM agendamentos a
JOIN usuarios u ON a.usuario_id = u.id
JOIN servicos s ON a.servico_id = s.id
LEFT JOIN usuarios f ON a.funcionario_id = f.id
WHERE a.data_agendamento = CURDATE()
ORDER BY a.hora_agendamento;

-- View de estatísticas do dashboard
DROP VIEW IF EXISTS vw_dashboard_stats;
CREATE VIEW vw_dashboard_stats AS
SELECT 
    (SELECT COUNT(*) FROM usuarios WHERE tipo = 'cliente') AS total_clientes,
    (SELECT COUNT(*) FROM usuarios WHERE tipo = 'funcionario') AS total_funcionarios,
    (SELECT COUNT(*) FROM produtos WHERE ativo = TRUE) AS total_produtos,
    (SELECT COUNT(*) FROM servicos WHERE ativo = TRUE) AS total_servicos,
    (SELECT COUNT(*) FROM pedidos WHERE status NOT IN ('cancelado')) AS total_pedidos,
    (SELECT COUNT(*) FROM agendamentos WHERE status = 'pendente') AS agendamentos_pendentes,
    (SELECT COUNT(*) FROM avisos) AS total_avisos,
    (SELECT COALESCE(SUM(total), 0) FROM pedidos WHERE status = 'entregue') AS faturamento_total;

-- ============================================================
-- ÍNDICES ADICIONAIS PARA PERFORMANCE
-- ============================================================

CREATE INDEX idx_composite_produtos ON produtos(categoria, tipo_pet, ativo, preco);
CREATE INDEX idx_composite_pedidos ON pedidos(usuario_id, status, data_pedido);
CREATE INDEX idx_composite_agendamentos ON agendamentos(usuario_id, status, data_agendamento);
CREATE INDEX idx_composite_carrinho ON carrinho(usuario_id, data_adicao);

-- ============================================================
-- VERIFICAÇÃO FINAL
-- ============================================================

SELECT '✅ Banco de dados AMIGO PET criado com sucesso!' AS Mensagem;
SELECT COUNT(*) AS Total_Usuarios FROM usuarios;
SELECT COUNT(*) AS Total_Produtos FROM produtos;
SELECT COUNT(*) AS Total_Servicos FROM servicos;
SELECT COUNT(*) AS Total_Agendamentos FROM agendamentos;
SELECT COUNT(*) AS Total_Pedidos FROM pedidos;

-- ============================================================
-- FIM DO SCRIPT
-- ============================================================