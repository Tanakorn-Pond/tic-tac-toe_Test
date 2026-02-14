import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';
const AUTH_USER_KEY = "authUser";

const getAuthenticatedUsername = (): string => {
  const raw = localStorage.getItem(AUTH_USER_KEY);

  if (!raw) {
    return "";
  }

  try {
    const parsed = JSON.parse(raw) as { username?: unknown };
    if (typeof parsed.username === "string") {
      return parsed.username;
    }
  } catch {
    return "";
  }

  return "";
};

function Home() {
  const navigate = useNavigate();
  const username = useMemo(() => getAuthenticatedUsername(), []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem(AUTH_USER_KEY);
    navigate("/login");
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_10%_20%,rgba(14,165,233,0.15),transparent_32%),radial-gradient(circle_at_90%_85%,rgba(34,197,94,0.15),transparent_34%),linear-gradient(130deg,#0f172a_0%,#1e293b_100%)] px-6 py-8">
      <section className="mx-auto w-full max-w-5xl">
        <header className="flex flex-col gap-4 rounded-3xl border border-slate-700/50 bg-slate-900/80 p-7 shadow-[0_20px_45px_rgba(0,0,0,0.2)] backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
          <h1 className="mt-2 text-3xl font-black text-white sm:text-4xl">
            {username || "ผู้ใช้งาน"}
          </h1>
          <div className="flex flex-wrap gap-3">
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

      <section className="mx-auto mt-8 grid w-full max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* 1.) เล่นกับ Bot */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-700/50 bg-slate-900/60 p-6 shadow-lg backdrop-blur-sm transition hover:border-purple-500/50 hover:bg-slate-900/80">
          <div>
            <h2 className="text-xl font-bold text-white">ฝึกซ้อมกับบอท</h2>
          </div>
          <button
            onClick={() => navigate("/bot-room")}
            className="mt-6 w-full rounded-xl border border-slate-600 bg-transparent px-4 py-3 font-bold text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            เล่นกับบอท
          </button>
        </div>

        {/* 2.) สร้างห้อง */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-700/50 bg-slate-900/60 p-6 shadow-lg backdrop-blur-sm transition hover:border-purple-500/50 hover:bg-slate-900/80">
          <div>
            <h2 className="text-xl font-bold text-white">สร้างห้อง</h2>
          </div>
          <button
            onClick={() => navigate("/bot-room")}
            className="mt-6 w-full rounded-xl border border-slate-600 bg-transparent px-4 py-3 font-bold text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            สร้างห้อง
          </button>
        </div>

        {/* 3.) Join ห้อง */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-700/50 bg-slate-900/60 p-6 shadow-lg backdrop-blur-sm transition hover:border-purple-500/50 hover:bg-slate-900/80">
          <div>
            <h2 className="text-xl font-bold text-white">เข้าร่วมห้อง</h2>
          </div>
          <div className="mt-5 rounded-2xl border border-slate-500/50 bg-slate-800/50 p-3 shadow-lg backdrop-blur-sm transition hover:border-green-500/50 hover:bg-slate-900/80">
            <input type="text" placeholder="Room code" className="w-full bg-transparent text-white placeholder-slate-400 focus:outline-none"/>
          </div>
          <button
            onClick={() => navigate("/join-room")}
            className="mt-6 w-full rounded-xl border border-slate-600 bg-transparent px-4 py-3 font-bold text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            เข้าร่วมห้อง
          </button>
        </div>
      </section>
    </main>
  );
}

export default Home;
