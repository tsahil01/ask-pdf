"use client";

import { getFile } from "@/app/actions/db";
import Loading from "@/app/loading";
import { pdfTextAtom } from "@/atom/pdfTextAtom";
import { PdfRenderer } from "@/components/PdfRenderer";
import { toast } from "@/components/ui/use-toast";
import { UploadStatus } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

interface File {
    id: string;
    name: string;
    uploadstatus: UploadStatus;
    url: string;
    key: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string | null;
}

export default function DocumentPage({ params }: { params: { docId: string } }) {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [file, setFile] = useState<File | null | undefined>(null);
    const setPdfUrl = useSetRecoilState(pdfTextAtom);

    useEffect(() => {
      const fetchData = async () => {
          if (status === "unauthenticated") {
              setLoading(false);
              toast({
                title: "You are not logged in",
                description: "Please log in to view this document",
                variant: "destructive"
            });
              router.push('/');
          } else if (status === "authenticated") {
              try {
                  const file = await getFile(params.docId);
                  if (file == null) {
                      setFile(null);
                      toast({
                          title: "Document not found",
                          description: "The document you are looking for does not exist",
                          variant: "destructive"
                      });
                  } else if (file.uploadstatus === "SUCCESS" && file.userId === session?.user?.id) {
                      setFile(file);
                      setPdfUrl(file.url);
                  } else {
                      setFile(undefined);
                      toast({
                          title: "Unauthorized",
                          description: "You are not authorized to view this document",
                          variant: "destructive"
                      });
                  }
              } catch (error) {
                  console.error("Error fetching file:", error);
              } finally {
                  setLoading(false);
              }
          }
      };
  
      if (status != "loading") {
          fetchData();
      }
  
  }, [status, session?.user?.id, params.docId, router]);

  if(status==="loading") return <Loading />;
  
  
    return (
    <>
      {loading ? <Loading /> : (file == null ? <NotFound /> : <PdfRenderer url = {file.url} />)}
    </>
    );
}

function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-center">404</h1>
        <p className="text-center">Document not found</p>
      </div>
    );
  }
  
