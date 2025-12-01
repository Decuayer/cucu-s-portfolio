"use client";

import { useState, useEffect } from "react";
import { signIn, useSession  } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { motion } from "framer-motion";

const LoginPage = () => {
  const { status } = useSession();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/admin");
    }
  }, [status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (result.error) {
      setError("Invalid username or password");
    } else {
      router.push("/admin");
    }
  };

  if (status === "loading" || status === "authenticated") {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="py-6"
    >
      <div className="container mx-auto flex justify-center items-center min-h-[70vh]">
        <div className="xl:w-[60%] xl:order-none">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl"
          >
            <div className="flex justify-center item-center">
              <h1 className="text-4xl text-accent">Admin Login</h1>
            </div>
            <p className="text-white/60">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam,
              nesciunt harum ipsa error tenetur amet. Maxime reprehenderit
              temporibus ea eos?
            </p>
            {error && (
              <div className="bg-[#fee2e2] text-[#b91c1c] rounded-sm text-center">
                {error}
              </div>
            )}
            <div className="flex justify-center items-center">
              <div className="flex flex-col w-full xl:w-[70%] md:w-[80%] gap-6">
                <div className="w-full">
                  <label htmlFor="username" className="text-white">
                    Username
                  </label>
                  <Input
                    className="w-full"
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="password" className=" text-white">
                    Password
                  </label>
                  <Input
                    className="w-full"
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex justify-center items-center">
                  <Button type="submit" className="max-w-40" size="md">
                    Login
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </motion.section>
  );
};

export default LoginPage;
