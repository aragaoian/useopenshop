import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems } = useCart();
  const { user, isBusinessOwner, toggleRole } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { to: '/', label: 'Início' },
    { to: '/sobre', label: 'Sobre Nós' },
    { to: '/loja', label: 'Loja' },
    ...(isBusinessOwner ? [
      { to: '/analises', label: 'Análises' },
      { to: '/gerenciar', label: 'Gerenciar Produtos' },
    ] : []),
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-card/95 backdrop-blur-md shadow-lg border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-heading font-bold text-lg">O</span>
            </div>
            <span className={`font-heading text-xl font-bold hidden sm:block transition-colors ${scrolled ? 'text-foreground' : 'text-primary'}`}>
              Openshop
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? 'bg-primary/10 text-primary'
                    : scrolled
                      ? 'text-foreground/70 hover:text-foreground hover:bg-muted'
                      : 'text-primary hover:text-primary/80 hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center">
              <div className="relative">
                <Search className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 ${scrolled ? 'text-muted-foreground' : 'text-primary-foreground/60'}`} />
                <Input
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className={`pl-9 w-48 lg:w-64 h-9 text-sm ${
                    scrolled
                      ? 'bg-muted border-border'
                      : 'bg-white/15 border-white/20 text-primary-foreground placeholder:text-primary-foreground/50'
                  }`}
                />
              </div>
            </form>

            {/* Role toggle (demo) */}
            <button
              onClick={toggleRole}
              className={`hidden md:flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
                scrolled
                  ? 'bg-secondary text-secondary-foreground'
                  : 'bg-white/15 text-primary-foreground'
              }`}
              title="Alternar perfil (demo)"
            >
              {isBusinessOwner ? '🏪 Vendedor' : '👤 Cliente'}
              <ChevronDown className="w-3 h-3" />
            </button>

            {/* Cart */}
            <Link to="/carrinho" className="relative p-2 rounded-md transition-colors hover:bg-white/10">
              <ShoppingCart className={`w-5 h-5 ${scrolled ? 'text-foreground' : 'text-primary-foreground'}`} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center animate-scale-in">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User */}
            <Link to={user ? '/perfil' : '/login'} className="p-2 rounded-md transition-colors hover:bg-white/10">
              {user ? (
                <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full object-cover ring-2 ring-primary-foreground/30" />
              ) : (
                <User className={`w-5 h-5 ${scrolled ? 'text-foreground' : 'text-primary-foreground'}`} />
              )}
            </Link>

            {/* Mobile menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-md ${scrolled ? 'text-foreground' : 'text-primary-foreground'}`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 animate-fade-in">
            <form onSubmit={handleSearch} className="mb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-10 bg-card"
                />
              </div>
            </form>
            <nav className="flex flex-col gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive(link.to) ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <button
              onClick={toggleRole}
              className="mt-2 w-full px-3 py-2 rounded-md text-sm font-medium bg-secondary text-secondary-foreground text-left"
            >
              Alternar para: {isBusinessOwner ? '👤 Cliente' : '🏪 Vendedor'}
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
