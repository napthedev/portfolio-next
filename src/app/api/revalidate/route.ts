import { revalidateTag } from "next/cache";

// This API route can be called to trigger on-demand revalidation
// Useful for CMS webhooks when content is updated
export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get("tag");

    // Optional: Add a secret token for security
    // const secret = searchParams.get('secret');
    // if (secret !== process.env.REVALIDATION_SECRET) {
    //   return Response.json({ message: 'Invalid secret' }, { status: 401 });
    // }

    if (!tag) {
      return Response.json(
        { message: "Missing tag parameter" },
        { status: 400 }
      );
    }

    // Revalidate the specific tag
    revalidateTag(tag);

    return Response.json({
      message: `Revalidation triggered for tag: ${tag}`,
      revalidated: true,
      now: Date.now(),
    });
  } catch (error) {
    console.error("Error revalidating:", error);
    return Response.json(
      { message: "Error revalidating", error: String(error) },
      { status: 500 }
    );
  }
}

// Also support GET for testing purposes
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get("tag");

  if (!tag) {
    return Response.json({
      message: "Revalidation API endpoint",
      usage: "POST /api/revalidate?tag=portfolio-data",
      availableTags: ["portfolio-data"],
    });
  }

  // For GET requests, just return info about what would be revalidated
  return Response.json({
    message: `Would revalidate tag: ${tag}`,
    method: "Use POST to actually trigger revalidation",
  });
}
