import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { mockOrders, products } from '@/data/mockData';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

export default function Profile() {
  const { user, favorites, logout } = useAuth();

  if (!user) {
    return (
      <Layout>
        <div className="pt-32 pb-16 container mx-auto px-4 text-center">
          <p className="text-muted-foreground mb-4">Você precisa estar logado</p>
          <Button asChild><Link to="/login">Entrar</Link></Button>
        </div>
      </Layout>
    );
  }

  const favProducts = products.filter(p => favorites.includes(p.id));

  const statusColors: Record<string, string> = {
    pendente: 'bg-yellow-100 text-yellow-800',
    confirmado: 'bg-blue-100 text-blue-800',
    enviado: 'bg-purple-100 text-purple-800',
    entregue: 'bg-green-100 text-green-800',
  };

  return (
    <Layout>
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Profile header */}
          <div className="flex items-center gap-4 mb-8">
            <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full object-cover ring-4 ring-primary/20" />
            <div>
              <h1 className="font-heading text-2xl font-bold text-foreground">{user.name}</h1>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <Badge variant="secondary" className="mt-1">{user.role === 'business' ? '🏪 Vendedor' : '👤 Cliente'}</Badge>
            </div>
          </div>

          <Tabs defaultValue="info">
            <TabsList className="mb-6">
              <TabsTrigger value="info">Informações</TabsTrigger>
              <TabsTrigger value="orders">Pedidos</TabsTrigger>
              <TabsTrigger value="favorites">Favoritos</TabsTrigger>
              {user.role === 'business' && <TabsTrigger value="store">Minha Loja</TabsTrigger>}
            </TabsList>

            <TabsContent value="info">
              <div className="bg-card rounded-xl border border-border p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><Label>Nome</Label><Input defaultValue={user.name} className="mt-1" /></div>
                  <div><Label>E-mail</Label><Input defaultValue={user.email} className="mt-1" /></div>
                  <div><Label>Telefone</Label><Input placeholder="(47) 99999-9999" className="mt-1" /></div>
                  <div><Label>Cidade</Label><Input defaultValue="Itajaí - SC" className="mt-1" /></div>
                </div>
                <div className="flex gap-3 pt-2">
                  <Button>Salvar Alterações</Button>
                  <Button variant="outline" onClick={logout}>Sair</Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="orders">
              <div className="space-y-4">
                {mockOrders.map(order => (
                  <div key={order.id} className="bg-card rounded-xl border border-border p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="font-heading font-semibold text-foreground">{order.id}</span>
                        <span className="text-sm text-muted-foreground ml-3">{order.date}</span>
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[order.status]}`}>{order.status}</span>
                    </div>
                    <div className="space-y-1">
                      {order.items.map(item => (
                        <p key={item.product.id} className="text-sm text-muted-foreground">{item.product.name} × {item.quantity}</p>
                      ))}
                    </div>
                    <p className="text-right font-bold mt-3">R$ {order.total.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="favorites">
              {favProducts.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Heart className="w-12 h-12 mx-auto mb-3 text-muted-foreground/40" />
                  <p>Nenhum favorito ainda</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                  {favProducts.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
              )}
            </TabsContent>

            {user.role === 'business' && (
              <TabsContent value="store">
                <div className="bg-card rounded-xl border border-border p-6 space-y-4">
                  <div><Label>Nome da Loja</Label><Input defaultValue={user.storeName} className="mt-1" /></div>
                  <div><Label>Descrição</Label><Input placeholder="Descreva sua loja..." className="mt-1" /></div>
                  <Button>Salvar</Button>
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
