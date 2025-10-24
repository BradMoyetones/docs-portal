import { createFromSource } from "fumadocs-core/search/server"
import {
  source,
  almuerzosSource,
  hotelesSource,
} from "@/lib/source"

const sourcesByKey: Record<string, any> = {
    docs: source,
    almuerzos: almuerzosSource,
    hoteles: hotelesSource,
}

export function GET(request: Request, { params }: { params: { slug: string } }) {
    const selected = sourcesByKey[params.slug]

    if (!selected) {
        return new Response(
            JSON.stringify({ error: "Invalid documentation group" }),
            { status: 404 }
        )
    }

    // Crea el handler dinámicamente para ese source
    const { GET: sourceGET } = createFromSource(selected)
    return sourceGET(request)
}
