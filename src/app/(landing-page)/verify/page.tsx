"use client"

import { redirect } from "next/navigation"

const Verify = () => {
  redirect("/home?verified=true")
}

export default Verify