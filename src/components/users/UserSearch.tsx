import React, { useState, useEffect } from 'react'
import {
  useLazySearchUsersQuery,
  useSearchUsersQuery,
} from '../../store/github/github.api'
import Spinner from '../layout/Spinner'
import { useActions } from '../../hooks/action'
import Alert from '../layout/Alert'
import { useDebounce } from '../../hooks/debounce'
import { useNavigate } from 'react-router-dom'

const UserSearch = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [text, setText] = useState<string>('')
  const [dropdown, setDropdown] = useState(false)
  const debounced = useDebounce(text)
  const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true,
  })
  useEffect(() => {
    setDropdown(debounced.length > 3 && data?.length !== 0)
  }, [debounced, data])

  const { setUsers, clearUsers, setAlert, removeAlert, setUsersIsLoading } =
    useActions()
  const [
    fetchLazyUsers,
    {
      // isError: lazyUsersIsError,
      isLoading: lazyUsersIsLoading,
      isSuccess: lazyUsersIsSuccess,
      data: lazyUsers,
    },
  ] = useLazySearchUsersQuery()

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }
  const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (text === '') {
      setAlert({
        msg: 'Please enter something',
        type: 'error',
      })
      setTimeout(() => {
        removeAlert()
      }, 3000)
    } else {
      fetchLazyUsers(text)
      setText('')
    }
  }

  useEffect(() => {
    setUsersIsLoading(lazyUsersIsLoading)
    if (lazyUsersIsSuccess && lazyUsers) {
      setUsers(lazyUsers)
    }
  }, [
    lazyUsersIsSuccess,
    lazyUsers,
    setUsers,
    lazyUsersIsLoading,
    setUsersIsLoading,
  ])

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
      <div>
        <form onSubmit={handlerSubmit}>
          <div className="form-control">
            <div className="relative">
              <Alert className="absolute bottom-20 w-96" />
              <input
                type="text"
                className={`w-full pr-40 bg-gray-200 input input-lg text-black`}
                placeholder="Search"
                value={text}
                onChange={handlerChange}
              />
              {dropdown && (
                <div className="absolute top-[58px] left-[-2px] right-32 max-h-[200px] shadow-md bg-white overflow-y-auto z-10 rounded-b-lg scrollbar-hide">
                  {isLoading && <p className="text-center">Loading...</p>}
                  {data?.map((user) => (
                    <div
                      className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
                      key={user.id}
                      onClick={() => navigate(`user/${user.login}`)}
                    >
                      {user.login}
                    </div>
                  ))}
                </div>
              )}
              <button
                type="submit"
                className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>

      {lazyUsers && lazyUsers.length > 0 && (
        <div>
          <button onClick={() => clearUsers()} className="btn btn-ghost btn-lg">
            Clear
          </button>
        </div>
      )}
    </div>
  )
}

export default UserSearch
