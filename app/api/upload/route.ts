import { NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function POST(request: Request) {
    try {
        // Enforce Authentication
        const session = await getServerSession(authOptions)
        if (!session?.user?.restaurantId && !session?.user?.isSuperAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        // validate config - using fallback for cloud name so Next.js doesn't inline it at build-time if running in Docker container
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME
        const apiKey = process.env.CLOUDINARY_API_KEY
        const apiSecret = process.env.CLOUDINARY_API_SECRET

        const missing: string[] = []
        if (!cloudName) missing.push("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME or CLOUDINARY_CLOUD_NAME")
        if (!apiKey) missing.push("CLOUDINARY_API_KEY")
        if (!apiSecret) missing.push("CLOUDINARY_API_SECRET")

        if (missing.length > 0) {
            console.error(`Cloudinary credentials missing: ${missing.join(", ")}`)
            return NextResponse.json(
                { error: `Server configuration error: Missing ${missing.join(", ")}. Please verify .env settings.` },
                { status: 500 }
            )
        }

        // Configure Cloudinary
        cloudinary.config({
            cloud_name: cloudName,
            api_key: apiKey,
            api_secret: apiSecret,
        })

        const formData = await request.formData()
        const file = formData.get("file") as File

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
        }

        // Validate file type (allow only images)
        if (!file.type.startsWith('image/')) {
            return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Upload to Cloudinary using a stream
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: "aerobill-blog",
                    resource_type: "auto"
                },
                (error, result) => {
                    if (error) reject(error)
                    else resolve(result)
                }
            )
            uploadStream.end(buffer)
        })

        // @ts-ignore
        const fileUrl = result.secure_url

        return NextResponse.json({ success: true, url: fileUrl })

    } catch (error: any) {
        console.error("Upload failed:", error)
        return NextResponse.json(
            { error: error.message || "Upload failed due to an unexpected error" },
            { status: 500 }
        )
    }
}
