
import { Metadata } from "next"
import ProtectedRoute from "../ProtectedRoute"
import Profile from "./Profile"

export const metadata: Metadata = {
   title: "Profil",
   description: "Profil pemain untuk melihat statistik pemain, perubahan data pada akun pemain, dan personalisasi"
}

const ProfilePage = () => {
   return (
      <ProtectedRoute>
         <Profile />
      </ProtectedRoute>
   )
}

export default ProfilePage