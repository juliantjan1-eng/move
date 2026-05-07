'use client';

import { useState, useRef, useEffect } from 'react';

type Phase = 'input' | 'loading' | 'response' | 'feedback' | 'locked';

interface Response {
  acknowledgment: string;
  action: string;
  interventionId: string;
}

export default function Home() {
  const [phase, setPhase] = useState<Phase>('input');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState<Response | null>(null);
  const [visibleLines, setVisibleLines] = useState(0);
  const [feedbackDone, setFeedbackDone] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);
  const [blockMessage, setBlockMessage] = useState('');
  const [userId, setUserId] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    let id = localStorage.getItem('move_user_id');
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem('move_user_id', id);
    }
    setUserId(id);
  }, []);

  async function handleSubmit() {
    if (!message.trim()) return;

    setPhase('loading');
    setBlockMessage('');

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, message }),
    });

    const data = await res.json();
    setResponse(data);
    setVisibleLines(0);
    setSessionCount((n) => n + 1);

    setTimeout(() => {
      setPhase('response');
      setTimeout(() => setVisibleLines(1), 100);
      setTimeout(() => setVisibleLines(2), 1800);
      setTimeout(() => setVisibleLines(3), 3400);
    }, 1200);
  }

  async function handleFeedback(helpful: boolean) {
    if (!response) return;
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ interventionId: response.interventionId, helpful }),
    });
    setFeedbackDone(true);
    setTimeout(() => {
      if (sessionCount >= 2) {
        setPhase('locked');
      } else {
        setPhase('input');
        setMessage('');
        setResponse(null);
        setVisibleLines(0);
        setFeedbackDone(false);
      }
    }, 1500);
  }

  function handleCommit() {
    setPhase('feedback');
  }

  function handleBlockedInput() {
    if (sessionCount >= 2) {
      setBlockMessage('Je hebt je actie. Ga het nu doen.');
    } else {
      setBlockMessage('Begrip helpt hier niet. De actie wel.');
    }
  }

  return (
    <main className="min-h-screen bg-[#F5F0EA] flex flex-col items-center justify-center px-6">

      {phase === 'input' && (
        <div className="w-full max-w-sm flex flex-col items-center gap-10">
          <h1 className="text-5xl font-bold tracking-tight text-[#1a1a1a]">MOVE</h1>
          <p className="text-lg text-[#555] tracking-wide">Wat speelt er?</p>
          <div className="w-full flex gap-3 items-end">
            <textarea
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); } }}
              placeholder="Typ hier..."
              rows={3}
              className="flex-1 bg-white border-0 rounded-2xl px-4 py-3 text-[#1a1a1a] placeholder-[#bbb] resize-none focus:outline-none focus:ring-2 focus:ring-[#2d5a3d] text-base shadow-sm"
            />
            <button
              onClick={handleSubmit}
              className="bg-[#2d5a3d] text-white rounded-full w-11 h-11 flex items-center justify-center flex-shrink-0 hover:bg-[#234830] transition-colors shadow-sm"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {phase === 'loading' && (
        <div className="w-full max-w-sm flex flex-col items-center gap-6">
          <div className="w-2 h-2 rounded-full bg-[#2d5a3d] animate-pulse" />
        </div>
      )}

      {phase === 'response' && response && (
        <div className="w-full max-w-sm flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <p className={`text-2xl font-medium text-[#1a1a1a] leading-snug transition-opacity duration-700 ${visibleLines >= 1 ? 'opacity-100' : 'opacity-0'}`}>
              {response.acknowledgment}
            </p>
            <p className={`text-2xl font-medium text-[#1a1a1a] leading-snug transition-opacity duration-700 ${visibleLines >= 2 ? 'opacity-100' : 'opacity-0'}`}>
              {response.action}
            </p>
            <p className={`text-2xl font-medium text-[#2d5a3d] leading-snug transition-opacity duration-700 ${visibleLines >= 3 ? 'opacity-100' : 'opacity-0'}`}>
              Sluit de app en doe dit nu.
            </p>
          </div>

          {visibleLines >= 3 && (
            <button
              onClick={handleCommit}
              className="w-full bg-[#2d5a3d] text-white py-4 rounded-2xl text-base font-medium tracking-wide hover:bg-[#234830] active:scale-95 transition-all shadow-sm"
            >
              Ik ga dit doen
            </button>
          )}

          {visibleLines >= 3 && (
            <div
              className="w-full flex gap-2 items-end cursor-not-allowed"
              onClick={handleBlockedInput}
            >
              <div className="flex-1 bg-white rounded-2xl px-4 py-3 text-sm text-[#bbb] shadow-sm select-none min-h-[72px] flex items-start pointer-events-none">
                {blockMessage || 'Typ hier...'}
              </div>
              <div className="bg-[#2d5a3d] text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 opacity-30 pointer-events-none">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="19" x2="12" y2="5" />
                  <polyline points="5 12 12 5 19 12" />
                </svg>
              </div>
            </div>
          )}
        </div>
      )}

      {phase === 'feedback' && (
        <div className="w-full max-w-sm flex flex-col items-center gap-8">
          {!feedbackDone ? (
            <>
              <p className="text-2xl font-medium text-[#1a1a1a] text-center">Heeft dit geholpen?</p>
              <div className="w-full flex flex-col gap-3">
                <button
                  onClick={() => handleFeedback(true)}
                  className="w-full border border-[#2d5a3d] text-[#2d5a3d] py-4 rounded-2xl text-base font-medium hover:bg-[#2d5a3d] hover:text-white transition-all"
                >
                  Ja
                </button>
                <button
                  onClick={() => handleFeedback(false)}
                  className="w-full border border-[#ccc] text-[#888] py-4 rounded-2xl text-base font-medium hover:border-[#1a1a1a] hover:text-[#1a1a1a] transition-all"
                >
                  Nee
                </button>
              </div>
            </>
          ) : (
            <p className="text-xl text-[#555] text-center">
              Goed. Kom terug als je het nodig hebt.
            </p>
          )}
        </div>
      )}

      {phase === 'locked' && (
        <div className="w-full max-w-sm flex flex-col items-center gap-6 text-center">
          <p className="text-2xl font-medium text-[#1a1a1a]">Je bent klaar voor nu.</p>
          <p className="text-base text-[#777] leading-relaxed">
            Je hebt gedaan wat je kon. De rest is aan jou.<br />Kom terug als je het nodig hebt.
          </p>
        </div>
      )}

    </main>
  );
}
