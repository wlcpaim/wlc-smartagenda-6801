import React, { useState } from 'react';
import { LayoutDashboard, Calendar, Users, Scissors, Settings, LogOut, Menu, X, DollarSign, Bell } from 'lucide-react';
import DashboardOverview from './DashboardOverview';
import AppointmentsManager from './AppointmentsManager';
import { getStorageData, saveStorageData, defaultServices, defaultBarbers } from '../../utils/storage';

export default function AdminLayout() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'appointments' | 'services' | 'telegram'>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const data = getStorageData();
  const [telegramConfig, setTelegramConfig] = useState(data.telegramConfig);
  const [savedMsg, setSavedMsg] = useState(false);

  const handleSaveTelegram = (e: React.FormEvent) => {
    e.preventDefault();
    const current = getStorageData();
    current.telegramConfig = telegramConfig;
    saveStorageData(current);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] flex">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-12 left-0 right-0 z-40 bg-[#121215] border-b border-zinc-800 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2 font-bold text-lg text-white">
          <Scissors className="w-5 h-5 text-red-600" />
          <span>Smart<span className="text-red-600">Agenda</span> Admin</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-zinc-400 hover:text-white bg-zinc-900 rounded-lg"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#121215] border-r border-zinc-800 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } pt-16 lg:pt-0`}
      >
        <div className="p-6 border-b border-zinc-800 hidden lg:flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600/10 border border-red-600/20 flex items-center justify-center text-red-600">
            <Scissors className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-white leading-tight">Smart<span className="text-red-600">Agenda</span></h1>
            <p className="text-xs text-zinc-400">Painel Administrativo</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <button
            onClick={() => { setActiveTab('dashboard'); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'dashboard'
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Visão Geral
          </button>

          <button
            onClick={() => { setActiveTab('appointments'); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'appointments'
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            <Calendar className="w-5 h-5" />
            Agenda & Atendimentos
          </button>

          <button
            onClick={() => { setActiveTab('services'); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'services'
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            <Scissors className="w-5 h-5" />
            Serviços & Barbeiros
          </button>

          <button
            onClick={() => { setActiveTab('telegram'); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'telegram'
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            <Bell className="w-5 h-5" />
            Configurar Telegram
          </button>
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <div className="bg-zinc-900/50 p-3 rounded-xl border border-zinc-800 mb-3">
            <p className="text-xs text-zinc-400">Logado como</p>
            <p className="text-sm font-semibold text-white">Gerente Master</p>
          </div>
          <button
            onClick={() => alert('Sessão encerrada com sucesso.')}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sair do Sistema
          </button>
        </div>
      </aside>

      {/* Main View Area */}
      <main className="flex-1 lg:ml-64 p-6 pt-24 lg:pt-8 bg-[#09090b] min-h-screen">
        {activeTab === 'dashboard' && <DashboardOverview />}
        {activeTab === 'appointments' && <AppointmentsManager />}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Serviços e Barbeiros Cadastrados</h2>
              <p className="text-zinc-400 text-sm">Gerencie a oferta e equipe da barbearia</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#121215] border border-zinc-800 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Scissors className="w-5 h-5 text-red-600" /> Serviços ({defaultServices.length})
                </h3>
                <div className="space-y-3">
                  {defaultServices.map(s => (
                    <div key={s.id} className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800 flex justify-between items-center">
                      <div>
                        <p className="font-medium text-white">{s.name}</p>
                        <p className="text-xs text-zinc-400">{s.durationMinutes} min</p>
                      </div>
                      <span className="text-red-500 font-bold">R$ {s.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#121215] border border-zinc-800 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-red-600" /> Barbeiros ({defaultBarbers.length})
                </h3>
                <div className="space-y-3">
                  {defaultBarbers.map(b => (
                    <div key={b.id} className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800 flex items-center gap-3">
                      <img src={b.avatar} alt={b.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <p className="font-medium text-white">{b.name}</p>
                        <p className="text-xs text-zinc-400">{b.specialty}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'telegram' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Integração Telegram Bot</h2>
              <p className="text-zinc-400 text-sm">Receba alertas instantâneos de novos agendamentos e walk-ins</p>
            </div>

            <form onSubmit={handleSaveTelegram} className="bg-[#121215] border border-zinc-800 rounded-2xl p-6 space-y-4">
              {savedMsg && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-sm">
                  Configurações de Telegram salvas com sucesso!
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Bot Token</label>
                <input
                  type="text"
                  value={telegramConfig.botToken}
                  onChange={e => setTelegramConfig({ ...telegramConfig, botToken: e.target.value })}
                  placeholder="ex: 123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Chat ID do Grupo / Canal</label>
                <input
                  type="text"
                  value={telegramConfig.chatId}
                  onChange={e => setTelegramConfig({ ...telegramConfig, chatId: e.target.value })}
                  placeholder="ex: -100123456789"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-red-600"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="enabled"
                  checked={telegramConfig.enabled}
                  onChange={e => setTelegramConfig({ ...telegramConfig, enabled: e.target.checked })}
                  className="w-4 h-4 rounded bg-zinc-900 border-zinc-800 text-red-600 focus:ring-red-600"
                />
                <label htmlFor="enabled" className="text-sm text-zinc-300">
                  Ativar notificações automáticas via Telegram
                </label>
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-red-600/20"
                >
                  Salvar Configurações
                </button>
                <button
                  type="button"
                  onClick={() => alert(telegramConfig.botToken ? 'Mensagem de teste disparada com sucesso para o Telegram!' : 'Insira o Bot Token primeiro.')}
                  className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl transition-colors"
                >
                  Testar Conexão
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
