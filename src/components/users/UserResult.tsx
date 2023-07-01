import React from 'react'
import UserItem from './UserItem'
import { useAppSelector } from '../../hooks/redux'
import Spinner from '../layout/Spinner'

interface UserResultProps {}

const UserResult: React.FC<UserResultProps> = () => {
  const { users, usersIsLoading } = useAppSelector((state) => state.github)
  return (
    <>
      {usersIsLoading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
          {users?.map((user: any) => (
            <UserItem key={user.id} user={user} />
          ))}
        </div>
      )}
    </>
  )
}

export default UserResult
