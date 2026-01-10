'use client'

import { useAlertDialogIntercept } from '@/stores/useAlertDialogIntercept';
import { useAuthStore } from '@/stores/useAuthStore';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { toast } from 'sonner';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
   const { accessToken, setAccessToken } = useAuthStore()
   const router = useRouter()
   const { setAlertDialogType } = useAlertDialogIntercept()

   useEffect(() => {
      const refresh = async () => {
         try {
            const response = await axios.post(
               `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
               {},
               {
                  withCredentials: true,
               }
            );
   
            const newAccessToken = response.data.access_token;
   
            if (response.data.success) {
               setAccessToken(newAccessToken);
            } else {
               router.replace("/home")
            }
         } catch (error) {
            router.replace("/home")
            toast.error("Maaf kamu belum login")
            setAlertDialogType("login")
         }
      }

      if (!accessToken) refresh()
   }, [accessToken])

   if (!accessToken) return null

   return (
      <>{ children }</>
   )
}
