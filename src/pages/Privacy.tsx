import Layout from '@/components/layout/Layout';

export default function Privacy() {
  return (
    <Layout>
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-8">Política de Privacidade</h1>
          <div className="prose prose-sm max-w-none text-foreground/80 space-y-6">
            <p><strong>Última atualização:</strong> 11 de fevereiro de 2026</p>
            <h2 className="font-heading text-xl font-semibold text-foreground">1. Informações que Coletamos</h2>
            <p>Coletamos informações pessoais que você fornece diretamente, como nome, endereço de e-mail, endereço de entrega e informações de pagamento ao criar uma conta ou realizar uma compra.</p>
            <h2 className="font-heading text-xl font-semibold text-foreground">2. Como Usamos suas Informações</h2>
            <p>Utilizamos suas informações para processar pedidos, personalizar sua experiência, enviar comunicações sobre seus pedidos e melhorar nossos serviços.</p>
            <h2 className="font-heading text-xl font-semibold text-foreground">3. Compartilhamento de Dados</h2>
            <p>Não vendemos suas informações pessoais. Compartilhamos dados apenas com vendedores para processamento de pedidos e com prestadores de serviços essenciais.</p>
            <h2 className="font-heading text-xl font-semibold text-foreground">4. Segurança</h2>
            <p>Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações pessoais contra acesso não autorizado.</p>
            <h2 className="font-heading text-xl font-semibold text-foreground">5. Seus Direitos</h2>
            <p>Conforme a LGPD, você tem direito a acessar, corrigir, excluir e portar seus dados pessoais. Entre em contato conosco para exercer esses direitos.</p>
            <h2 className="font-heading text-xl font-semibold text-foreground">6. Contato</h2>
            <p>Para questões sobre esta política, entre em contato: <strong>privacidade@mercadoitajai.com.br</strong></p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
