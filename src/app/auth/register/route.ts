import { NextRequest, NextResponse } from "next/server";

export function GET(res: NextRequest) {
    return NextResponse.json({ 
        message: "Hello from the GET method!" 
    })
}