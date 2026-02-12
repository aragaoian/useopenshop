import Layout from '@/components/layout/Layout';
import { Anchor, Heart, Users, MapPin } from 'lucide-react';

export default function About() {
  return (
    <Layout>
      <div className="pt-24 pb-16">
        {/* Hero */}
        <section className="hero-gradient wave-pattern py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Sobre o Openshop</h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Conectando o comércio local de Itajaí ao mundo digital, valorizando a tradição e a qualidade dos negócios da nossa cidade.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Nossa Missão</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                O Openshop nasceu do desejo de fortalecer o comércio local da nossa cidade. Acreditamos que cada pequeno negócio 
                tem uma história única para contar e produtos especiais para oferecer.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Nossa plataforma oferece um ambiente seguro e intuitivo para que comerciantes locais possam alcançar mais clientes, 
                e para que os moradores de Itajaí possam descobrir e apoiar os negócios da sua comunidade.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 stagger-fade-in">
              {[
                { icon: Anchor, title: 'Raízes Locais', desc: 'Nascido e criado em Itajaí' },
                { icon: Heart, title: 'Apoio ao Comércio', desc: 'Fortalecemos negócios locais' },
                { icon: Users, title: 'Comunidade', desc: 'Conectando pessoas e lojas' },
                { icon: MapPin, title: 'Itajaí, SC', desc: 'Orgulho catarinense' },
              ].map(item => (
                <div key={item.title} className="bg-card rounded-xl border border-border p-5 text-center card-hover">
                  <item.icon className="w-8 h-8 mx-auto text-primary mb-2" />
                  <h3 className="font-heading font-semibold text-foreground">{item.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
