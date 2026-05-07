'use client';

import { useState, useEffect } from 'react';

interface Stats {
  overview: {
    totalMessages: number;
    totalInterventions: number;
    totalFeedback: number;
    helpfulRate: number | null;
  };
  patternStats: { name: string; count: number }[];
  recentActivity: {
    id: string;
    userId: string;
    pattern: string;
    belief: string;
    acknowledgment: string;
    createdAt: string;
  }[];
  recentMessages: {
    id: string;
    content: string;
    user_id: string;
    created_at: string;
  }[];
  feedback: {
    helpful: number;
    notHelpful: number;
  };
}

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState('');
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<'overview' | 'messages' | 'patterns' | 'feedback'>('overview');

  async function handleLogin() {
    setLoading(true);
    setError('');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/stats?password=${password}`);
    if (res.status === 401) {
      setError('Verkeerd wachtwoord.');
      setLoading(false);
      return;
    }
    const data = await res.json();
    setStats(data);
    setAuthed(true);
    setLoading(false);
  }

  async function refresh() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/stats?password=${password}`);
    const data = await res.json();
    setStats(data);
  }

  useEffect(() => {
    if (!authed) return;
    const interval = setInterval(refresh, 10000);
    return () => clearInterval(interval);
  }, [authed]);

  if (!authed) {
    return (
      <main className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-6">
        <div className="w-full max-w-xs flex flex-col gap-6">
          <h1 className="text-2xl font-bold text-white tracking-tight">MOVE Admin</h1>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            placeholder="Wachtwoord"
            className="bg-[#1a1a1a] text-white px-4 py-3 rounded-xl border border-[#333] focus:outline-none focus:border-[#555] text-base"
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="bg-white text-black py-3 rounded-xl font-medium hover:bg-[#eee] transition-colors disabled:opacity-40"
          >
            {loading ? 'Laden...' : 'Inloggen'}
          </button>
        </div>
      </main>
    );
  }

  if (!stats) return null;

  const tabs = ['overview', 'messages', 'patterns', 'feedback'] as const;

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white px-6 py-10">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">MOVE Admin</h1>
          <button onClick={refresh} className="text-sm text-[#666] hover:text-white transition-colors">↻ Vernieuwen</button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === t ? 'bg-white text-black' : 'text-[#666] hover:text-white'}`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Overview */}
        {tab === 'overview' && (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label: 'Berichten', value: stats.overview.totalMessages },
                { label: 'Interventies', value: stats.overview.totalInterventions },
                { label: 'Feedback', value: stats.overview.totalFeedback },
                { label: 'Geholpen', value: stats.overview.helpfulRate !== null ? `${stats.overview.helpfulRate}%` : '—' },
              ].map(({ label, value }) => (
                <div key={label} className="bg-[#1a1a1a] rounded-2xl p-5 flex flex-col gap-1">
                  <span className="text-[#555] text-xs uppercase tracking-widest">{label}</span>
                  <span className="text-3xl font-bold">{value}</span>
                </div>
              ))}
            </div>

            <div className="bg-[#1a1a1a] rounded-2xl p-5 flex flex-col gap-4">
              <h2 className="text-sm text-[#555] uppercase tracking-widest">Recente activiteit</h2>
              {stats.recentActivity.slice(0, 8).map(item => (
                <div key={item.id} className="flex flex-col gap-1 border-b border-[#222] pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <span className="text-xs bg-[#2d5a3d] text-white px-2 py-0.5 rounded-full">{item.pattern}</span>
                    <span className="text-xs text-[#444]">{new Date(item.createdAt).toLocaleString('nl-NL')}</span>
                  </div>
                  <p className="text-sm text-[#ccc]">{item.acknowledgment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {tab === 'messages' && (
          <div className="bg-[#1a1a1a] rounded-2xl p-5 flex flex-col gap-4">
            <h2 className="text-sm text-[#555] uppercase tracking-widest">Berichten ({stats.recentMessages.length})</h2>
            {stats.recentMessages.map(msg => (
              <div key={msg.id} className="border-b border-[#222] pb-4 last:border-0 last:pb-0 flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#444] font-mono">{msg.user_id.slice(0, 8)}...</span>
                  <span className="text-xs text-[#444]">{new Date(msg.created_at).toLocaleString('nl-NL')}</span>
                </div>
                <p className="text-sm text-[#ccc] leading-relaxed">{msg.content}</p>
              </div>
            ))}
          </div>
        )}

        {/* Patterns */}
        {tab === 'patterns' && (
          <div className="bg-[#1a1a1a] rounded-2xl p-5 flex flex-col gap-3">
            <h2 className="text-sm text-[#555] uppercase tracking-widest">Patronen</h2>
            {stats.patternStats.length === 0 && <p className="text-[#555] text-sm">Nog geen data.</p>}
            {stats.patternStats.map(({ name, count }) => {
              const max = stats.patternStats[0]?.count || 1;
              const pct = Math.round((count / max) * 100);
              return (
                <div key={name} className="flex items-center gap-3">
                  <span className="text-sm w-40 text-[#aaa] shrink-0">{name}</span>
                  <div className="flex-1 bg-[#222] rounded-full h-2">
                    <div className="bg-[#2d5a3d] h-2 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-sm text-[#555] w-6 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Feedback */}
        {tab === 'feedback' && (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] rounded-2xl p-5 flex flex-col gap-1">
                <span className="text-[#555] text-xs uppercase tracking-widest">Geholpen</span>
                <span className="text-3xl font-bold text-green-400">{stats.feedback.helpful}</span>
              </div>
              <div className="bg-[#1a1a1a] rounded-2xl p-5 flex flex-col gap-1">
                <span className="text-[#555] text-xs uppercase tracking-widest">Niet geholpen</span>
                <span className="text-3xl font-bold text-red-400">{stats.feedback.notHelpful}</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
