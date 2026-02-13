import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Board } from "./Board";

function TicTacToe() {
  const navigate = useNavigate();
  const [board, setBoard] = useState<any>(
    Array.from(
      {
        length: 3,
      },
      () => Array.from({ length: 3 }, () => null),
    ),
  );

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8 text-white">
      <section className="mx-auto w-full max-w-4xl rounded-3xl border border-slate-800 bg-slate-900 p-8">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl font-black">Tic-Tac-Toe</h1>
          <button
            type="button"
            onClick={() => navigate("/home")}
            className="rounded-lg bg-slate-700 px-4 py-2 font-semibold transition hover:bg-slate-600"
          >
            กลับหน้า Home
          </button>
        </div>

        <p className="mt-4 text-slate-300">
          หน้านี้เชื่อมต่อจากหน้า Home เรียบร้อยแล้ว
        </p>
      </section>

      <section className="mx-auto w-full max-w-4xl rounded-3xl border border-slate-800 bg-slate-900 p-8 mt-5">
        <main>
          <h1 className="text-3xl font-black">Tic-Tac-Toe</h1>
          <Board board={[]} handleClick={() => ""} />
        </main>
      </section>
    </main>
  );
}

export default TicTacToe;
