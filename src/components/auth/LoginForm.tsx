'use client'

import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { LoginSchema, LoginCredentials } from '@/schema/AuthSchema'
import Loader from '../Loader'

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const handleLoginSubmit = async (loginPayload: LoginCredentials) => {
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          const number = Math.floor(Math.random() * 100)

          if (number % 2 === 0) {
            resolve(number)
          } else {
            reject(number)
          }
        }, 1000)
      })

      console.log(loginPayload)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleLoginSubmit)} className='w-full py-[1vw] flex flex-col gap-3'>
      <div className="w-full flex flex-col gap-1">
        <Input {...register("email")} id="email" type="email" className="w-full py-2 px-4" placeholder='Email'/>
        {
          errors.email && (
            <p className='pl-1 text-xs text-destructive'>{errors.email.message}</p>
          )
        }
      </div>
      <div className="w-full flex flex-col gap-1 relative">
        <Input {...register("password")} id="password" type='password' className="w-full py-2 px-4" placeholder='Password'/>
        {
          errors.password && (
            <p className='pl-1 text-xs text-destructive'>{errors.password.message}</p>
          )
        }
      </div>

      <Button
        type='submit'
        disabled={isSubmitting}
      >
        {isSubmitting ? <Loader/> : "Masuk"}
      </Button>
    </form>
  )
}

export default LoginForm