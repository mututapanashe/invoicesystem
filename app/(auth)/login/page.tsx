'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(error.message);
    } else {
      router.push('/dashboard');
    }
    setLoading(false);
  };

  const fieldClass = 'w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 transition-all';

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-9 h-9 bg-amber-500 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-black" />
          </div>
          <span className="text-white font-bold text-xl">panaTECH<span className="text-amber-500">Pro</span></span>
        </div>

        <div className="bg-zinc-900 rounded-2xl border border-white/5 p-8 shadow-2xl">
          <h1 className="text-white text-2xl font-bold mb-1">Welcome back</h1>
          <p className="text-zinc-500 text-sm mb-6">Sign in to your account</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-zinc-400 text-sm mb-1.5">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className={fieldClass} required />
            </div>
            <div>
              <label className="block text-zinc-400 text-sm mb-1.5">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className={fieldClass} required />
            </div>
            <Button type="submit" loading={loading} className="w-full justify-center mt-2">
              Sign In
            </Button>
          </form>

          <p className="text-center text-zinc-500 text-sm mt-6">
            No account?{' '}
            <Link href="/register" className="text-amber-400 hover:text-amber-300 transition-colors">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}