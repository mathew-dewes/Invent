"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {useState } from "react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import PurchaseFilters from "./PurchaseFilters"
import { useSearchParams } from "next/navigation"
import { PurchaseStatus } from "@/generated/prisma/enums"
import { MarkAllReceivedButton } from "./MarkAllReceivedButton"
import { delay } from "@/lib/helpers"
import { MobilePurchaseFilters } from "./MobilePurchaseFilters"


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  filter: {label: string, query: string},
  search?: string
  queryCounts?: Record<string, number>

}
interface ParsedDataTypes { id: string, stockItem: { id: string }, quantity: number, }



export function PurchaseTable<TData extends ParsedDataTypes, TValue>({
  columns,
  data,
  filter,

  queryCounts
}: DataTableProps<TData, TValue>) {


  


  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    getRowId: (row) => row.id,
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      columnVisibility
    },
  });

  const params = useSearchParams();



  const query = params.get('status') as PurchaseStatus;

  const selectedPurchaseIds = table
    .getSelectedRowModel()
    .rows
    .map((row) => row.original.id);
  const isSelected = selectedPurchaseIds.length > 0;

  return (
    <div>
      <div>
        <div className="py-4 mt-2">
          <div className="md:flex gap-3 w-3/4">
      <div className="flex gap-3">
            <Input
              placeholder={`Filter ${filter.label}...`}
              value={(table.getColumn(filter.query)?.getFilterValue() as string)}
              onChange={(event) =>
                table.getColumn(filter.query)?.setFilterValue(event.target.value)
              }
              className="max-w-sm text-sm"
            />
            <div onClick={() => table.setRowSelection({})}>
              <PurchaseFilters queryCounts={queryCounts} />

            </div>


          </div>
            <div className="sm:hidden mt-5" onClick={() => table.setRowSelection({})}>
                        <MobilePurchaseFilters queryCounts={queryCounts} />
          
                      </div>
          </div>
    

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto hidden sm:flex">
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter(
                  (column) => column.getCanHide()
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
      <div className={`${!isSelected ? "hidden" : ""}`}>
        <p>Update (All) selected:</p>
        <div onClick={async () => {
          await delay(500)
          table.setRowSelection({})
        }} className="mt-2 flex gap-5">
          {query == "PLACED" && <MarkAllReceivedButton selectedPurchaseIds={selectedPurchaseIds} />}
        </div>

        <div className={`mt-5`}>
          <p className="font-semibold">Attention:</p>
          <ul className="mt-1 list-disc space-y-1 text-sm text-muted-foreground">
            <li>Canceling completed requests will replenish inventory*</li>
            <li>Completed requests statuses are fixed and wont be included in the mass update*</li>
          </ul>

        </div>



      </div>
    </div>

  )
}