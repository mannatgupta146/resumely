import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { verifyToken } from "./jwt";

export async function getCurrentUser() {
    let cookieStore = await cookies()

    const token = cookieStore.get("token")?.name

    if(!token) {
        throw new Error("No token found");
    }

    const decoded = verifyToken(token)

    if(!decoded) { 
        throw new Error("Unauthorized")
    }

    return decoded.userId 
}