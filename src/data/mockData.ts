export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  sellerId: string;
  sellerName: string;
  stock: number;
  rating: number;
  reviewCount: number;
  featured?: boolean;
  trending?: boolean;
}

export interface Store {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  rating: number;
  productCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pendente' | 'confirmado' | 'enviado' | 'entregue';
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'business';
  avatar: string;
  storeName?: string;
}

export const categories = [
  { id: 'alimentos', name: 'Alimentos', icon: '🍞' },
  { id: 'artesanato', name: 'Artesanato', icon: '🎨' },
  { id: 'moda', name: 'Moda', icon: '👗' },
  { id: 'beleza', name: 'Beleza & Saúde', icon: '💆' },
  { id: 'casa', name: 'Casa & Decoração', icon: '🏠' },
  { id: 'tecnologia', name: 'Tecnologia', icon: '📱' },
  { id: 'esportes', name: 'Esportes', icon: '⚽' },
  { id: 'livros', name: 'Livros & Papelaria', icon: '📚' },
];

export const stores: Store[] = [
  { id: 's1', name: 'Empório do Mar', description: 'Frutos do mar frescos e delícias da costa catarinense', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&fit=crop', category: 'alimentos', rating: 4.8, productCount: 24 },
  { id: 's2', name: 'Ateliê Açoriano', description: 'Artesanato inspirado na tradição açoriana de Itajaí', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=300&fit=crop', category: 'artesanato', rating: 4.9, productCount: 18 },
  { id: 's3', name: 'Moda Praia Itajaí', description: 'Roupas e acessórios para o estilo praiano', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop', category: 'moda', rating: 4.6, productCount: 32 },
  { id: 's4', name: 'Naturalle Cosméticos', description: 'Cosméticos naturais feitos com ingredientes locais', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=300&fit=crop', category: 'beleza', rating: 4.7, productCount: 15 },
  { id: 's5', name: 'Casa & Aconchego', description: 'Decoração artesanal para transformar seu lar', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop', category: 'casa', rating: 4.5, productCount: 20 },
  { id: 's6', name: 'TechPort', description: 'Acessórios e gadgets do Porto de Itajaí ao mundo digital', image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop', category: 'tecnologia', rating: 4.4, productCount: 28 },
];

export const products: Product[] = [
  // Alimentos
  { id: 'p1', name: 'Cesta de Frutos do Mar Frescos', description: 'Seleção premium de camarões, lulas e peixes frescos pescados na costa de Itajaí. Ideal para um jantar especial com a família.', price: 89.90, originalPrice: 119.90, images: ['https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=600&h=600&fit=crop'], category: 'alimentos', sellerId: 's1', sellerName: 'Empório do Mar', stock: 15, rating: 4.9, reviewCount: 47, featured: true, trending: true },
  { id: 'p2', name: 'Geleia Artesanal de Goiaba', description: 'Geleia feita com goiabas orgânicas cultivadas no Vale do Itajaí. Sem conservantes, 100% natural.', price: 24.50, images: ['https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&h=600&fit=crop'], category: 'alimentos', sellerId: 's1', sellerName: 'Empório do Mar', stock: 30, rating: 4.7, reviewCount: 23 },
  { id: 'p3', name: 'Kit Temperos da Costa', description: 'Conjunto de 5 temperos especiais para pratos com frutos do mar. Receitas tradicionais de Itajaí.', price: 45.00, images: ['https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=600&fit=crop'], category: 'alimentos', sellerId: 's1', sellerName: 'Empório do Mar', stock: 22, rating: 4.6, reviewCount: 15 },

  // Artesanato
  { id: 'p4', name: 'Cerâmica Açoriana Decorativa', description: 'Peça única de cerâmica pintada à mão com motivos açorianos tradicionais. Cada peça conta uma história da colonização.', price: 156.00, originalPrice: 189.00, images: ['https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=600&fit=crop'], category: 'artesanato', sellerId: 's2', sellerName: 'Ateliê Açoriano', stock: 8, rating: 4.9, reviewCount: 31, featured: true },
  { id: 'p5', name: 'Quadro Bordado do Porto', description: 'Bordado artesanal retratando o porto de Itajaí. Moldura em madeira de reflorestamento.', price: 220.00, images: ['https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?w=600&h=600&fit=crop'], category: 'artesanato', sellerId: 's2', sellerName: 'Ateliê Açoriano', stock: 5, rating: 5.0, reviewCount: 12, trending: true },
  { id: 'p6', name: 'Colar de Conchas Naturais', description: 'Colar feito com conchas coletadas nas praias de Itajaí. Design exclusivo e sustentável.', price: 68.00, images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop'], category: 'artesanato', sellerId: 's2', sellerName: 'Ateliê Açoriano', stock: 12, rating: 4.8, reviewCount: 19 },

  // Moda
  { id: 'p7', name: 'Camisa Linho Navegantes', description: 'Camisa de linho puro com corte casual perfeita para o clima do litoral. Disponível em azul e branco.', price: 189.00, originalPrice: 239.00, images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=600&fit=crop'], category: 'moda', sellerId: 's3', sellerName: 'Moda Praia Itajaí', stock: 20, rating: 4.5, reviewCount: 28, featured: true },
  { id: 'p8', name: 'Bolsa de Praia Artesanal', description: 'Bolsa de palha trançada à mão com detalhes em couro. Grande o suficiente para o dia todo na praia.', price: 135.00, images: ['https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=600&fit=crop'], category: 'moda', sellerId: 's3', sellerName: 'Moda Praia Itajaí', stock: 14, rating: 4.7, reviewCount: 34, trending: true },
  { id: 'p9', name: 'Sandália Couro Rústica', description: 'Sandália artesanal em couro legítimo. Conforto e estilo para passeios pela orla.', price: 159.90, images: ['https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&h=600&fit=crop'], category: 'moda', sellerId: 's3', sellerName: 'Moda Praia Itajaí', stock: 10, rating: 4.4, reviewCount: 16 },

  // Beleza
  { id: 'p10', name: 'Sabonete Artesanal de Algas', description: 'Sabonete natural feito com algas marinhas coletadas na costa catarinense. Hidratação profunda e aroma do mar.', price: 32.00, images: ['https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=600&h=600&fit=crop'], category: 'beleza', sellerId: 's4', sellerName: 'Naturalle Cosméticos', stock: 40, rating: 4.8, reviewCount: 52, trending: true },
  { id: 'p11', name: 'Óleo Corporal Maracujá', description: 'Óleo hidratante 100% natural de maracujá orgânico. Absorção rápida e pele sedosa.', price: 58.00, originalPrice: 72.00, images: ['https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=600&fit=crop'], category: 'beleza', sellerId: 's4', sellerName: 'Naturalle Cosméticos', stock: 25, rating: 4.6, reviewCount: 20 },

  // Casa
  { id: 'p12', name: 'Luminária de Bambu', description: 'Luminária artesanal de bambu trançado. Luz quente e acolhedora para ambientes internos.', price: 198.00, images: ['https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&h=600&fit=crop'], category: 'casa', sellerId: 's5', sellerName: 'Casa & Aconchego', stock: 7, rating: 4.7, reviewCount: 14, featured: true },
  { id: 'p13', name: 'Jogo Americano Macramê', description: 'Kit com 4 jogos americanos em macramê feito à mão. Elegância natural para sua mesa.', price: 86.00, images: ['https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=600&h=600&fit=crop'], category: 'casa', sellerId: 's5', sellerName: 'Casa & Aconchego', stock: 18, rating: 4.5, reviewCount: 9 },

  // Tecnologia
  { id: 'p14', name: 'Caixa de Som Bluetooth Portátil', description: 'Caixa de som resistente à água, perfeita para dias na praia. 12h de bateria.', price: 249.90, originalPrice: 329.90, images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop'], category: 'tecnologia', sellerId: 's6', sellerName: 'TechPort', stock: 35, rating: 4.3, reviewCount: 67, trending: true },
  { id: 'p15', name: 'Capinha Artesanal para Celular', description: 'Capinha de madeira com gravação a laser de paisagens de Itajaí. Proteção com estilo local.', price: 79.90, images: ['https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&h=600&fit=crop'], category: 'tecnologia', sellerId: 's6', sellerName: 'TechPort', stock: 50, rating: 4.6, reviewCount: 38 },
  { id: 'p16', name: 'Carregador Solar Portátil', description: 'Carregador solar dobrável com 2 portas USB. Ideal para aventuras ao ar livre no litoral.', price: 189.00, images: ['https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&h=600&fit=crop'], category: 'tecnologia', sellerId: 's6', sellerName: 'TechPort', stock: 20, rating: 4.4, reviewCount: 22 },
];

export const mockUsers: User[] = [
  { id: 'u1', name: 'Marina Costa', email: 'marina@email.com', role: 'customer', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
  { id: 'u2', name: 'Carlos Silva', email: 'carlos@emporioomar.com', role: 'business', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', storeName: 'Empório do Mar' },
];

export const mockOrders: Order[] = [
  { id: 'PED-001', items: [{ product: products[0], quantity: 1 }, { product: products[2], quantity: 2 }], total: 179.90, status: 'entregue', date: '2026-02-05' },
  { id: 'PED-002', items: [{ product: products[6], quantity: 1 }], total: 189.00, status: 'enviado', date: '2026-02-09' },
  { id: 'PED-003', items: [{ product: products[9], quantity: 3 }, { product: products[10], quantity: 1 }], total: 154.00, status: 'confirmado', date: '2026-02-11' },
];

export const analyticsData = {
  totalSales: 12450.00,
  totalOrders: 87,
  totalProducts: 24,
  avgRating: 4.7,
  monthlySales: [
    { month: 'Set', vendas: 4200, pedidos: 28 },
    { month: 'Out', vendas: 5800, pedidos: 35 },
    { month: 'Nov', vendas: 7200, pedidos: 42 },
    { month: 'Dez', vendas: 9800, pedidos: 58 },
    { month: 'Jan', vendas: 11200, pedidos: 72 },
    { month: 'Fev', vendas: 12450, pedidos: 87 },
  ],
  topProducts: [
    { name: 'Cesta de Frutos do Mar', vendas: 47, receita: 4225.30 },
    { name: 'Sabonete de Algas', vendas: 52, receita: 1664.00 },
    { name: 'Caixa de Som Bluetooth', vendas: 67, receita: 16743.30 },
    { name: 'Camisa Linho Navegantes', vendas: 28, receita: 5292.00 },
    { name: 'Cerâmica Açoriana', vendas: 31, receita: 4836.00 },
  ],
};
