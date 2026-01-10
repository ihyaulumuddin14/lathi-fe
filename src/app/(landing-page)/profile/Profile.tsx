'use client'

import Skeleton from "@/components/Skeleton"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useUser } from "@/hooks/useUser"
import { EditProfileCredentials, EditProfileSchema } from "@/schema/AuthSchema"
import { deleteUserService, editUserService } from "@/services/user.service"
import { useAuthStore } from "@/stores/useAuthStore"
import { animatePageOut } from "@/utils/animation"
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosError } from "axios"
import { Check, CircleStar, MessageSquareWarning, Trophy, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const Profile = () => {
   const router = useRouter()
   const { setAccessToken } = useAuthStore()
   const { user, mutateUser } = useUser()
   const [isOpen, setIsOpen] = useState(false)
   const [isEditMode, setIsEditMode] = useState(false)
   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting }
   } = useForm<EditProfileCredentials>({
      resolver: zodResolver(EditProfileSchema),
      mode: "onChange"
   })

   const handleChangeUsername = async (editProfilePayload: EditProfileCredentials) => {

      try {
         const response = await editUserService(editProfilePayload)

         if (response.success) {
            toast.success(response.message)
            setIsEditMode(false)
            mutateUser({ ...user, username: response.data.username }, true)
         }
      } catch (error) {
         if (error instanceof AxiosError) {
            toast.error(error?.response?.data?.error.detail || "Terjadi kesalahan pada sistem")
         } else {
            toast.error("Terjadi kesalahan pada sistem")
         }
      }
   }

   const handleDeleteUser = async () => {
      try {
         await deleteUserService()
         router.replace("/")
         mutateUser(null, false)
         setAccessToken(null)
      } catch (error) {
         console.log(error)
         if (error instanceof AxiosError) {
            toast.error(error?.response?.data?.error.detail || "Terjadi kesalahan pada sistem")
         } else {
            toast.error("Terjadi kesalahan pada sistem")
         }
      }
   }

   return (
      <>
         <section className='w-full min-h-screen'>
            <div className='bg-[url(/bg_hero.webp)] bg-fixed w-full h-64 opacity-20 mask-b-from-97% z-0'/>

            {/* wrapper */}
            <div className='w-full max-w-6xl h-full mx-auto relative px-[5vw]'>
               <main className="w-full h-fit relative grid grid-cols-1 md:grid-cols-2 gap-5">
                  <header className="text-4xl w-full font-bold text-center md:text-left absolute -top-35">Profil</header>

                  {/* profile */}
                  <article className="relative flex gap-5 border-b border-b-muted">
                     <div className="aspect-square h-[150px] sm:h-[175px] lg:h-[200px] w-[150px] sm:w-[175px] lg:w-[200px] overflow-hidden rounded-4xl relative -top-18 shrink-0">
                        {!user ? (
                           <Skeleton className="aspect-square w-[200px] sm:w-[175px] lg:w-[200px] h-[200px] sm:h-[175px] lg:h-[200px] overflow-hidden rounded-4xl relative -top-18 shrink-0"/>
                        ) : (
                           <img src={user?.avatar_url} alt="user_img" className="object-cover w-full"/>
                        )}
                     </div>

                     <div className="flex flex-col flex-1 min-w-0">
                        {isEditMode ? (
                           <form onSubmit={handleSubmit(handleChangeUsername)} className="w-full flex items-start gap-2">
                              <div className="flex-1 w-full flex flex-col gap-1">
                                 <div className="relative w-full">
                                    <Input
                                       autoFocus
                                       {...register("username")}
                                       className=" font-bold w-full"
                                       defaultValue={user?.username}
                                    />
                                    <X onClick={() => setIsEditMode(false)} color="#737373" className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-2 hover:opacity-50 transition-all duration-75"/>
                                 </div>
                                 {errors.username && (
                                    <p className="pl-1 text-xs text-destructive">
                                       {errors.username.message}
                                    </p>
                                 )}
                              </div>
                              <Button type="submit" disabled={isSubmitting}><Check color="#F2EAD3"/></Button>
                           </form>
                        ) : (
                           <h2 className="text-2xl lg:text-3xl font-bold">
                              {!user ? <Skeleton /> : <span>{user?.username}</span>}
                           </h2>
                        )}
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-light italic mb-3 overflow-x-auto">
                           {!user ? <Skeleton/> : <span>{user?.email}</span>}
                        </h3>
                        {
                           !isEditMode && (
                              <Button
                                 onClick={() => {
                                    setIsEditMode(true)
                                 }}
                                 variant={"outline"}
                                 className="text-md">
                                    Edit Username
                              </Button>
                           )
                        }
                     </div>
                  </article>

                  {/* statistic */}
                  <article className="ml-auto w-full md:w-fit">
                     <h2 className="text-lg font-bold mb-3">Status saat ini</h2>
                     <h3 className="text-4xl font-bold">
                        {!user ? <Skeleton className="w-20 h-9"/> : <span>
                           {(user?.current_title).charAt(0).toUpperCase()+(user?.current_title).slice(1)}
                        </span>}
                     </h3>
                     <div className="w-full flex gap-1 mt-7">
                        {/* completed chapters */}
                        <div className="flex flex-col bg-muted p-3 rounded-md w-full">
                           <span className="text-2xl font-extrabold">
                              {!user ? <Skeleton className="w-12 h-10"/> : <span>{user?.stats?.completed_chapters}</span>}
                           </span>
                           <p className="lowercase">Cerita Tamat</p>
                        </div>

                        {/* progress percent */}
                        <div className="flex flex-col bg-muted p-3 rounded-md w-full">
                           <span className="text-2xl font-extrabold">
                              {!user ? <Skeleton className="w-12 h-10"/> : <span>{user?.stats?.progress_percent}{"%"}</span>}
                           </span>
                           <p className="lowercase whitespace-nowrap">progres cerita</p>
                        </div>

                        {/* collected vocabs */}
                        <div className="flex flex-col bg-muted p-3 rounded-md w-full">
                           <span className="text-2xl font-extrabold">
                              {!user ? <Skeleton className="w-12 h-10"/> : <span>{user?.stats?.collected_vocabs}</span>}
                           </span>
                           <p className="lowercase whitespace-nowrap">kata ditemukan</p>
                        </div>
                     </div>
                  </article>

                  {/* badges */}
                  <article className="w-full border border-muted rounded-md p-5">
                     <h2 className="text-lg font-bold mb-3">Lencana</h2>

                     <div className="flex gap-1">
                        {user ? (
                           user.badges ? (
                              user?.badges.map((badge, index) => (
                                 <Tooltip key={index}>
                                    <TooltipTrigger asChild>
                                       <div className="w-[50px] aspect-square relative">
                                          <img src={badge?.icon_url} className="w-full" alt="badge_img"/>
                                       </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                          {badge.name}
                                    </TooltipContent>
                                 </Tooltip>
                              ))
                           )  : (
                              <p>Belum ada lencana</p>
                           )
                        ) : ([...Array(3)].map((_, index) => (
                           <Skeleton key={index} className="w-12 h-12 rounded-full"/>
                        )))}
                     </div>
                  </article>
                  
                  {/* classement */}
                  <Tooltip>
                     <TooltipTrigger asChild>
                        <article onClick={() => {
                           animatePageOut({
                              href: "/leaderboard",
                              router,
                              animate: "stagger"
                           })
                        }} className="w-full border border-muted rounded-md p-5 cursor-pointer hover:bg-muted/10">
                           <h2 className="text-lg font-bold mb-3">Klasemen</h2>

                           {user ? (
                              user.leaderboard_info ? (
                                 <div className="w-full grid grid-cols-2">
                                    {/* rank */}
                                    <div className="w-full flex justify-center items-center gap-4">
                                       <Trophy size={50}/>
                                       <div className="flex flex-col justify-center items-start">
                                          <span className="text-3xl font-extrabold">
                                             {!user ? <Skeleton className="h-12 aspect-square"/> : <span>{user?.leaderboard_info?.rank}</span>}
                                          </span>
                                          <p>Peringkat</p>
                                       </div>
                                    </div>

                                    {/* score */}
                                    <div className="w-full flex justify-center items-center gap-4">
                                       <CircleStar size={50}/>
                                       <div className="flex flex-col justify-center items-start">
                                          <span className="text-3xl font-extrabold">
                                             {!user ? <Skeleton className="h-12 w-15"/> : <span>{user?.leaderboard_info?.score}</span>}
                                          </span>
                                          <p>Skor</p>
                                       </div>
                                    </div>
                                 </div>
                              ) : (
                                 <>Kamu belum pernah bermain lakon</>
                              )
                           ) : (
                                 <div className="w-full grid grid-cols-2">
                                    {/* rank */}
                                    <div className="w-full flex justify-center items-center gap-4">
                                       <Trophy size={50}/>
                                       <div className="flex flex-col justify-center items-start">
                                          <span className="text-3xl font-extrabold">
                                             <Skeleton className="h-12 aspect-square"/>
                                          </span>
                                          <p>Peringkat</p>
                                       </div>
                                    </div>

                                    {/* score */}
                                    <div className="w-full flex justify-center items-center gap-4">
                                       <CircleStar size={50}/>
                                       <div className="flex flex-col justify-center items-start">
                                          <span className="text-3xl font-extrabold">
                                             <Skeleton className="h-12 w-15"/>
                                          </span>
                                          <p>Skor</p>
                                       </div>
                                    </div>
                                 </div>
                           )}

                        </article>
                     </TooltipTrigger>
                     <TooltipContent>
                        Klasemen terkini
                     </TooltipContent>
                  </Tooltip>

                  <article className="w-full">
                     <h2 className="text-lg font-bold text-destructive mb-1">Hapus Akun</h2>
                     <hr className="border-b border-b-muted border-0"/>
                     <p className="text-muted-foreground mb-5">Ketika kamu menghapus akun, kamu tidak dapat mengurungkan aksi dan mengembalikan akun yang telah terdaftar. Mohon berhati-hati.</p>

                     <Button onClick={() => setIsOpen(true)} variant={"destructive"} className="font-bold">Hapus Akun</Button>
                  </article>
               </main>
            </div>
            
            <footer className="w-full mt-20 py-5">
               <p className="text-primary tracking-widest text-center">Copyright &copy; 2025 Lathi.</p>
            </footer>
         </section>

         <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent>
               <AlertDialogHeader className='w-full flex flex-col justify-center items-center'>
                  <MessageSquareWarning size={40} className='my-7'/>
                  <AlertDialogTitle className='text-2xl font-bold'>
                     Yakin ingin menghapus akun?
                  </AlertDialogTitle>
                  <AlertDialogDescription className='my-3 text-center'>Perhatian: Ketika kamu menghapus akun, kamu tidak dapat mengurungkan aksi dan mengembalikan akun yang telah terdaftar. Mohon berhati-hati.</AlertDialogDescription>
               </AlertDialogHeader>

               <AlertDialogFooter className='w-full h-fit flex flex-col sm:flex-col'>
                  <Button
                     onClick={handleDeleteUser}
                     variant={"destructive"}
                     className="w-full"
                  >
                     Hapus Akun
                  </Button>
                  <AlertDialogCancel
                     className='w-full'>
                        Kembali
                  </AlertDialogCancel>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialog>
      </>
   )
}

export default Profile