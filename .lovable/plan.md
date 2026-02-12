

# 🛒 Openshop — Marketplace Digital Local

O Openshop é um marketplace digital para pequenos negócios de Itajaí, SC, com toda a UI completa, dados mockados, e pagamentos simulados. Backend será adicionado futuramente.

---

## 🎨 Identidade Visual

- **Paleta de cores**: Inspirada em Itajaí — azul marítimo profundo como cor dominante, vermelho vivo como acento, amarelo quente para destaques, fundo predominantemente branco
- **Tipografia**: Fontes distintivas e elegantes (ex: Playfair Display para títulos, Nunito para corpo) — nada genérico
- **Atmosfera**: Backgrounds com gradientes sutis inspirados no litoral catarinense, padrões geométricos leves, micro-animações em momentos-chave (carregamento de página com reveals escalonados, hover em cards de produtos)

---

## 📄 Telas & Funcionalidades

### 1. Header Global
- Header semi-transparente animado que fica sólido ao rolar. Textos coloridos mesmo antes do scroll.
- Logo à esquerda, navegação central (Início, Sobre Nós, Loja, Análises*, Gerenciar Produtos*)
- Barra de busca, ícone do carrinho e avatar do usuário à direita
- *Itens marcados visíveis apenas para donos de negócios
- Todo texto em pt-BR

### 2. Footer Global
- Links de navegação, botão do Instagram
- Seção de políticas: Política de Privacidade e Termos de Serviço
- Layout limpo estilo marketplace

### 3. Tela Inicial (Home)
- Hero impactante com barra de busca central e proposta de valor focada no comércio local de Itajaí
- Categorias de produtos em destaque com ícones visuais
- Seção de negócios locais em destaque
- Produtos em alta / mais vendidos em layout de cards
- Animações de entrada escalonadas para criar impacto visual

### 4. Página da Loja (Catálogo)
- Grid de produtos com cards visuais (imagem, nome, preço, vendedor)
- Filtros por categoria, faixa de preço e vendedor (sidebar ou barra superior)
- Ordenação (preço, popularidade)
- Paginação
- Dados mockados de produtos variados

### 5. Página de Detalhes do Produto
- Galeria de imagens do produto
- Descrição completa, preço, informações do vendedor
- Botão "Adicionar ao Carrinho"
- Botão de favoritar/salvar produto
- Produtos relacionados

### 6. Carrinho de Compras
- Lista de itens com quantidades editáveis
- Resumo do pedido com subtotal
- Botão de checkout (fluxo simulado)

### 7. Checkout Simulado
- Formulário de endereço de entrega
- Seleção de método de pagamento (visual, sem processamento real)
- Resumo final e confirmação do pedido

### 8. Login & Cadastro
- Formulários de login e registro com design confiável
- Checkbox obrigatório de aceite dos Termos de Serviço e Política de Privacidade
- Alternância clara entre login e cadastro
- Simulação de autenticação com dados mockados (perfis de cliente e dono de negócio para teste)

### 9. Página de Perfil
- Informações pessoais editáveis
- Histórico de pedidos (clientes)
- Gerenciamento do perfil da loja (donos de negócio)
- Produtos favoritos/salvos

### 10. Dashboard de Análises (Dono de Negócio)
- Cards de métricas: vendas, receita, produtos mais engajados
- Gráficos de desempenho de vendas (usando Recharts)
- Estética moderna de SaaS
- Dados mockados para demonstração

### 11. Gerenciamento de Produtos (Dono de Negócio)
- Tabela de produtos com ações (editar, excluir)
- Status de inventário
- Formulário para criar/editar produtos com upload de imagens
- Tudo em pt-BR

### 12. Sobre Nós
- Página institucional sobre a plataforma e sua missão de apoiar o comércio local de Itajaí
- Design visual alinhado com o restante da plataforma

### 13. Páginas de Políticas
- Política de Privacidade
- Termos de Serviço
- Conteúdo placeholder em pt-BR

---

## 🔄 Navegação & Estado

- Simulação de roles: botão/toggle para alternar entre perfil "Cliente" e "Dono de Negócio" para demonstrar os diferentes acessos
- Carrinho persistente via estado local (React state/context)
- Busca global funcional filtrando dados mockados
- Roteamento completo com React Router

---

## ⚡ Interações & Animações

- Page load com reveals escalonados (staggered fade-in)
- Hover effects nos cards de produtos (scale + shadow)
- Transição suave do header (transparente → sólido)
- Micro-animações em botões e ícones do carrinho
- Transições de página suaves
