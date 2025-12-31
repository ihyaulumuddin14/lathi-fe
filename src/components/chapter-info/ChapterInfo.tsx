"use client"

import {
   AlertDialog,
   AlertDialogContent,
   AlertDialogHeader,
   AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { useChapter } from "@/hooks/useChapter";
import { useGameInfo } from "@/stores/useGameInfo";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

const ChapterInfo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedChapterId } = useGameInfo()
  const { chapters } = useChapter()

  return (
    <>
      <div onClick={() => {
         if (selectedChapterId) setIsOpen(true)
         else toast.error("Silakan pilih Chapter untuk dimainkan")
      }} className="w-full max-w-50 text-secondary-foreground relative aspect-square rounded-full shadow-2xl hover:scale-102 active:scale-97 transition-all duration-200 cubic-bezier(0.65,-0.67,0.27,0.99) cursor-pointer -rotate-5 shadow-accent-foreground bg-secondary">
        {selectedChapterId ? (
         <>
            <p className="relative z-1 text-sm sm:text-lg text-primary bg-secondary font-bold px-4 py-1 rounded-md w-fit rotate-5 shadow-2xl shadow-accent-foreground">Saat ini</p>
            <h2 className="absolute z-2 text-md sm:text-xl italic uppercase text-secondary font-bold  bg-primary px-4 py-1 rounded-md shadow-lg shadow-accent-foreground w-fit">
               Chapter {chapters.find(chapter => chapter.id === selectedChapterId)?.order_index}
            </h2>
            <Image src={"/bg-hero.webp"} fill alt="chapter_image" className="rounded-full z-0 mt-5 object-cover"/>
         </>
        ) : (
         <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-2xl text-center font-semibold">Silakan pilih Chapter</p>
        )}
      </div>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className="">
          <AlertDialogHeader className="relative">
            <div
              className="close w-fit h-fit p-1 absolute -top-3 -right-3 active:scale-90 border border-[#7373737a] rounded-md cursor-pointer"
              onClick={() => {setIsOpen(false)}}
            >
              <X color="#737373" size={20} />
            </div>
            <AlertDialogTitle className="text-center">
               Chapter{" "}
               {chapters.find(chapter => chapter.id === selectedChapterId)?.order_index}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <div className="w-full flex justify-center items-center gap-10">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim, hic obcaecati? Numquam corporis at fugit libero sit pariatur repudiandae nihil.</p>
            <Image src={"/abil-photo.webp"} alt="chapter_image" width={100} height={100} className="rounded-full aspect-square" loading="lazy"/>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default ChapterInfo