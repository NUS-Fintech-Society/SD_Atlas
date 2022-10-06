const mockData = {
  name: 'Bob tan',
  gender: 'M',
  batch: 'AY2022/23',
  year: 2,
  faculty: 'Computing',
  major: 'Computer Science',
  telegram: '@bobbytan',
  discord: 'bobtan#123',
  nus_email: 'bobtan@u.nus.edu',
  personal_email: 'bobtan@gmail.com',
  hobbies: ['fishing', 'coding', 'running'],
  department: 'Software Development',
  role: 'Backend Engineer',
  projects: ['Atlas HRMS', 'DAO'],
}
const ProfilePage = () => {
  return (
    <div
      style={{
        padding: '48px',
      }}
    >
      <h1>Profile Page</h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
        <ProfilePicture />
        <ProfileInfo {...mockData} />
      </div>
    </div>
  )
}

const ProfilePicture = () => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div
        style={{
          border: '2px solid blue',
        }}
      >
        <div
          style={{
            border: '2px solid red',
            height: '300px',
            width: '300px',
          }}
        >
          Profile PIC
        </div>
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', gap: '4px' }}
        >
          <UploadImageBtn />
          <DeleteImageBtn />
        </div>
      </div>
    </div>
  )
}
const UploadImageBtn = () => {
  return (
    <div
      style={{
        border: '2px solid red',
        height: '40px',
        width: '40px',
      }}
    >
      Ubtn
    </div>
  )
}
const DeleteImageBtn = () => {
  return (
    <div
      style={{
        border: '2px solid red',
        height: '40px',
        width: '40px',
      }}
    >
      Dbtn
    </div>
  )
}

interface ProfileInfoProps {
  name: string
  gender: string
  batch: string
  year: number
  faculty: string
  major: string
  telegram: string
  discord: string
  nus_email: string
  personal_email: string
  hobbies: string[]
  department: string
  role: string
  projects: string[]
}
const ProfileInfo = (props: ProfileInfoProps) => {
  return (
    <div>
      <p style={{ marginTop: '0px' }}>Name: {props.name}</p>
      <p>Gender: {props.gender}</p>
      <p>Batch: {props.batch}</p>
      <p>Year: {props.year}</p>
      <p>Faculty: {props.faculty}</p>
      <p>Major: {props.major}</p>
      <p>Telegram: {props.telegram}</p>
      <p>Discord: {props.discord}</p>
      <p>NUS Email: {props.nus_email}</p>
      <p>Personal Email: {props.personal_email}</p>
      <p>Hobbies: {props.hobbies}</p>
      <p>Department: {props.department}</p>
      <p>Role: {props.role}</p>
      <p>Projects: {props.projects}</p>
    </div>
  )
}

export default ProfilePage
