'use client';

import { signIn } from "next-auth/react";
import { Github, X, Rocket, Code, Star } from "lucide-react";
import { useEffect } from "react";

export function LoginPopup({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Animated backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-[#161b22] border border-[#30363d] rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
        {/* Animated gradient border */}
        <div className="absolute inset-px bg-gradient-to-r from-[#238636] via-[#2ea043] to-[#238636] opacity-50 animate-pulse" />
        
        <div className="relative p-6">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-[#8b949e] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-8">
            <div className="relative w-24 h-24 mx-auto mb-6">
              {/* Animated rings */}
              <div className="absolute inset-0 rounded-full border-4 border-[#238636]/20 animate-ping" />
              <div className="absolute inset-0 rounded-full border-4 border-[#238636]/40 animate-pulse" />
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#238636] to-[#2ea043] flex items-center justify-center">
                <Rocket className="w-12 h-12 text-white animate-bounce" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Join SkillFest 2025</h2>
            <p className="text-[#8b949e]">
              Sign in with GitHub to start your journey and showcase your skills
            </p>
          </div>

          <div className="space-y-6">
            <button
              onClick={() => signIn('github')}
              className="w-full py-3 px-4 rounded-lg bg-[#238636] hover:bg-[#2ea043] text-white font-medium transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 group"
            >
              <Github className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Continue with GitHub
            </button>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-[#1f2428] border border-[#30363d]">
                <Code className="w-5 h-5 text-[#238636] mb-2" />
                <p className="text-sm text-white font-medium">Solve Challenges</p>
                <p className="text-xs text-[#8b949e]">Work on real issues</p>
              </div>
              <div className="p-3 rounded-lg bg-[#1f2428] border border-[#30363d]">
                <Star className="w-5 h-5 text-[#238636] mb-2" />
                <p className="text-sm text-white font-medium">Get Selected</p>
                <p className="text-xs text-[#8b949e]">Join the club</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-[#30363d]">
            <div className="flex items-center gap-3 text-xs text-[#8b949e]">
              <Github className="w-4 h-4 text-[#238636]" />
              <span>Powered by GitHub OAuth</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 