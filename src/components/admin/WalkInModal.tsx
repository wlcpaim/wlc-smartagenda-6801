import React, { useState } from 'react';
import { X, Scissors, User, Phone, Clock } from 'lucide-react';
import { getStorageData, saveStorageData, defaultServices, defaultBarbers } from '../../utils/storage';
import { Appointment } from '../../types';

interface WalkInModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function WalkInModal({ onClose, onSuccess }: WalkInModalProps) {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [serviceId, setServiceId] = useState(defaultServices[0].id);
  const [barberId, setBarberId] = useState(defaultBarbers[0].id);
  const today = new Date().toISOString().split('T')[0];
  const [time, setTime] = useState('14:00');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) {
      alert('Preencha o nome e telefone do cliente.');
      return;
    }

    const storage = getStorageData();
    const newApp: Appointment = {
      id: 'walkin_' + Date.now(),
      clientName,
      clientPhone,
      serviceId,
      barberId,
      date: today,
      time,
      status: 'in_progress',
      isWalkIn: true
    };

    storage.appointments.push(newApp);
    saveStorageData(storage);
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#121215] border border-zinc-800 rounded-3xl max-w-md w-full p-6 space-y-6 relative animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-red-600/10 border border-red-600/20 flex items-center justify-center text-red-600">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Novo Atendimento Presencial</h3>
              <p className="text-xs text-zinc-400">Walk-in rápido sem agendamento prévio</p>
            </div>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white p-2 rounded-lg bg-zinc-900">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Nome do Cliente</label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                required
                value={clientName}
                onChange={e => setClientName(e.target.value)}
                placeholder="ex: Carlos Silva"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-red-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Telefone / WhatsApp</label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                required
                value={clientPhone}
                onChange={e => setClientPhone(e.target.value)}
                placeholder="ex: (11) 99999-9999"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-red-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Serviço</label>
            <select
              value={serviceId}
              onChange={e => setServiceId(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-red-600"
            >
              {defaultServices.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} - R$ {s.price.toFixed(2)} ({s.durationMinutes} min)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Barbeiro Responsável</label>
            <select
              value={barberId}
              onChange={e => setBarberId(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-red-600"
            >
              {defaultBarbers.map(b => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.specialty})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Horário de Início</label>
            <div className="relative">
              <Clock className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
              <input
                type="time"
                value={time}
                onChange={e => setTime(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-red-600"
              />
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-red-600/20"
            >
              Iniciar Agora
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
