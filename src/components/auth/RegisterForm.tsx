"use client";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegisterCredentials, RegisterSchema } from "@/schema/AuthSchema";
import Loader from "../Loader";
import { useAlertDialogIntercept } from "@/stores/useAlertDialogIntercept";
import { toast } from "sonner";
import { registerService } from "@/services/auth.service";
import { AxiosError } from "axios";

const RegisterForm = () => {
  const { setAlertDialogType } = useAlertDialogIntercept();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterCredentials>({
    resolver: zodResolver(RegisterSchema),
    mode: "onChange",
  });

  const handleRegisterSubmit = async (registerPayload: RegisterCredentials) => {
    try {
      const data = await registerService(registerPayload);

      setAlertDialogType("email-sent");
      toast.success(data.message);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message || "Terjadi kesalahan sistem"
        );
      } else {
        toast.error("Terjadi kesalahan sistem");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleRegisterSubmit)}
      className="w-full py-[1vw] flex flex-col gap-3"
    >
      <div className="w-full flex flex-col gap-1">
        <Input
          {...register("username")}
          id="username"
          type="text"
          className="w-full py-2 px-4"
          placeholder="Username"
        />
        {errors.username && (
          <p className="pl-1 text-xs text-destructive">
            {errors.username.message}
          </p>
        )}
      </div>
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

      <Button
        type="submit"
        disabled={isSubmitting}
        className={`${isSubmitting ? "cursor-not-allowed" : ""}`}
      >
        {isSubmitting ? <Loader /> : "Daftar"}
      </Button>
    </form>
  );
};

export default RegisterForm;
