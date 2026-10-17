/**
 * MOCK auth service — demo only.
 *
 * Accounts live in the browser's localStorage so the login → dashboard flow works
 * without a server. Replace each function body with a call to your real API
 * (e.g. `fetch("/api/login", ...)`) before going live. Never store real
 * passwords in localStorage.
 */

const USERS_KEY = "schulflow_users"
const SESSION_KEY = "schulflow_session"

export const DEMO_ACCOUNT = { email: "demo@schulflow.com", password: "demo1234" }

const demoUser = {
  name: "Priya Sharma",
  email: DEMO_ACCOUNT.email,
  password: DEMO_ACCOUNT.password,
  school: "Green Valley School",
  phone: "",
  students: "300 – 1,000",
}

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function write(key, value) {
  try {
    if (value === null) localStorage.removeItem(key)
    else localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable (private mode) — session lasts until reload */
  }
}

const delay = (ms = 600) => new Promise((r) => setTimeout(r, ms))

function getUsers() {
  const users = read(USERS_KEY, [])
  return users.some((u) => u.email === demoUser.email) ? users : [demoUser, ...users]
}

function publicUser({ password, ...user }) {
  return user
}

export function getSession() {
  return read(SESSION_KEY, null)
}

export async function login({ email, password }) {
  await delay()
  const user = getUsers().find((u) => u.email.toLowerCase() === email.trim().toLowerCase())
  if (!user || user.password !== password) throw new Error("Incorrect email or password.")
  const session = publicUser(user)
  write(SESSION_KEY, session)
  return session
}

export async function signup(data) {
  await delay()
  const users = getUsers()
  const email = data.email.trim().toLowerCase()
  if (users.some((u) => u.email.toLowerCase() === email)) {
    throw new Error("An account with this email already exists. Try logging in.")
  }
  const user = { ...data, email }
  write(USERS_KEY, [...users, user])
  const session = publicUser(user)
  write(SESSION_KEY, session)
  return session
}

export async function updateProfile(email, changes) {
  await delay(400)
  const users = getUsers().map((u) => (u.email === email ? { ...u, ...changes } : u))
  write(USERS_KEY, users)
  const session = publicUser(users.find((u) => u.email === email))
  write(SESSION_KEY, session)
  return session
}

export function logout() {
  write(SESSION_KEY, null)
}
