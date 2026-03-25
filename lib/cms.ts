import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { unstable_noStore as noStore } from "next/cache";
import { defaultCmsData } from "@/lib/cms-defaults";
import type { BlogPost, CmsData, ServiceLandingPage } from "@/lib/cms-types";

const DATA_DIRECTORY = path.join(process.cwd(), "data");
export const CMS_FILE_PATH = path.join(DATA_DIRECTORY, "cms-content.json");

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function deepMerge<T>(base: T, override: unknown): T {
  if (Array.isArray(base)) {
    return (Array.isArray(override) ? override : base) as T;
  }

  if (isPlainObject(base)) {
    const output: Record<string, unknown> = { ...base };
    const source = isPlainObject(override) ? override : {};

    for (const key of Object.keys(source)) {
      const baseValue = output[key];
      const overrideValue = source[key];

      if (overrideValue === undefined) {
        continue;
      }

      if (baseValue === undefined) {
        output[key] = overrideValue;
        continue;
      }

      output[key] = deepMerge(baseValue, overrideValue);
    }

    return output as T;
  }

  return (override ?? base) as T;
}

async function readSavedCmsData(): Promise<unknown | null> {
  try {
    const raw = await readFile(CMS_FILE_PATH, "utf8");
    return JSON.parse(raw) as unknown;
  } catch (error) {
    const maybeFsError = error as NodeJS.ErrnoException;

    if (maybeFsError.code === "ENOENT") {
      return null;
    }

    throw error;
  }
}

export async function getCmsData(): Promise<CmsData> {
  noStore();

  const saved = await readSavedCmsData();
  return deepMerge(structuredClone(defaultCmsData), saved);
}

export async function saveCmsData(data: CmsData) {
  await mkdir(DATA_DIRECTORY, { recursive: true });
  await writeFile(CMS_FILE_PATH, JSON.stringify(data, null, 2), "utf8");
}

export async function getServiceBySlug(
  slug: string,
): Promise<ServiceLandingPage | undefined> {
  const cms = await getCmsData();
  return cms.serviceLandingPages.find((service) => service.slug === slug);
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | undefined> {
  const cms = await getCmsData();
  return cms.blogPosts.find((post) => post.slug === slug);
}

export async function getBlogPostsBySlugs(slugs: string[]) {
  const cms = await getCmsData();
  return slugs
    .map((slug) => cms.blogPosts.find((post) => post.slug === slug))
    .filter((post): post is BlogPost => Boolean(post));
}
