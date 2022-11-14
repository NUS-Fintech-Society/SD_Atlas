import {
  createColumnHelper,
  ColumnDef,
  flexRender,
  useReactTable,
  getCoreRowModel,
} from '@tanstack/react-table'
import type { AddUsersType } from '~/store/types/admin.type'
import { useSelector } from 'react-redux'
import { RootState } from '~/store/store'

const columnHelper = createColumnHelper<AddUsersType>()
const columns: ColumnDef<AddUsersType>[] = [
  columnHelper.group({
    header: 'Users',
    columns: [
      columnHelper.accessor('name', {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('nus_email', {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('personal_email', {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('telegram', {
        cell: (info) => info.getValue(),
      }),
    ],
  }),
]

const DataTable = () => {
  const data = useSelector<RootState, AddUsersType[]>(
    (state) => state.dashboard
  )
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default DataTable
