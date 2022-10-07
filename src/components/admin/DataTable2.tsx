import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
} from '@tanstack/react-table'

//   const columnHelper = createColumnHelper<tableDataType>()
//   const columns = [
//     columnHelper.accessor('name', {
//       cell: (info) => info.getValue(),
//       header: () => <h1>Name</h1>,
//     }),

//     columnHelper.accessor('email', {
//       cell: (info) => info.getValue(),
//       header: () => <h1>Email</h1>,
//     }),

//     columnHelper.accessor('telegram', {
//       cell: (info) => info.getValue(),
//       header: () => <h1>Telegram</h1>,
//     }),
//   ]
//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   })
