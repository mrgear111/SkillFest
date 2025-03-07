'use client';

import { SignInButton } from "@/components/sign-in-button";
import { ArrowRight, Code, Palette, Sparkles, Zap, Trophy, Users, GitBranch, Star } from "lucide-react";
import Link from "next/link";
import { useState } from 'react';
import { useSession } from "next-auth/react";
import { LoginPopup } from "@/components/login-popup";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0d1117]">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.1]" />
      
      <main className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-20 space-y-6">
          <div className="inline-block">
            <span className="bg-[#F778BA] text-white text-sm font-medium px-4 py-1.5 rounded-full">
              SkillFest 2025 is Live 🚀
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 gradient-text">
            Dev Club Recruitment
          </h1>
          <p className="text-xl text-[#8b949e] max-w-2xl mx-auto">
            Join our elite team of developers, designers, and creators
          </p>

          {/* New: Quick Info Cards */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#161b22] border border-[#30363d]">
              <GitBranch className="w-4 h-4 text-[#238636]" />
              <span className="text-[#8b949e]">30 Days Challenge</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#161b22] border border-[#30363d]">
              <Users className="w-4 h-4 text-[#238636]" />
              <span className="text-[#8b949e]">10 Team Positions</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#161b22] border border-[#30363d]">
              <Trophy className="w-4 h-4 text-[#238636]" />
              <span className="text-[#8b949e]">Direct Team Entry</span>
            </div>
          </div>
          
          {/* New: How to Apply Section */}
          <div className="mt-8 inline-block text-center p-4 rounded-lg bg-[#161b22] border border-[#30363d]">
            <p className="text-[#8b949e] mb-4">
              👉 Sign in with GitHub and choose &quot;Developer&quot; to join SkillFest
            </p>
            <SignInButton />
          </div>

          {/* New: Quick Steps */}
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#238636]/10 flex items-center justify-center text-[#238636] font-medium">1</div>
              <span className="text-[#8b949e]">Sign in</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#238636]/10 flex items-center justify-center text-[#238636] font-medium">2</div>
              <span className="text-[#8b949e]">Select Developer</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#238636]/10 flex items-center justify-center text-[#238636] font-medium">3</div>
              <span className="text-[#8b949e]">Start Contributing</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <CategoryCard
            title="Developer 🚀"
            description="Passionate about development? This is your chance to be part of something bigger!"
            icon={<Code className="w-6 h-6 text-[#238636]" />}
            points={[
              "Prove Your Skills – You have 1 week (Deadline: 17/03/25) to showcase your contributions.",
              "Requirement – Raise at least PRs and get PRs merged to qualify.",
              "Leaderboard Tracking – We will keep track of your progress through our club leaderboard."
            ]}
          />

          <CategoryCard
            title="Fresher 🌟"
            description="You’re welcome here—even if you don’t have much experience in development! If you’re passionate about learning, growing, and making an impact, this is your chance."
            icon={<Code className="w-6 h-6 text-[#238636]" />}
            points={[
              "No prior experience? No problem! We value dedication over expertise.",
              "Make a Difference – Contribute to meaningful initiatives that shape our club.",
              "🚀 Limited seats available! If you're eager to learn and create, apply now."
            ]}
          />

          <div className="flex justify-center w-full md:col-span-2">
            <CategoryCard
              title="🎨 Designer"
              description="Passionate about design? This is your chance!"
              icon={<Palette className="w-6 h-6 text-[#F778BA]" />}
              points={[
                "Task: Design a club logo that represents our vision and identity.",
                "Deadline: Submit your design by 17/03/2025.",
                "Limited Spots: Only the best designs will secure a place."
              ]}
            />
          </div>
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
              A month-long open source contribution program to showcase your skills and join our development team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="p-6 rounded-lg border border-[#30363d] bg-[#161b22] hover:border-[#238636] transition-all duration-300 group">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-[#238636]/10 group-hover:scale-110 transition-transform duration-300">
                  <GitBranch className="w-6 h-6 text-[#238636]" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-1">20+</div>
                  <div className="text-sm text-[#8b949e]">Projects</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-lg border border-[#30363d] bg-[#161b22] hover:border-[#238636] transition-all duration-300 group">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-[#238636]/10 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-6 h-6 text-[#238636]" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-1">30</div>
                  <div className="text-sm text-[#8b949e]">Days Challenge</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-lg border border-[#30363d] bg-[#161b22] hover:border-[#238636] transition-all duration-300 group">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-[#238636]/10 group-hover:scale-110 transition-transform duration-300">
                  <Trophy className="w-6 h-6 text-[#238636]" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-1">10</div>
                  <div className="text-sm text-[#8b949e]">Team Positions</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-lg border border-[#30363d] bg-[#161b22] hover:border-[#238636] transition-all duration-300 group">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-[#238636]/10 group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-6 h-6 text-[#238636]" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-1">100+</div>
                  <div className="text-sm text-[#8b949e]">Contributors</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="p-6 rounded-lg border border-[#30363d] bg-[#161b22] hover:border-[#238636] transition-all duration-300 group">
              <div className="p-3 rounded-lg bg-[#238636]/10 w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                <Code className="w-6 h-6 text-[#238636]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Real Projects</h3>
              <p className="text-[#8b949e] group-hover:text-white transition-colors duration-300">
                Work on actual projects that impact thousands of users. Build your portfolio while making a difference.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-[#30363d] bg-[#161b22] hover:border-[#238636] transition-all duration-300 group">
              <div className="p-3 rounded-lg bg-[#238636]/10 w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 text-[#238636]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Expert Mentorship</h3>
              <p className="text-[#8b949e] group-hover:text-white transition-colors duration-300">
                Get guidance from experienced developers and industry professionals throughout your journey.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-[#30363d] bg-[#161b22] hover:border-[#238636] transition-all duration-300 group">
              <div className="p-3 rounded-lg bg-[#238636]/10 w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                <Trophy className="w-6 h-6 text-[#238636]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Team Membership</h3>
              <p className="text-[#8b949e] group-hover:text-white transition-colors duration-300">
                Top performers get direct entry into the NST SDC team with exciting roles and responsibilities.
              </p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mt-24 relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-[#30363d]" />
            <div className="space-y-16 relative">
              <div className="flex items-center gap-8">
                <div className="w-1/2 text-right">
                  <div className="bg-[#161b22] p-6 rounded-lg border border-[#30363d] hover:border-[#238636] transition-all duration-300 group">
                    <div className="text-sm font-mono text-[#238636] mb-2">March 1</div>
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
                    <div className="text-sm font-mono text-[#238636] mb-2">March 15</div>
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
                    <div className="text-sm font-mono text-[#238636] mb-2">April 15</div>
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
      </main>
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

  const handleClick = (e: React.MouseEvent) => {
    if (!session) {
      e.preventDefault();
      setShowLoginPopup(true);
    } else {
      if (title === "Fresher 🌟") {
        e.preventDefault();
        window.location.href = "/fresher";
      }
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
            title === "Developer 🚀" ? "/skillfest" : 
            title === "🎨 Designer" ? "/creative" :
            title === "Fresher 🌟" ? "/fresher" :
            "/register"
          ) : "#"}
          onClick={handleClick}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-[#238636] to-[#2ea043] hover:from-[#2ea043] hover:to-[#238636] text-white transition-all duration-300 flex items-center justify-center gap-2 transform group-hover:translate-y-[-2px] group-hover:shadow-lg"
        >
          Apply Now 
          <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
        </Link>

        {showLoginPopup && <LoginPopup onClose={() => setShowLoginPopup(false)} />}
      </div>
    </div>
  );
}
