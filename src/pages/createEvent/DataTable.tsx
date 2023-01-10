
import {
  MultiSelectColumnFilter,
  MultiSelectFilterFn,
} from './MultiSelectFilter'
import { BsChevronUp, BsChevronDown, BsArrowDownUp } from 'react-icons/bs'
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
} from '@tanstack/react-table'
import {
  Button,
  Box,
  chakra,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import React, { HTMLProps, useEffect } from 'react'

type Attendees = {
  department: string
  role: string
  name: string
}

export const data: Attendees[] = [
  {
    department: 'millimetres (mm)',
    role: 'adam role',
    name: 'adam',
  },
  {
    department: 'centimetres (cm)',
    role: 'bob role',
    name: 'bobby',
  },
  {
    department: 'metres (m)',
    role: 'sal role',
    name: 'sal',
  },
  {
    department: 'millimetres (mm)',
    role: 'adam role',
    name: 'adam',
  },
  {
    department: 'centimetres (cm)',
    role: 'bob role',
    name: 'bobby',
  },
  {
    department: 'metres (m)',
    role: 'sal role',
    name: 'sal',
  },
]

function IndeterminateCheckbox({
  indeterminate,
  className = '',
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const ref = React.useRef<HTMLInputElement>(null!)

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [ref, indeterminate, rest.checked])

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + ' cursor-pointer'}
      {...rest}
    />
  )
}

const columnHelper = createColumnHelper<Attendees>()

export const columns = [
  columnHelper.display({
    id: 'select',
    header: 'select',
    //TODO: make attendee object
    cell: ({ row }: { row: any }) => (
      <IndeterminateCheckbox
        {...{
          checked: row.getIsSelected(),
          indeterminate: row.getIsSomeSelected(),
          onChange: row.getToggleSelectedHandler(),
        }}
      />
    ),
    enableColumnFilter: false,
  }),
  columnHelper.accessor('department', {
    cell: (info) => info.getValue(),
    header: 'Department',
    enableColumnFilter: true,
    filterFn: MultiSelectFilterFn,
  }),
  columnHelper.accessor('role', {
    cell: (info) => info.getValue(),
    header: 'Role',
    enableColumnFilter: true,
    filterFn: MultiSelectFilterFn,
  }),
  columnHelper.accessor('name', {
    cell: (info) => info.getValue(),
    header: 'Name',
    enableColumnFilter: true,
    filterFn: MultiSelectFilterFn,
  }),
  columnHelper.accessor('id', {
    cell: (info) => info.getValue(),
    header: 'ID',
    enableColumnFilter: true,
    filterFn: MultiSelectFilterFn,
  }),
]

export type DataTableProps<Data extends object> = {
  data: Data[]
  columns: ColumnDef<Data, any>[]
}

// ref https://github.com/chakra-ui/chakra-ui/discussions/4380
//TODO: create form logic
export function DataTable<Data extends object>({
  data,
  columns,
  sendDataToParent
}: DataTableProps<Data>) {
  const [rowSelection, setRowSelection] = React.useState({})
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      rowSelection,
      columnFilters,
    },
    onRowSelectionChange: (e) => {
      setRowSelection(e)
    },
    debugColumns: true,
  })
  const clearSelection = () => {
    setRowSelection({})
  }

  const selectAll = () => {
    if (!table.getIsAllRowsSelected()) {
      table.toggleAllRowsSelected()
    }
  }
  useEffect(() => {
    const att: Record<string, unknown>[] = []
    table.getSelectedRowModel().flatRows.map(
    (d) => att.push(d.getValue("id")),
    sendDataToParent(att)
    );
}, [rowSelection,table,sendDataToParent]);

  return (
    <div>
      <div className="flex justify-between items-center py-4">
        <p className="text-2xl">Attendees</p>
        {/* <p>{JSON.stringify(rowSelection)}</p> */}
        <div className="flex gap-4">
          <Button bgColor="#4365DD" onClick={clearSelection}>
            Clear Selection
          </Button>
          <Button bgColor="#4365DD" onClick={selectAll}>
            Select All
          </Button>
        </div>
      </div>
      <Box
        overflowY="auto"
        minHeight="300px"
        maxHeight="400px"
        className="border-2 border-[#97AEFF]"
      >
        <Table variant="unstyled" className="border-collapse">
          <Thead className="sticky top-0 bg-[#4365DD]">
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                  const meta: any = header.column.columnDef.meta
                  return (
                    <Th
                      key={header.id}
                      isNumeric={meta?.isNumeric}
                      className="border-x-2 border-[#97AEFF]"
                    >
                      <div className="flex items-center justify-between ">
                        {header.column.getCanFilter() ? (
                          <MultiSelectColumnFilter
                            column={header.column}
                            table={table}
                          />
                        ) : null}
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanSort() ? (
                          <chakra.span
                            onClick={header.column.getToggleSortingHandler()}
                            pl="4"
                            className="hover:cursor-pointer"
                          >
                            {header.column.getIsSorted() ? (
                              header.column.getIsSorted() === 'desc' ? (
                                <BsChevronUp />
                              ) : (
                                <BsChevronDown />
                              )
                            ) : (
                              <BsArrowDownUp />
                            )}
                          </chakra.span>
                        ) : null}
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
                    <Td
                      key={cell.id}
                      isNumeric={meta?.isNumeric}
                      className="border-2 border-[#97AEFF]"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  )
                })}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </div>
  )
}
