import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { chakra, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'

type Attendees = {
  checkbox: string
  department: string
  role: string
  name: string
}

export const data: Attendees[] = [
  {
    checkbox: 'inches',
    department: 'millimetres (mm)',
    role: 'adam role',
    name: 'adam',
  },
  {
    checkbox: 'feet',
    department: 'centimetres (cm)',
    role: 'bob role',
    name: 'bobby',
  },
  {
    checkbox: 'yards',
    department: 'metres (m)',
    role: 'sal role',
    name: 'sal',
  },
]

const columnHelper = createColumnHelper<Attendees>()

export const columns = [
  columnHelper.accessor('checkbox', {
    cell: (info) => info.getValue(),
    header: 'select',
  }),
  columnHelper.accessor('department', {
    cell: (info) => info.getValue(),
    header: 'Department',
  }),
  columnHelper.accessor('role', {
    cell: (info) => info.getValue(),
    header: 'Role',
  }),
  columnHelper.accessor('name', {
    cell: (info) => info.getValue(),
    header: 'Name',
  }),
]

export type DataTableProps<Data extends object> = {
  data: Data[]
  columns: ColumnDef<Data, any>[]
}

export function DataTable<Data extends object>({
  data,
  columns,
}: DataTableProps<Data>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  })

  return (
    <Table>
      <Thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
              const meta: any = header.column.columnDef.meta
              return (
                <Th key={header.id} isNumeric={meta?.isNumeric}>
                  <div className="flex">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}

                    <chakra.span
                      onClick={header.column.getToggleSortingHandler()}
                      pl="4"
                      className="hover:cursor-pointer"
                    >
                      {header.column.getIsSorted() ? (
                        header.column.getIsSorted() === 'desc' ? (
                          <p>👆🏻</p>
                        ) : (
                          <p>👇🏻</p>
                        )
                      ) : (
                        <p>🫥</p>
                      )}
                    </chakra.span>
                  </div>
                </Th>
              )
            })}
          </Tr>
        ))}
      </Thead>
      <Tbody>
        {table.getRowModel().rows.map((row) => (
          <Tr key={row.id}>
            {row.getVisibleCells().map((cell) => {
              // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
              const meta: any = cell.column.columnDef.meta
              return (
                <Td key={cell.id} isNumeric={meta?.isNumeric}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              )
            })}
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
