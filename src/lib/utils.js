import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/** Prefix a /public path with the app's base URL (needed when hosted under a subpath, e.g. GitHub Pages). */
export const asset = (path) => import.meta.env.BASE_URL + path.replace(/^\//, "")
