"use client";

import { useUser } from "@/hooks/useUser";
import { useAlertDialogIntercept } from "@/stores/useAlertDialogIntercept";
import { useAuthStore } from "@/stores/useAuthStore";
import { AxiosError } from "axios";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { useShallow } from "zustand/shallow";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { accessToken } = useAuthStore(
    useShallow((state) => ({
      accessToken: state.accessToken,
    }))
  );
  const { user, error } = useUser();
  const { setAlertDialogType } = useAlertDialogIntercept();

  const authorized = user && accessToken;

  useEffect(() => {
    if (!authorized) {
      setAlertDialogType("warning");

      if (error) {
         if (error instanceof AxiosError) {
            toast.error(error.response?.data?.message || "Gagal mengambil data pengguna")
         } else {
            toast.error("Gagal mengambil data pengguna")
         }
      }
    }
  }, [authorized, error]);

  if (!authorized) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
