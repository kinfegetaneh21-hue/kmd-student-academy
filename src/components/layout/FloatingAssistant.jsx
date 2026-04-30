import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Sparkles, Send } from 'lucide-react';

const seedMessages = [
  { from: 'bot', text: 'Hi! I\u2019m KMD-AI, your study buddy. Ask me anything about your courses.' },
];

const replies = {
  default: 'Great question! I\u2019d explore the course page and notes — there\u2019s a downloadable summary for every lesson.',
  exit:
    'Our Exit Exam Masterclass covers 80+ hours with mock exams. Head to Premium → Exit Exam to enroll.',
  math: 'For freshman math, start with Functions & Graphs. The video is 18 minutes and has a cheatsheet.',
  ai: 'The Artificial Intelligence (5th year) course is my personal favorite — 42 hours of hands-on content.',
};

function reply(text) {
  const t = text.toLowerCase();
  if (t.includes('exit')) return replies.exit;
  if (t.includes('math')) return replies.math;
  if (t.includes('ai') || t.includes('artificial')) return replies.ai;
  return replies.default;
}

export default function FloatingAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(seedMessages);
  const [text, setText] = useState('');

  const onSend = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const userMsg = { from: 'user', text };
    const botMsg = { from: 'bot', text: reply(text) };
    setMessages((m) => [...m, userMsg, botMsg]);
    setText('');
  };

  return (
    <>
      <button
        aria-label="Open AI assistant"
        onClick={() => setOpen((s) => !s)}
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-brand-600 to-accent-500 px-4 py-3 text-sm font-semibold text-white shadow-glow hover:shadow-soft"
      >
        <Bot className="h-5 w-5" />
        <span className="hidden sm:inline">Ask KMD-AI</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            className="fixed bottom-24 right-5 z-40 flex h-[520px] w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 shadow-glow dark:bg-slate-900 dark:ring-slate-800"
          >
            <div className="flex items-center gap-2 bg-gradient-to-r from-brand-600 to-accent-500 px-4 py-3 text-white">
              <Sparkles className="h-4 w-4" />
              <p className="text-sm font-semibold">KMD-AI Tutor</p>
              <button aria-label="Close" onClick={() => setOpen(false)} className="ml-auto rounded-md p-1 hover:bg-white/10">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm scrollbar-thin">
              {messages.map((m, i) => (
                <div key={i} className={m.from === 'bot' ? 'flex' : 'flex justify-end'}>
                  <div
                    className={
                      m.from === 'bot'
                        ? 'max-w-[80%] rounded-2xl bg-slate-100 px-3 py-2 text-slate-800 dark:bg-slate-800 dark:text-slate-100'
                        : 'max-w-[80%] rounded-2xl bg-brand-600 px-3 py-2 text-white'
                    }
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={onSend} className="border-t border-slate-200 p-3 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Ask about a course, topic or plan…"
                  className="input !py-2"
                />
                <button className="btn-primary !px-3 !py-2" aria-label="Send">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
