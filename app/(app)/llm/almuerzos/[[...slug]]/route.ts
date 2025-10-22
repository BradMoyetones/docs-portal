import { notFound } from "next/navigation"
import { NextResponse, type NextRequest } from "next/server"

import { processMdxForLLMs } from "@/lib/llm"
import { almuerzosSource } from "@/lib/source"

export const revalidate = false

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ slug: string[] }> }
) {
    const slug = (await params).slug
    const page = almuerzosSource.getPage(slug)

    if (!page) {
        notFound()
    }

    const processedContent = processMdxForLLMs(page.data.content)

    return new NextResponse(processedContent, {
        headers: {
            "Content-Type": "text/markdown; charset=utf-8",
        },
    })
}

export function generateStaticParams() {
    return almuerzosSource.generateParams()
}
