import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Link } from "react-router-dom";

const schema = z.object({
  email: z.string({ required_error: "Email is required" }).email("Invalid email address"),
     password: z.string().min(8, "Password must be at least 8 characters"),
 })
type FormFields = z.infer<typeof schema>;

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
     reset,
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((r) => setTimeout(r, 1000));
      console.log(data);
          reset(); 
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
          <p className="text-sm text-gray-400 mt-2">Begin your journey to digital mastery</p>
        </div>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
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
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
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
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-6 py-2 rounded bg-indigo-500 hover:bg-indigo-600 transition"
          >
            {isSubmitting ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link to="/signup" className="font-medium text-indigo-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;