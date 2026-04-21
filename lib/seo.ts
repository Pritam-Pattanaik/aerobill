import { Metadata } from "next"
import { getPageSEOByRoute } from "@/app/actions/seo"

export async function generatePageMetadata(
  route: string,
  fallbackMetadata: Metadata
): Promise<Metadata> {
  try {
    const result = await getPageSEOByRoute(route)

    if (result.success && result.data) {
      const { title, description, keywords } = result.data

      // Extract description from either fallback or openGraph/twitter fallback
      let fallbackDesc: string | undefined = undefined;
      if (typeof fallbackMetadata.description === 'string') {
        fallbackDesc = fallbackMetadata.description;
      }

      // Convert comma-separated string back to array if needed
      const keywordsArray = keywords
        ? keywords.split(',').map((k: string) => k.trim())
        : (fallbackMetadata.keywords || [])

      return {
        ...fallbackMetadata,
        title: title || fallbackMetadata.title,
        description: description || fallbackDesc,
        keywords: keywordsArray,
        openGraph: {
          ...fallbackMetadata.openGraph,
          title: title || (fallbackMetadata.title as any) || "",
          description: description || fallbackDesc || "",
        },
        twitter: {
          ...fallbackMetadata.twitter,
          title: title || (fallbackMetadata.title as any) || "",
          description: description || fallbackDesc || "",
        }
      }
    }
  } catch (error) {
    // Database unreachable (e.g. Neon cold start) — silently fall back
    console.warn(`[SEO] Could not fetch SEO for route "${route}", using fallback metadata:`, error)
  }

  return fallbackMetadata
}
