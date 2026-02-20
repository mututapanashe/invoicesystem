import { z } from 'zod';

export const invoiceSchema = z.object({
  client_name: z.string().min(2, 'Client name required'),
  client_email: z.string().email('Valid email required'),
  description: z.string().optional(),
  amount: z.number().positive('Amount must be positive'),
  status: z.enum(['pending', 'paid', 'overdue', 'draft']),
  due_date: z.string().optional(),
});

export type InvoiceSchema = z.infer<typeof invoiceSchema>;