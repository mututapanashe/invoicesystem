'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { invoiceSchema, InvoiceSchema } from '@/lib/validations/invoice.schema';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { Invoice } from '@/types/invoice';

interface Props {
  defaultValues?: Partial<Invoice>;
  onSubmit: (values: InvoiceSchema) => Promise<void>;
  isLoading?: boolean;
}

export const InvoiceForm = ({ defaultValues, onSubmit, isLoading }: Props) => {
  const router = useRouter();
  
  // Transform Invoice to InvoiceSchema by filtering out null values
  const transformedDefaults = defaultValues ? {
    ...defaultValues,
    description: defaultValues.description ?? undefined,
  } : { status: 'pending' as const };

  const { register, handleSubmit, formState: { errors } } = useForm<InvoiceSchema>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: transformedDefaults as InvoiceSchema,
  });

  const handleFormSubmit: SubmitHandler<InvoiceSchema> = async (values) => {
    await onSubmit(values);
  };

  const fieldClass = 'w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all';
  const errorClass = 'text-red-400 text-xs mt-1';
  const labelClass = 'block text-zinc-400 text-sm mb-1.5';

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Client Name</label>
          <input {...register('client_name')} placeholder="Acme Corp" className={fieldClass} />
          {errors.client_name && <p className={errorClass}>{errors.client_name.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Client Email</label>
          <input {...register('client_email')} placeholder="billing@acme.com" className={fieldClass} />
          {errors.client_email && <p className={errorClass}>{errors.client_email.message}</p>}
        </div>
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea {...register('description')} rows={3} placeholder="Services rendered..." className={`${fieldClass} resize-none`} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <label className={labelClass}>Amount (USD)</label>
          <input {...register('amount', { valueAsNumber: true })} type="number" step="0.01" placeholder="0.00" className={fieldClass} />
          {errors.amount && <p className={errorClass}>{errors.amount.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Status</label>
          <select {...register('status')} className={`${fieldClass} cursor-pointer`}>
            {['pending', 'paid', 'overdue', 'draft'].map((s) => (
              <option key={s} value={s} className="bg-zinc-900 capitalize">{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Due Date</label>
          <input {...register('due_date')} type="date" className={fieldClass} />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" loading={isLoading}>
          {defaultValues?.id ? 'Update Invoice' : 'Create Invoice'}
        </Button>
      </div>
    </form>
  );
};