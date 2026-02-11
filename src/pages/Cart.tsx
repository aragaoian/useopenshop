import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

export default function Cart() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="pt-32 pb-16 container mx-auto px-4 text-center">
          <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground/40 mb-4" />
          <h1 className="font-heading text-2xl font-bold text-foreground mb-2">Seu carrinho está vazio</h1>
          <p className="text-muted-foreground mb-6">Adicione produtos para começar suas compras</p>
          <Button asChild><Link to="/loja">Explorar Loja</Link></Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Link to="/loja" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" /> Continuar comprando
          </Link>
          <h1 className="font-heading text-3xl font-bold text-foreground mb-8">Carrinho ({totalItems} itens)</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map(item => (
                <div key={item.product.id} className="flex gap-4 bg-card rounded-xl border border-border p-4">
                  <Link to={`/produto/${item.product.id}`} className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/produto/${item.product.id}`} className="font-heading text-base font-semibold text-foreground hover:text-primary line-clamp-1">{item.product.name}</Link>
                    <p className="text-xs text-muted-foreground">{item.product.sellerName}</p>
                    <p className="text-lg font-bold text-foreground mt-1">R$ {item.product.price.toFixed(2)}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-border rounded-md">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1.5 hover:bg-muted"><Minus className="w-3.5 h-3.5" /></button>
                        <span className="px-3 text-sm font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1.5 hover:bg-muted"><Plus className="w-3.5 h-3.5" /></button>
                      </div>
                      <button onClick={() => removeItem(item.product.id)} className="text-muted-foreground hover:text-accent transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-card rounded-xl border border-border p-6 h-fit lg:sticky lg:top-24">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4">Resumo do Pedido</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>R$ {totalPrice.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Frete</span><span className="text-green-600">Grátis</span></div>
              </div>
              <div className="border-t border-border mt-4 pt-4 flex justify-between text-lg font-bold">
                <span>Total</span><span>R$ {totalPrice.toFixed(2)}</span>
              </div>
              <Button asChild className="w-full mt-6 h-11">
                <Link to="/checkout">Finalizar Compra</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
