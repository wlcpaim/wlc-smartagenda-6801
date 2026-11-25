import React, { useState } from 'react';
import { X, Calendar, Clock, Scissors, User, Phone, CheckCircle2, ChevronRight, ArrowLeft } from 'lucide-react';
import { getServices, getBarbers, getAppointments, saveAppointments, notifyTelegram } from '../../utils/storage';
import { Appointment } from '../../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [selectedBarberId, setSelectedBarberId] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const services = getServices();
  const barbers = getBarbers();

  const availableTimes = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00'
  ];

  const selectedService = services.find(s => s.id === selectedServiceId);
  const selectedBarber = barbers.find(b => b.id === selectedBarberId);

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone || !selectedServiceId || !selectedBarberId || !selectedDate || !selectedTime) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const newApp: Appointment = {
      id: `app-${Date.now()}`,
      clientName,
      clientPhone,
      serviceId: selectedServiceId,
      barberId: selectedBarberId,
      date: selectedDate,
      time: selectedTime,
      status: 'confirmed',
      isWalkIn: false
    };

    const appointments = getAppointments();
    saveAppointments([newApp, ...appointments]);

    // Disparar notificação Telegram
    const sName = selectedService?.name || 'Serviço';
    const bName = selectedBarber?.name || 'Barbeiro';
    notifyTelegram(`📅 *Novo Agendamento Online!*
👤 Cliente: ${clientName} (${clientPhone})
✂️ Serviço: ${sName}
💈 Barbeiro: ${bName}
📅 Data: ${selectedDate} às ${selectedTime}`);

    setSuccess(true);
    setStep(4);
  };

  const resetAndClose = () => {
    setStep(1);
    setSelectedServiceId('');
    setSelectedBarberId('');
    setSelectedTime('');
    setClientName('');
    setClientPhone('');
    setSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#121215] border border-[#27272a] rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl relative">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#27272a] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {step > 1 && step < 4 && (
              <button 
                onClick={() => setStep((step - 1) as any)}
                className="p-2 rounded-xl bg-[#09090b] text-[#a1a1aa] hover:text-white transition"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div>
              <h2 className="text-lg font-bold text-white">Agendar Horário</h2>
              <p className="text-xs text-[#a1a1aa]">
                {step === 1 && 'Passo 1: Escolha o Serviço'}
                {step === 2 && 'Passo 2: Escolha o Barbeiro e Data'}
                {step === 3 && 'Passo 3: Seus Dados'}
                {step === 4 && 'Agendamento Confirmado'}
              </p>
            </div>
          </div>
          <button 
            onClick={resetAndClose}
            className="p-2 rounded-xl bg-[#09090b] text-[#a1a1aa] hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {step === 1 && (
            <div className="space-y-3">
              {services.map((service) => (
                <div
                  key={service.id}
                  onClick={() => setSelectedServiceId(service.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                    selectedServiceId === service.id
                      ? 'bg-red-950/30 border-red-600 text-white shadow-lg'
                      : 'bg-[#09090b] border-[#27272a] text-[#a1a1aa] hover:border-red-600/40 hover:text-white'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="font-bold text-white text-base">{service.name}</div>
                    <div className="text-xs text-[#a1a1aa]">{service.durationMinutes} min • R$ {service.price.toFixed(2)}</div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                    selectedServiceId === service.id ? 'bg-red-600 border-red-600 text-white' : 'border-[#27272a]' 
                  }`}>
                    {selectedServiceId === service.id && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>
              ))}
              <button
                disabled={!selectedServiceId}
                onClick={() => setStep(2)}
                className="w-full mt-6 py-3.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg transition"
              >
                Continuar
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-[#a1a1aa] uppercase mb-3">Escolha o Barbeiro</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {barbers.map((barber) => (
                    <div
                      key={barber.id}
                      onClick={() => setSelectedBarberId(barber.id)}
                      className={`p-3 rounded-2xl border cursor-pointer text-center transition ${
                        selectedBarberId === barber.id
                          ? 'bg-red-950/30 border-red-600 text-white'
                          : 'bg-[#09090b] border-[#27272a] text-[#a1a1aa] hover:border-red-600/40'
                      }`}
                    >
                      <img src={barber.avatar} alt={barber.name} className="w-14 h-14 rounded-full mx-auto object-cover mb-2 border border-[#27272a]" />
                      <div className="text-xs font-bold text-white line-clamp-1">{barber.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#a1a1aa] uppercase mb-2">Data</label>
                  <input 
                    type="date"
                    value={selectedDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-[#09090b] border border-[#27272a] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-red-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#a1a1aa] uppercase mb-2">Horário</label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full bg-[#09090b] border border-[#27272a] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-red-600"
                  >
                    <option value="">Selecione o horário</option>
                    {availableTimes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                disabled={!selectedBarberId || !selectedDate || !selectedTime}
                onClick={() => setStep(3)}
                className="w-full py-3.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg transition"
              >
                Continuar
              </button>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handleConfirm} className="space-y-4">
              <div className="bg-[#09090b] p-4 rounded-2xl border border-[#27272a] space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-[#a1a1aa]">Serviço:</span>
                  <span className="font-bold text-white">{selectedService?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#a1a1aa]">Barbeiro:</span>
                  <span className="font-bold text-white">{selectedBarber?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#a1a1aa]">Data e Hora:</span>
                  <span className="font-bold text-red-500">{selectedDate} às {selectedTime}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#a1a1aa] uppercase mb-2">Seu Nome Completo</label>
                <input 
                  type="text"
                  required
                  placeholder="Ex: João da Silva"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-[#09090b] border border-[#27272a] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#a1a1aa] uppercase mb-2">Seu WhatsApp / Telefone</label>
                <input 
                  type="text"
                  required
                  placeholder="Ex: (11) 99999-9999"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full bg-[#09090b] border border-[#27272a] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-red-600"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg transition"
              >
                Confirmar Agendamento
              </button>
            </form>
          )}

          {step === 4 && (
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 bg-red-950/60 border border-red-600 rounded-full flex items-center justify-center mx-auto text-red-500 shadow-xl">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">Tudo Pronto!</h3>
                <p className="text-sm text-[#a1a1aa] max-w-sm mx-auto">
                  Seu horário foi agendado com sucesso. Enviamos uma confirmação e o bot do Telegram foi notificado.
                </p>
              </div>
              <button
                onClick={resetAndClose}
                className="px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg transition"
              >
                Concluir
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};