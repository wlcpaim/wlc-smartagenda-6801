import React, { useState } from 'react';
import LandingPage from './components/public/LandingPage';
import AdminLayout from './components/admin/AdminLayout';
import { Shield, Scissors } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'public' | 'admin'>('public');

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] flex flex-col">
      {/* Top Bar Switcher for Demo Purposes */}
      <div className="bg-[#121215] border-b border-zinc-800 px-4 py-2 text-xs flex justify-between items-center z-50">
        <div className="flex items-center gap-2 font-medium text-zinc-400">
          <Scissors className="w-4 h-4 text-red-600" />
          <span>SmartAgenda v1.9.9</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentView('public')}
            className={`px-3 py-1 rounded transition-colors flex items-center gap-1.5 ${
              currentView === 'public'
                ? 'bg-red-600 text-white font-semibold'
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            Landing Page
          </button>
          <button
            onClick={() => setCurrentView('admin')}
            className={`px-3 py-1 rounded transition-colors flex items-center gap-1.5 ${
              currentView === 'admin'
                ? 'bg-red-600 text-white font-semibold'
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            Painel Admin
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {currentView === 'public' ? <LandingPage /> : <AdminLayout />}
      </div>
    </div>
  );
}
