import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, ArrowLeft, Truck, Shield, RotateCcw } from 'lucide-react';
import { products } from '@/data/mockData';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import ProductCard from '@/components/ProductCard';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addItem } = useCart();
  const { favorites, toggleFavorite } = useAuth();
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <Layout>
        <div className="pt-32 pb-16 container mx-auto px-4 text-center">
          <p className="text-lg text-muted-foreground">Produto não encontrado</p>
          <Link to="/loja" className="text-primary hover:underline mt-2 inline-block">Voltar à Loja</Link>
        </div>
      </Layout>
    );
  }

  const isFav = favorites.includes(product.id);
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <Layout>
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Link to="/loja" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" /> Voltar à Loja
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Image */}
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
            </div>

            {/* Info */}
            <div>
              <p className="text-sm text-muted-foreground font-medium mb-1">{product.sellerName}</p>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground leading-tight">{product.name}</h1>

              <div className="flex items-center gap-2 mt-3">
                <span className="flex items-center gap-1 text-sun-warm">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-muted'}`} />
                  ))}
                </span>
                <span className="text-sm text-muted-foreground">({product.reviewCount} avaliações)</span>
              </div>

              <div className="mt-6">
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through mr-3">R$ {product.originalPrice.toFixed(2)}</span>
                )}
                <span className="text-3xl font-bold text-foreground">R$ {product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="ml-3 inline-block bg-accent/10 text-accent text-sm font-semibold px-2 py-0.5 rounded">
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </span>
                )}
              </div>

              <p className="mt-6 text-foreground/80 leading-relaxed">{product.description}</p>

              <div className="mt-6 flex items-center gap-3">
                <div className="flex items-center border border-border rounded-lg">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 text-foreground hover:bg-muted transition-colors">−</button>
                  <span className="px-4 py-2 text-sm font-medium">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="px-3 py-2 text-foreground hover:bg-muted transition-colors">+</button>
                </div>
                <Button onClick={() => addItem(product, qty)} className="flex-1 h-11 gap-2">
                  <ShoppingCart className="w-4 h-4" /> Adicionar ao Carrinho
                </Button>
                <Button variant="outline" size="icon" className="h-11 w-11" onClick={() => toggleFavorite(product.id)}>
                  <Heart className={`w-5 h-5 ${isFav ? 'fill-accent text-accent' : ''}`} />
                </Button>
              </div>

              <p className={`text-sm mt-3 ${product.stock > 5 ? 'text-green-600' : 'text-accent'}`}>
                {product.stock > 5 ? `Em estoque (${product.stock} unidades)` : `Restam apenas ${product.stock} unidades!`}
              </p>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-border">
                <div className="text-center">
                  <Truck className="w-5 h-5 mx-auto text-primary mb-1" />
                  <p className="text-xs text-muted-foreground">Entrega local rápida</p>
                </div>
                <div className="text-center">
                  <Shield className="w-5 h-5 mx-auto text-primary mb-1" />
                  <p className="text-xs text-muted-foreground">Compra segura</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-5 h-5 mx-auto text-primary mb-1" />
                  <p className="text-xs text-muted-foreground">Troca fácil</p>
                </div>
              </div>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <section className="mt-16">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Produtos Relacionados</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {related.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </section>
          )}
        </div>
      </div>
    </Layout>
  );
}
