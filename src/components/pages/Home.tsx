import React from 'react'
import UserResult from '../users/UserResult'
import UserSearch from '../users/UserSearch'

const Home: React.FC = () => {
  return (
    <div>
      <UserSearch />
      <UserResult />
    </div>
  )
}

export default Home
