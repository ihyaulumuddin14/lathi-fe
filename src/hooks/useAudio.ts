import { useEffect, useRef, useState } from "react"

export const useAudio = ({
   src,
   baseVolume = 1,
   loop = false
}: {
   src: string
   baseVolume?: number
   loop?: boolean
}) => {
   const audio = useRef<HTMLAudioElement | null>(null)

   useEffect(() => {
      audio.current = new Audio(src)
      audio.current.loop = !!loop

      return () => {
         audio.current?.pause()
         audio.current = null
      }
   }, [src])

   useEffect(() => {
      if (!audio.current) return

      audio.current.volume = Math.min(1, Math.max(0, baseVolume))
   }, [baseVolume])

   const play = () => audio.current?.play()

   const pause = () => audio.current?.pause()
   
   const stop = () => {
      if (!audio.current) return

      audio.current.pause()
      audio.current.currentTime = 0
   }

   return {
      play, pause, stop
   }
}