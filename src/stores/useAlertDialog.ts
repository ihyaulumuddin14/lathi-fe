import { create } from "zustand";

type AlertDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  alertDialogType: "login" | "register" | "warning" | null;
  setAlertDialogType: (alertDialogType: "login" | "register" | "warning" | null) => void;
};

export const useAlertDialog = create<AlertDialogProps>(set => ({
  open: false,
  onOpenChange: (open: boolean) => {set({ open })},
  alertDialogType: null,
  setAlertDialogType: (alertDialogType: "login" | "register" | "warning" | null) => {
    set({ alertDialogType })
    set({ open: true })
  },
}))