"use client";

import { useState, useEffect } from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "../loading";

export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push('/');
        } else if (status === "authenticated") {
            setLoading(false);
        }
    }, [status, router]);

    if (loading) {
        return <Loading/>
    }

    return (
        <MaxWidthWrapper>
            <div className="flex flex-col mt-5">
                <div className="text-2xl font-bold">Your Docs:</div>
                <div>{JSON.stringify(session)}</div>
            </div>
        </MaxWidthWrapper>
    );
}
