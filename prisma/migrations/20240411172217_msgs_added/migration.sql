-- CreateTable
CREATE TABLE "Msgs" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "isUserMsg" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,
    "fileId" TEXT,

    CONSTRAINT "Msgs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Msgs" ADD CONSTRAINT "Msgs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Msgs" ADD CONSTRAINT "Msgs_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;
