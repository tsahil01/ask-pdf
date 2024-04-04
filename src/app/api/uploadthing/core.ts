import { NEXT_AUTH } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();

export const ourFileRouter = {

  pdfUploader: f({ pdf: { maxFileSize: "4MB" } })

    .middleware(async ({ req }) => {
      const session = await getServerSession(NEXT_AUTH);
      const user = session?.user;
      if(!user || !user.id){
        throw new Error("Unauthorize");
      }
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {}),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;

