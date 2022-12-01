import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
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
  Menu,
  MenuButton,
  MenuList,
} from '@chakra-ui/react'
import React, { HTMLProps } from 'react'

type Attendees = {
  department: string
  role: string
  name: string
}

//TODO: find a way to add checkbox to id each row
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
  const ref = React.useRef<HTMLInputElement>(null!)

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [ref, indeterminate])

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
  }),
  columnHelper.accessor('role', {
    cell: (info) => info.getValue(),
    header: 'Role',
    enableColumnFilter: true,
  }),
  columnHelper.accessor('name', {
    cell: (info) => info.getValue(),
    header: 'Name',
    enableColumnFilter: true,
  }),
]

export type DataTableProps<Data extends object> = {
  data: Data[]
  columns: ColumnDef<Data, any>[]
}

// ref https://github.com/chakra-ui/chakra-ui/discussions/4380
//TODO: Add filtering
export function DataTable<Data extends object>({
  data,
  columns,
}: DataTableProps<Data>) {
  const [rowSelection, setRowSelection] = React.useState({})
  const [sorting, setSorting] = React.useState<SortingState>([])
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      rowSelection,
    },
    onRowSelectionChange: (e) => {
      setRowSelection(e)
      console.log(rowSelection)
    },
    debugTable: true,
  })
  const clearSelection = () => {
    setRowSelection({})
  }

  const selectAll = () => {
    if (!table.getIsAllRowsSelected()) {
      table.toggleAllRowsSelected()
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center py-4">
        <p className="text-2xl">Attendees</p>
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
        maxHeight="300px"
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
                      <div className="flex">
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

function MultiSelectColumnFilter({
  column,
  table,
}: {
  column: any
  table: any
}) {
  const preFilteredRows = table.getPreFilteredRowModel().rows
  const id = column.id
  const filterValue = column.getFilterValue()
  const setFilter = column.setFilterValue

  console.log(preFilteredRows)
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach((row) => {
      options.add(row.original[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  return (
    <Menu>
      <MenuButton as={Button}>V</MenuButton>
      <MenuList>
        <select
          multiple
          value={filterValue}
          onChange={(e) => {
            setFilter(e || undefined)
          }}
          className="bg-black w-full"
        >
          {options.map((val) => (
            <option key={val}>{val}</option>
          ))}
        </select>
      </MenuList>
    </Menu>
  )
}
