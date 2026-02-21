'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { Invoice, InvoiceFormValues } from '@/types/invoice';
import { toast } from 'sonner';

const supabase = createClient();

const fetchInvoices = async (): Promise<Invoice[]> => {
  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const useInvoices = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['invoices'],
    queryFn: fetchInvoices,
  });

  const createInvoice = useMutation({
    mutationFn: async (values: InvoiceFormValues) => {
      const { data: { user } } = await supabase.auth.getUser();
      const invoice_number = `INV-${Date.now().toString().slice(-5)}`;
      
      const { data, error } = await supabase
        .from('invoices')
        .insert({ ...values, user_id: user!.id, invoice_number })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast.success('Invoice created successfully');
    },
    onError: () => toast.error('Failed to create invoice'),
  });

  const updateInvoice = useMutation({
    mutationFn: async ({ id, values }: { id: string; values: Partial<InvoiceFormValues> }) => {
      const { error } = await supabase
        .from('invoices')
        .update({ ...values, updated_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast.success('Invoice updated');
    },
    onError: () => toast.error('Failed to update invoice'),
  });

  const deleteInvoice = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('invoices').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast.success('Invoice deleted');
    },
    onError: () => toast.error('Failed to delete invoice'),
  });

  return { query, createInvoice, updateInvoice, deleteInvoice };
};