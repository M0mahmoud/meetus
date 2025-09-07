"use client";

import React, { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import Image from "next/image";
import { useLogoutMutation, useUserInfoQuery } from "@/hooks/auth";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export default function DashboardPage() {
  const router = useRouter();
  const {
    token,
    isAuthenticated,
    initializeAuth,
    setUser,
    logout: storeLogout,
  } = useAuthStore();

  const { isPending, data, error } = useUserInfoQuery(token, isAuthenticated);
  const logoutMutation = useLogoutMutation();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (!isAuthenticated && !isPending) {
      router.push("/login");
    }
  }, [isAuthenticated, isPending, router]);

  // Update user in store when query succeeds
  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  const handleLogout = useCallback(async () => {
    try {
      await logoutMutation.mutateAsync();
      storeLogout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Force logout even if mutation fails
      storeLogout();
      router.push("/login");
    }
  }, [logoutMutation, storeLogout, router]);

  // Handle token expiration
  useEffect(() => {
    if (error?.status === 401) {
      handleLogout();
    }
  }, [error, handleLogout]);

  if (isPending || (!isAuthenticated && isPending)) {
    return <LoadingSpinner message="Loading dashboard..." />;
  }

  if (!isAuthenticated || error) {
    return null; // Will redirect to login
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <svg
              className="w-12 h-12 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p>Failed to load user information</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Logo"
              width={120}
              height={25}
              className="h-auto object-contain"
            />
          </div>
          <button
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {logoutMutation.isPending ? "Logging out..." : "Logout"}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Welcome to Dashboard!
            </h1>
            <p className="text-gray-600">
              You have successfully logged in to the MeetUs VR platform.
            </p>
          </div>

          {/* User Information Card */}
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-4 md:p-6 text-white max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">User Information</h2>
            <div className="space-y-3">
              <div className="bg-alt/50 px-3 py-1 rounded-lg flex justify-between items-center">
                User ID: {data.id}
              </div>
              <div className="bg-alt/50 px-3 py-1 rounded-lg flex justify-between items-center">
                Name: {data.name}
              </div>
              <div className="bg-alt/50 px-3 py-1 rounded-lg flex justify-between items-center">
                Email: {data.email}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
