import { NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { v4 as uuidv4 } from "uuid"

export async function POST(request: Request) {
    try {
        const formData = await request.formData()
        const file = formData.get("file") as File

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Create upload directory if it doesn't exist
        const uploadDir = join(process.cwd(), "public/uploads")
        try {
            await mkdir(uploadDir, { recursive: true })
        } catch (error) {
            // Ignore error if directory already exists
        }

        // Generate unique filename
        const ext = file.name.split(".").pop()
        const fileName = `${uuidv4()}.${ext}`
        const filePath = join(uploadDir, fileName)

        // Save file
        await writeFile(filePath, buffer)

        // Return public URL
        const fileUrl = `/uploads/${fileName}`
        return NextResponse.json({ success: true, url: fileUrl })

    } catch (error) {
        console.error("Upload failed:", error)
        return NextResponse.json({ error: "Upload failed" }, { status: 500 })
    }
}
