/**
 * Timetable generator.
 *
 * Builds a weekly timetable for several class sections at once so that no
 * teacher is ever booked in two places in the same period. It runs a
 * randomised greedy placement many times and keeps the best result:
 *   1. fewest lessons that could not be placed
 *   2. fewest back-to-back repeats of the same subject
 *
 * Rules while placing a lesson:
 *   - the slot is empty and the teacher is free in that period
 *   - a subject appears at most ceil(periodsPerWeek / days) times a day
 *     (relaxed by one only if nothing else fits)
 *   - spread across the week and avoid repeating a subject in adjacent periods
 */

export const FREE = "Free"

const shuffle = (arr) => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const busyKey = (teacher, d, p) => `${teacher}|${d}|${p}`

function attempt({ sections, days, periods, subjects }) {
  const busy = new Set()
  const grids = {}
  let unplaced = []
  let adjacent = 0

  for (const section of shuffle(sections)) {
    const grid = Array.from({ length: days }, () => Array(periods).fill(null))
    const perDay = Array.from({ length: days }, () => ({}))

    // hardest subjects (most periods) first, random order among equals
    const lessons = shuffle(subjects)
      .sort((a, b) => b.perWeek - a.perWeek)
      .flatMap((s) => Array(s.perWeek).fill(s))

    for (const lesson of lessons) {
      const limit = Math.ceil(lesson.perWeek / days)
      let best = null

      for (const relax of [0, 1]) {
        for (let d = 0; d < days; d++) {
          const count = perDay[d][lesson.name] ?? 0
          if (count >= limit + relax) continue
          for (let p = 0; p < periods; p++) {
            if (grid[d][p]) continue
            if (lesson.teacher && busy.has(busyKey(lesson.teacher, d, p))) continue
            const nextTo =
              (p > 0 && grid[d][p - 1]?.name === lesson.name) || (p < periods - 1 && grid[d][p + 1]?.name === lesson.name)
            // small bias toward earlier periods so free periods end up late in the day
            const score = count * 10 + (nextTo ? 5 : 0) + p * 0.4 + Math.random() * 3
            if (!best || score < best.score) best = { d, p, score, nextTo }
          }
        }
        if (best) break
      }

      if (!best) {
        unplaced.push({ section, subject: lesson.name })
        continue
      }
      grid[best.d][best.p] = { name: lesson.name, teacher: lesson.teacher }
      perDay[best.d][lesson.name] = (perDay[best.d][lesson.name] ?? 0) + 1
      if (best.nextTo) adjacent++
      if (lesson.teacher) busy.add(busyKey(lesson.teacher, best.d, best.p))
    }

    grids[section] = grid.map((row) => row.map((cell) => cell ?? { name: FREE, teacher: "" }))
  }

  return { grids, unplaced, adjacent }
}

export function generateTimetable(config, tries = 40) {
  let best = null
  for (let i = 0; i < tries; i++) {
    const result = attempt(config)
    if (
      !best ||
      result.unplaced.length < best.unplaced.length ||
      (result.unplaced.length === best.unplaced.length && result.adjacent < best.adjacent)
    ) {
      best = result
    }
    if (best.unplaced.length === 0 && best.adjacent === 0) break
  }
  return best
}

/** Would swapping two cells of one section double-book a teacher elsewhere? */
export function swapClash(grids, section, a, b) {
  const cellA = grids[section][a.d][a.p]
  const cellB = grids[section][b.d][b.p]
  const busyElsewhere = (teacher, d, p) =>
    teacher &&
    Object.entries(grids).some(([s, g]) => s !== section && g[d][p].teacher === teacher)
  if (busyElsewhere(cellA.teacher, b.d, b.p)) return cellA.teacher
  if (busyElsewhere(cellB.teacher, a.d, a.p)) return cellB.teacher
  return null
}

/** Period start/end times, with a break inserted after `breakAfter`. */
export function periodTimes({ start, length, periods, breakAfter, breakLength }) {
  const [h, m] = start.split(":").map(Number)
  let t = h * 60 + m
  const fmt = (mins) => {
    const hh = Math.floor(mins / 60) % 24
    const mm = mins % 60
    const ampm = hh >= 12 ? "PM" : "AM"
    return `${((hh + 11) % 12) + 1}:${String(mm).padStart(2, "0")} ${ampm}`
  }
  const out = []
  for (let p = 0; p < periods; p++) {
    out.push({ from: fmt(t), to: fmt(t + length) })
    t += length
    if (p + 1 === breakAfter) {
      out.breakSlot = { from: fmt(t), to: fmt(t + breakLength) }
      t += breakLength
    }
  }
  return out
}
