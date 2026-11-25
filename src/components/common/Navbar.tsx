import React from 'react';
import { Scissors, Shield, Calendar, Phone } from 'lucide-react';

interface NavbarProps {
  currentView: 'public' | 'admin';
  onToggleView: (view: 'public' | 'admin') => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onToggleView, onOpenBooking }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#09090b]/90 backdrop-blur-md border-b border-[#27272a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={() => onToggleView('public')}
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-lg shadow-red-600/30 group-hover:scale-105 transition">
            <Scissors className="w-6 h-6 text-white transform -rotate-45" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1">
              Smart<span className="text-red-600">Agenda</span>
            </span>
            <span className="text-xs text-[#a1a1aa] block tracking-wider uppercase">Barber & Club</span>
          </div>
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {currentView === 'public' ? (
            <|
              <button
                onClick={() => onToggleView('admin')}
                className="hidden sm:flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-[#121215] text-[#f4f4f5] border border-[#27272a] hover:border-red-600/50 hover:text-red-500 transition"
              >
                <Shield className="w-4 h-4 text-red-500" />
                <span>Painel Admin</span>
              </button>

              <button
                onClick={onOpenBooking}
                className="flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30 transition transform hover:-translate-y-0.5"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar Horário</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => onToggleView('public')}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#121215] hover:bg-[#27272a] text-[#f4f4f5] border border-[#27272a] transition"
            >
              <span>Ver Site Público</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};