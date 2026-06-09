"use client";

import { useEffect, useRef, useCallback } from "react";

const TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
const WARNING_MS = 2 * 60 * 1000;  // warn 2 minutes before logout
const ACTIVITY_EVENTS = ["mousemove", "keydown", "click", "scroll", "touchstart"] as const;

export function useSessionTimeout(isLoggedIn: boolean, onTimeout: () => void) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const warnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const warnedRef = useRef(false);

  const clearTimers = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (warnTimerRef.current) clearTimeout(warnTimerRef.current);
  }, []);

  const resetTimer = useCallback(() => {
    clearTimers();
    warnedRef.current = false;

    // Warning toast 2 min before logout
    warnTimerRef.current = setTimeout(() => {
      if (!warnedRef.current) {
        warnedRef.current = true;
        // Dispatch a custom event so the UI can show a toast
        window.dispatchEvent(new CustomEvent("session:warning"));
      }
    }, TIMEOUT_MS - WARNING_MS);

    // Actual logout
    timerRef.current = setTimeout(() => {
      onTimeout();
    }, TIMEOUT_MS);
  }, [clearTimers, onTimeout]);

  useEffect(() => {
    if (!isLoggedIn) {
      clearTimers();
      return;
    }

    resetTimer();

    const handleActivity = () => resetTimer();
    ACTIVITY_EVENTS.forEach((e) => window.addEventListener(e, handleActivity, { passive: true }));

    return () => {
      clearTimers();
      ACTIVITY_EVENTS.forEach((e) => window.removeEventListener(e, handleActivity));
    };
  }, [isLoggedIn, resetTimer, clearTimers]);
}
