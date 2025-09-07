"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import LoginForm from "@/components/Auth/LoginForm";

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, initializeAuth } = useAuthStore();

  // Check if user is already authenticated
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="w-dvw h-dvh min-h-dvh relative bg-[#E9ECF2] overflow-hidden">
      <div className="z-0 w-[607px] h-[607px] left-[38px] top-[-372px] absolute opacity-60 bg-violet-400 rounded-full blur-[400px]" />
      <div className="z-0 w-[613px] h-[613px] left-[-117px] top-[646px] absolute opacity-60 bg-slate-300 rounded-full blur-[400px]" />
      <div className="z-0 w-[467px] h-[467px] right-0 -bottom-1/4 absolute bg-violet-400 rounded-full blur-[200px]" />
      <div className="z-0 w-[467px] h-[467px] left-[638px] top-[-247px] absolute bg-fuchsia-400 rounded-full blur-[200px]" />

      <div className="flex flex-col-reverse md:flex-row items-center justify-evenly gap-8 md:gap-6 z-10 relative w-dvw h-dvh min-h-dvh px-4">
        <div className="flex flex-col justify-start items-center gap-6 md:gap-9 max-w-[326px] w-full">
          <div className="flex flex-col justify-start gap-2 w-full">
            <h1 className="text-center text-alt text-4xl md:text-5xl">
              Welcome back
            </h1>
            <p className="text-center text-secondary text-base leading-6">
              Step into our shopping metaverse for an unforgettable shopping
              experience
            </p>
          </div>

          <LoginForm />

          <div className="text-center justify-start text-secondary text-sm leading-snug">
            Don't have an account?{" "}
            <Link href="/login" className="hover:underline">
              Sign up
            </Link>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center w-full relative max-w-[700px]">
          <Image
            src="/auth-bg.png"
            alt="Login Background"
            width={744}
            height={500}
            className="hidden md:block w-full h-auto object-contain max-w-[744px] -mt-[110px]"
            loading="lazy"
          />
          <Image
            src="/logo.png"
            alt="Login Logo"
            width={413}
            height={75}
            className="h-auto object-contain max-w-[413px] mx-auto w-full"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
