import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground wave-pattern">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                <span className="text-secondary-foreground font-heading font-bold">O</span>
              </div>
              <span className="font-heading text-xl font-bold">Openshop</span>
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Conectando você aos melhores negócios locais de Itajaí, Santa Catarina.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Início</Link></li>
              <li><Link to="/loja" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Loja</Link></li>
              <li><Link to="/sobre" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Sobre Nós</Link></li>
              <li><Link to="/login" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Entrar</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Políticas</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacidade" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Política de Privacidade</Link></li>
              <li><Link to="/termos" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Termos de Serviço</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Redes Sociais</h4>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm"
            >
              <Instagram className="w-4 h-4" />
              Instagram
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-primary-foreground/15 text-center text-xs text-primary-foreground/50">
          © 2026 Openshop. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
