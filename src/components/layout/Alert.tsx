import React from 'react'
import { useAppSelector } from '../../hooks/redux'

interface AleartProps {
  className: string
}

const Alert: React.FC<AleartProps> = ({ className: classes }) => {
  const { alert } = useAppSelector((state) => state.ui)

  return (
    <div
      className={`${classes}`}
      style={{ visibility: alert ? 'visible' : 'hidden' }}
    >
      <div className="alert alert-error">
        <div>
          <svg
            fill="none"
            viewBox="0 0 24 24"
            className="w-6 h-6 stroke-current mr-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
            ></path>
          </svg>
          <strong>{alert?.msg}</strong>
        </div>
      </div>
    </div>
  )
}

export default Alert
