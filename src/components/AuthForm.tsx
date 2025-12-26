'use client'

import React, { useState } from 'react'
import { Input } from './ui/input'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from './ui/button'

type AuthFormProps = {
  formType: "login" | "register" | "warning"
}

const AuthForm = ({ formType }: AuthFormProps) => {
  const [passwordVisible, setPasswordVisible] = useState(false)

  return (
    <form action="" className="w-full py-[1vw] flex flex-col gap-3">
      {formType === "register" && (
        <div className="w-full flex flex-col gap-1">
          <Input id="name" type="text" className="w-full py-2 px-4" placeholder='Nama'/>
        </div>
      )}
      {formType !== "warning" && (
        <>
          <div className="w-full flex flex-col gap-1">
            <Input id="email" type="email" className="w-full py-2 px-4" placeholder='Email'/>
          </div>
          <div className="w-full flex flex-col gap-1 relative">
            <Input id="password" type={passwordVisible ? "text" : "password"} className="w-full py-2 px-4" placeholder='Password'/>
            <span className='right-3 top-1/2 -translate-y-1/2 absolute w-fit h-fit cursor-pointer' onClick={() => setPasswordVisible(prev => !prev)}>
              {
                passwordVisible ? (
                  <Eye/>
                ) : (
                  <EyeOff/>
                )
              }
            </span>
          </div>
        </>
      )}

      <Button onClick={() => {}}>
        {
          formType === "login" && "Masuk"
        }
        {
          formType === "register" && "Daftar"
        }
      </Button>
    </form>
  )
}

export default AuthForm