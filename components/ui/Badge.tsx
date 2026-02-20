import { cn, statusColor } from '@/lib/utils';
import { InvoiceStatus } from '@/types/invoice';

interface BadgeProps {
  status: InvoiceStatus;
}

export const StatusBadge = ({ status }: BadgeProps) => (
  <span className={cn(
    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize',
    statusColor(status)
  )}>
    {status}
  </span>
);