import { useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { products as initialProducts, categories, Product } from '@/data/mockData';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ProductManagement() {
  const [productList, setProductList] = useState(initialProducts.filter(p => p.sellerId === 's1'));
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', price: '', stock: '', category: 'alimentos', description: '' });

  const openNew = () => {
    setEditing(null);
    setFormData({ name: '', price: '', stock: '', category: 'alimentos', description: '' });
    setShowForm(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setFormData({ name: p.name, price: String(p.price), stock: String(p.stock), category: p.category, description: p.description });
    setShowForm(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.price) return;
    if (editing) {
      setProductList(prev => prev.map(p => p.id === editing.id ? { ...p, name: formData.name, price: +formData.price, stock: +formData.stock, category: formData.category, description: formData.description } : p));
    } else {
      const newProd: Product = {
        id: `p-new-${Date.now()}`, name: formData.name, price: +formData.price, stock: +formData.stock,
        category: formData.category, description: formData.description, images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop'],
        sellerId: 's1', sellerName: 'Empório do Mar', rating: 0, reviewCount: 0,
      };
      setProductList(prev => [...prev, newProd]);
    }
    setShowForm(false);
  };

  const handleDelete = (id: string) => setProductList(prev => prev.filter(p => p.id !== id));

  return (
    <Layout>
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-heading text-3xl font-bold text-foreground">Gerenciar Produtos</h1>
            <Button onClick={openNew} className="gap-2"><Plus className="w-4 h-4" /> Novo Produto</Button>
          </div>

          {/* Form modal */}
          {showForm && (
            <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
              <div className="bg-card rounded-xl border border-border p-6 w-full max-w-lg space-y-4" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between">
                  <h2 className="font-heading text-xl font-semibold">{editing ? 'Editar Produto' : 'Novo Produto'}</h2>
                  <button onClick={() => setShowForm(false)}><X className="w-5 h-5" /></button>
                </div>
                <div><Label>Nome</Label><Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="mt-1" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Preço (R$)</Label><Input type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className="mt-1" /></div>
                  <div><Label>Estoque</Label><Input type="number" value={formData.stock} onChange={e => setFormData({ ...formData, stock: e.target.value })} className="mt-1" /></div>
                </div>
                <div>
                  <Label>Categoria</Label>
                  <Select value={formData.category} onValueChange={v => setFormData({ ...formData, category: v })}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>{categories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div><Label>Descrição</Label><Input value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="mt-1" /></div>
                <Button onClick={handleSave} className="w-full">{editing ? 'Salvar Alterações' : 'Criar Produto'}</Button>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Produto</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Categoria</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Preço</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Estoque</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {productList.map(p => (
                    <tr key={p.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img src={p.images[0]} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                          <span className="font-medium text-foreground line-clamp-1">{p.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{categories.find(c => c.id === p.category)?.name || p.category}</td>
                      <td className="py-3 px-4 text-right font-medium">R$ {p.price.toFixed(2)}</td>
                      <td className="py-3 px-4 text-right">
                        <Badge variant={p.stock > 10 ? 'secondary' : 'destructive'} className="text-xs">
                          {p.stock > 10 ? `${p.stock} un.` : `Baixo: ${p.stock}`}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => openEdit(p)} className="p-1.5 rounded hover:bg-muted transition-colors"><Pencil className="w-4 h-4 text-primary" /></button>
                          <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded hover:bg-muted transition-colors"><Trash2 className="w-4 h-4 text-accent" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
