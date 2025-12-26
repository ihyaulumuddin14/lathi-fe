'use client'

import { useAlertDialog } from '@/stores/useAlertDialog'
import { useAuth } from '@/stores/useAuth'
import React, { useEffect } from 'react'
import { useShallow } from 'zustand/shallow'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, accessToken } = useAuth(
    useShallow(state => ({
      user: state.user,
      accessToken: state.accessToken
    }))
  )
  const { setAlertDialogType } = useAlertDialog()

  const authorized  = user && accessToken

  useEffect(() => {
    if (!authorized) setAlertDialogType("warning")
  }, [])

  if (!authorized) {
    return null
  }

  return (
    <>
      {children}
    </>
  )
}

export default ProtectedRoute