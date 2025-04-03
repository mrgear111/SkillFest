'use client';

import { useSession } from "next-auth/react";
import { ArrowLeft, ExternalLink, Search, Filter, Github, GitPullRequest } from "lucide-react";
import Link from "next/link";
import { SignInButton } from "@/components/sign-in-button";
import { useEffect, useState } from "react";

// Add the Issue type definition
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

export default function Issues() {
  const { data: session, status } = useSession();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(false);

  // Add the fetchIssues function
  useEffect(() => {
    if (session?.accessToken) {
      fetchIssues(session.accessToken);
    }
  }, [session]);

  const fetchIssues = async (token: string) => {
    setLoading(true);
    try {
      const response = await fetch('https://api.github.com/orgs/nst-sdc/issues', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      });
      
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      
      const data = await response.json();
      setIssues(data);
    } catch (error) {
      console.error('Error fetching issues:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.15]" />
      
      <main className="container mx-auto px-4 py-16 relative z-10">
        <Link 
          href="/skillfest"
          className="inline-flex items-center gap-2 text-[#8b949e] hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to SkillFest
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4 text-foreground">Available Challenges</h1>
            <p className="text-[#8b949e]">Choose an issue to start contributing</p>
          </div>

          {status === 'loading' ? (
            <LoadingState />
          ) : !session ? (
            <SignInPrompt />
          ) : (
            <div className="space-y-8">
              <div className="p-6 rounded-lg border border-[#30363d] bg-[#161b22]">
                <div className="flex gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b949e]" />
                    <input
                      type="text"
                      placeholder="Search issues..."
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#1f2428] border border-[#30363d] text-white focus:outline-none focus:border-[#238636]"
                    />
                  </div>
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b949e]" />
                    <select className="pl-10 pr-4 py-2 rounded-lg bg-[#1f2428] border border-[#30363d] text-white focus:outline-none focus:border-[#238636] appearance-none">
                      <option value="all">All Difficulties</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  {loading ? (
                    <LoadingState />
                  ) : issues.length > 0 ? (
                    issues.map((issue) => (
                      <IssueCard key={issue.id} issue={issue} />
                    ))
                  ) : (
                    <EmptyState />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
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

function IssueCard({ issue }: { issue: Issue }) {
  return (
    <a 
      href={issue.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 rounded-lg border border-[#30363d] bg-[#161b22] hover:border-[#238636] transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-white font-medium mb-2">{issue.title}</h3>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-[#8b949e]">{issue.repository.name}</span>
            <div className="flex items-center gap-2">
              {issue.labels.map((label) => (
                <span
                  key={label.name}
                  className="px-2 py-0.5 rounded-full text-xs"
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
          </div>
        </div>
        <ExternalLink className="w-4 h-4 text-[#8b949e]" />
      </div>
    </a>
  );
} 