export type InvoiceStatus = 'pending' | 'paid' | 'overdue' | 'draft';

export interface Invoice {
  id: string;
  user_id: string;
  invoice_number: string;
  client_name: string;
  client_email: string;
  description: string | null;
  amount: number;
  status: InvoiceStatus;
  due_date: string | null;
  issued_at: string;
  created_at: string;
  updated_at: string;
}

export interface InvoiceFormValues {
  client_name: string;
  client_email: string;
  description?: string;
  amount: number;
  status: InvoiceStatus;
  due_date?: string;
}

export interface InvoiceMetrics {
  total: number;
  paid: number;
  pending: number;
  overdue: number;
}