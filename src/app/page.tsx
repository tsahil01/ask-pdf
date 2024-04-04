import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <MaxWidthWrapper>
      <div className="my-20 flex flex-col justify-center mx-auto items-center px-1">
        <h1 className="md:text-5xl sm:text-4xl text-3xl text-center font-bold">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-indigo-700">Chat </span> 
        with your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 to-pink-500">Docs</span>, 
        seamlessly with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500">ask-PDF</span>
        </h1>
        <p className="mt-3 sm:text-sm text-xs text-zinc-600 text-center md:w-2/3">Ask PDF lets you talk to your documents. Just upload your PDF, ask questions, and get quick answers. It makes understanding your files simple and easy.</p>

        <Link href="/dashboard" className="mt-9">
          <Button className="font-bold my-auto">
            Get Started
            <ChevronRight/>
          </Button>
        </Link>
      </div>

      <div className="bg-zinc-900 rounded-xl w-auto h-auto">
        <img src="/HomeImage.png" className="rounded-xl p-1 w-full h-auto" alt="" />
      </div>  
    </MaxWidthWrapper>
    </>
  );
}
