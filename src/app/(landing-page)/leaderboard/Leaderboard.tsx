'use client'

import Skeleton from "@/components/Skeleton"
import { useLeaderboards } from "@/hooks/useLeaderboards"
import { useUser } from "@/hooks/useUser"
import { LeaderboardItem } from "@/schema/GameSchema"
import { CircleStar, User } from "lucide-react"
import Image from "next/image"
import { useMemo } from "react"
const userDummy = {
   rank: 1,
   user_id: "2343",
   username: "SuamiSekarUhuy",
   avatar_url: "/ulum_photo.webp",
   title: "priyayi",
   score: 970
}
const Leaderboard = () => {
   const { topUsers } = useLeaderboards()
   const { user } = useUser()

   return (
      <section className='w-full min-h-screen relative'>
         <div className='bg-[url(/bg_hero.webp)] bg-fixed w-full h-64 opacity-20 mask-b-from-97% z-0'/>
         
         {/* wrapper */}
         <div className='w-full max-w-6xl h-full mx-auto relative py-[clamp(6px,6vw,30px)] px-[6vw] -translate-y-[18vh] rounded-md sm:rounded-xl bg-white'>
            <header className='w-full grid grid-cols-1 md:grid-cols-[1fr_400px] md:gap-10 gap-5 mb-5'>
               <div className='w-full h-full text-center md:text-left flex flex-col justify-center gap-4'>
                  <h1 className='text-4xl font-bold'>Papan Peringkat</h1>
                  <h2 className='text-sm sm:text-base text-muted-foreground leading-5'>Inilah barisan jiwa yang mampu menjaga karsa dan menenun tutur kata dengan paling bijak. Apakah namamu tercatat di antara mereka?</h2>
               </div>

               <div className='w-full h-[324px] grid grid-cols-3 gap-2 items-end relative'>
                  {topUsers ? (topUsers.slice(0,3).map((user, index) => (
                     <RankBar key={index} item={user}/>
                  ))) : (
                     <p className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">Belum ada pemain</p>
                  )}
               </div>
            </header>

            <main className="w-full pt-5 border-t border-t-muted flex flex-col gap-2">
               <h3 className="text-xl font-bold">Peringkat 5 Teratas</h3>
               {topUsers ? (topUsers.map((user, index) => (
                  <div key={index} className="w-full p-3 md:px-6 flex bg-muted/40 rounded-md md:rounded-2xl items-center gap-3 md:gap-7 hover:bg-muted/60">
                     <div className={`
                        ${index === 0 && "bg-chart-1 text-secondary"}
                        ${index === 1 && "bg-chart-2 text-secondary"}
                        ${index === 2 && "bg-chart-3 text-secondary"}
                        h-[25px] md:h-[50px] aspect-square rounded-full text-lg font-bold flex justify-center items-center shrink-0`}>
                        {index + 1}
                     </div>
                     <div className="min-w-0 flex-1 flex items-center gap-3">
                        <div className="w-[30px] h-[30px] shrink-0 aspect-square border rounded-full overflow-hidden">
                           <img src={userDummy.avatar_url} alt="user_img" className="w-full h-full object-center object-cover"/>
                        </div>
                        <div className="min-w-0 flex-1 line-clamp-1">
                           <h2 className="font-bold text-lg sm:text-xl">{userDummy.username}</h2>
                           <h3 className="italic leading-4">{userDummy.title}</h3>
                        </div>
                     </div>

                     <div className="ml-auto flex gap-2 justify-center items-center bg-primary py-2 px-4 rounded-lg overflow-hidden shrink-0 line-clamp-1">
                        <CircleStar size={20} color="#F2EAD3"/>
                        <span className="text-secondary">{userDummy.score}</span>
                     </div>
                  </div>
               ))) : (
                  <p>Belum ada pemain</p>
               )}

               <hr className="border-b border-muted border-0 my-5"/>

               <h3 className="text-xl font-bold">Peringkat Kamu</h3>
               <div className="w-full p-3 md:px-6 flex bg-muted/40 rounded-md md:rounded-2xl items-center gap-3 md:gap-7 border-5 border-primary shadow-lg shadow-primary/50">
                  {user ? (
                     user.leaderboard_info ? (
                        <>
                           <div className={`
                              ${user.leaderboard_info.rank === 1 && "bg-chart-1 text-secondary"}
                              ${user.leaderboard_info.rank === 2 && "bg-chart-2 text-secondary"}
                              ${user.leaderboard_info.rank === 3 && "bg-chart-3 text-secondary"}
                              h-[25px] md:h-[50px] aspect-square rounded-full text-lg font-bold flex justify-center items-center`}>
                              {user && user.leaderboard_info.rank}
                           </div>
                           <div className="flex items-center gap-3">
                              <div className="w-[50px] relative aspect-square border rounded-full overflow-hidden">
                                 <img src={user.avatar_url} alt="user_img" className="w-full h-full object-center object-cover"/>
                              </div>
                              <div className="">
                                 <h2 className="font-bold text-xl">{user.username}</h2>
                                 <h3 className="italic leading-4">{user.current_title}</h3>
                              </div>
                           </div>
         
                           <div className="ml-auto flex gap-2 justify-center items-center bg-primary py-2 px-4 rounded-lg overflow-hidden shrink-0">
                              <CircleStar size={20} color="#F2EAD3"/>
                              <span className="text-secondary line-clamp-1">{user.leaderboard_info.score}</span>
                           </div>
                        </>
                     ) : (
                        <>Kamu belum pernah bermain lakon</>
                     )
                  ) : (
                     <>
                        <div className={`h-[25px] md:h-[50px] aspect-square rounded-full text-lg font-bold flex justify-center items-center bg-neutral-400 animate-pulse`}/>
                        <div className="flex items-center gap-3">
                           <div className="aspect-square border rounded-full overflow-hidden w-[30px] bg-neutral-400 animate-pulse">
                           </div>
                           <div className="flex flex-col gap-1">
                              <Skeleton className="h-3 w-7"/>
                              <Skeleton className="h-2 w-12"/>
                           </div>
                        </div>
      
                        <Skeleton className="ml-auto h-10 w-24"/>
                     </>
                  )}
               </div>
            </main>
         </div>
         
         <footer className="w-full mt-20 py-5">
            <p className="text-primary tracking-widest text-center">Copyright &copy; 2025 Lathi.</p>
         </footer>
      </section>
   )
}

export default Leaderboard


const RankBar = ({
   item
}: {
   item: LeaderboardItem
}) => {
   const source = useMemo(() => {
      if (item.rank === 1) return "/medal/first.png"
      else if (item.rank === 2) return "/medal/second.png"
      else return "/medal/third.png"
   }, [item.rank])

   return (
      <div className={`w-full 
         ${item.rank === 1 && "h-full"}
         ${item.rank === 2 && "h-[85%]"}
         ${item.rank === 3 && "h-[70%]"}
         rounded-lg overflow-hidden relative flex flex-col justify-end items-center p-2 group line-clamp-1`}
         >
            {/* background */}
            <div className={`w-full h-full
               ${item.rank === 1 && "bg-chart-1"}
               ${item.rank === 2 && "bg-chart-2"}
               ${item.rank === 3 && "bg-chart-3"}
               mask-t-from-50% opacity-50 group-hover:opacity-75 absolute top-0 left-0 -z-1`}/>

            <div className="w-[70%] aspect-square relative mb-3">
               <Image src={source} alt="medal_img" fill className="object-cover"/>
            </div>

            <div className="w-[50px] aspect-square relative flex justify-center items-center">
               {item ? (
                  <img src={item.avatar_url} alt="user_img" className="w-full h-full object-center object-cover"/>
               ) : (
                  <User color="#3F2305" size={50}/>
               )}
            </div>

            <h3 className="font-bold text-sm sm:text-md md:text-lg w-full line-clamp-1">{item ? item?.username : "-"}</h3>
            <h4 className="text-sm sm:text-md italic">{item ? item?.title : "-"}</h4>
            <div className="flex gap-2 mt-2 justify-center items-center w-full bg-primary p-1 rounded-lg overflow-hidden shrink-0">
               <CircleStar size={20} color="#F2EAD3"/>
               <span className="text-secondary line-clamp-1">{item ? item?.score : "-"}</span>
            </div>
      </div>
   )
}