import { trpc } from '~/utils/trpc'
import LoadingScreen from '../LoadingGif'

const AnnouncementTable = () => {
  const { isLoading, data } = trpc.useQuery([
    'announcement.getAllAnnouncements',
  ])

  // Used to render the projects
  const render = data?.map((announcement) => (
    <div
      className="max-w-sm rounded overflow-scroll shadow-lg border-4 border-black"
      key={announcement.announcement_id}
    >
      <div className="px-6 py-4 max-h-60 ">
        <div className="font-bold text-xl mb-2">{announcement.title}</div>
        <p>
          <strong>Posted By:</strong>{' '}
          {announcement.created_by.name || 'An admin user '}
        </p>
        <p>
          <strong>Date of post:</strong>{' '}
          {announcement.updated_date.toLocaleString()}
        </p>
        <br />
        <p className="text-gray-700 text-base text-ellipsis">
          {announcement.content}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2"></div>
    </div>
  ))

  return <>{isLoading ? <LoadingScreen /> : render}</>
}

export default AnnouncementTable
