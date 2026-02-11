import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, Banknote, QrCode, CheckCircle2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<'address' | 'payment' | 'done'>('address');
  const [paymentMethod, setPaymentMethod] = useState('pix');

  if (items.length === 0 && step !== 'done') {
    return (
      <Layout>
        <div className="pt-32 pb-16 container mx-auto px-4 text-center">
          <p className="text-muted-foreground">Nenhum item no carrinho</p>
          <Button asChild className="mt-4"><Link to="/loja">Ir para a Loja</Link></Button>
        </div>
      </Layout>
    );
  }

  if (step === 'done') {
    return (
      <Layout>
        <div className="pt-32 pb-16 container mx-auto px-4 text-center max-w-md mx-auto">
          <CheckCircle2 className="w-20 h-20 mx-auto text-green-500 mb-4" />
          <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Pedido Confirmado!</h1>
          <p className="text-muted-foreground mb-6">Obrigado pela sua compra. Você receberá uma confirmação em breve.</p>
          <p className="text-sm text-muted-foreground mb-8">Pedido #PED-{String(Date.now()).slice(-6)}</p>
          <Button asChild><Link to="/">Voltar ao Início</Link></Button>
        </div>
      </Layout>
    );
  }

  const paymentMethods = [
    { id: 'pix', label: 'PIX', icon: QrCode },
    { id: 'cartao', label: 'Cartão de Crédito', icon: CreditCard },
    { id: 'boleto', label: 'Boleto Bancário', icon: Banknote },
  ];

  return (
    <Layout>
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-8">Checkout</h1>

          {/* Steps */}
          <div className="flex items-center gap-4 mb-10">
            <div className={`flex items-center gap-2 text-sm font-medium ${step === 'address' ? 'text-primary' : 'text-muted-foreground'}`}>
              <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">1</span> Endereço
            </div>
            <div className="flex-1 h-px bg-border" />
            <div className={`flex items-center gap-2 text-sm font-medium ${step === 'payment' ? 'text-primary' : 'text-muted-foreground'}`}>
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${step === 'payment' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>2</span> Pagamento
            </div>
          </div>

          {step === 'address' && (
            <div className="bg-card rounded-xl border border-border p-6 space-y-4">
              <h2 className="font-heading text-xl font-semibold">Endereço de Entrega</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Label>Nome completo</Label><Input placeholder="Seu nome" className="mt-1" /></div>
                <div><Label>Telefone</Label><Input placeholder="(47) 99999-9999" className="mt-1" /></div>
                <div className="md:col-span-2"><Label>Endereço</Label><Input placeholder="Rua, número, complemento" className="mt-1" /></div>
                <div><Label>Bairro</Label><Input placeholder="Bairro" className="mt-1" /></div>
                <div><Label>CEP</Label><Input placeholder="88300-000" className="mt-1" /></div>
                <div><Label>Cidade</Label><Input value="Itajaí" readOnly className="mt-1 bg-muted" /></div>
                <div><Label>Estado</Label><Input value="SC" readOnly className="mt-1 bg-muted" /></div>
              </div>
              <Button onClick={() => setStep('payment')} className="w-full mt-4 h-11">Continuar para Pagamento</Button>
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-6">
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="font-heading text-xl font-semibold mb-4">Método de Pagamento</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {paymentMethods.map(pm => (
                    <button
                      key={pm.id}
                      onClick={() => setPaymentMethod(pm.id)}
                      className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-colors ${
                        paymentMethod === pm.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40'
                      }`}
                    >
                      <pm.icon className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium">{pm.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="font-heading text-xl font-semibold mb-4">Resumo</h2>
                <div className="space-y-2">
                  {items.map(item => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span>{item.product.name} × {item.quantity}</span>
                      <span>R$ {(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t border-border pt-3 mt-3 flex justify-between text-lg font-bold">
                    <span>Total</span><span>R$ {totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                <Button onClick={() => { clearCart(); setStep('done'); }} className="w-full mt-6 h-11 bg-accent hover:bg-accent/90 text-accent-foreground">
                  Confirmar Pedido
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
