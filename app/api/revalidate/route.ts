import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * API de revalidation on-demand pour les offres d'emploi
 * Appelée par l'admin (nourx.app) quand une offre est modifiée
 *
 * Usage: POST /api/revalidate
 * Headers: x-revalidate-secret: <secret>
 * Body: { "paths": ["/offres-emploi", "/offres-emploi/slug-offre"] }
 */
export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-revalidate-secret");
  const expectedSecret = process.env.REVALIDATE_SECRET;

  // Vérifier le secret
  if (!expectedSecret) {
    console.error("REVALIDATE_SECRET non configuré");
    return NextResponse.json(
      { error: "Revalidation non configurée" },
      { status: 500 }
    );
  }

  if (secret !== expectedSecret) {
    return NextResponse.json(
      { error: "Secret invalide" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const paths: string[] = body.paths || ["/offres-emploi"];

    // Revalider chaque path
    for (const path of paths) {
      revalidatePath(path);
      console.log(`Revalidated: ${path}`);
    }

    return NextResponse.json({
      revalidated: true,
      paths,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Erreur revalidation:", error);
    return NextResponse.json(
      { error: "Erreur lors de la revalidation" },
      { status: 500 }
    );
  }
}
