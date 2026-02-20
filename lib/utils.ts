import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { InvoiceStatus } from '@/types/invoice';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatDate(date: string | null): string {
  if (!date) return '';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}

export function statusColor(status: InvoiceStatus): string {
  switch (status) {
    case 'paid':
      return 'bg-green-500/10 text-green-400';
    case 'pending':
      return 'bg-yellow-500/10 text-yellow-400';
    case 'overdue':
      return 'bg-red-500/10 text-red-400';
    case 'draft':
      return 'bg-zinc-500/10 text-zinc-400';
    default:
      return 'bg-zinc-500/10 text-zinc-400';
  }
}
