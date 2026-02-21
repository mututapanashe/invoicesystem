'use client';

import { useState } from 'react';
import { useInvoices } from '@/hooks/useInvoices';
import { StatusBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Pencil, Trash2, FileText } from 'lucide-react';
import { InvoiceStatus } from '@/types/invoice';
import { EmptyState } from '@/components/shared/EmptyState';
import Link from 'next/link';

const STATUS_FILTERS: Array<InvoiceStatus | 'all'> = ['all', 'pending', 'paid', 'overdue', 'draft'];

export const InvoiceTable = () => {
  const { query, deleteInvoice } = useInvoices();
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus | 'all'>('all');

  const invoices = query.data ?? [];
  const filtered = statusFilter === 'all'
    ? invoices
    : invoices.filter((i) => i.status === statusFilter);

  if (query.isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-2">
        {STATUS_FILTERS.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
              statusFilter === s
                ? 'bg-amber-500 text-black'
                : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No invoices found"
          description="Create your first invoice to get started"
          action={{ label: 'Create Invoice', href: '/invoices/create' }}
        />
      ) : (
        <div className="rounded-xl border border-white/5 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5 bg-white/2">
                {['Invoice', 'Client', 'Amount', 'Status', 'Date', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-white/2 transition-colors">
                  <td className="px-4 py-3.5 text-sm text-amber-400 font-mono">
                    {invoice.invoice_number}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="text-sm text-white">{invoice.client_name}</div>
                    <div className="text-xs text-zinc-500">{invoice.client_email}</div>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-white font-semibold">
                    {formatCurrency(invoice.amount)}
                  </td>
                  <td className="px-4 py-3.5">
                    <StatusBadge status={invoice.status} />
                  </td>
                  <td className="px-4 py-3.5 text-sm text-zinc-400">
                    {formatDate(invoice.created_at)}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <Link href={`/invoices/${invoice.id}/edit`}>
                        <Button variant="ghost" size="sm">
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                      <Button
                        variant="danger"
                        size="sm"
                        loading={deleteInvoice.isPending}
                        onClick={() => deleteInvoice.mutate(invoice.id)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};