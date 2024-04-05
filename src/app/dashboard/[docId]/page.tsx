"use client";

import { PdfRenderer } from "@/components/PdfRenderer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DocumentPage({ params }: { params: { docId: string } }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status == "unauthenticated") {
          router.push('/');
      }
      else {
        if (session) {
          console.log(status);
          console.log(session);
        }
      }
    }, [status]);

  return (
    <>
    {params.docId}
    <PdfRenderer/>
    </>
  );
}
