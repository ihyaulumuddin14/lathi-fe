import { twMerge } from "tailwind-merge"
import clsx from "clsx"

export default function Skeleton({
   className = "w-28 h-8"
}: {
   className?: string
}) {
   return (
      <div className={
         twMerge(
            clsx("rounded-md bg-neutral-400 animate-pulse ", className)
         )
      }/>
   )
}
