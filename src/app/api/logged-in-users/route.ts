import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/auth-options";
import { addUserToDatabase, getActiveUsers, storePullRequests } from "@/lib/firebase";
import { calculatePoints, getContributionLevel } from "@/lib/points-calculator";

// Add types for GitHub API responses
type GitHubRepo = {
  name: string;
};

// Remove this unused type or comment it out
// type GitHubPR = {
//   id: number;
//   state: string;
// };

type GitHubStats = {
  author?: {
    login: string;
  };
  total: number;
  weeks: Array<{
    a: number;
    d: number;
    c: number;
  }>;
};

// Add type for weekly stats
type WeeklyStats = {
  additions: number;
  deletions: number;
  commits: number;
};

export async function GET() {
  try {
    const activeUsers = await getActiveUsers();
    
    return NextResponse.json(activeUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function POST() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    console.log("No session found");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const githubResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${session.accessToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'Cache-Control': 'no-cache',
      },
    });

    if (!githubResponse.ok) {
      throw new Error('Failed to fetch GitHub profile');
    }

    const githubUser = await githubResponse.json();
    console.log("GitHub user fetched:", githubUser.login);

    // Get PRs from the organization
    const orgPRsResponse = await fetch(
      `https://api.github.com/search/issues?q=type:pr+author:${githubUser.login}+org:nst-sdc`,
      {
        headers: {
          'Authorization': `Bearer ${session.accessToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Cache-Control': 'no-cache',
        },
      }
    );

    let orgPRs = 0;
    if (orgPRsResponse.ok) {
      const searchResult = await orgPRsResponse.json();
      orgPRs = searchResult.total_count;
      console.log(`Found ${orgPRs} PRs in the organization`);
    }

    // Get all PRs by the user (across GitHub)
    const allPRsResponse = await fetch(
      `https://api.github.com/search/issues?q=type:pr+author:${githubUser.login}`,
      {
        headers: {
          'Authorization': `Bearer ${session.accessToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Cache-Control': 'no-cache',
        },
      }
    );

    let totalPRs = 0;
    if (allPRsResponse.ok) {
      const searchResult = await allPRsResponse.json();
      totalPRs = searchResult.total_count;
      console.log(`Found ${totalPRs} total PRs across GitHub`);
    }

    // Get merged PRs in the organization
    const orgMergedPRsResponse = await fetch(
      `https://api.github.com/search/issues?q=type:pr+author:${githubUser.login}+org:nst-sdc+is:merged`,
      {
        headers: {
          'Authorization': `Bearer ${session.accessToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Cache-Control': 'no-cache',
        },
      }
    );

    let orgMergedPRs = 0;
    if (orgMergedPRsResponse.ok) {
      const mergedResult = await orgMergedPRsResponse.json();
      orgMergedPRs = mergedResult.total_count;
      console.log(`Found ${orgMergedPRs} merged PRs in the organization`);
    }

    // Get all merged PRs by the user
    const allMergedPRsResponse = await fetch(
      `https://api.github.com/search/issues?q=type:pr+author:${githubUser.login}+is:merged`,
      {
        headers: {
          'Authorization': `Bearer ${session.accessToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Cache-Control': 'no-cache',
        },
      }
    );

    let mergedPRs = 0;
    if (allMergedPRsResponse.ok) {
      const mergedResult = await allMergedPRsResponse.json();
      mergedPRs = mergedResult.total_count;
      console.log(`Found ${mergedPRs} total merged PRs across GitHub`);
    }

    // Get all repositories in the organization
    const reposResponse = await fetch('https://api.github.com/orgs/nst-sdc/repos', {
      headers: {
        'Authorization': `Bearer ${session.accessToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'Cache-Control': 'no-cache',
      },
    });

    const repos = (await reposResponse.json()) as GitHubRepo[];
    console.log("Found repositories:", repos.map(r => r.name));

    let totalContributions = 0;

    // Get contributions using the statistics API
    for (const repo of repos) {
      try {
        console.log(`Fetching stats for ${repo.name}...`);
        const statsResponse = await fetch(
          `https://api.github.com/repos/nst-sdc/${repo.name}/stats/contributors`,
          {
            headers: {
              'Authorization': `Bearer ${session.accessToken}`,
              'Accept': 'application/vnd.github.v3+json',
              'Cache-Control': 'no-cache',
            },
          }
        );

        if (statsResponse.ok) {
          const stats = await statsResponse.json() as GitHubStats[];
          
          if (Array.isArray(stats)) {
            const userStats = stats.find(stat => stat.author?.login === githubUser.login);
            if (userStats) {
              totalContributions += userStats.total;
              
              const weeklyStats = userStats.weeks.map((week) => ({
                additions: week.a,
                deletions: week.d,
                commits: week.c
              } as WeeklyStats));
              
              console.log(`Found ${userStats.total} contributions in ${repo.name}`);
              console.log(`Weekly breakdown for ${repo.name}:`, weeklyStats);
            } else {
              console.log(`No contributions found for ${githubUser.login} in ${repo.name}`);
            }
          } else if (statsResponse.status === 202) {
            // GitHub is computing the statistics
            console.log(`GitHub is computing statistics for ${repo.name}. Try again in a moment.`);
          } else {
            console.log(`Unexpected stats format for ${repo.name}:`, stats);
          }
        } else {
          console.error(`Failed to fetch stats for ${repo.name}: ${statsResponse.status}`);
        }
      } catch (error) {
        console.error(`Error fetching stats for ${repo.name}:`, error);
      }
    }

    // Calculate points
    const contributionData = {
      totalPRs,
      mergedPRs,
      contributions: totalContributions,
      orgPRs,
      orgMergedPRs
    };
    
    const points = calculatePoints(contributionData);
    const level = getContributionLevel(points);
    
    const userStats = {
      login: githubUser.login,
      lastActive: new Date(),
      stats: {
        totalPRs,
        mergedPRs,
        contributions: totalContributions,
        orgPRs,
        orgMergedPRs,
        points,
        level
      }
    };
    
    console.log("Attempting to update Firebase with stats:", userStats);
    
    const dbUpdateResult = await addUserToDatabase(githubUser.login, userStats);
    console.log("Firebase update result:", dbUpdateResult);
    
    if (!dbUpdateResult) {
      throw new Error("Failed to update Firebase database");
    }
    
    // After you've fetched the PRs from GitHub API
    // Store detailed PR information
    const pullRequestDetails = [];

    // For merged PRs
    if (orgMergedPRsResponse.ok) {
      const mergedPRsData = await orgMergedPRsResponse.json();
      console.log(`Found ${mergedPRsData.items.length} merged PRs for ${githubUser.login}`);
      
      for (const item of mergedPRsData.items) {
        const isOrg = item.repository_url.includes('nst-sdc');
        pullRequestDetails.push({
          id: item.id,
          title: item.title,
          url: item.html_url,
          state: 'merged',
          created_at: item.created_at,
          merged_at: item.closed_at, // GitHub search API doesn't provide merged_at directly
          isOrg
        });
      }
    }

    // For open PRs - make sure we're fetching all PRs, not just org PRs
    const openPRsResponse = await fetch(
      `https://api.github.com/search/issues?q=type:pr+author:${githubUser.login}+is:open`,
      {
        headers: {
          'Authorization': `Bearer ${session.accessToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Cache-Control': 'no-cache',
        },
      }
    );

    if (openPRsResponse.ok) {
      const openPRsData = await openPRsResponse.json();
      console.log(`Found ${openPRsData.items.length} open PRs for ${githubUser.login}`);
      
      for (const item of openPRsData.items) {
        const isOrg = item.repository_url.includes('nst-sdc');
        pullRequestDetails.push({
          id: item.id,
          title: item.title,
          url: item.html_url,
          state: 'open',
          created_at: item.created_at,
          isOrg
        });
      }
    }

    // Store PR details in Firebase
    console.log(`Storing ${pullRequestDetails.length} PRs for user ${githubUser.login}`);
    const prStoreResult = await storePullRequests(githubUser.login, pullRequestDetails);
    console.log(`PR storage result: ${prStoreResult ? 'success' : 'failed'}`);

    return NextResponse.json({ 
      success: true,
      stats: {
        prs: { totalPRs, mergedPRs, orgPRs, orgMergedPRs },
        contributions: totalContributions,
        points,
        level
      }
    });
  } catch (error) {
    console.error('Error in POST handler:', error);
    return NextResponse.json({ 
      error: "Failed to add user",
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
