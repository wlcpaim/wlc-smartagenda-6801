import React, { useState } from 'react';
import { Calendar, Plus, Play, CheckCircle, XCircle, Clock, User, Phone, Scissors, AlertCircle } from 'lucide-react';
import { getStorageData, saveStorageData, defaultServices, defaultBarbers } from '../../utils/storage';
import { Appointment } from '../../types';
import WalkInModal from './WalkInModal';

export default function AppointmentsManager() {
  const [storage, setStorage] = useState(getStorageData());
  const [isWalkInOpen, setIsWalkInOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const handleStatusChange = (id: string, newStatus: Appointment['status']) => {
    const updatedAppointments = storage.appointments.map(app => {
      if (app.id === id) {
        return { ...app, status: newStatus };
      }
      return app;
    });
    const newStorage = { ...storage, appointments: updatedAppointments };
    saveStorageData(newStorage);
    setStorage(newStorage);
  };

  const filteredAppointments = storage.appointments.filter(app => app.date === selectedDate);

  const getServiceName = (id: string) => defaultServices.find(s => s.id === id)?.name || 'Serviço';
  const getBarberName = (id: string) => defaultBarbers.find(b => b.id === id)?.name || 'Barbeiro';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Gestão de Atendimentos & Agenda</h2>
          <p className="text-zinc-400 text-sm">Controle de horários e atendimento presencial rápido (Walk-in)</p>
        </div>
        <button
          onClick={() => setIsWalkInOpen(true)}
          className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-red-600/20 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          + NOVO ATENDIMENTO PRESENCIAL
        </button>
      </div>

      {/* Date Filter & Stats Bar */}
      <div className="bg-[#121215] border border-zinc-800 rounded-2xl p-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Calendar className="w-5 h-5 text-red-600" />
          <span className="text-sm font-medium text-zinc-300">Filtrar Data:</span>
          <input
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-white font-medium focus:outline-none focus:border-red-600"
          />
        </div>
        <div className="flex gap-4 text-sm">
          <div className="px-3 py-1.5 bg-zinc-900 rounded-lg border border-zinc-800">
            <span className="text-zinc-400">Total do dia:</span> <strong className="text-white">{filteredAppointments.length}</strong>
          </div>
          <div className="px-3 py-1.5 bg-zinc-900 rounded-lg border border-zinc-800">
            <span className="text-zinc-400">Em andamento:</span> <strong className="text-red-500">{filteredAppointments.filter(a => a.status === 'in_progress').length}</strong>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="bg-[#121215] border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-zinc-800 font-semibold text-white">
          Agenda para {selectedDate}
        </div>

        {filteredAppointments.length === 0 ? (
          <div className="p-12 text-center">
            <AlertCircle className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <p className="text-zinc-400 font-medium">Nenhum agendamento encontrado para esta data.</p>
            <p className="text-zinc-600 text-sm mt-1">Clique em "+ Novo Atendimento Presencial" para encaixar um cliente.</p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-800">
            {filteredAppointments.map(app => {
              const isWalkIn = app.isWalkIn;
              return (
                <div key={app.id} className="p-4 sm:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-zinc-900/30 transition-colors">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-red-600/10 text-red-500 border border-red-600/20 font-bold rounded-lg text-sm">
                        {app.time}
                      </span>
                      <h3 className="font-bold text-white text-lg">{app.clientName}</h3>
                      {isWalkIn && (
                        <span className="px-2.5 py-0.5 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full text-xs font-semibold">
                          Walk-in Presencial
                        </span>
                      )}
                      {app.status === 'in_progress' && (
                        <span className="px-2.5 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-semibold animate-pulse">
                          Em Atendimento
                        </span>
                      )}
                      {app.status === 'completed' && (
                        <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-semibold">
                          Concluído
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-4 text-xs text-zinc-400">
                      <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-zinc-500" /> {app.clientPhone}</span>
                      <span className="flex items-center gap-1"><Scissors className="w-3.5 h-3.5 text-zinc-500" /> {getServiceName(app.serviceId)}</span>
                      <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-zinc-500" /> {getBarberName(app.barberId)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                    {app.status !== 'in_progress' && app.status !== 'completed' && (
                      <button
                        onClick={() => handleStatusChange(app.id, 'in_progress')}
                        className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <Play className="w-3.5 h-3.5" /> INICIAR ATENDIMENTO
                      </button>
                    )}

                    {app.status === 'in_progress' && (
                      <button
                        onClick={() => handleStatusChange(app.id, 'completed')}
                        className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-lg shadow-emerald-600/20"
                      >
                        <CheckCircle className="w-3.5 h-3.5" /> FINALIZAR ATENDIMENTO
                      </button>
                    )}

                    {app.status !== 'cancelled' && app.status !== 'completed' && (
                      <button
                        onClick={() => handleStatusChange(app.id, 'cancelled')}
                        className="p-2 bg-zinc-800 hover:bg-red-600/20 hover:text-red-500 text-zinc-400 rounded-xl transition-colors"
                        title="Cancelar"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {isWalkInOpen && (
        <WalkInModal
          onClose={() => setIsWalkInOpen(false)}
          onSuccess={() => setStorage(getStorageData())}
        />
      )}
    </div>
  );
}
