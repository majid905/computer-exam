"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

type Conversation = {
  user_id: number;
  full_name: string;
  email: string;
  profile_pic: string | null;
  last_message: string;
  last_message_at: string;
  unread_count: number;
};

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

export default function AdminChatPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showList, setShowList] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (user && user.role !== "admin") router.push("/chat");
  }, [user, router]);

  const fetchConversations = useCallback(async () => {
    const res = await fetch("/api/chat/conversations");
    if (res.ok) setConversations(await res.json());
  }, []);

  const fetchMessages = useCallback(async (userId: number) => {
    const res = await fetch(`/api/chat/messages?userId=${userId}`);
    if (res.ok) {
      setMessages(await res.json());
    }
  }, []);

  useEffect(() => {
    if (!user || user.role !== "admin") return;
    fetchConversations().then(() => setLoading(false));
  }, [user, fetchConversations]);

  useEffect(() => {
    if (!selectedUserId) return;
    fetchMessages(selectedUserId);

    intervalRef.current = setInterval(() => {
      fetchMessages(selectedUserId);
      fetchConversations();
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [selectedUserId, fetchMessages, fetchConversations]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function selectConversation(userId: number) {
    setSelectedUserId(userId);
    setShowList(false);
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim() || !selectedUserId || sending) return;
    setSending(true);
    const res = await fetch("/api/chat/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ receiverId: selectedUserId, message: text.trim() }),
    });
    if (res.ok) {
      setText("");
      await fetchMessages(selectedUserId);
      await fetchConversations();
    }
    setSending(false);
  }

  if (!user || user.role !== "admin") return null;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-[var(--color-muted)]">Loading chats...</div>
      </div>
    );
  }

  const selectedUser = conversations.find((c) => c.user_id === selectedUserId);

  return (
    <div className="flex h-[calc(100vh-80px)]">
      {/* Conversation list */}
      <div
        className={`${
          showList ? "flex" : "hidden"
        } md:flex flex-col w-full md:w-80 border-r border-[var(--color-border)] bg-[var(--color-surface)]`}
      >
        <div className="p-4 border-b border-[var(--color-border)]">
          <h2 className="text-lg font-bold text-[var(--color-ink)]">Messages</h2>
          <p className="text-xs text-[var(--color-muted)]">{conversations.length} conversation(s)</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 && (
            <div className="text-center text-[var(--color-muted)] text-sm py-10">
              No conversations yet
            </div>
          )}
          {conversations.map((conv) => (
            <button
              key={conv.user_id}
              onClick={() => selectConversation(conv.user_id)}
              className={`w-full text-left px-4 py-3 border-b border-[var(--color-border)] hover:bg-[var(--color-surface-2)] transition-colors ${
                selectedUserId === conv.user_id ? "bg-[var(--color-surface-2)]" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[var(--color-brand)] flex items-center justify-center text-white font-bold text-xs shrink-0">
                  {(conv.full_name || conv.email)[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-[var(--color-ink)] truncate">
                      {conv.full_name || conv.email}
                    </span>
                    {conv.unread_count > 0 && (
                      <span className="ml-2 bg-[var(--color-brand)] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shrink-0">
                        {conv.unread_count}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[var(--color-muted)] truncate">{conv.last_message}</p>
                  <p className="text-[10px] text-[var(--color-muted)]">
                    {new Date(conv.last_message_at + "Z").toLocaleString([], {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat panel */}
      <div className={`${!showList ? "flex" : "hidden"} md:flex flex-col flex-1`}>
        {selectedUserId ? (
          <>
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
              <button
                onClick={() => setShowList(true)}
                className="md:hidden text-[var(--color-brand)] font-semibold text-sm"
              >
                Back
              </button>
              <div className="w-9 h-9 rounded-full bg-[var(--color-brand)] flex items-center justify-center text-white font-bold text-xs">
                {(selectedUser?.full_name || selectedUser?.email || "U")[0].toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-sm text-[var(--color-ink)]">
                  {selectedUser?.full_name || selectedUser?.email}
                </p>
                <p className="text-[10px] text-[var(--color-muted)]">{selectedUser?.email}</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && (
                <div className="text-center text-[var(--color-muted)] text-sm py-10">
                  No messages in this conversation
                </div>
              )}
              {messages.map((msg) => {
                const isMe = msg.sender_id === user.id;
                return (
                  <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        isMe
                          ? "bg-[var(--color-brand)] text-white rounded-br-md"
                          : "bg-[var(--color-surface-2)] text-[var(--color-ink)] rounded-bl-md"
                      }`}
                    >
                      <p className="whitespace-pre-wrap break-words">{msg.message}</p>
                      <p
                        className={`text-[10px] mt-1 ${isMe ? "text-white/60" : "text-[var(--color-muted)]"}`}
                      >
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

            <form onSubmit={handleSend} className="flex gap-2 p-4 border-t border-[var(--color-border)]">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type a reply..."
                className="flex-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]"
              />
              <button
                type="submit"
                disabled={!text.trim() || sending}
                className="rounded-xl bg-[var(--color-brand)] px-5 py-3 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                {sending ? "..." : "Send"}
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-[var(--color-muted)] text-sm">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
}
