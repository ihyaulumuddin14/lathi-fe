"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import React from 'react'

type AlertDialogGameProps = {
  title: string,
  description?: string,
  children: React.ReactNode,
  footer?: boolean
}

const AlertDialogGame = ({title, description, children, footer = false}: AlertDialogGameProps) => {
  return (
    <AlertDialog open>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        children

        <AlertDialogFooter>
          {footer && (
            <>
              <AlertDialogCancel />
              <AlertDialogAction />
            </>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AlertDialogGame