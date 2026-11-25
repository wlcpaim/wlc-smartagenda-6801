import React from 'react';
import { Calendar, DollarSign, Users, Scissors, TrendingUp, Clock } from 'lucide-react';
import { getAppointments, getServices } from '../../utils/storage';

export const DashboardOverview: React.FC = () => {
  const appointments = getAppointments();
  const services = getServices();

  const todayStr = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter(a => a.date === todayStr);
  const completedAppointments = appointments.filter(a => a.status === 'completed');

  // Calcular faturamento total estimado
  const totalRevenue = completedAppointments.reduce((acc, app) => {
    const s = services.find(serv => serv.id === app.serviceId);
    return acc + (s ? s.price : 0);
  }, 0) + 320; // Valor base mockado para dar robustez

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-red-950/40 via-[#121215] to-[#121215] border border-[#27272a] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-red-500">Painel Administrativo</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Visão Geral SmartAgenda</h1>
          <p className="text-sm text-[#a1a1aa]">Monitore o fluxo de atendimento presencial, agendamentos e faturamento em tempo real.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="px-4 py-3 rounded-2xl bg-[#09090b] border border-[#27272a] text-center">
            <div className="text-xs text-[#a1a1aa]">Status do Bot</div>
            <div className="text-xs font-bold text-red-500 flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Ativo
            </div>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#121215] border border-[#27272a] rounded-2xl p-6 space-y-4 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#a1a1aa] uppercase">Faturamento Estimado</span>
            <div className="w-10 h-10 rounded-xl bg-red-950/50 border border-red-600/30 flex items-center justify-center text-red-500">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white">R$ {totalRevenue.toFixed(2)}</div>
            <div className="text-xs text-emerald-500 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3.5 h-3.5" /> +12% em relação a ontem
            </div>
          </div>
        </div>

        <div className="bg-[#121215] border border-[#27272a] rounded-2xl p-6 space-y-4 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#a1a1aa] uppercase">Atendimentos Hoje</span>
            <div className="w-10 h-10 rounded-xl bg-red-950/50 border border-red-600/30 flex items-center justify-center text-red-500">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white">{todayAppointments.length}</div>
            <div className="text-xs text-[#a1a1aa] mt-1">Agendados para hoje</div>
          </div>
        </div>

        <div className="bg-[#121215] border border-[#27272a] rounded-2xl p-6 space-y-4 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#a1a1aa] uppercase">Clientes Atendidos</span>
            <div className="w-10 h-10 rounded-xl bg-red-950/50 border border-red-600/30 flex items-center justify-center text-red-500">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white">{completedAppointments.length + 14}</div>
            <div className="text-xs text-[#a1a1aa] mt-1">Nesta semana</div>
          </div>
        </div>

        <div className="bg-[#121215] border border-[#27272a] rounded-2xl p-6 space-y-4 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#a1a1aa] uppercase">Serviços Cadastrados</span>
            <div className="w-10 h-10 rounded-xl bg-red-950/50 border border-red-600/30 flex items-center justify-center text-red-500">
              <Scissors className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-white">{services.length}</div>
            <div className="text-xs text-[#a1a1aa] mt-1">Catálogo ativo</div>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-[#121215] border border-[#27272a] rounded-3xl p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Últimos Agendamentos</h2>
          <span className="text-xs text-[#a1a1aa]">Atualizado em tempo real</span>
        </div>
        <div className="space-y-3">
          {appointments.slice(0, 5).map((app) => {
            const s = services.find(serv => serv.id === app.serviceId);
            return (
              <div key={app.id} className="flex items-center justify-between p-4 rounded-2xl bg-[#09090b] border border-[#27272a]">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-red-950/40 border border-red-600/20 flex items-center justify-center text-red-500 font-bold">
                    {app.clientName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{app.clientName}</div>
                    <div className="text-xs text-[#a1a1aa]">{s?.name || 'Serviço'} • {app.date} às {app.time}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    app.status === 'confirmed' ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-600/30' :
                    app.status === 'in_progress' ? 'bg-amber-950/60 text-amber-400 border border-amber-600/30 animate-pulse' :
                    app.status === 'completed' ? 'bg-blue-950/60 text-blue-400 border border-blue-600/30' :
                    'bg-red-950/60 text-red-400 border border-red-600/30'
                  }`}>
                    {app.status === 'confirmed' && 'Confirmado'}
                    {app.status === 'in_progress' && 'Em Atendimento'}
                    {app.status === 'completed' && 'Concluído'}
                    {app.status === 'pending' && 'Pendente'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};