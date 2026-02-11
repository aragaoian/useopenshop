import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { products, categories, stores } from '@/data/mockData';
import ProductCard from '@/components/ProductCard';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Store() {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('categoria') || 'all');
  const [selectedSeller, setSelectedSeller] = useState(searchParams.get('vendedor') || 'all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [sortBy, setSortBy] = useState('relevancia');
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const query = searchParams.get('q') || '';

  const filtered = useMemo(() => {
    let result = [...products];
    if (query) result = result.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase()));
    if (selectedCategory !== 'all') result = result.filter(p => p.category === selectedCategory);
    if (selectedSeller !== 'all') result = result.filter(p => p.sellerId === selectedSeller);
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (sortBy === 'menor') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'maior') result.sort((a, b) => b.price - a.price);
    else if (sortBy === 'popular') result.sort((a, b) => b.reviewCount - a.reviewCount);
    return result;
  }, [query, selectedCategory, selectedSeller, priceRange, sortBy]);

  const perPage = 12;
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <Layout>
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-heading text-3xl font-bold text-foreground">Loja</h1>
              <p className="text-muted-foreground text-sm mt-1">{filtered.length} produtos encontrados</p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <SlidersHorizontal className="w-4 h-4 mr-1" /> Filtros
              </Button>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-44 h-9">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevancia">Relevância</SelectItem>
                  <SelectItem value="menor">Menor preço</SelectItem>
                  <SelectItem value="maior">Maior preço</SelectItem>
                  <SelectItem value="popular">Mais popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Filters sidebar */}
            <aside className={`w-60 shrink-0 space-y-6 ${showFilters ? 'block' : 'hidden'} lg:block`}>
              <div>
                <h3 className="font-heading text-sm font-semibold text-foreground mb-3">Categoria</h3>
                <div className="space-y-1">
                  <button onClick={() => { setSelectedCategory('all'); setPage(1); }} className={`block w-full text-left text-sm px-3 py-1.5 rounded-md transition-colors ${selectedCategory === 'all' ? 'bg-primary text-primary-foreground' : 'text-foreground/70 hover:bg-muted'}`}>
                    Todas
                  </button>
                  {categories.map(cat => (
                    <button key={cat.id} onClick={() => { setSelectedCategory(cat.id); setPage(1); }} className={`block w-full text-left text-sm px-3 py-1.5 rounded-md transition-colors ${selectedCategory === cat.id ? 'bg-primary text-primary-foreground' : 'text-foreground/70 hover:bg-muted'}`}>
                      {cat.icon} {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-heading text-sm font-semibold text-foreground mb-3">Vendedor</h3>
                <div className="space-y-1">
                  <button onClick={() => { setSelectedSeller('all'); setPage(1); }} className={`block w-full text-left text-sm px-3 py-1.5 rounded-md transition-colors ${selectedSeller === 'all' ? 'bg-primary text-primary-foreground' : 'text-foreground/70 hover:bg-muted'}`}>
                    Todos
                  </button>
                  {stores.map(s => (
                    <button key={s.id} onClick={() => { setSelectedSeller(s.id); setPage(1); }} className={`block w-full text-left text-sm px-3 py-1.5 rounded-md transition-colors ${selectedSeller === s.id ? 'bg-primary text-primary-foreground' : 'text-foreground/70 hover:bg-muted'}`}>
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-heading text-sm font-semibold text-foreground mb-3">Faixa de Preço</h3>
                <div className="flex items-center gap-2 text-sm">
                  <Input type="number" value={priceRange[0]} onChange={e => { setPriceRange([+e.target.value, priceRange[1]]); setPage(1); }} className="h-8 w-20" placeholder="Min" />
                  <span className="text-muted-foreground">—</span>
                  <Input type="number" value={priceRange[1]} onChange={e => { setPriceRange([priceRange[0], +e.target.value]); setPage(1); }} className="h-8 w-20" placeholder="Max" />
                </div>
              </div>
            </aside>

            {/* Products grid */}
            <div className="flex-1">
              {paginated.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground">
                  <p className="text-lg">Nenhum produto encontrado</p>
                  <p className="text-sm mt-1">Tente ajustar os filtros</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 stagger-fade-in">
                  {paginated.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-10">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${page === i + 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground hover:bg-muted/80'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
