"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import React from "react";
import { useShallow } from "zustand/shallow";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { accessToken } = useAuthStore(
    useShallow((state) => ({
      accessToken: state.accessToken,
    }))
  );

  if (!accessToken) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
