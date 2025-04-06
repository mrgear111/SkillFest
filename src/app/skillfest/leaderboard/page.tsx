'use client';

import { useSession } from "next-auth/react";
import { ArrowLeft, Trophy, Star, Award, Lock } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import Image from 'next/image';

type Contributor = {
  login: string;
  avatar_url: string;
  html_url: string;
  rank?: number;
  hasLoggedIn?: boolean;
  contributions?: number;
  points?: number;
  level?: string;
  pullRequests: {
    total: number;
    merged: number;
    orgTotal?: number;
    orgMerged?: number;
  };
};

// Add leaderboard settings type
type LeaderboardSettings = {
  visible: boolean;
  lastUpdated: string;
};

export default function Leaderboard() {
  const { data: session } = useSession();
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [leaderboardSettings, setLeaderboardSettings] = useState<LeaderboardSettings>({
    visible: true,
    lastUpdated: ''
  });
  const [leaderboardVisible, setLeaderboardVisible] = useState(true);

  // Fetch leaderboard settings
  const fetchLeaderboardSettings = useCallback(async () => {
    try {
      const response = await fetch('/api/leaderboard-settings');
      const data = await response.json();
      
      // Ensure visibility is treated as a boolean
      setLeaderboardSettings({
        visible: data.visible === true,
        lastUpdated: data.lastUpdated
      });
      
      setLeaderboardVisible(data.visible === true);
      
      // If leaderboard is hidden, don't bother fetching users
      if (!data.visible) {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching leaderboard settings", error);
      setLoading(false);
    }
  }, []);

  const fetchUsers = useCallback(async () => {
    // Return final list of users instead of fetching
    const finalUsers = [
      {
        login: "SravanthDev",
        points: 508,
        level: "Expert",
        rank: 1
      },
      {
        login: "prempyla",
        points: 212,
        level: "Advanced",
        rank: 2
      },
      {
        login: "RithwikBejadi",
        points: 209,
        level: "Advanced",
        rank: 3
      },
      {
        login: "Jadu07",
        points: 180,
        level: "Advanced",
        rank: 4
      },
      {
        login: "sammy200-ui",
        points: 132,
        level: "Intermediate",
        rank: 5
      },
      {
        login: "quick-harsh",
        points: 104,
        level: "Intermediate",
        rank: 6
      },
      {
        login: "parth10P",
        points: 104,
        level: "Intermediate",
        rank: 7
      },
      {
        login: "shalini-saloni",
        points: 85,
        level: "Intermediate",
        rank: 8
      },
      {
        login: "Rudrxxx",
        points: 84,
        level: "Intermediate",
        rank: 9
      },
      {
        login: "hk2166",
        points: 56,
        level: "Beginner",
        rank: 10
      },
      {
        login: "NssGourav",
        points: 56,
        level: "Beginner",
        rank: 11
      },
      {
        login: "mrsandy1965",
        points: 28,
        level: "Beginner",
        rank: 12
      },
      {
        login: "ananyapandey9895",
        points: 28,
        level: "Beginner",
        rank: 13
      },
      {
        login: "manameaaus",
        points: 8,
        level: "Newcomer",
        rank: 14
      },
      {
        login: "GreenHacker04",
        points: 7,
        level: "Newcomer",
        rank: 15
      }
    ];

    const mappedUsers = finalUsers.map(user => ({
      login: user.login,
      avatar_url: `https://avatars.githubusercontent.com/${user.login}`,
      html_url: `https://github.com/${user.login}`,
      rank: user.rank,
      points: user.points,
      level: user.level,
      pullRequests: {
        total: 0,
        merged: 0,
        orgTotal: 0,
        orgMerged: 0
      }
    }));

    setContributors(mappedUsers);
    setLoading(false);
  }, []);

  // Refresh user stats
  const refreshUserStats = async () => {
    // Don't allow refreshing if leaderboard is hidden
    if (!leaderboardVisible) {
      return;
    }
    
    setRefreshing(true);
    try {
      const response = await fetch('/api/refresh-stats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to refresh stats');
      }
      
      // Refetch users after refreshing
      fetchUsers();
      
    } catch (error) {
      console.error('Error refreshing stats', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    // First fetch the leaderboard settings
    fetchLeaderboardSettings().then(() => {
      // Only fetch users if leaderboard is visible
      if (leaderboardVisible) {
        setLoading(true); // Set loading before fetching
        fetchUsers();
      } else {
        setLoading(false);
      }
    });
  }, [fetchLeaderboardSettings, fetchUsers, leaderboardVisible]);

  // Find the current user's rank
  const currentUser = session?.user?.name;
  const userRank = contributors.find(c => c.login === currentUser)?.rank || null;

  return (
    <div className="min-h-screen bg-[#0d1117]">
      <main className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-[#8b949e] hover:text-white mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to SkillFest</span>
        </Link>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">SkillFest Leaderboard</h1>
          <p className="text-[#8b949e] mt-2">Congratulations to all participants! 🎉</p>
          
          {/* Add congratulatory banner */}
          <div className="mt-8 p-6 bg-gradient-to-r from-[#F778BA]/20 to-[#30363d] rounded-lg border border-[#F778BA]/30">
            <h2 className="text-2xl font-bold text-white mb-4">🏆 Final Results!</h2>
            <p className="text-[#8b949e] mb-6">Thank you to everyone who participated in SkillFest. Your contributions have been amazing!</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Gold Winner */}
              <div className="bg-[#161b22] p-4 rounded-lg border border-yellow-600/30">
                <div className="text-4xl mb-2">🥇</div>
                <div className="font-bold text-yellow-400">SravanthDev</div>
                <div className="text-[#8b949e]">508 points</div>
              </div>
              
              {/* Silver Winner */}
              <div className="bg-[#161b22] p-4 rounded-lg border border-gray-400/30">
                <div className="text-4xl mb-2">🥈</div>
                <div className="font-bold text-gray-400">prempyla</div>
                <div className="text-[#8b949e]">212 points</div>
              </div>
              
              {/* Bronze Winner */}
              <div className="bg-[#161b22] p-4 rounded-lg border border-amber-700/30">
                <div className="text-4xl mb-2">🥉</div>
                <div className="font-bold text-amber-700">RithwikBejadi</div>
                <div className="text-[#8b949e]">209 points</div>
              </div>
            </div>
            
            {/* Other Top Performers */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#161b22] p-3 rounded-lg">
                <div className="font-medium text-white">Jadu07 🏅</div>
                <div className="text-sm text-[#8b949e]">180 points</div>
              </div>
              <div className="bg-[#161b22] p-3 rounded-lg">
                <div className="font-medium text-white">sammy200-ui 🏅</div>
                <div className="text-sm text-[#8b949e]">132 points</div>
              </div>
              <div className="bg-[#161b22] p-3 rounded-lg">
                <div className="font-medium text-white">quick-harsh 🏅</div>
                <div className="text-sm text-[#8b949e]">104 points</div>
              </div>
              <div className="bg-[#161b22] p-3 rounded-lg">
                <div className="font-medium text-white">parth10P 🏅</div>
                <div className="text-sm text-[#8b949e]">104 points</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={refreshUserStats}
            disabled={refreshing || !leaderboardVisible}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#238636]/10 text-[#238636] hover:bg-[#238636]/20 transition-colors disabled:opacity-50"
          >
            {refreshing ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-[#238636] border-t-transparent rounded-full"></div>
                <span>Refreshing...</span>
              </>
            ) : (
              <>
                <Trophy className="w-4 h-4" />
                <span>Refresh Stats</span>
              </>
            )}
          </button>
          
          {userRank && (
            <div className="px-3 py-1 rounded-md bg-[#30363d] text-white">
              Your Rank: <span className="font-bold">{userRank}</span>
            </div>
          )}
        </div>

        {/* Only render content if leaderboard is visible */}
        {leaderboardVisible ? (
          <div>
            {/* Current user's points breakdown - only show if leaderboard is visible */}
            {currentUser && userRank && (
              <div className="mb-8 p-6 rounded-lg bg-[#161b22] border border-[#30363d]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-[#238636]/10">
                    <Trophy className="w-6 h-6 text-[#238636]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Your Current Rank: #{userRank}</h3>
                    <p className="text-[#8b949e]">Keep contributing to improve your position!</p>
                  </div>
                </div>
              </div>
            )}

            {/* Leaderboard */}
            <div className="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden">
              <div className="p-4 border-b border-[#30363d] flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Contributors</h2>
                <div className="text-sm text-[#8b949e]">
                  Last updated: {leaderboardSettings.lastUpdated ? new Date(leaderboardSettings.lastUpdated).toLocaleString() : 'Never'}
                </div>
              </div>
              
              <div className="divide-y divide-[#30363d]">
                {loading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="w-12 h-12 border-4 border-[#30363d] border-t-[#238636] rounded-full animate-spin"></div>
                  </div>
                ) : contributors.length > 0 ? (
                  contributors.map((contributor) => (
                    <a 
                      key={contributor.login}
                      href={`/profile/${contributor.login}`}
                      className="flex items-center justify-between p-4 hover:bg-[#30363d]/20 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-[#0d1117] flex items-center justify-center text-xs font-bold text-white border border-[#30363d]">
                            {contributor.rank}
                          </div>
                          <Image 
                            src={contributor.avatar_url} 
                            alt={contributor.login}
                            width={48}
                            height={48}
                            className="rounded-full"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">{contributor.login}</h3>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-[#8b949e]">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4" />
                              <span>{contributor.points} points</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Award className="w-4 h-4" />
                              <span className={getLevelColor(contributor.level || 'Newcomer')}>
                                {contributor.level}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  ))
                ) : (
                  <div className="text-center py-12 text-[#8b949e]">
                    <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">No contributors yet</p>
                    <p className="text-sm">Be the first to contribute!</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 p-6 rounded-lg bg-gradient-to-r from-[#238636]/10 to-transparent border border-[#238636]/20">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-[#238636]/10">
                  <Star className="w-6 h-6 text-[#238636]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#238636] mb-2">Selection Criteria</h3>
                  <div className="space-y-2 text-[#8b949e]">
                    <p>• Top 15 contributors will be selected</p>
                    <p>• Minimum 3 quality pull requests required</p>
                    <p>• Code quality and complexity considered</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto p-6 rounded-lg border border-[#30363d] bg-[#161b22] text-center">
            <Lock className="w-16 h-16 text-[#8b949e] mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Leaderboard is currently hidden</h2>
            <p className="text-[#8b949e] max-w-md mx-auto">
              The leaderboard is temporarily hidden by the administrators. 
              Please check back later.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

// Helper function to get color class based on level
function getLevelColor(level: string): string {
  switch (level) {
    case 'Gold':
      return 'text-yellow-400';
    case 'Silver':
      return 'text-gray-300';
    case 'Bronze':
      return 'text-amber-600';
    case 'Advanced':
      return 'text-blue-400';
    case 'Intermediate':
      return 'text-green-400';
    default:
      return 'text-gray-400';
  }
}
