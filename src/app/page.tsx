'use client';

import { ArrowRight, Code, Sparkles, Zap, Trophy, Users, GitPullRequest, Check } from "lucide-react";
import Link from "next/link";
import { useState } from 'react';
import { useSession } from "next-auth/react";
import { LoginPopup } from "@/components/login-popup";
import { useRouter } from "next/navigation";
import { testFirebaseConnection } from "@/lib/firebase";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0d1117]">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.1]" />
      
      <main className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-20 space-y-6">
          <div className="inline-block">
            <span className="bg-[#30363d] text-[#8b949e] text-sm font-medium px-4 py-1.5 rounded-full flex items-center gap-2">
              <Trophy className="w-4 h-4 text-[#238636]" />
              SkillFest 2025 Has Concluded 🎉
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 gradient-text">
            SkillFest 2025
          </h1>
          <p className="text-xl text-[#8b949e] max-w-2xl mx-auto">
            Thank you to all participants! Selected candidates will be announced soon.
          </p>

          {/* Results Summary */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#161b22] border border-[#30363d]">
              <Trophy className="w-4 h-4 text-[#238636]" />
              <span className="text-[#8b949e]">15 Selected</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#161b22] border border-[#30363d]">
              <GitPullRequest className="w-4 h-4 text-[#238636]" />
              <span className="text-[#8b949e]">508+ Points Earned</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#161b22] border border-[#30363d]">
              <Users className="w-4 h-4 text-[#238636]" />
              <span className="text-[#8b949e]">Amazing Contributions</span>
            </div>
          </div>
          
          {/* View Results Button */}
          <div className="mt-8 inline-block text-center">
            <Link 
              href="/skillfest/leaderboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#161b22] border border-[#238636] text-white hover:bg-[#238636]/10 transition-all duration-300"
            >
              <Trophy className="w-5 h-5" />
              View Final Results
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Program Information - ENHANCED */}
        <div className="mt-16 mb-24 max-w-5xl mx-auto relative">
          {/* Background elements */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#238636]/10 rounded-full blur-3xl opacity-30" />
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#A371F7]/10 rounded-full blur-3xl opacity-30" />
          
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-[#238636] via-white to-[#A371F7] inline-block text-transparent bg-clip-text">Final Results</h2>
            <p className="text-[#8b949e] max-w-2xl mx-auto">Congratulations to all participants for their amazing contributions!</p>
          </div>
          
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#161b22] to-[#0d1117] border border-[#30363d] shadow-xl relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#238636] to-[#A371F7]" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#238636]/5 rounded-full blur-2xl" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#A371F7]/5 rounded-full blur-2xl" />
            
            <div className="grid md:grid-cols-2 gap-10">
              {/* Developer Card */}
              <div className="group relative p-6 rounded-xl bg-[#0d1117]/70 border border-[#30363d] hover:border-[#238636] transition-all duration-300 overflow-hidden">
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#238636]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 rounded-full bg-[#238636]/10 transform group-hover:scale-110 transition-transform duration-300">
                      <Code className="w-7 h-7 text-[#238636]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">Developer Program</h3>
                      <div className="h-1 w-16 bg-[#238636] rounded-full transform origin-left group-hover:scale-x-125 transition-transform duration-300" />
                    </div>
                  </div>
                  
                  <div className="absolute top-2 right-2 px-3 py-1 rounded-full bg-[#238636]/10 text-[#238636] text-xs font-medium">
                    15 positions
                  </div>
                  
                  <p className="text-[#8b949e] mb-6 group-hover:text-white transition-colors duration-300">
                    For those with web development or programming experience. Join the SkillFest challenge to compete for a developer position.
                  </p>
                  
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3 text-[#8b949e] group-hover:text-white transition-colors duration-300">
                      <div className="p-1 mt-0.5 rounded-full bg-[#238636]/20 flex-shrink-0">
                        <Check className="w-3 h-3 text-[#238636]" />
                      </div>
                      <span>Contribute to real open source projects</span>
                    </li>
                    <li className="flex items-start gap-3 text-[#8b949e] group-hover:text-white transition-colors duration-300">
                      <div className="p-1 mt-0.5 rounded-full bg-[#238636]/20 flex-shrink-0">
                        <Check className="w-3 h-3 text-[#238636]" />
                      </div>
                      <span>Compete in the leaderboard challenge</span>
                    </li>
                    <li className="flex items-start gap-3 text-[#8b949e] group-hover:text-white transition-colors duration-300">
                      <div className="p-1 mt-0.5 rounded-full bg-[#238636]/20 flex-shrink-0">
                        <Check className="w-3 h-3 text-[#238636]" />
                      </div>
                      <span>Showcase your existing skills</span>
                    </li>
                  </ul>
                  
                  <div className="pt-4 border-t border-[#30363d]">
                    <div className="flex items-center gap-2 text-[#8b949e]">
                      <Trophy className="w-4 h-4 text-[#238636]" />
                      <span>Top performers selected based on contributions</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Fresher Developer Card */}
              <div className="group relative p-6 rounded-xl bg-[#0d1117]/70 border border-[#30363d] hover:border-[#A371F7] transition-all duration-300 overflow-hidden">
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#A371F7]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 rounded-full bg-[#A371F7]/10 transform group-hover:scale-110 transition-transform duration-300">
                      <GitPullRequest className="w-7 h-7 text-[#A371F7]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">Fresher Developer</h3>
                      <div className="h-1 w-16 bg-[#A371F7] rounded-full transform origin-left group-hover:scale-x-125 transition-transform duration-300" />
                    </div>
                  </div>
                  
                  <div className="absolute top-2 right-2 px-3 py-1 rounded-full bg-[#30363d] text-[#8b949e] text-xs font-medium">
                    Applications Closed
                  </div>
                  
                  <p className="text-[#8b949e] mb-6 group-hover:text-white transition-colors duration-300">
                    Applications for the Fresher Developer program are now closed. Thank you for your interest!
                  </p>
                  
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3 text-[#8b949e] group-hover:text-white transition-colors duration-300">
                      <div className="p-1 mt-0.5 rounded-full bg-[#A371F7]/20 flex-shrink-0">
                        <Check className="w-3 h-3 text-[#A371F7]" />
                      </div>
                      <span>Selected candidates will be announced soon</span>
                    </li>
                    <li className="flex items-start gap-3 text-[#8b949e] group-hover:text-white transition-colors duration-300">
                      <div className="p-1 mt-0.5 rounded-full bg-[#A371F7]/20 flex-shrink-0">
                        <Check className="w-3 h-3 text-[#A371F7]" />
                      </div>
                      <span>Stay tuned for future opportunities</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-[#8b949e]">
                Choose the path that best fits your current skill level and career goals
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <CategoryCard
            title="Developer"
            description="Join our development team and contribute to exciting projects"
            icon={<Code className="w-6 h-6 text-[#238636]" />}
            points={[
              "Work on real-world projects",
              "Learn modern technologies",
              "Collaborate with other developers"
            ]}
          />
          
          <CategoryCard
            title="Fresher Developer"
            description="Join our team as a new developer and learn while you contribute"
            icon={<Code className="w-6 h-6 text-[#A371F7]" />}
            points={[
              "No experience required",
              "Learn from senior developers",
              "Work on beginner-friendly tasks"
            ]}
          />
        </div>

        <div className="mt-32 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-[#238636]/10 text-[#238636] rounded-full text-sm font-medium mb-4">
              About SkillFest
            </span>
            <h2 className="text-4xl font-bold mb-4 text-foreground bg-gradient-to-r from-[#238636] to-[#2ea043] text-transparent bg-clip-text">
              What is SkillFest?
            </h2>
            <p className="text-xl text-[#8b949e] max-w-2xl mx-auto">
              A week-long open source contribution program to showcase your open source skills and join our development team
            </p>
          </div>

          <div className="max-w-4xl mx-auto mt-24 relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-[#30363d]" />
            <div className="space-y-16 relative">
              <div className="flex items-center gap-8">
                <div className="w-1/2 text-right">
                  <div className="bg-[#161b22] p-6 rounded-lg border border-[#30363d] hover:border-[#238636] transition-all duration-300 group">
                    <div className="text-sm font-mono text-[#238636] mb-2">March 30</div>
                    <h3 className="text-lg font-bold text-white mb-2">Registration Opens</h3>
                    <p className="text-[#8b949e] group-hover:text-white transition-colors duration-300">
                      Sign up and choose your track - Developer or Creative Lead
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="w-4 h-4 rounded-full bg-[#238636] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  <div className="w-6 h-6 rounded-full bg-[#238636]/30 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ping" />
                </div>
                <div className="w-1/2" />
              </div>

              <div className="flex items-center gap-8 flex-row-reverse">
                <div className="w-1/2">
                  <div className="bg-[#161b22] p-6 rounded-lg border border-[#30363d] hover:border-[#238636] transition-all duration-300 group">
                    <div className="text-sm font-mono text-[#238636] mb-2"></div>
                    <h3 className="text-lg font-bold text-white mb-2">Contribution Phase</h3>
                    <p className="text-[#8b949e] group-hover:text-white transition-colors duration-300">
                      Start working on issues and submitting pull requests
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="w-4 h-4 rounded-full bg-[#238636] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  <div className="w-6 h-6 rounded-full bg-[#238636]/30 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ping" />
                </div>
                <div className="w-1/2" />
              </div>

              <div className="flex items-center gap-8">
                <div className="w-1/2 text-right">
                  <div className="bg-[#161b22] p-6 rounded-lg border border-[#30363d] hover:border-[#238636] transition-all duration-300 group">
                    <div className="text-sm font-mono text-[#238636] mb-2">April 5</div>
                    <h3 className="text-lg font-bold text-white mb-2">Final Evaluation</h3>
                    <p className="text-[#8b949e] group-hover:text-white transition-colors duration-300">
                      Top contributors will be selected for the team
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="w-4 h-4 rounded-full bg-[#238636] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  <div className="w-6 h-6 rounded-full bg-[#238636]/30 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ping" />
                </div>
                <div className="w-1/2" />
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={async () => {
            const result = await testFirebaseConnection();
            alert(result ? "Firebase connection successful!" : "Firebase connection failed!");
          }}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Test Firebase Connection
        </button>
      </main>
    </div>
  );
}

function ApplyLoadingScreen() {
  return (
    <div className="fixed inset-0 bg-[#0d1117]/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="relative">
        <div className="absolute inset-0 bg-[#238636]/20 rounded-full blur-[100px] animate-pulse" />
        
        <div className="relative bg-[#161b22] border border-[#30363d] rounded-xl p-12">
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 bg-[#238636]/20 rounded-full blur-xl animate-pulse" />
              <div className="relative bg-[#161b22] p-4 rounded-full border-2 border-[#238636]">
                <Code className="w-12 h-12 text-[#238636]" />
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-2">Setting up your workspace</h3>
              <p className="text-[#8b949e]">Preparing your development environment</p>
            </div>

            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-[#238636] animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 rounded-full bg-[#238636] animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 rounded-full bg-[#238636] animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryCard({ 
  title, 
  description, 
  icon,
  points 
}: { 
  title: string;
  description: string;
  icon: React.ReactNode;
  points: string[];
}) {
  const { data: session } = useSession();
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    if (!session) {
      e.preventDefault();
      setShowLoginPopup(true);
      return;
    }

    if (title === "Developer") {
      e.preventDefault();
      setShowLoading(true);
      setTimeout(() => {
        router.push('/skillfest');
      }, 2000);
    } else if (title === "Fresher Developer") {
      e.preventDefault();
      router.push('/fresher-application');
    }
  };

  return (
    <div 
      className="group relative p-8 rounded-xl border border-[#30363d] bg-[#161b22] hover:border-[#8b949e] transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#238636]/10 via-transparent to-[#F778BA]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Sparkle effects */}
      <div className="absolute -top-10 -right-10 transform rotate-45 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
        <Sparkles className="w-20 h-20 text-white" />
      </div>

      <div className="relative">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-xl bg-[#1f2428] transform group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">{title}</h3>
            <div className="h-1 w-12 bg-gradient-to-r from-[#238636] to-[#F778BA] rounded-full transform origin-left group-hover:scale-x-150 transition-transform duration-300" />
          </div>
        </div>

        {/* Description */}
        <p className="text-[#8b949e] mb-8 group-hover:text-white transition-colors duration-300">
          {description}
        </p>

        {/* Points */}
        <ul className="space-y-4 mb-8">
          {points.map((point, index) => (
            <li 
              key={index} 
              className="flex items-center gap-3 text-[#8b949e] group-hover:text-white transition-all duration-300"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Zap className="w-4 h-4 text-[#238636] group-hover:scale-125 transition-transform duration-300" />
              {point}
            </li>
          ))}
        </ul>

        {/* Apply Button */}
        <Link 
          href={session ? (
            title === "Developer" ? "/skillfest" : 
            title === "Creative Lead" ? "/creative" :
            "/register"
          ) : "#"}
          onClick={handleClick}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-[#238636] to-[#2ea043] hover:from-[#2ea043] hover:to-[#238636] text-white transition-all duration-300 flex items-center justify-center gap-2 transform group-hover:translate-y-[-2px] group-hover:shadow-lg"
        >
          Apply Now 
          <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
        </Link>

        {showLoginPopup && <LoginPopup onClose={() => setShowLoginPopup(false)} />}

        {showLoading && <ApplyLoadingScreen />}
      </div>
    </div>
  );
}
