'use client';

import { useSession } from "next-auth/react";
import { ArrowLeft, Github, Code, GitPullRequest, ExternalLink, Trophy } from "lucide-react";
import Link from "next/link";
import { SignInButton } from "@/components/sign-in-button";
import { useEffect, useState } from "react";
import { LoginPopup } from "@/components/login-popup";
import Image from 'next/image';

type Issue = {
  id: number;
  title: string;
  html_url: string;
  repository: {
    name: string;
  };
  labels: {
    name: string;
    color: string;
  }[];
};

// Update the session type to include accessToken
declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

// First, add a type for the user data
type UserData = {
  login: string;
  stats: {
    totalPRs: number;
    mergedPRs: number;
  };
};

export default function SkillFest() {
  const { data: session } = useSession();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [topUsers, setTopUsers] = useState<Array<{
    login: string;
    stats: {
      totalPRs: number;
      mergedPRs: number;
    };
  }>>([]);

  useEffect(() => {
    if (session?.accessToken) {
      fetchIssues(session.accessToken);
      
      // Set up periodic refresh every 30 seconds
      const refreshInterval = setInterval(() => {
        fetchIssues(session.accessToken!);
      }, 30000);

      return () => clearInterval(refreshInterval);
    }
  }, [session]);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const response = await fetch('/api/logged-in-users');
        if (!response.ok) throw new Error('Failed to fetch users');
        
        const users = await response.json() as UserData[];
        
        // Use the UserData type for sorting
        const sortedUsers = users.sort((a: UserData, b: UserData) => {
          if (b.stats.mergedPRs !== a.stats.mergedPRs) {
            return b.stats.mergedPRs - a.stats.mergedPRs;
          }
          return b.stats.totalPRs - a.stats.totalPRs;
        });

        setTopUsers(sortedUsers.slice(0, 3));
      } catch (error) {
        console.error('Error fetching top users:', error);
      }
    };

    fetchTopUsers();
  }, []);

  const fetchIssues = async (token: string) => {
    setLoading(true);
    try {
      // First, get all repositories (both public and private)
      const reposResponse = await fetch('https://api.github.com/orgs/nst-sdc/repos?type=all&per_page=100', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
        },
        cache: 'no-store',
      });

      if (!reposResponse.ok) {
        throw new Error(`GitHub API error: ${reposResponse.status}`);
      }

      const repos: Array<{ name: string }> = await reposResponse.json();
      console.log('Found repositories:', repos.map(r => r.name)); // Debug log
      
      // Then, fetch issues from each repository
      const allIssuesPromises = repos.map(async (repo: { name: string }) => {
        const issuesResponse = await fetch(
          `https://api.github.com/repos/nst-sdc/${repo.name}/issues?state=open&per_page=100&sort=created&direction=desc`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github.v3+json',
          },
          cache: 'no-store',
        });
        
        if (issuesResponse.ok) {
          const issues = await issuesResponse.json() as Issue[];
          return issues.map((issue: Issue) => ({
            ...issue,
            repository: {
              name: repo.name,
            },
          }));
        }
        console.error(`Failed to fetch issues for ${repo.name}:`, issuesResponse.status);
        return [];
      });

      const allIssues = await Promise.all(allIssuesPromises);
      const flattenedIssues = allIssues.flat();
      console.log('Total issues found:', flattenedIssues.length); // Debug log
      setIssues(flattenedIssues);
    } catch (error) {
      console.error('Error fetching issues:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117]">
      {/* Background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.1]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#238636]/10 via-transparent to-transparent" />
      </div>

      <main className="relative max-w-7xl mx-auto px-4 py-8">
        {/* Back button */}
        <div className="mb-16">
          <Link 
            href="/"
            className="group inline-flex items-center gap-3 relative overflow-hidden px-4 py-2 rounded-lg bg-[#161b22] border border-[#30363d] hover:border-[#238636] transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 text-[#238636] group-hover:-translate-x-1 transition-transform" />
            <span className="text-[#8b949e] group-hover:text-white transition-colors">Back to home</span>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="relative min-h-[70vh] flex items-center justify-center -mt-8">
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#238636]/10 rounded-full blur-[100px] animate-pulse" />
          </div>

          <div className="relative text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#238636]/10 border border-[#238636]/20">
              <div className="w-2 h-2 rounded-full bg-[#238636] animate-pulse" />
              <span className="text-[#238636] font-medium">SkillFest 2025 is now live</span>
            </div>

            {/* Title */}
            <div className="space-y-6">
              <h1 className="text-7xl md:text-8xl font-bold tracking-tight">
                <span className="text-white">Developer</span>
                <br />
                <span className="text-[#238636]">Challenge</span>
              </h1>
              <p className="text-xl text-[#8b949e] max-w-2xl mx-auto">
                Join our elite development team through a 
                <span className="text-white"> month-long </span> 
                open source contribution program
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mt-12">
              <StatsBox number="15" label="Positions" />
              <StatsBox number={issues.length.toString()} label="Challenges" />
              <StatsBox number="30" label="Days" />
            </div>
          </div>
        </div>

        {/* Leaderboard Banner */}
        <div className="mb-24">
          <Link 
            href="/skillfest/leaderboard"
            className="group block relative overflow-hidden rounded-xl border border-[#30363d] bg-[#161b22]/95 p-8 hover:border-[#238636] transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <Trophy className="w-12 h-12 text-[#238636]" />
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-white">View Leaderboard</h2>
                    <span className="px-2 py-1 text-xs rounded-full bg-[#238636]/10 text-[#238636] border border-[#238636]/20">
                      Live
                    </span>
                  </div>
                  <p className="text-[#8b949e]">Track your progress • Top 15 qualify</p>
                </div>
              </div>
              <ArrowLeft className="w-6 h-6 text-[#238636] rotate-180 group-hover:translate-x-2 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Leaderboard Preview */}
        <div className="mb-24 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Leaderboard Preview</h2>
          <p className="text-[#8b949e] mb-16">Top contributors of the challenge</p>

          <div className="flex justify-center items-center gap-32">
            {/* 2nd Place */}
            <div className="text-center">
              <div className="text-[#8b949e] mb-4">2nd Place</div>
              <Image
                src={`https://github.com/${topUsers[1]?.login || 'ghost'}.png`}
                alt={topUsers[1]?.login || 'Coming Soon'}
                width={96}
                height={96}
                className="rounded-full border-4 border-[#238636] mb-4"
              />
              <div className="text-white text-xl mb-2">{topUsers[1]?.login || 'Coming Soon'}</div>
              <div className="text-[#238636]">
                {topUsers[1] ? `${topUsers[1].stats.mergedPRs}/${topUsers[1].stats.totalPRs} PRs` : '0 PRs'}
              </div>
            </div>

            {/* 1st Place */}
            <div className="text-center">
              <Trophy className="w-8 h-8 text-[#238636] mx-auto mb-2" />
              <div className="text-[#238636] mb-4">1st Place</div>
              <Image
                src={`https://github.com/${topUsers[0]?.login || 'ghost'}.png`}
                alt={topUsers[0]?.login || 'Coming Soon'}
                width={120}
                height={120}
                className="rounded-full border-4 border-[#238636] mb-4"
              />
              <div className="text-white text-xl mb-2">{topUsers[0]?.login || 'Coming Soon'}</div>
              <div className="text-[#238636]">
                {topUsers[0] ? `${topUsers[0].stats.mergedPRs}/${topUsers[0].stats.totalPRs} PRs` : '0 PRs'}
              </div>
            </div>

            {/* 3rd Place */}
            <div className="text-center">
              <div className="text-[#8b949e] mb-4">3rd Place</div>
              <Image
                src={`https://github.com/${topUsers[2]?.login || 'ghost'}.png`}
                alt={topUsers[2]?.login || 'Coming Soon'}
                width={96}
                height={96}
                className={`rounded-full border-4 ${topUsers[2] ? 'border-[#238636]' : 'border-[#30363d]'} mb-4`}
              />
              <div className="text-white text-xl mb-2">{topUsers[2]?.login || 'Coming Soon'}</div>
              <div className={topUsers[2] ? 'text-[#238636]' : 'text-[#8b949e]'}>
                {topUsers[2] ? `${topUsers[2].stats.mergedPRs}/${topUsers[2].stats.totalPRs} PRs` : '0 PRs'}
              </div>
            </div>
          </div>

          <Link 
            href="/skillfest/leaderboard"
            className="inline-flex items-center gap-2 text-[#238636] hover:text-white transition-colors mt-12"
          >
            View Complete Leaderboard
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>

        {/* Show loading state while fetching */}
        {loading && <LoadingState />}

        {/* Show sign in prompt if no session */}
        {!session && <SignInPrompt />}

        {/* Show empty state if no issues */}
        {session && issues.length === 0 && !loading && <EmptyState />}

        {/* Show issues if available */}
        {session && issues.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {issues.map(issue => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        )}
      </main>

      {showLoginPopup && <LoginPopup onClose={() => setShowLoginPopup(false)} />}
    </div>
  );
}

function StatsBox({ number, label }: { number: string; label: string }) {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-[#238636]/20 to-[#2ea043]/20 rounded-xl blur group-hover:opacity-100 transition-opacity" />
      <div className="relative p-4 bg-[#161b22]/80 backdrop-blur-sm rounded-xl border border-[#30363d]">
        <div className="text-3xl font-bold text-white mb-1">{number}</div>
        <div className="text-sm text-[#8b949e]">{label}</div>
      </div>
    </div>
  );
}

function IssueCard({ issue }: { issue: Issue }) {
  return (
    <a
      href={issue.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block relative overflow-hidden rounded-xl bg-[#161b22] border border-[#30363d] hover:border-[#238636] transition-all duration-300"
    >
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#238636] transition-colors">
          {issue.title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-[#8b949e]">
          <Code className="w-4 h-4" />
          <span>{issue.repository.name}</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {issue.labels.map(label => (
            <span
              key={label.name}
              className="px-2 py-1 text-xs rounded-full"
              style={{
                backgroundColor: `#${label.color}20`,
                color: `#${label.color}`,
                border: `1px solid #${label.color}40`
              }}
            >
              {label.name}
            </span>
          ))}
        </div>
        <ExternalLink className="absolute top-6 right-6 w-5 h-5 text-[#8b949e] opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </a>
  );
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center h-40">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#238636]" />
    </div>
  );
}

function SignInPrompt() {
  return (
    <div className="text-center">
      <div className="max-w-sm mx-auto p-8 rounded-lg border border-[#30363d] bg-[#161b22] backdrop-blur-sm">
        <Github className="w-16 h-16 text-[#8b949e] mx-auto mb-6" />
        <h3 className="text-xl font-bold text-white mb-4">Join SkillFest 2025</h3>
        <p className="text-[#8b949e] mb-6">
          Sign in with GitHub to start your journey and track your progress
        </p>
        <SignInButton />
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-12 text-[#8b949e]">
      <GitPullRequest className="w-12 h-12 mx-auto mb-4 opacity-50" />
      <p className="text-lg">No open issues available at the moment.</p>
      <p className="text-sm">Check back soon for new challenges!</p>
    </div>
  );
} 