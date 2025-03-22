"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Toaster, toast } from "sonner";
import { PricingSections } from "@/components/pricing";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { ConnectWorld } from "@/components/connect-world";

const HomePage = () => {
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [checkingAuth, setCheckingAuth] = useState<boolean>(false);
  const router = useRouter();

  // Check authentication status when the component mounts
  useEffect(() => {
    const checkAuth = async () => {
      setCheckingAuth(true);
      try {
        const response = await fetch(
          "http://localhost:5000/check_auth_status",
          {
            credentials: "include",
          },
        );
        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(data.authenticated);
          if (data.authenticated) {
            router.push("/dashboard");
          }
        } else {
          const errorData = await response.json();
          setError(errorData.error || "Failed to check authentication status.");
        }
      } catch (e) {
        console.error("Error checking auth status:", e);
        setError(
          "Error checking authentication status. Please try again later.",
        );
      } finally {
        setCheckingAuth(false);
      }
    };
    checkAuth();
  }, [router]);

  // Handle the authentication button click
  const handleAuthClick = () => {
    const nextUrl = encodeURIComponent("http://localhost:3000/dashboard");
    window.location.href = `http://localhost:5000/authenticate?next=${nextUrl}`;
  };

  useEffect(() => {
    if (error) {
      toast.error("Authentication Error", {
        description: error,
      });
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-white">
      <Toaster />
      {/* Navigation Bar */}
      <header className="bg-white dark:bg-black shadow-md">
        <div className="container mx-auto px-6 py-3">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <a className="font-semibold text-xl">Home</a>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/dashboard" legacyBehavior passHref>
                  <a className="ml-4 hover:text-primary transition-colors">
                    Dashboard
                  </a>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>

      {/* Landing Page Content */}
      <main className="container mx-auto px-6 py-20 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Simplify Your YouTube Workflow
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-xl">
          Upload videos, manage analytics, and generate engaging scripts all in
          one place. Get started by authenticating your YouTube account.
        </p>

        <div className="text-center">
          {checkingAuth ? (
            <>
              <p className="mb-4">Checking authentication status...</p>
              <Loader2 className="h-6 w-6 mx-auto animate-spin" />
            </>
          ) : !isAuthenticated ? (
            <Button
              variant="default"
              size="lg"
              onClick={handleAuthClick}
              disabled={checkingAuth}
            >
              Authenticate with YouTube
            </Button>
          ) : (
            <>
              <p>Authenticated. Redirecting to dashboard...</p>
              <Loader2 className="h-6 w-6 mx-auto animate-spin" />
            </>
          )}
        </div>
      </main>

      <div className="h-[40rem] flex items-center justify-center">
        <TextHoverEffect text="MERCURION" />
      </div>

      <div>
        <ConnectWorld />
      </div>

      <div className="items-center justify-center ml-auto bg-black">
        <PricingSections />
      </div>

      {/* Footer (Optional) */}
      <footer className="bg-gray-200 dark:bg-black text-center py-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} YouTube Toolkit. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
