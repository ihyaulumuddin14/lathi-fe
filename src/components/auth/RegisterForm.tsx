'use client'

import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { RegisterCredentials, RegisterSchema } from '@/schema/AuthSchema'
import Loader from '../Loader'
import { useAlertDialog } from '@/stores/useAlertDialog'
import { toast } from 'sonner'

const RegisterForm = () => {
  const { setAlertDialogType } = useAlertDialog()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterCredentials>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "asdfasd",
      email: "asdf@gmail.com",
      password: "asdfs3J?",
    },
    mode: "onChange"
  });

  const handleRegisterSubmit = async (registerPayload: RegisterCredentials) => {
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
      setAlertDialogType("email-sent")
      toast.success("Akun berhasil didaftarkan!")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleRegisterSubmit)} className='w-full py-[1vw] flex flex-col gap-3'>
      <div className="w-full flex flex-col gap-1">
        <Input {...register("username")} id="username" type="text" className="w-full py-2 px-4" placeholder='Username'/>
        {
          errors.username && (
            <p className='pl-1 text-xs text-destructive'>{errors.username.message}</p>
          )
        }
      </div>
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

      <Button type='submit' disabled={isSubmitting} className={`${isSubmitting ? "cursor-not-allowed" : ""}`}>
        {isSubmitting ? (
          <Loader />
        ) : "Daftar"}
      </Button>
    </form>
  )
}

export default RegisterForm