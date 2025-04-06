'use client';

import { ArrowLeft, Code } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { SignInButton } from "@/components/sign-in-button";

export default function FresherApplication() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#161b22] border border-[#30363d] rounded-xl p-8 text-center">
          <Code className="w-16 h-16 text-[#A371F7] mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-white mb-4">Sign in to Apply</h1>
          <p className="text-[#8b949e] mb-8">
            Please sign in with GitHub to access the Fresher Developer application form.
          </p>
          <SignInButton />
          
          <div className="mt-8 text-[#8b949e]">
            <Link href="/" className="inline-flex items-center hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Show applications closed message
  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#161b22] border border-[#30363d] rounded-xl p-8 text-center">
        <Code className="w-16 h-16 text-[#A371F7] mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-white mb-4">Applications Closed</h1>
        <p className="text-[#8b949e] mb-8">
          Thank you for your interest! The Fresher Developer Program applications are now closed. We look forward to announcing the selected candidates soon.
        </p>
        
        <Link href="/" className="inline-flex items-center text-[#8b949e] hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
      </div>
    </div>
  );
} 