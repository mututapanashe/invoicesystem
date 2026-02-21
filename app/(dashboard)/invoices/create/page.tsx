'use client';

import { Topbar } from '@/components/layout/Topbar';
import { InvoiceForm } from '@/components/invoices/InvoiceForm';
import { useInvoices } from '@/hooks/useInvoices';
import { useRouter } from 'next/navigation';
import { InvoiceSchema } from '@/lib/validations/invoice.schema';

export default function CreateInvoicePage() {
  const { createInvoice } = useInvoices();
  const router = useRouter();

  const handleSubmit = async (values: InvoiceSchema) => {
    await createInvoice.mutateAsync(values);
    router.push('/invoices');
  };

  return (
    <>
      <Topbar title="Create Invoice" />
      <div className="p-6">
        <div className="max-w-3xl mx-auto bg-zinc-900 rounded-xl border border-white/5 p-6">
          <h2 className="text-white font-semibold text-lg mb-6">New Invoice</h2>
          <InvoiceForm onSubmit={handleSubmit} isLoading={createInvoice.isPending} />
        </div>
      </div>
    </>
  );
}