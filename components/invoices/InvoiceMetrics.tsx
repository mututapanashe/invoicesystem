'use client';

import { useInvoices } from '@/hooks/useInvoices';
import { formatCurrency } from '@/lib/utils';
import { TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export const InvoiceMetrics = () => {
  const { query } = useInvoices();
  const invoices = query.data ?? [];

  const metrics = {
    total: invoices.reduce((acc, i) => acc + i.amount, 0),
    paid: invoices.filter((i) => i.status === 'paid').reduce((acc, i) => acc + i.amount, 0),
    pending: invoices.filter((i) => i.status === 'pending').reduce((acc, i) => acc + i.amount, 0),
    overdue: invoices.filter((i) => i.status === 'overdue').reduce((acc, i) => acc + i.amount, 0),
  };

  const cards = [
    { label: 'Total Revenue', value: metrics.total, icon: TrendingUp, color: 'text-white' },
    { label: 'Paid', value: metrics.paid, icon: CheckCircle, color: 'text-emerald-400' },
    { label: 'Pending', value: metrics.pending, icon: Clock, color: 'text-amber-400' },
    { label: 'Overdue', value: metrics.overdue, icon: AlertCircle, color: 'text-red-400' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ label, value, icon: Icon, color }) => (
        <div key={label} className="bg-zinc-900 rounded-xl border border-white/5 p-5 hover:border-white/10 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-zinc-500 text-sm">{label}</span>
            <Icon className={`w-4 h-4 ${color}`} />
          </div>
          <p className={`text-2xl font-bold ${color}`}>{formatCurrency(value)}</p>
        </div>
      ))}
    </div>
  );
};