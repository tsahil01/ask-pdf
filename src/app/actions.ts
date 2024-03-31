"use server";

import prisma from "@/db";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "./lib/auth";

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
