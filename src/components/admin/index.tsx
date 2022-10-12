import {
  createColumnHelper,
  ColumnDef,
  flexRender,
  useReactTable,
  getCoreRowModel,
} from '@tanstack/react-table'
import { itemType } from '../../pages/admin'

const columnHelper = createColumnHelper<itemType>()
const columns: ColumnDef<itemType>[] = [
  columnHelper.group({
    header: 'Users',
    columns: [
      columnHelper.accessor('Full Name', {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('NUS email', {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('Gmail', {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('Telegram Handle(@xxx)', {
        cell: (info) => info.getValue(),
      }),
    ],
  }),
]

const DataTable = ({ data }: { data: itemType[] }) => {
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
