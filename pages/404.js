import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/router"

export default function NotFound() {
    const router = useRouter()

    // In strict mode the following router.push will cause the following issue:
    // Error: Abort fetching component for route: "/"
    // This is due Strict Mode

    /*     useEffect(() => {
        setTimeout(() => {
            router.push("/")
        }, 3000)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) */

    return (
        <div>
            <h1>Oops....</h1>
            <p>I couldn`t find what you were looking for.</p>
            {/* <Link href="/">You are going to be redirected to Home</Link> */}
        </div>
    )
}
