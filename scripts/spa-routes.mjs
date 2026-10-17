// GitHub Pages has no SPA rewrites. Copy dist/index.html to <route>/index.html for
// every app route so direct visits and refreshes return 200 instead of 404.
// 404.html stays as the fallback for unknown paths. Keep this list in sync with App.jsx.
import { copyFileSync, mkdirSync } from "node:fs"
import { join } from "node:path"

const routes = [
  "features",
  "pricing",
  "about",
  "contact",
  "login",
  "signup",
  "dashboard",
  ...["students", "teachers", "classes", "attendance", "timetable", "fees", "exams", "reports", "settings"].map(
    (p) => `dashboard/${p}`
  ),
]

const dist = "dist"
const index = join(dist, "index.html")

for (const route of routes) {
  mkdirSync(join(dist, route), { recursive: true })
  copyFileSync(index, join(dist, route, "index.html"))
}
copyFileSync(index, join(dist, "404.html"))

console.log(`spa-routes: wrote ${routes.length} route pages + 404.html`)
