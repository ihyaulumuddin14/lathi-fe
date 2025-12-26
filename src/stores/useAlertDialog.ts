import { create } from "zustand";

type AlertDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  alertDialogType: "login" | "register" | "email-sent" | "warning" | null;
  setAlertDialogType: (alertDialogType: "login" | "register" | "email-sent" | "warning" | null) => void;
};

export const useAlertDialog = create<AlertDialogProps>(set => ({
  open: false,
  onOpenChange: (open: boolean) => {set({ open })},
  alertDialogType: null,
  setAlertDialogType: (alertDialogType: "login" | "register" | "email-sent" | "warning" | null) => {
    set({ alertDialogType })
    set({ open: true })
  },
}))