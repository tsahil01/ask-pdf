"use server";

import prisma from "@/db";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../lib/auth";
import { UploadStatus } from "@prisma/client";

export async function fetchFiles() {
    const session = await getServerSession(NEXT_AUTH);
    // console.log("session: ", session);
    try {

        if (!session?.user?.id) {
            throw new Error("User session not found or invalid.");
        }
        const userId = session.user.id;

        const userFiles = await prisma.file.findMany({
            where: {
                userId: userId
            }
        });

        console.log("User Files: ", userFiles); 
        return userFiles;
    } catch (e) {
        console.error("Error fetching files: ", e);
        return [];
    }
}

export async function deleteFile(id:string) {
    try {
        const del = await prisma.file.delete({
            where: {
                id
            }
        })

        console.log("Delete response: ", del); 
    } catch (e) {
        console.error("Error deleting file: ", e);
    }
}

export async function addFiles(name: string, url: string, key: string) {
    const session = await getServerSession(NEXT_AUTH);
    let newFile;
    let uploadStatus;
    try {
        if (!session?.user?.id) {
            throw new Error("User session not found or invalid.");
        }
        const userId = session.user.id;

        // Create the file with uploadStatus as PROCESSING
        newFile = await prisma.file.create({
            data: {
                name,
                url,
                key,
                userId,
                uploadstatus: UploadStatus.PROCESSING
            }
        });

        console.log("Uploaded File: ", newFile); 

        // If the file is created successfully, update the uploadStatus to SUCCESS
        uploadStatus = UploadStatus.SUCCESS;
        console.log("Upload Status Updated to SUCCESS");

        return "success";

    } catch (e) {
        console.error("Error uploading File file: ", e);
        // If there is an error, update the uploadStatus to FAILED
        uploadStatus = UploadStatus.FAILED;
        console.log("Upload Status Updated to FAILED");

    } finally {
        // Update the uploadStatus in the database
        if (newFile) {
            await prisma.file.update({
                where: {
                    id: newFile.id
                },
                data: {
                    uploadstatus: uploadStatus
                }
            });
        }
    }
}