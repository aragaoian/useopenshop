import Layout from '@/components/layout/Layout';

export default function Terms() {
  return (
    <Layout>
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-8">Termos de Serviço</h1>
          <div className="prose prose-sm max-w-none text-foreground/80 space-y-6">
            <p><strong>Última atualização:</strong> 11 de fevereiro de 2026</p>
            <h2 className="font-heading text-xl font-semibold text-foreground">1. Aceitação dos Termos</h2>
            <p>Ao utilizar o Mercado Itajaí, você concorda com estes Termos de Serviço. Se não concordar, por favor não utilize a plataforma.</p>
            <h2 className="font-heading text-xl font-semibold text-foreground">2. Cadastro</h2>
            <p>Você é responsável por manter a confidencialidade de sua conta e senha. Todas as atividades realizadas em sua conta são de sua responsabilidade.</p>
            <h2 className="font-heading text-xl font-semibold text-foreground">3. Compras e Pagamentos</h2>
            <p>Todos os preços são exibidos em Reais (R$). O Mercado Itajaí atua como intermediário entre compradores e vendedores. A responsabilidade pelo produto é do vendedor.</p>
            <h2 className="font-heading text-xl font-semibold text-foreground">4. Política de Devolução</h2>
            <p>O consumidor tem direito ao arrependimento em até 7 dias após o recebimento do produto, conforme o Código de Defesa do Consumidor.</p>
            <h2 className="font-heading text-xl font-semibold text-foreground">5. Vendedores</h2>
            <p>Os vendedores são responsáveis pela qualidade, veracidade das informações e entrega dos produtos anunciados na plataforma.</p>
            <h2 className="font-heading text-xl font-semibold text-foreground">6. Limitação de Responsabilidade</h2>
            <p>O Mercado Itajaí não se responsabiliza por disputas entre compradores e vendedores, mas oferece suporte para mediação.</p>
            <h2 className="font-heading text-xl font-semibold text-foreground">7. Contato</h2>
            <p>Para questões sobre estes termos: <strong>contato@mercadoitajai.com.br</strong></p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
