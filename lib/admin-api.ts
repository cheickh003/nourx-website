/**
 * Client API pour récupérer les offres d'emploi depuis le dashboard admin (nourx.app)
 */

// Types pour les offres d'emploi
export interface JobOffer {
  id: string;
  slug: string;
  title: string;
  description: string;
  location: string;
  contractType: "CDI" | "CDD" | "Stage" | "Freelance";
  department: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  benefits: string[];
  publishedAt: string | null;
  expiresAt: string | null;
  isExpired: boolean;
}

interface JobsListResponse {
  ok: boolean;
  data: JobOffer[];
  count: number;
}

interface JobDetailResponse {
  ok: boolean;
  data: JobOffer;
}

// Configuration
const ADMIN_API_URL = process.env.ADMIN_API_URL || "https://nourx.app";
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || "";

/**
 * Récupère toutes les offres d'emploi publiées depuis le dashboard
 */
export async function getJobOffers(): Promise<JobOffer[]> {
  try {
    const response = await fetch(`${ADMIN_API_URL}/api/public/jobs`, {
      headers: {
        "x-api-key": ADMIN_API_KEY,
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 300, // Revalidate every 5 minutes (ISR)
      },
    });

    if (!response.ok) {
      console.error(
        `Erreur API jobs: ${response.status} ${response.statusText}`,
      );
      // Fallback sur les données statiques si l'API échoue
      return getFallbackJobs();
    }

    const result: JobsListResponse = await response.json();

    if (!result.ok || !result.data) {
      console.error("Réponse API invalide:", result);
      return getFallbackJobs();
    }

    return result.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des offres:", error);
    // Fallback sur les données statiques
    return getFallbackJobs();
  }
}

/**
 * Récupère une offre d'emploi par son slug
 */
export async function getJobOfferBySlug(
  slug: string,
): Promise<JobOffer | null> {
  try {
    const response = await fetch(`${ADMIN_API_URL}/api/public/jobs/${slug}`, {
      headers: {
        "x-api-key": ADMIN_API_KEY,
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 300, // Revalidate every 5 minutes (ISR)
      },
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      console.error(
        `Erreur API job detail: ${response.status} ${response.statusText}`,
      );
      // Fallback sur les données statiques
      return getFallbackJobBySlug(slug);
    }

    const result: JobDetailResponse = await response.json();

    if (!result.ok || !result.data) {
      console.error("Réponse API invalide:", result);
      return getFallbackJobBySlug(slug);
    }

    return result.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'offre:", error);
    return getFallbackJobBySlug(slug);
  }
}

/**
 * Récupère les slugs de toutes les offres pour generateStaticParams
 */
export async function getJobSlugs(): Promise<string[]> {
  const jobs = await getJobOffers();
  return jobs.map((job) => job.slug);
}

// =============================================
// FALLBACK: Données statiques en cas d'erreur API
// =============================================

import { jobs as staticJobs } from "@/data/jobs";

function getFallbackJobs(): JobOffer[] {
  console.warn("Utilisation des données statiques (fallback)");
  return staticJobs.map((job) => ({
    id: job.id,
    slug: job.id,
    title: job.title,
    description: job.description,
    location: job.location,
    contractType: job.type,
    department: job.department,
    responsibilities: job.responsibilities,
    requirements: job.requirements,
    niceToHave: job.niceToHave ?? [],
    benefits: job.benefits ?? [],
    publishedAt: job.postedAt,
    expiresAt: null,
    isExpired: false,
  }));
}

function getFallbackJobBySlug(slug: string): JobOffer | null {
  const job = staticJobs.find((j) => j.id === slug);
  if (!job) return null;

  console.warn(`Utilisation des données statiques pour ${slug} (fallback)`);
  return {
    id: job.id,
    slug: job.id,
    title: job.title,
    description: job.description,
    location: job.location,
    contractType: job.type,
    department: job.department,
    responsibilities: job.responsibilities,
    requirements: job.requirements,
    niceToHave: job.niceToHave ?? [],
    benefits: job.benefits ?? [],
    publishedAt: job.postedAt,
    expiresAt: null,
    isExpired: false,
  };
}
