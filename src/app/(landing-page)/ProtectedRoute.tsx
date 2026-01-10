'use client'

import { useAuthStore } from '@/stores/useAuthStore';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
   const { accessToken, setAccessToken } = useAuthStore()
   const router = useRouter()

   useEffect(() => {
      const refresh = async () => {
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
      }

      if (!accessToken) refresh()
   }, [accessToken])

   return (
      <>{ children }</>
   )
}
