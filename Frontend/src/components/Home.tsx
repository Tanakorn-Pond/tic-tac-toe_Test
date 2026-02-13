import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

const AUTH_USER_KEY = 'authUser'

const getAuthenticatedUsername = (): string => {
  const raw = localStorage.getItem(AUTH_USER_KEY)

  if (!raw) {
    return ''
  }

  try {
    const parsed = JSON.parse(raw) as { username?: unknown }
    if (typeof parsed.username === 'string') {
      return parsed.username
    }
  } catch {
    return ''
  }

  return ''
}

function Home() {
  const navigate = useNavigate()
  const username = useMemo(() => getAuthenticatedUsername(), [])

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem(AUTH_USER_KEY)
    navigate('/login')
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_10%_20%,rgba(14,165,233,0.15),transparent_32%),radial-gradient(circle_at_90%_85%,rgba(34,197,94,0.15),transparent_34%),linear-gradient(130deg,#0f172a_0%,#1e293b_100%)] px-6 py-8">
      <section className="mx-auto w-full max-w-5xl">
        <header className="flex flex-col gap-4 rounded-3xl border border-slate-700/50 bg-slate-900/80 p-7 shadow-[0_20px_45px_rgba(0,0,0,0.2)] backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
          <h1 className="mt-2 text-3xl font-black text-white sm:text-4xl">{username || 'ผู้ใช้งาน'}</h1>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate('/tic-tac-toe')}
              className="rounded-lg bg-emerald-600 px-4 py-2.5 font-semibold text-white transition hover:bg-emerald-500"
            >
              ไปหน้า Tic-Tac-Toe
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg bg-slate-700 px-4 py-2.5 font-semibold text-white transition hover:bg-slate-600"
            >
              ออกจากระบบ
            </button>
          </div>
        </header>
      </section>
    </main>
  )
}

export default Home
