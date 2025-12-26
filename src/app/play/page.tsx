import React from 'react'
import ProtectedRoute from '../ProtectedRoute'

const Play = () => {
  return (
    <ProtectedRoute>
      <div className='min-h-screen bg-white'>Lakon</div>
    </ProtectedRoute>
  )
}

export default Play