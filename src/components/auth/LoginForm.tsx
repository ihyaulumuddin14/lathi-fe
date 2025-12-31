"use client";

import { useUser } from "@/hooks/useUser";
import { LoginCredentials, LoginSchema } from "@/schema/AuthSchema";
import { loginService } from "@/services/auth.service";
import { useAuthStore } from "@/stores/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Loader from "../Loader";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { userDummy } from "@/utils/constant";
import { useRouter } from "next/navigation";
import { useAlertDialogIntercept } from "@/stores/useAlertDialogIntercept";

const LoginForm = () => {
  const { setAccessToken } = useAuthStore();
  const { onOpenChange } = useAlertDialogIntercept()
  const { mutateUser } = useUser();
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLoginSubmit = async (loginPayload: LoginCredentials) => {
    try {
      const data = await loginService(loginPayload);
      setAccessToken(data.accessToken);

      // fetch data user using SWR and new access token on zustand store
      mutateUser(userDummy, false);
      router.replace("/")
      onOpenChange(false)
      toast.success("Berhasil login");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Terjadi kesalahan sistem");
      } else {
        toast.error("Terjadi kesalahan sistem");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleLoginSubmit)}
      className="w-full py-[1vw] flex flex-col gap-3"
    >
      <div className="w-full flex flex-col gap-1">
        <Input
          {...register("email")}
          id="email"
          type="email"
          className="w-full py-2 px-4"
          placeholder="Email"
        />
        {errors.email && (
          <p className="pl-1 text-xs text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="w-full flex flex-col gap-1 relative">
        <Input
          {...register("password")}
          id="password"
          type="password"
          className="w-full py-2 px-4"
          placeholder="Password"
        />
        {errors.password && (
          <p className="pl-1 text-xs text-destructive">
            {errors.password.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? <Loader /> : "Masuk"}
      </Button>
    </form>
  );
};

export default LoginForm;
