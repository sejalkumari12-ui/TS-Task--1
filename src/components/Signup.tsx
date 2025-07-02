import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import {  z } from "zod";

const schema = z
  .object({
    email: z.string({ required_error: "Email is required" }).email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormFields = z.infer<typeof schema>;

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  return (
    <div className="min-h-screen min-w-full bg-zinc-800 flex items-center justify-center">
      <div className="p-8 bg-zinc-900 rounded-xl text-white border-2 border-indigo-300 w-full max-w-sm">
        <div className="flex flex-col items-center justify-center mb-4">
          <Avatar className="mb-4">
            <AvatarImage src="https://media.licdn.com/dms/image/v2/D4D0BAQFAExANzaVZSQ/company-logo_200_200/company-logo_200_200/0/1709816429827/digital_alchemist_labs_logo?e=2147483647&v=beta&t=KrM7XnXCK59OH95IFgNSnZIjHurtxd13m-ndUvzbAi0" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-semibold text-center">Join Digital Alchemist Lab</h2>
          <h4 className="text-sm text-center mb-10">Begin your journey to digital mastery</h4>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="first-name" className="text-sm font-medium text-gray-200 mb-[1px] block">
                First name
              </Label>
              <Input id="first-name" type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <Label htmlFor="last-name" className="text-sm font-medium text-gray-200 mb-[1px] block">
                Last name
              </Label>
              <Input id="last-name" type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
            </div>
          </div>

          <div className="grid mt-4">
            <Label htmlFor="email" className="text-sm font-medium text-gray-200 mb-[1px]">Email</Label>
            <Input id="email" type="email" {...register("email")} className="w-full px-4 py-2 border rounded-md" />
            {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email.message}</div>}
          </div>

          <div className="grid mt-4">
            <Label htmlFor="password" className="text-sm font-medium text-gray-200 mb-[1px]">Password</Label>
            <Input id="password" type="password" {...register("password")} className="w-full px-4 py-2 border rounded-md" />
            {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password.message}</div>}
          </div>

          <div className="grid mt-4">
            <Label htmlFor="confirm-password" className="text-sm font-medium text-gray-200 mb-[1px]">Confirm Password</Label>
            <Input id="confirm-password" type="password" {...register("confirmPassword")} className="w-full px-4 py-2 border rounded-md" />
            {errors.confirmPassword && <div className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</div>}
          </div>

          <div className="flex items-center mt-4">
            <input type="checkbox" id="terms" required className="h-5 w-5" />
            <label htmlFor="terms" className="ml-2 text-gray-300 text-sm">
              I agree to the <a href="#" className="text-indigo-500 hover:underline">Terms</a> and
              <a href="#" className="text-indigo-500 hover:underline ml-1">Privacy Policy</a>
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-1 rounded transition mt-4"
          >
            {isSubmitting ? "Signing up..." : "Sign up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <a className="font-medium text-indigo-600 hover:text-indigo-500" href="#">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

