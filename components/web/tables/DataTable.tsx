"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  SortingState,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState
} from "@tanstack/react-table"

import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,

} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import TableFilters from "../TableFilters"
import { MassUpdateButton } from "../MassUpdateButton"
import { useState } from "react"
import { usePathname } from "next/navigation";
import { FinanceType, PurchaseStatus, RequestStatus } from "@/generated/prisma/enums"
import { delay } from "@/lib/helpers"
import MassCancelButton from "../MassCancelButton"
import { StockStatus } from "@/lib/types"

const requestStatuses = Object.values(RequestStatus);
const purchaseStatuses = Object.values(PurchaseStatus);



interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  filter: string,
  queryCounts?: Record<string, number>
};

interface ParsedDataTypes { id: string, stockItem?: { id: string }, quantity: number, status?: RequestStatus | PurchaseStatus | StockStatus, type?: FinanceType }


export function DataTable<TData extends ParsedDataTypes, TValue>({
  columns,
  data,
  filter,
  queryCounts
}: DataTableProps<TData, TValue>) {

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});


  const pathname = usePathname();



  function generateSelectedTable() {
    if (pathname === "/requests") return 'Requests';
    if (pathname === "/purchases") return 'Purchases';
    return null



  };

  function generateStatuses(table: string) {
    if (table === "Requests") return requestStatuses;
    if (table === "Purchases") return purchaseStatuses;
    return null


  }

  const selectedTable = generateSelectedTable();
  const statuses = generateStatuses(selectedTable!)



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

  const selectedStockIds = table
    .getSelectedRowModel()
    .rows
    .map((row) => row.original.id);


  const stockIdsAndQuantity = table
    .getSelectedRowModel()
    .rows
    .map(({ original }) => ({
      id: original.stockItem?.id,
      quantity: original.quantity
    }));

  const selectedStatuses = table
    .getSelectedRowModel()
    .rows
    .map((row) => row.original.status as RequestStatus | PurchaseStatus);





  const allEqual = (arr: (RequestStatus | PurchaseStatus)[]) =>
    arr.every(v => v === arr[0]);


  const selectedStatus = selectedStatuses[0];


  const completeSelected = selectedStatuses.includes(RequestStatus.COMPLETE);



  const openEntries = !selectedStatuses.every(status =>
    ["RECEIVED", "COMPLETE"].includes(status)
  );




  const onlyCompletedSelected = completeSelected && allEqual(selectedStatuses);


  

  





  return (
    <div>
      <div className="flex items-center py-4 mt-2">
        <div className="flex gap-3">
          <Input
            placeholder={`Filter ${filter}...`}
            value={(table.getColumn(filter)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(filter)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <div onClick={() => table.setRowSelection({})}>
            <TableFilters queryCounts={queryCounts} />

          </div>


        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
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
      <div className="overflow-hidden rounded-md border">
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
      {selectedStockIds.length > 0 && selectedTable &&
        <div>
          <p>Update (All) selected:</p>
          <div onClick={async () => {
            await delay(500)
            table.setRowSelection({})
          }} className="mt-2 flex gap-5">
            {openEntries && statuses?.map((status, key) => {

              if (selectedStatuses.includes("READY") && status !== "COMPLETE") return
              if (selectedStatuses.includes("OPEN") && status !== "READY") return
              if (selectedStatuses.includes(status)) return


              return <MassUpdateButton key={key}
                table={selectedTable}
                status={status}
                selectedIds={selectedStockIds}
                selectedStatuses={selectedStatuses}
                label={"MARK " + status}
                stockIdsAndQuantity={stockIdsAndQuantity}
              />
            })}
            <MassCancelButton selectedIds={selectedStockIds} table={selectedTable} status={selectedStatus} stockIdsAndQuantity={stockIdsAndQuantity}  />


          </div>
          {completeSelected &&
            <div className={`mt-5`}>
              <p className="font-semibold">Attention:</p>
              <ul className="mt-1 list-disc space-y-1 text-sm text-muted-foreground">
                <li>Canceling completed requests will replenish inventory*</li>
                <li className={`${onlyCompletedSelected ? "hidden" : ""}`}>Completed requests statuses are fixed and wont be included in the mass update*</li>
              </ul>

            </div>}



        </div>}


    </div>


  )
}