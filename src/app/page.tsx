import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { ArrowBigRight, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <MaxWidthWrapper>
      <div className="mt-20 flex flex-col justify-center mx-auto items-center">
        <h1 className="md:text-5xl sm:text-4xl text-3xl text-center font-bold">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Chat </span> 
        with your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500">Docs</span>, 
        seamlessly with <span className="text-blue-600">ask-PDF</span>
        </h1>
        <p className="mt-3 text-sm text-zinc-600 text-center mx-9 md:w-2/3">Ask PDF lets you talk to your documents. Just upload your PDF, ask questions, and get quick answers. It makes understanding your files simple and easy.</p>

        <Link href="/dashboard" className="mt-9">
          <Button>Get Started
            <ChevronRight/>
          </Button>
        </Link>
      </div>
    </MaxWidthWrapper>
    </>
  );
}
