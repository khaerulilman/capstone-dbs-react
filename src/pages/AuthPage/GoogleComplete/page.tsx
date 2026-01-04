import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { completeGoogleRegister, saveTokenToLocalStorage } from "../authApi";

function decodeJwt(token: string) {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const payload = parts[1];
    // Add padding
    const padded = payload.padEnd(
      payload.length + ((4 - (payload.length % 4)) % 4),
      "="
    );
    const json = atob(padded.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}

export default function GoogleCompletePage() {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("token");
    if (!t) {
      setError("Token tidak ditemukan");
      return;
    }
    setToken(t);
    const payload = decodeJwt(t);
    if (payload) {
      if (payload.email) setEmail(payload.email);
      if (payload.name) setName(payload.name);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const res = await completeGoogleRegister({ token, name });
      if (res.data && !res.data.error && res.data.token) {
        saveTokenToLocalStorage(res.data.token);
        navigate("/");
      } else {
        setError(res.data?.message || "Gagal menyelesaikan registrasi");
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.message || err.message || "Terjadi kesalahan"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h2 className="text-gray-800 text-xl font-semibold mb-4">
          Selesaikan Registrasi
        </h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-md p-2 mb-3">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              value={email}
              disabled
              className="w-full mt-1 p-2 rounded-md border border-gray-300 bg-gray-100 text-gray-600 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nama Lengkap
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full mt-1 p-2 rounded-md border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-md font-medium text-white
                   bg-blue-600 hover:bg-blue-700 transition
                   disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {loading ? "Memproses..." : "Selesaikan Registrasi"}
          </button>
        </form>
      </div>
    </div>
  );
}
