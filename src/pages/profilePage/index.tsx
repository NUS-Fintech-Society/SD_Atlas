const mockData = {
  name: 'Bob tan',
  gender: 'M',
  year: 'AY2022/23',
  faculty: 'Computing',
  major: 'Computer Science',
  telegram: '@bobbytan',
  discord: 'bobtan#123',
  nus_email: 'bobtan@u.nus.edu',
  personal_email: 'bobtan@gmail.com',
  hobbies: ['fishing', 'coding', 'running'],
  department: 'Software Development',
  role: 'Backend Engineer',
  projects: ['Atlas HRMS', ['DAO']],
}
const ProfilePage = () => {
  return (
    <div style={{ padding: '48px' }}>
      <p>Profile Page</p>
      <ProfilePicture />
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

export default ProfilePage
