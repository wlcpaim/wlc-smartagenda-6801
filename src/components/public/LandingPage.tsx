import React from 'react';
import { Calendar, Clock, MapPin, Star, ShieldCheck, Scissors, Award, Users, ChevronRight, Phone } from 'lucide-react';
import { getServices, getBarbers } from '../../utils/storage';

interface LandingPageProps {
  onOpenBooking: () => void;
  onNavigateAdmin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenBooking, onNavigateAdmin }) => {
  const services = getServices();
  const barbers = getBarbers();

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5]">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32 border-b border-[#27272a]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-950/20 via-[#09090b] to-[#09090b] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-red-950/50 border border-red-600/30 text-red-400 text-xs font-semibold tracking-wide uppercase">
                <Scissors className="w-3.5 h-3.5" />
                <span>A Melhor Experiência da Cidade</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-none">
                Estilo, Precisão e <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">Atitude</span>
              </h1>
              <p className="text-lg sm:text-xl text-[#a1a1aa] max-w-2xl mx-auto lg:mx-0">
                Agende seu horário em segundos com nossos barbeiros especialistas. Ambiente premium, cerveja gelada e o melhor corte para o seu estilo.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <button
                  onClick={onOpenBooking}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold bg-red-600 hover:bg-red-700 text-white shadow-xl shadow-red-600/30 transition flex items-center justify-center space-x-3 group"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Agendar Agora</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </button>
                <a
                  href="#services"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold bg-[#121215] hover:bg-[#27272a] text-[#f4f4f5] border border-[#27272a] text-center transition"
                >
                  Conhecer Serviços
                </a>
              </div>
              <div className="pt-6 flex items-center justify-center lg:justify-start space-x-6 text-sm text-[#a1a1aa]">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="font-bold text-white">4.9</span> (1.200+ avaliações)
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-red-500" />
                  <span>Satisfação Garantida</span>
                </div>
              </div>
            </div>

            {/* Hero Image / Card Preview */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-red-600 to-red-800 rounded-3xl blur-xl opacity-30 animate-pulse" />
                <div className="relative bg-[#121215] border border-[#27272a] rounded-2xl p-6 shadow-2xl space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-[#27272a]">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-red-600 animate-ping" />
                      <span className="font-semibold text-white text-sm">Atendimento Ágil & Presencial</span>
                    </div>
                    <span className="text-xs bg-red-950 text-red-400 px-2.5 py-1 rounded-md font-medium">Aberto Hoje</span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-3 rounded-xl bg-[#09090b] border border-[#27272a]">
                      <Clock className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <div>
                        <div className="text-xs text-[#a1a1aa]">Horário de Funcionamento</div>
                        <div className="text-sm font-semibold text-white">Segunda a Sábado: 09h às 20h</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-3 rounded-xl bg-[#09090b] border border-[#27272a]">
                      <MapPin className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <div>
                        <div className="text-xs text-[#a1a1aa]">Localização</div>
                        <div className="text-sm font-semibold text-white">Av. Paulista, 1000 - São Paulo</div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={onOpenBooking}
                    className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition shadow-lg shadow-red-600/20"
                  >
                    Reservar Horário em 1 Minuto
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-[#09090b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-red-500">Nossos Serviços</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Escolha o seu visual</p>
            <p className="text-[#a1a1aa]">Trabalhamos com técnicas modernas e produtos de altíssima qualidade.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div 
                key={service.id}
                className="bg-[#121215] border border-[#27272a] hover:border-red-600/50 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 shadow-lg"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-red-950/60 border border-red-600/30 flex items-center justify-center text-red-500 group-hover:scale-110 transition">
                    <Scissors className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{service.name}</h3>
                  <p className="text-sm text-[#a1a1aa] line-clamp-3">{service.description}</p>
                </div>
                <div className="pt-6 mt-6 border-t border-[#27272a] flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#a1a1aa] block">Duração</span>
                    <span className="text-sm font-semibold text-white">{service.durationMinutes} min</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#a1a1aa] block">Preço</span>
                    <span className="text-lg font-bold text-red-500">R$ {service.price.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={onOpenBooking}
                  className="mt-4 w-full py-2.5 bg-[#09090b] hover:bg-red-600 hover:text-white text-sm font-semibold rounded-xl border border-[#27272a] hover:border-red-600 transition"
                >
                  Agendar
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Barbers Section */}
      <section className="py-20 bg-[#121215]/50 border-t border-[#27272a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-red-500">Profissionais</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Nossos Barbeiros</p>
            <p className="text-[#a1a1aa]">Equipe altamente qualificada pronta para cuidar do seu estilo.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {barbers.map((barber) => (
              <div 
                key={barber.id}
                className="bg-[#121215] border border-[#27272a] rounded-2xl overflow-hidden group hover:border-red-600/40 transition shadow-xl"
              >
                <div className="h-72 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-transparent to-transparent z-10" />
                  <img 
                    src={barber.avatar} 
                    alt={barber.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-6 relative z-20 -mt-12 space-y-3">
                  <div className="bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full inline-block shadow-md">
                    {barber.specialty}
                  </div>
                  <h3 className="text-xl font-bold text-white">{barber.name}</h3>
                  <button
                    onClick={onOpenBooking}
                    className="w-full py-2.5 mt-2 bg-[#09090b] hover:bg-red-600 hover:text-white text-sm font-semibold rounded-xl border border-[#27272a] hover:border-red-600 transition"
                  >
                    Agendar com {barber.name.split(' ')[0]}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#09090b] border-t border-[#27272a] py-12 text-sm text-[#a1a1aa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-bold">
              S
            </div>
            <span className="text-white font-bold tracking-tight">SmartAgenda</span>
            <span>© {new Date().getFullYear()} Todos os direitos reservados.</span>
          </div>
          <div className="flex items-center space-x-6">
            <button onClick={onNavigateAdmin} className="hover:text-red-500 transition">
              Acesso Administrativo
            </button>
            <span className="text-red-600 font-medium">Telegram Bot Ativo</span>
          </div>
        </div>
      </footer>
    </div>
  );
};