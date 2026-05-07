'use client';

import { useState, useRef } from 'react';

type Phase = 'input' | 'loading' | 'response' | 'feedback';

interface Response {
  acknowledgment: string;
  action: string;
  interventionId: string;
}

const BLOCK_MESSAGES = [
  'Je hebt je actie. Ga het doen. De app kan wachten.',
  'Je bent aan het uitstellen. Sluit de app.',
  'Begrip helpt hier niet. De actie wel.',
];

export default function Home() {
  const [phase, setPhase] = useState<Phase>('input');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState<Response | null>(null);
  const [visibleLines, setVisibleLines] = useState(0);
  const [blockAttempt, setBlockAttempt] = useState(0);
  const [feedbackDone, setFeedbackDone] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  async function handleSubmit() {
    if (!message.trim()) return;

    if (phase === 'response') {
      setBlockAttempt((n) => Math.min(n + 1, BLOCK_MESSAGES.length - 1));
      return;
    }

    setPhase('loading');

    const res = await fetch('http://localhost:3001/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'user-1', message }),
    });

    const data = await res.json();
    setResponse(data);
    setVisibleLines(0);
    setBlockAttempt(0);

    setTimeout(() => {
      setPhase('response');
      setTimeout(() => setVisibleLines(1), 100);
      setTimeout(() => setVisibleLines(2), 1800);
      setTimeout(() => setVisibleLines(3), 3400);
    }, 1200);
  }

  async function handleFeedback(helpful: boolean) {
    if (!response) return;
    await fetch('http://localhost:3001/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ interventionId: response.interventionId, helpful }),
    });
    setFeedbackDone(true);
    setTimeout(() => {
      setPhase('input');
      setMessage('');
      setResponse(null);
      setVisibleLines(0);
      setFeedbackDone(false);
    }, 1500);
  }

  function handleCommit() {
    setPhase('feedback');
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
          {blockAttempt > 0 && (
            <p className="text-sm text-[#888] italic text-center">
              {BLOCK_MESSAGES[blockAttempt - 1]}
            </p>
          )}
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
            <div className="w-full flex gap-2 items-center">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); } }}
                placeholder="Typ hier..."
                rows={2}
                className="flex-1 bg-white border-0 rounded-2xl px-4 py-3 text-[#1a1a1a] placeholder-[#bbb] resize-none focus:outline-none text-sm shadow-sm opacity-40"
              />
              <button
                onClick={handleSubmit}
                className="bg-[#2d5a3d] text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 opacity-40 hover:opacity-100 transition-opacity"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="19" x2="12" y2="5" />
                  <polyline points="5 12 12 5 19 12" />
                </svg>
              </button>
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
    </main>
  );
}
