"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";

type Message = {
  id: number;
  sender_id: number;
  receiver_id: number;
  message: string;
  is_read: number;
  created_at: string;
  sender_name: string;
  sender_role: string;
};

export function ChatWidget() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [adminId, setAdminId] = useState<number | null>(null);
  const [sending, setSending] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchMessages = useCallback(async (adminUserId: number) => {
    const res = await fetch(`/api/chat/messages?userId=${adminUserId}`);
    if (res.ok) {
      const data = await res.json();
      setMessages(data);
    }
  }, []);

  const fetchUnread = useCallback(async () => {
    const res = await fetch("/api/chat/unread");
    if (res.ok) {
      const data = await res.json();
      setUnread(data.count);
    }
  }, []);

  useEffect(() => {
    if (!user || user.role === "admin") return;
    fetchUnread();
    const id = setInterval(fetchUnread, 15000);
    return () => clearInterval(id);
  }, [user, fetchUnread]);

  useEffect(() => {
    if (!open || !user || user.role === "admin") return;

    (async () => {
      const res = await fetch("/api/chat/admin");
      if (res.ok) {
        const admin = await res.json();
        if (admin?.id) {
          setAdminId(admin.id);
          await fetchMessages(admin.id);
          setUnread(0);
        }
      }
      setLoaded(true);
    })();
  }, [open, user, fetchMessages]);

  useEffect(() => {
    if (!open || !adminId) return;
    intervalRef.current = setInterval(() => fetchMessages(adminId), 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [open, adminId, fetchMessages]);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open, loaded]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim() || !adminId || sending) return;
    setSending(true);
    const res = await fetch("/api/chat/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ receiverId: adminId, message: text.trim() }),
    });
    if (res.ok) {
      setText("");
      await fetchMessages(adminId);
    }
    setSending(false);
  }

  if (!user || user.role === "admin") return null;

  return (
    <>
      {/* Chat box */}
      {open && (
        <div className="fixed bottom-20 right-5 z-50 w-[360px] max-w-[calc(100vw-40px)] rounded-2xl shadow-2xl border border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col overflow-hidden"
          style={{ height: "480px", maxHeight: "calc(100vh - 120px)" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-[var(--color-brand)] text-white shrink-0">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm">Support</p>
              <p className="text-[11px] text-white/70">We typically reply within minutes</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded-lg hover:bg-white/20 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5">
            {!loaded && (
              <div className="text-center text-[var(--color-muted)] text-xs py-8">Loading...</div>
            )}
            {loaded && messages.length === 0 && (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-[var(--color-brand-soft)] flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-[var(--color-brand)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-[var(--color-ink)]">How can we help?</p>
                <p className="text-xs text-[var(--color-muted)] mt-1">Send us a message and we&#39;ll get back to you.</p>
              </div>
            )}
            {messages.map((msg) => {
              const isMe = msg.sender_id === user.id;
              return (
                <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-[13px] leading-relaxed ${
                      isMe
                        ? "bg-[var(--color-brand)] text-white rounded-br-md"
                        : "bg-[var(--color-surface-2)] text-[var(--color-ink)] rounded-bl-md"
                    }`}
                  >
                    {!isMe && (
                      <p className={`text-[10px] font-semibold mb-0.5 ${isMe ? "text-white/70" : "text-[var(--color-brand)]"}`}>
                        Support
                      </p>
                    )}
                    <p className="whitespace-pre-wrap break-words">{msg.message}</p>
                    <p className={`text-[9px] mt-1 ${isMe ? "text-white/50" : "text-[var(--color-muted)]"}`}>
                      {new Date(msg.created_at + "Z").toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="flex items-center gap-2 px-3 py-2.5 border-t border-[var(--color-border)] shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-2 text-[13px] text-[var(--color-ink)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]"
            />
            <button
              type="submit"
              disabled={!text.trim() || sending}
              className="rounded-lg bg-[var(--color-brand)] p-2 text-white hover:opacity-90 disabled:opacity-40 transition-opacity"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-[var(--color-brand)] text-white shadow-lg hover:scale-105 active:scale-95 transition-transform flex items-center justify-center"
        title="Support"
      >
        {open ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>
    </>
  );
}
