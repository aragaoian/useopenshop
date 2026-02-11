import { Link } from 'react-router-dom';
import { Search, ArrowRight, Star } from 'lucide-react';
import { useState } from 'react';
import { products, categories, stores } from '@/data/mockData';
import ProductCard from '@/components/ProductCard';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const featuredProducts = products.filter(p => p.featured);
  const trendingProducts = products.filter(p => p.trending);

  return (
    <Layout>
      {/* Hero */}
      <section className="hero-gradient wave-pattern relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
        <div className="container mx-auto px-4 pt-32 pb-20 md:pt-40 md:pb-28 relative">
          <div className="max-w-2xl mx-auto text-center stagger-fade-in">
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground leading-tight mb-4">
              Descubra o melhor de <span className="text-secondary">Itajaí</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 font-body">
              Produtos únicos de negócios locais. Apoie o comércio da sua cidade.
            </p>
            <form
              onSubmit={e => { e.preventDefault(); }}
              className="flex gap-2 max-w-lg mx-auto"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="O que você está procurando?"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-11 h-12 bg-card text-foreground border-0 shadow-lg text-base"
                />
              </div>
              <Button asChild size="lg" className="h-12 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold">
                <Link to={`/loja${searchQuery ? `?q=${searchQuery}` : ''}`}>Buscar</Link>
              </Button>
            </form>
          </div>
        </div>
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full h-auto block" preserveAspectRatio="none">
            <path d="M0,40 C360,80 720,0 1440,40 L1440,60 L0,60 Z" fill="hsl(40 30% 98%)" />
          </svg>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">
          Categorias em Destaque
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 stagger-fade-in">
          {categories.map(cat => (
            <Link
              key={cat.id}
              to={`/loja?categoria=${cat.id}`}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border card-hover text-center"
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="text-sm font-medium text-foreground">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured stores */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-3xl font-bold text-foreground">Negócios Locais</h2>
            <Link to="/loja" className="text-primary font-medium text-sm flex items-center gap-1 hover:underline">
              Ver todos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-fade-in">
            {stores.slice(0, 6).map(store => (
              <Link
                key={store.id}
                to={`/loja?vendedor=${store.id}`}
                className="group bg-card rounded-xl border border-border overflow-hidden card-hover"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img src={store.image} alt={store.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="p-4">
                  <h3 className="font-heading text-lg font-semibold text-foreground">{store.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{store.description}</p>
                  <div className="flex items-center justify-between mt-3 text-sm">
                    <span className="flex items-center gap-1 text-sun-warm">
                      <Star className="w-3.5 h-3.5 fill-current" /> {store.rating}
                    </span>
                    <span className="text-muted-foreground">{store.productCount} produtos</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading text-3xl font-bold text-foreground">Em Alta 🔥</h2>
          <Link to="/loja" className="text-primary font-medium text-sm flex items-center gap-1 hover:underline">
            Ver mais <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 stagger-fade-in">
          {trendingProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-8 text-center">Destaques</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 stagger-fade-in">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
