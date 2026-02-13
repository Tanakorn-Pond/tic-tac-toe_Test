import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

type AuthMode = 'login' | 'register'
const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'
const AUTH_USER_KEY = 'authUser'

type AuthResponse = {
  message?: string
  user?: {
    userId?: number
    username?: string
  }
}

const getErrorMessage = (payload: unknown): string => {
  if (!payload || typeof payload !== 'object') {
    return 'คำขอไม่สำเร็จ'
  }

  const message = (payload as { message?: unknown }).message
  if (typeof message === 'string') {
    return message
  }

  if (Array.isArray(message) && message.length > 0 && typeof message[0] === 'string') {
    return message[0]
  }

  return 'คำขอไม่สำเร็จ'
}

function Login() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<AuthMode>('login')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const changeMode = (nextMode: AuthMode) => {
    setMode(nextMode)
    setErrorMessage('')
    setSuccessMessage('')
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    const formElement = event.currentTarget
    const formData = new FormData(formElement)
    const username = String(formData.get('username') ?? '').trim()
    const password = String(formData.get('password') ?? '')
    const confirmPassword = String(formData.get('confirmPassword') ?? '')

    if (mode === 'register' && password !== confirmPassword) {
      setErrorMessage('รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน')
      return
    }

    const payload =
      mode === 'register'
        ? { username, password, confirmPassword }
        : { username, password }

    try {
      setIsSubmitting(true)
      const endpoint = mode === 'register' ? 'register' : 'login'
      const response = await fetch(`${API_BASE_URL}/user/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = (await response.json().catch(() => null)) as unknown

      if (!response.ok) {
        setErrorMessage(getErrorMessage(result))
        return
      }

      const parsedResult = result as AuthResponse
      const message =
        typeof parsedResult.message === 'string'
          ? parsedResult.message
          : `${mode === 'register' ? 'สมัครสมาชิก' : 'เข้าสู่ระบบ'}สำเร็จ`

      setSuccessMessage(message)
      formElement.reset()

      if (mode === 'register') {
        setMode('login')
        return
      }

      const authenticatedUsername =
        typeof parsedResult.user?.username === 'string' && parsedResult.user.username.trim() !== ''
          ? parsedResult.user.username
          : username

      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem(
        AUTH_USER_KEY,
        JSON.stringify({
          username: authenticatedUsername,
        }),
      )
      navigate('/home')
    } catch {
      setErrorMessage('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_20%_10%,rgba(20,184,166,0.15),transparent_34%),radial-gradient(circle_at_80%_90%,rgba(245,158,11,0.15),transparent_36%),linear-gradient(140deg,#0f172a_0%,#1e293b_100%)] px-6 py-8">
      <section
        aria-label="แบบฟอร์มยืนยันตัวตน"
        className="w-full max-w-[430px] rounded-3xl border border-slate-700/50 bg-slate-900/90 p-6 shadow-[0_22px_48px_rgba(0,0,0,0.5)] backdrop-blur-sm sm:p-8"
      >
        <p className="m-0 text-xs font-extrabold uppercase tracking-[0.08em] text-teal-400">ยินดีต้อนรับ</p>
        <h1 className="mt-2 text-[clamp(1.65rem,2.8vw,2rem)] font-bold leading-[1.15] text-white">
          {mode === 'login' ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}
        </h1>
        <p className="mt-3 text-slate-400">
          {mode === 'login' ? 'กรอกข้อมูลเพื่อเข้าสู่ระบบของคุณ' : 'สร้างบัญชีใหม่เพื่อเริ่มใช้งานทันที'}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-1 rounded-xl bg-slate-800 p-1" role="tablist" aria-label="เลือกโหมด">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'login'}
            className={`rounded-lg px-3 py-2 text-sm font-bold transition ${
              mode === 'login' ? 'bg-slate-700 text-white shadow-md' : 'text-slate-400 hover:bg-slate-700/60'
            }`}
            onClick={() => changeMode('login')}
          >
            เข้าสู่ระบบ
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'register'}
            className={`rounded-lg px-3 py-2 text-sm font-bold transition ${
              mode === 'register'
                ? 'bg-slate-700 text-white shadow-md'
                : 'text-slate-400 hover:bg-slate-700/60'
            }`}
            onClick={() => changeMode('register')}
          >
            สมัครสมาชิก
          </button>
        </div>

        <form className="mt-5 grid gap-3.5" onSubmit={handleSubmit}>
          <label className="grid gap-1.5 text-sm font-semibold text-slate-300">
            ชื่อผู้ใช้
            <input
              type="text"
              name="username"
              placeholder="กรอกชื่อผู้ใช้"
              required
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-[0.95rem] text-white outline-none transition focus:border-teal-500 focus:ring-3 focus:ring-teal-500/20"
            />
          </label>

          <label className="grid gap-1.5 text-sm font-semibold text-slate-300">
            รหัสผ่าน
            <input
              type="password"
              name="password"
              placeholder="กรอกรหัสผ่าน"
              required
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-[0.95rem] text-white outline-none transition focus:border-teal-500 focus:ring-3 focus:ring-teal-500/20"
            />
          </label>

          {mode === 'register' && (
            <label className="grid gap-1.5 text-sm font-semibold text-slate-300">
              ยืนยันรหัสผ่าน
              <input
                type="password"
                name="confirmPassword"
                placeholder="กรอกยืนยันรหัสผ่าน"
                required
                className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-[0.95rem] text-white outline-none transition focus:border-teal-500 focus:ring-3 focus:ring-teal-500/20"
              />
            </label>
          )}

          {errorMessage && (
            <p className="rounded-lg border border-red-900/50 bg-red-950/30 px-3 py-2 text-sm font-medium text-red-400">
              {errorMessage}
            </p>
          )}

          {successMessage && (
            <p className="rounded-lg border border-emerald-900/50 bg-emerald-950/30 px-3 py-2 text-sm font-medium text-emerald-400">
              {successMessage}
            </p>
          )}

          <button
            disabled={isSubmitting}
            className="mt-2 rounded-lg bg-linear-to-r from-teal-700 to-teal-500 px-3 py-2.5 font-extrabold text-white transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
            type="submit"
          >
            {isSubmitting ? 'กำลังดำเนินการ...' : mode === 'login' ? 'เข้าสู่ระบบ' : 'สร้างบัญชี'}
          </button>
        </form>

        <p className="mt-4 text-center text-slate-400">
          {mode === 'login' ? 'ยังไม่มีบัญชีใช่ไหม?' : 'มีบัญชีอยู่แล้วใช่ไหม?'}{' '}
          <button
            type="button"
            className="border-0 bg-transparent p-0 font-extrabold text-teal-400"
            onClick={() => changeMode(mode === 'login' ? 'register' : 'login')}
          >
            {mode === 'login' ? 'สมัครสมาชิก' : 'เข้าสู่ระบบ'}
          </button>
        </p>
      </section>
    </main>
  )
}

export default Login
