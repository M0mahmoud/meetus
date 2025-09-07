"use client";

import React, { useState } from "react";
import { loginSchema } from "@/lib/schemas";
import { EmailIcon, LockIcon } from "@/assets/icons/auth";
import { isValidEmail } from "@/lib/validators";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import { useAuthStore } from "@/store/auth-store";
import { useLoginMutation } from "@/hooks/auth";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const { setToken } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const loginMutation = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});
    try {
      const validatedData = loginSchema.parse({ email, password });

      const loginResult = await loginMutation.mutateAsync(validatedData);
      setToken(loginResult.token);
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof Error && error.name === "ZodError") {
        // Handle Zod validation errors
        const zodError = error as {
          issues?: Array<{ path: string[]; message: string }>;
        };
        const newErrors: { email?: string; password?: string } = {};
        zodError.issues?.forEach((issue) => {
          if (issue.path[0] === "email") {
            newErrors.email = issue.message;
          } else if (issue.path[0] === "password") {
            newErrors.password = issue.message;
          }
        });
        setErrors(newErrors);
      } else {
        console.error("Login failed:", error);
      }
    }
  };

  const isLoading = loginMutation.isPending;
  const apiError = loginMutation.error?.message;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-start items-start gap-5 w-full"
    >
      <div className="flex flex-col gap-1 w-full">
        <div
          className={`p-4 bg-white/40 border rounded-lg flex justify-start items-center gap-3 w-full ${
            errors.email ? "border-red-400" : "border-white"
          }`}
        >
          <span>
            <EmailIcon />
          </span>
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email)
                setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            className="w-full bg-transparent outline-none placeholder:text-secondary text-alt"
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm px-1">{errors.email}</p>
        )}
      </div>

      <div className="flex flex-col gap-1 w-full">
        <div
          className={`p-4 bg-white/40 border rounded-lg flex justify-start items-center gap-3 w-full ${
            errors.password ? "border-red-400" : "border-white"
          }`}
        >
          <span>
            <LockIcon />
          </span>
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent outline-none placeholder:text-secondary text-alt"
          />
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm px-1">{errors.password}</p>
        )}
      </div>

      {apiError && <ErrorDisplay message={apiError} />}

      <button
        type="submit"
        disabled={isLoading || !isValidEmail(email)}
        className={`px-5 py-3 bg-primary rounded-lg inline-flex justify-center items-center gap-1 w-full text-white border-none transition-all duration-150 ${
          isLoading || !isValidEmail(email)
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer hover:brightness-90 active:scale-95"
        }`}
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
