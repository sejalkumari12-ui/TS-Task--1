
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Link } from "react-router-dom";

const schema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string({ required_error: "Email is required" }).email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    terms: z.boolean().refine((v) => v, "You must accept the terms"),
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
      await new Promise((r) => setTimeout(r, 1000));
      console.log(data);
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-800 flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-zinc-900 rounded-xl border-2 border-indigo-300 text-white">
        <div className="flex flex-col items-center mb-8">
          <Avatar className="mb-4">
            <AvatarImage
              src="https://media.licdn.com/dms/image/v2/D4D0BAQFAExANzaVZSQ/company-logo_200_200/company-logo_200_200/0/1709816429827/digital_alchemist_labs_logo?e=2147483647&v=beta&t=KrM7XnXCK59OH95IFgNSnZIjHurtxd13m-ndUvzbAi0"
              alt="DAL Logo"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-semibold">Join Digital Alchemist Lab</h2>
          <p className="text-sm text-gray-400 mt-2">
            Begin your journey to digital mastery
          </p>
        </div>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
          
            <div>
              <Label htmlFor="first-name" className="block text-sm font-medium mb-1">
                First Name
              </Label>
              <Input
                id="first-name"
                type="text"
                {...register("firstName")}
                className="w-full px-4 py-2 rounded-md"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="last-name" className="block text-sm font-medium mb-1">
                Last Name
              </Label>
              <Input
                id="last-name"
                type="text"
                {...register("lastName")}
                className="w-full px-4 py-2 rounded-md"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          
          <div className="mt-4">
            <Label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              className="w-full px-4 py-2 rounded-md"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          
          <div className="mt-4">
            <Label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              className="w-full px-4 py-2 rounded-md"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          
          <div className="mt-4">
            <Label
              htmlFor="confirm-password"
              className="block text-sm font-medium mb-1"
            >
              Confirm Password
            </Label>
            <Input
              id="confirm-password"
              type="password"
              {...register("confirmPassword")}
              className="w-full px-4 py-2 rounded-md"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-center mt-4">
            <input id="terms" type="checkbox" {...register("terms")} className="h-5 w-5 rounded" />
            <Label htmlFor="terms" className="ml-2 text-sm text-gray-300">
              I agree to the
              <a href="#" className="text-indigo-400 hover:underline">
                Terms
              </a>
              and
              <a href="#" className="text-indigo-400 hover:underline">  Privacy Policy </a>
            </Label>
          </div>
          {errors.terms && ( <p className="text-red-500 text-sm mt-1">{errors.terms.message}</p>
          )}

          
          <button type="submit" disabled={isSubmitting} className="w-full mt-6 py-2 rounded bg-indigo-500 hover:bg-indigo-600 transition" > {isSubmitting ? "Signing up…" : "Sign up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to='/' className="font-medium text-indigo-400 hover:underline"> Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;



