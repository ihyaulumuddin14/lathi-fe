import { create } from "zustand";

type TypingAnimationProps = {
   animationDone: boolean,
   setAnimationDone: (args: boolean) => void
}

export const useTypingAnimation = create<TypingAnimationProps>(set => ({
   animationDone: false,
   setAnimationDone: (args: boolean) => {
      set({
         animationDone: args
      })
   }
}))