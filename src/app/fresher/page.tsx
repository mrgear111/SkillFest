'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function FresherForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    githubUrl: '',
    pastExperience: '',
    projectLink1: '',
    projectLink2: '',
    reason: ''
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('FresherForm')
      .insert([
        {
          name: formData.name,
          email_id: formData.email,
          github_url: formData.githubUrl,
          past_experience: formData.pastExperience,
          project_link_1: formData.projectLink1,
          project_link_2: formData.projectLink2,
          reason: formData.reason
        }
      ]);

    if (error) {
      console.error('Supabase Error:', error);
    } else {
      console.log('Form submitted successfully:', data);
      
      router.push('/thankyou');
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-[#161b22] p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-white mb-6">Fresher Application Form</h2>
        <div className="mb-4">
          <label className="block text-[#8b949e] mb-2" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#0d1117] border border-[#30363d] text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-[#8b949e] mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#0d1117] border border-[#30363d] text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-[#8b949e] mb-2" htmlFor="githubUrl">GitHub URL</label>
          <input
            type="url"
            id="githubUrl"
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#0d1117] border border-[#30363d] text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-[#8b949e] mb-2" htmlFor="pastExperience">Past Experience</label>
          <textarea
            id="pastExperience"
            name="pastExperience"
            value={formData.pastExperience}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#0d1117] border border-[#30363d] text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-[#8b949e] mb-2" htmlFor="projectLink1">Project Link 1</label>
          <input
            type="url"
            id="projectLink1"
            name="projectLink1"
            value={formData.projectLink1}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#0d1117] border border-[#30363d] text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-[#8b949e] mb-2" htmlFor="projectLink2">Project Link 2</label>
          <input
            type="url"
            id="projectLink2"
            name="projectLink2"
            value={formData.projectLink2}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#0d1117] border border-[#30363d] text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-[#8b949e] mb-2" htmlFor="reason">Why do you want to join?</label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#0d1117] border border-[#30363d] text-white"
            required
          />
        </div>
        <button type="submit" className="w-full py-3 rounded bg-gradient-to-r from-[#238636] to-[#2ea043] text-white hover:from-[#2ea043] hover:to-[#238636] transition-all duration-300">
          Submit
        </button>
      </form>
    </div>
  );
}