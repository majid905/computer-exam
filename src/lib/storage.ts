"use client";

import { useEffect, useState, useCallback } from "react";
import type { UserState } from "./types";

const STORAGE_KEY = "pc:state:v1";

const initialState: UserState = {
  onboarding: {
    language: "en",
    province: null,
    testDate: null,
    baselineScore: null,
    baselineCompletedAt: null,
    completed: false,
  },
  theme: "system",
  chapters: {},
  flagged: [],
  attempts: [],
  streak: {
    current: 0,
    longest: 0,
    lastStudyDate: null,
  },
  createdAt: new Date().toISOString(),
};

function safeParse(raw: string | null): UserState | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as UserState;
    return { ...initialState, ...parsed };
  } catch {
    return null;
  }
}

function loadFromStorage(): UserState {
  if (typeof window === "undefined") return initialState;
  return safeParse(localStorage.getItem(STORAGE_KEY)) ?? initialState;
}

function writeToStorage(state: UserState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new CustomEvent("pc:state:updated"));
}

export function resetState() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent("pc:state:updated"));
}

export function useUserState(): [
  UserState,
  (updater: (s: UserState) => UserState) => void,
  boolean,
] {
  const [state, setState] = useState<UserState>(initialState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(loadFromStorage());
    setHydrated(true);
    const onUpdate = () => setState(loadFromStorage());
    window.addEventListener("pc:state:updated", onUpdate);
    window.addEventListener("storage", onUpdate);
    return () => {
      window.removeEventListener("pc:state:updated", onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, []);

  const update = useCallback((updater: (s: UserState) => UserState) => {
    setState((prev) => {
      const next = updater(prev);
      writeToStorage(next);
      return next;
    });
  }, []);

  return [hydrated ? state : initialState, update, hydrated];
}

export function todayKey(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function applyDailyStudy(state: UserState): UserState {
  const today = todayKey();
  const last = state.streak.lastStudyDate;
  if (last === today) return state;

  let current = state.streak.current;
  if (!last) {
    current = 1;
  } else {
    const lastDate = new Date(last);
    const diffMs = new Date(today).getTime() - lastDate.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    current = diffDays === 1 ? current + 1 : 1;
  }
  return {
    ...state,
    streak: {
      current,
      longest: Math.max(state.streak.longest, current),
      lastStudyDate: today,
    },
  };
}

export const STORAGE_KEY_FOR_DEBUG = STORAGE_KEY;
