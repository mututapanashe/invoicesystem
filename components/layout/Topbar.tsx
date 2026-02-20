import { createClient } from '@/lib/supabase/server';
import { Bell } from 'lucide-react';

export const Topbar = async ({ title }: { title?: string }) => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="h-16 border-b border-white/5 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-30 flex items-center justify-between px-6">
      <h1 className="text-white font-semibold text-lg">{title}</h1>
      <div className="flex items-center gap-4">
        <button 
          className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/20 transition-all"
          title="Notifications"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-black text-xs font-bold">
            {user?.email?.[0].toUpperCase()}
          </div>
          <span className="text-zinc-400 text-sm hidden md:block">{user?.email}</span>
        </div>
      </div>
    </header>
  );
};