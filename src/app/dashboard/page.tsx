"use client";

import { useState, useEffect } from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "../loading";
import { DashboardFiles } from "@/components/DashboardFiles";
import UploadDoc from "@/components/UploadDocs";

export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") {
            // router.push('/');
            setLoading(false)
        } else if (status === "authenticated") {
            setLoading(false);
        }
    }, [status, router]);

    if (loading) {
        return <Loading/>
    }

    return (
        <MaxWidthWrapper className="px-4 overflow-auto  ">
            <div className="flex flex-col mt-5 gap-4">
                <div className="flex flex-row justify-between">
                    <div className="md:text-5xl text-3xl font-bold my-auto">My Docs:</div>
                    <UploadDoc/>
                </div>
                <div className="flex mt-9">
                    <DashboardFiles/>
                </div>
            </div>
        </MaxWidthWrapper>
    );
}
