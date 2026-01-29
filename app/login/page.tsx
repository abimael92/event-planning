"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AuthSection } from "../../components/auth/auth-section"
import { useAuth } from "../contexts/auth-context"

export default function LoginPage() {
    const [mounted, setMounted] = useState(false)
    const { isAuthenticated, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        setMounted(true)
    }, [])

    // redirect if authenticated
    useEffect(() => {
        if (mounted && !isLoading && isAuthenticated) {
            router.push("/dashboard")
        }
    }, [mounted, isAuthenticated, isLoading, router])

    if (!mounted || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (isAuthenticated) {
        return null
    }

    return (
        <div className="w-full max-w-lg sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto py-8 px-4">
            <AuthSection />
        </div>
    )
}