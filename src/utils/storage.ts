import { Service, Barber, Appointment, TelegramConfig } from '../types';

const STORAGE_KEYS = {
  SERVICES: 'smartagenda_services',
  BARBERS: 'smartagenda_barbers',
  APPOINTMENTS: 'smartagenda_appointments',
  TELEGRAM: 'smartagenda_telegram',
};

const INITIAL_SERVICES: Service[] = [
  {
    id: 's1',
    name: 'Corte Clássico / Degradê',
    price: 45.0,
    durationMinutes: 30,
    description: 'Corte moderno ou tradicional com acabamento na navalha e lavagem.'
  },
  {
    id: 's2',
    name: 'Barba Terapia',
    price: 35.0,
    durationMinutes: 30,
    description: 'Toalha quente, óleos essenciais, massagem facial e alinhamento perfeito.'
  },
  {
    id: 's3',
    name: 'Combo Master (Corte + Barba)',
    price: 70.0,
    durationMinutes: 60,
    description: 'Pacote completo para renovar o visual com total relaxamento.'
  },
  {
    id: 's4',
    name: 'Sobrancelha na Navalha',
    price: 20.0,
    durationMinutes: 15,
    description: 'Design e alinhamento de sobrancelhas.'
  }
];

const INITIAL_BARBERS: Barber[] = [
  {
    id: 'b1',
    name: 'Carlos "Blade" Silva',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    specialty: 'Degradê & Barba Clássica'
  },
  {
    id: 'b2',
    name: 'Marcos Vinicius',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    specialty: 'Freestyle & Navalhado'
  },
  {
    id: 'b3',
    name: 'Renato Master',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    specialty: 'Cortes Modernos & Pigmentação'
  }
];

const getTodayStr = () => {
  const d = new Date();
  return d.toISOString().split('T')[0];
};

const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'app-1',
    clientName: 'Roberto Carlos',
    clientPhone: '(11) 98888-1111',
    serviceId: 's1',
    barberId: 'b1',
    date: getTodayStr(),
    time: '09:00',
    status: 'confirmed',
    isWalkIn: false
  },
  {
    id: 'app-2',
    clientName: 'Lucas Mendes',
    clientPhone: '(11) 97777-2222',
    serviceId: 's3',
    barberId: 'b2',
    date: getTodayStr(),
    time: '10:00',
    status: 'in_progress',
    isWalkIn: true
  },
  {
    id: 'app-3',
    clientName: 'Fernando Souza',
    clientPhone: '(11) 96666-3333',
    serviceId: 's2',
    barberId: 'b3',
    date: getTodayStr(),
    time: '11:30',
    status: 'pending',
    isWalkIn: false
  }
];

const INITIAL_TELEGRAM: TelegramConfig = {
  botToken: '712345678:AAH1234567890abcdefABCDEFGHIJK',
  chatId: '-1001234567890',
  enabled: true
};

export const getServices = (): Service[] => {
  const data = localStorage.getItem(STORAGE_KEYS.SERVICES);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(INITIAL_SERVICES));
    return INITIAL_SERVICES;
  }
  return JSON.parse(data);
};

export const getBarbers = (): Barber[] => {
  const data = localStorage.getItem(STORAGE_KEYS.BARBERS);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.BARBERS, JSON.stringify(INITIAL_BARBERS));
    return INITIAL_BARBERS;
  }
  return JSON.parse(data);
};

export const getAppointments = (): Appointment[] => {
  const data = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(INITIAL_APPOINTMENTS));
    return INITIAL_APPOINTMENTS;
  }
  return JSON.parse(data);
};

export const saveAppointments = (appointments: Appointment[]) => {
  localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
};

export const getTelegramConfig = (): TelegramConfig => {
  const data = localStorage.getItem(STORAGE_KEYS.TELEGRAM);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.TELEGRAM, JSON.stringify(INITIAL_TELEGRAM));
    return INITIAL_TELEGRAM;
  }
  return JSON.parse(data);
};

export const saveTelegramConfig = (config: TelegramConfig) => {
  localStorage.setItem(STORAGE_KEYS.TELEGRAM, JSON.stringify(config));
};

export const notifyTelegram = (message: string) => {
  const config = getTelegramConfig();
  if (!config.enabled) return;
  console.log(`[TELEGRAM NOTIFICATION SENT] To ChatID: ${config.chatId} | Message: ${message}`);
};