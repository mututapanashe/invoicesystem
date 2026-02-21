import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: { label: string; href: string };
}

export const EmptyState = ({ icon: Icon, title, description, action }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-zinc-500" />
    </div>
    <h3 className="text-white font-semibold mb-1">{title}</h3>
    <p className="text-zinc-500 text-sm mb-5 max-w-xs">{description}</p>
    {action && (
      <Link href={action.href}>
        <Button>{action.label}</Button>
      </Link>
    )}
  </div>
);