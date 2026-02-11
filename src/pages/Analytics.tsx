import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, Package, Star } from 'lucide-react';
import { analyticsData } from '@/data/mockData';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Analytics() {
  const metrics = [
    { label: 'Receita Total', value: `R$ ${analyticsData.totalSales.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, icon: DollarSign, color: 'text-green-600' },
    { label: 'Total de Pedidos', value: analyticsData.totalOrders, icon: TrendingUp, color: 'text-primary' },
    { label: 'Produtos Ativos', value: analyticsData.totalProducts, icon: Package, color: 'text-secondary' },
    { label: 'Avaliação Média', value: analyticsData.avgRating, icon: Star, color: 'text-sun-warm' },
  ];

  return (
    <Layout>
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-8">Painel de Análises</h1>

          {/* Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 stagger-fade-in">
            {metrics.map(m => (
              <Card key={m.label}>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">{m.label}</p>
                      <p className="text-2xl font-bold text-foreground mt-1">{m.value}</p>
                    </div>
                    <m.icon className={`w-8 h-8 ${m.color} opacity-60`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader><CardTitle className="font-heading text-lg">Vendas Mensais (R$)</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={analyticsData.monthlySales}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 18% 88%)" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(v: number) => `R$ ${v.toLocaleString('pt-BR')}`} />
                    <Line type="monotone" dataKey="vendas" stroke="hsl(210 72% 22%)" strokeWidth={2.5} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="font-heading text-lg">Pedidos por Mês</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={analyticsData.monthlySales}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 18% 88%)" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="pedidos" fill="hsl(45 85% 55%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Top products */}
          <Card>
            <CardHeader><CardTitle className="font-heading text-lg">Produtos Mais Vendidos</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 text-muted-foreground font-medium">Produto</th>
                      <th className="text-right py-3 px-2 text-muted-foreground font-medium">Vendas</th>
                      <th className="text-right py-3 px-2 text-muted-foreground font-medium">Receita</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyticsData.topProducts.map((p, i) => (
                      <tr key={i} className="border-b border-border/50 last:border-0">
                        <td className="py-3 px-2 font-medium">{p.name}</td>
                        <td className="py-3 px-2 text-right">{p.vendas}</td>
                        <td className="py-3 px-2 text-right">R$ {p.receita.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
