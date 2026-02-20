'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

export const useAuth = () => {
  const router = useRouter();
  const supabase = createClient();

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Logged out successfully');
      router.push('/login');
    } catch (error) {
      toast.error('Failed to logout');
      console.error(error);
    }
  };

  return { logout };
};
