"use client";
import { PdfRenderer } from "@/components/PdfRenderer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DocumentPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push('/');
        }
        
    }, [ router]);

  return (
    <>
    <PdfRenderer/>
    </>
  );
}