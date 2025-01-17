"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";
import {
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { GridImages2 } from "@/components/GridImages2";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { delay } from "framer-motion";
import axios from "axios"
import { signIn } from "next-auth/react";


type FormData = {
  email: string;
  password: string;
  isWorker: string;
};


function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log('Form submitted:', data);

    const response = await signIn('credentials',{
      email: data.email,
      password:  data.password,
      isWorker: data.isWorker,
      redirect:false
    })

    if(response?.error) {
      toast.error(response.error);
    }
    else {
      toast.success('Logged in successfully!');
      delay(()=>{router.push('/')},4000)
    }
    // if(response?.url) {
    //   toast.success('Logged in successfully!');
    //   delay(()=>{router.push('/home')},4000)
    // }

  };

  return (
    <HeroHighlight className="h-full flex flex-row items-center justify-start w-full px-32 gap-12" containerClassName="h-full py-12 pt-36 ">
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8  shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to Neighbourly Connect
      </h2>
      

      <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" {...register("email", { required: true })} />
            {errors.email && <p className="text-red-500">Email is required</p>}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="confirmpwd" placeholder="••••••••" type="password" {...register("password", { required: true })} />
            {errors.password && <p className="text-red-500">Confirm password is required</p>}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="isWorker">User Type</Label>
          {/* <div className="dark:bg-zinc-800 p-2 rounded-md border-white flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-32 mb-4">
           */}<div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-32 mb-4 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm">
              <label>
                <input type="radio"  value="false" {...register("isWorker", { required: true })} />
                &nbsp;&nbsp;&nbsp;User
              </label>
              <label>
                <input type="radio"  value="true" {...register("isWorker", { required: true })} />
                &nbsp;&nbsp;&nbsp;Worker
              </label>
            </div>
            {errors.isWorker && <p className="text-red-500">User type is required</p>}
        </LabelInputContainer>
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Login &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="text-center dark:text-white text-black my-8">
           New To Neighbourly Connect? 
          <Link href="/signup" className=" text-blue-600 mx-2">
            Signup
          </Link>
        </div>

        <div className="flex flex-col space-y-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
            onClick={()=>{}}
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
          
        </div>
      </form>
    </div>
    <GridImages2/>
    </HeroHighlight>
    
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default Page
