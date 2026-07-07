import React, { useMemo } from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
} from '@tanstack/react-table';
import { 
  Eye, 
  Edit3, 
  Trash2, 
  Star, 
  ChevronLeft, 
  ChevronRight,
  MoreHorizontal
} from 'lucide-react';
import { motion } from 'motion/react';
import { Customer } from '../../lib/dummy-data';
import { GlassBadge, GlassCard } from '../ui/glass';

interface CustomerTableProps {
  data: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (id: string) => void;
  onView: (customer: Customer) => void;
  selectedRows: string[];
  onSelectRow: (id: string) => void;
  onSelectAll: (ids: string[]) => void;
}

export const CustomerTable: React.FC<CustomerTableProps> = ({
  data,
  onEdit,
  onDelete,
  onView,
  selectedRows,
  onSelectRow,
  onSelectAll,
}) => {
  const columns = useMemo<ColumnDef<Customer>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-white/40 bg-white/10 checked:bg-accent focus:ring-0 focus:ring-offset-0 transition-all cursor-pointer"
            checked={table.getIsAllPageRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-white/40 bg-white/10 checked:bg-accent focus:ring-0 focus:ring-offset-0 transition-all cursor-pointer"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
      },
      {
        accessorKey: 'name',
        header: 'Pelanggan',
        cell: ({ row }) => {
          const customer = row.original;
          return (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent-dark font-black text-xs">
                {customer.name.charAt(0)}
              </div>
              <div className="flex flex-col cursor-pointer hover:opacity-80 transition-opacity" onClick={() => onView(customer)}>
                <span className="text-sm font-black text-primary leading-tight">{customer.name}</span>
                <span className="text-[10px] font-bold text-text-soft">{customer.email}</span>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: 'company',
        header: 'Perusahaan',
        cell: ({ getValue }) => (
          <span className="text-sm font-bold text-primary">{getValue() as string}</span>
        ),
      },
      {
        accessorKey: 'segment',
        header: 'Segment',
        cell: ({ getValue }) => {
          const segment = getValue() as Customer['segment'];
          const variants: Record<Customer['segment'], Parameters<typeof GlassBadge>[0]['variant']> = {
            'aktif': 'success',
            'prospek': 'info',
            'VIP': 'accent',
            'tidak-aktif': 'default',
          };
          return (
            <GlassBadge variant={variants[segment]} size="sm">
              {segment}
            </GlassBadge>
          );
        },
      },
      {
        accessorKey: 'tags',
        header: 'Tags',
        cell: ({ getValue }) => {
          const tags = getValue() as string[];
          const displayTags = tags.slice(0, 2);
          const remaining = tags.length - 2;
          return (
            <div className="flex items-center gap-1.5">
              {displayTags.map((tag, i) => (
                <div key={i} className="px-2 py-0.5 rounded-lg bg-white/40 border border-white/60 text-[9px] font-black text-primary uppercase tracking-tight">
                  {tag}
                </div>
              ))}
              {remaining > 0 && (
                <div className="text-[9px] font-black text-text-soft">
                  +{remaining}
                </div>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: 'satisfactionScore',
        header: 'CSAT',
        cell: ({ getValue }) => {
          const score = getValue() as number;
          if (score === undefined || score === null) return '-';
          return (
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={10}
                  className={s <= Math.round(score) ? 'fill-[#F5C518] text-[#F5C518]' : 'text-white/40'}
                />
              ))}
            </div>
          );
        },
      },
      {
        accessorKey: 'lastInteraction',
        header: 'Terakhir',
        cell: ({ getValue }) => (
          <span className="text-[11px] font-semibold text-text-soft">{getValue() as string}</span>
        ),
      },
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => (
          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => onView(row.original)}
              className="p-1.5 rounded-lg hover:bg-white/40 text-text-soft hover:text-info transition-colors"
            >
              <Eye size={14} />
            </button>
            <button 
              onClick={() => onEdit(row.original)}
              className="p-1.5 rounded-lg hover:bg-white/40 text-text-soft hover:text-accent-dark transition-colors"
            >
              <Edit3 size={14} />
            </button>
            <button 
              onClick={() => onDelete(row.original.id)}
              className="p-1.5 rounded-lg hover:bg-white/40 text-text-soft hover:text-danger transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ),
      },
    ],
    [onEdit, onDelete, onView]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="flex flex-col h-full bg-white/40 rounded-3xl border border-white/60 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr className="bg-white/50 border-b border-white/60">
              {table.getHeaderGroups().map((headerGroup) => (
                headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`
                      px-6 py-4 text-[10px] font-bold text-text-soft uppercase tracking-widest border-b border-white/40 whitespace-nowrap
                      ${header.id === 'name' ? 'sticky left-0 z-10 bg-white/50 backdrop-blur-md' : ''}
                    `}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))
              ))}
            </tr>
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <motion.tr
                key={row.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="group hover:bg-white/60 transition-colors cursor-pointer"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={`
                      px-6 py-4 border-b border-white/20 whitespace-nowrap
                      ${cell.column.id === 'name' ? 'sticky left-0 z-10 bg-[#FAFAFA] group-hover:bg-[#F0F0F0] transition-colors' : ''}
                    `}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-8 flex items-center justify-between px-6 pb-6">
        <p className="text-[11px] font-black text-text-soft uppercase tracking-widest">
          {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            data.length
          )}{' '}
          dari {data.length}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="w-8 h-8 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/40 transition-all"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="w-8 h-8 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/40 transition-all"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
