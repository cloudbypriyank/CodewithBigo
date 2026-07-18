import React from 'react';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {ClerkProvider} from '@clerk/clerk-react';
import {Cpu} from 'lucide-react';
import App from './App.tsx';
import './index.css';

// Retrieve the Clerk publishable key from environment variables
const PUBLISHABLE_KEY = (import.meta as any).env?.VITE_CLERK_PUBLISHABLE_KEY;

function ClerkWrapper({ children }: { children: React.ReactNode }) {
  if (!PUBLISHABLE_KEY) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Mesh background from design theme */}
        <div className="mesh-bg absolute inset-0 z-0 opacity-40 pointer-events-none" />
        
        <div className="relative z-10 bg-slate-900/60 border border-indigo-500/10 backdrop-blur-xl max-w-md w-full p-8 rounded-3xl text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Cpu className="w-8 h-8 text-white" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold tracking-tight font-display text-white">
              Big <span className="text-indigo-400 font-normal italic font-sans text-xl">O(n)</span>
            </h1>
            <p className="text-xs text-slate-400">
              Interactive logic frames & Live trace engine
            </p>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 text-left space-y-2">
            <h4 className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
              ⚠️ Clerk Publishable Key Required
            </h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              To activate user sign-in and start playing, please add your Clerk Publishable Key to the environment secrets as <code className="bg-black/40 px-1.5 py-0.5 rounded text-indigo-300 font-mono">VITE_CLERK_PUBLISHABLE_KEY</code>.
            </p>
          </div>

          <p className="text-[10px] text-slate-500">
            Once configured, the app will instantly reload and unlock!
          </p>
        </div>
      </div>
    );
  }

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      {children}
    </ClerkProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkWrapper>
      <App />
    </ClerkWrapper>
  </StrictMode>,
);
