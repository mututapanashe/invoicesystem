import { Topbar } from '@/components/layout/Topbar';
import { InvoiceMetrics } from '@/components/invoices/InvoiceMetrics';
import { InvoiceTable } from '@/components/invoices/InvoiceTable';

export default function DashboardPage() {
  return (
    <>
      <Topbar title="Dashboard" />
      <div className="p-6 space-y-6">
        <InvoiceMetrics />
        <div className="bg-zinc-900 rounded-xl border border-white/5 p-6">
          <h2 className="text-white font-semibold mb-4">Recent Invoices</h2>
          <InvoiceTable />
        </div>
      </div>
    </>
  );
}