"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import Input from "@/components/atomic/Input";
import Button from "@/components/atomic/Button";
import myImage from "../../public/next.svg";

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex justify-center bg-gray-100 items-center h-full">
      <div className="flex  bg-white justify-between w-5/6 h-5/6 p-10">
        <div className="flex max-w-md justify-center flex-1 flex-col gap-5">
          <Input label="Email" placeholder="Email" />
          <Input label="Password" placeholder="Password" />
          <Button title="Sign In" onClick={() => console.log("hi")} />
          <Button
            secondary
            title="SignIn with google"
            onClick={() => router.push("/about")}
          />
          <div className="flex justify-between text-xs">
            <div className="flex gap-1">
              <Input inputProps={{ type: "checkbox" }} name="rememberme" />
              <label>remember for 30 days</label>
            </div>
            <p className="font-bold hover:cursor-pointer">Forgot password</p>
          </div>
          <div className="flex text-xs gap-1">
            <p className="text-xs">Don&apos;t have an account?</p>
            <p className="font-bold hover:cursor-pointer">Sign up for free</p>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <Image src={myImage} alt="image" />
        </div>
      </div>
    </main>
  );
}
