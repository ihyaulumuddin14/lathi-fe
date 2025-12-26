
import z from "zod"

export const RegisterSchema = z.object({
  username: z
    .string()
    .min(3, "Nama minimal 3 karakter")
    .max(100, "Nama maksimal 100 karakter")
    .nonempty("Nama harus diisi"),
  email: z
    .email("Email tidak valid")
    .nonempty("Email harus diisi"),
  password: z
    .string()
    .nonempty("Password harus diisi")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password harus memiliki minimal 8 karakter, satu huruf besar, satu huruf kecil, satu angka, dan satu karakter khusus"
    )
})

export type RegisterCredentials = z.infer<typeof RegisterSchema>


export const LoginSchema = z.object({
  email: z
    .email("Email tidak valid")
    .nonempty("Email harus diisi"),
  password: z
    .string()
    .nonempty("Password harus diisi")
})

export type LoginCredentials = z.infer<typeof LoginSchema>