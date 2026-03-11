import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { unstable_noStore } from 'next/cache';

export async function GET() {
    unstable_noStore();
    try {
        const contact = await prisma.contactInfo.findUnique({ where: { id: "contact-info" } });
        return NextResponse.json({ success: true, contact, dbUrl: process.env.DATABASE_URL?.substring(0, 50) + "..." });
    } catch (e: any) {
        return NextResponse.json({ success: false, error: e.message });
    }
}
