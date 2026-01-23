// app/vendor/layout.tsx - NEW FILE
"use client"

import { DashboardLayout } from "./_components/dashboard-layout"
import { useAuth } from "../contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function RootVendorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { user, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && !user) {
            router.push("/login")
        }
    }, [user, isLoading, router])

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center">Loading...</div>
            </div>
        )
    }

    if (!user) {
        return null
    }

    return <DashboardLayout>{children}</DashboardLayout>
}