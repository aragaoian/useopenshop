import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '@/data/mockData';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { favorites, toggleFavorite } = useAuth();
  const isFav = favorites.includes(product.id);

  return (
    <div className="group bg-card rounded-xl border border-border overflow-hidden card-hover">
      <Link to={`/produto/${product.id}`} className="block relative aspect-square overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {product.originalPrice && (
          <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded-md">
            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
          </span>
        )}
        <button
          onClick={e => { e.preventDefault(); toggleFavorite(product.id); }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center transition-colors hover:bg-card"
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-accent text-accent' : 'text-foreground/60'}`} />
        </button>
      </Link>

      <div className="p-4">
        <p className="text-xs text-muted-foreground mb-1 font-medium">{product.sellerName}</p>
        <Link to={`/produto/${product.id}`}>
          <h3 className="font-heading text-base font-semibold text-foreground leading-tight line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mt-1">
          <span className="text-xs text-sun-warm">{'★'.repeat(Math.floor(product.rating))}</span>
          <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
        </div>

        <div className="flex items-end justify-between mt-3">
          <div>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through block">
                R$ {product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-lg font-bold text-foreground font-body">
              R$ {product.price.toFixed(2)}
            </span>
          </div>
          <button
            onClick={() => addItem(product)}
            className="w-9 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
            title="Adicionar ao carrinho"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
