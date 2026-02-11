import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [accepted, setAccepted] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin && !accepted) return;
    login(email, password);
    navigate('/');
  };

  return (
    <Layout>
      <div className="pt-28 pb-16 min-h-screen flex items-center">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mx-auto mb-3">
                <span className="text-primary-foreground font-heading font-bold text-xl">M</span>
              </div>
              <h1 className="font-heading text-2xl font-bold text-foreground">{isLogin ? 'Entrar' : 'Criar Conta'}</h1>
              <p className="text-sm text-muted-foreground mt-1">{isLogin ? 'Bem-vindo de volta!' : 'Junte-se ao Mercado Itajaí'}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div><Label>Nome completo</Label><Input value={name} onChange={e => setName(e.target.value)} placeholder="Seu nome" className="mt-1" required /></div>
              )}
              <div><Label>E-mail</Label><Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" className="mt-1" required /></div>
              <div><Label>Senha</Label><Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="mt-1" required /></div>

              {!isLogin && (
                <div className="flex items-start gap-2">
                  <Checkbox id="terms" checked={accepted} onCheckedChange={v => setAccepted(v === true)} className="mt-0.5" />
                  <label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed">
                    Li e aceito os <Link to="/termos" className="text-primary hover:underline">Termos de Serviço</Link> e a <Link to="/privacidade" className="text-primary hover:underline">Política de Privacidade</Link>
                  </label>
                </div>
              )}

              <Button type="submit" className="w-full h-11" disabled={!isLogin && !accepted}>
                {isLogin ? 'Entrar' : 'Criar Conta'}
              </Button>

              <div className="text-center text-sm text-muted-foreground mt-4">
                <p className="text-xs bg-muted rounded-md p-2 mt-3">
                  <strong>Demo:</strong> Use marina@email.com (cliente) ou carlos@emporioomar.com (vendedor)
                </p>
              </div>
            </form>

            <div className="text-center mt-6">
              <button onClick={() => setIsLogin(!isLogin)} className="text-sm text-primary hover:underline">
                {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Entrar'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
