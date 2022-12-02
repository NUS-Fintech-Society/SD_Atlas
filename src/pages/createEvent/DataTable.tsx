import ReactSelect, { components } from 'react-select'
import { BiFilterAlt } from 'react-icons/bi'
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
  Menu,
  MenuButton,
  MenuList,
} from '@chakra-ui/react'
import React, { HTMLProps, useRef } from 'react'

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
const MultiSelectFilterFn: FilterFn<any> = (row, columnId, value) => {
  if (value.length === 0) return true
  const rowValue = row.getValue(columnId)
  return rowValue !== undefined ? value.includes(rowValue) : true
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
    filterFn: 'equalsString',
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
                      <div className="flex items-center">
                        {header.column.getCanFilter() ? (
                          <MultiSelectColumnFilter
                            column={header.column}
                            table={table}
                          />
                        ) : null}
                        <button
                          onClick={() =>
                            console.log(header.column.getFilterValue())
                          }
                        >
                          get
                        </button>
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

  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach((row) => {
      options.add(row.original[id])
    })
    const arr = []
    for (const key of options) {
      arr.push({ value: key, label: key })
    }
    return arr
  }, [id, preFilteredRows])

  const [selectedOptions, setSelectedOptions] = React.useState([])

  return (
    <div>
      <ReactSelect
        options={options}
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        components={{
          Option,
        }}
        onChange={(options) => {
          setSelectedOptions(options)
          console.log(options)
          if (Array.isArray(options)) {
            column.setFilterValue(options.map((opt) => opt.value))
          }
        }}
        value={selectedOptions}
        className="text-black w-40"
        isSearchable={false}
      />
    </div>
  )
}

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{' '}
        <label>{props.label}</label>
      </components.Option>
    </div>
  )
}
