"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";

type RecruiterContextValue = {
  recruiter: boolean;
  setRecruiter: (value: boolean) => void;
  toggleRecruiter: () => void;
};

const RecruiterContext = createContext<RecruiterContextValue | null>(null);
const RECRUITER_EVENT = "albeltran-recruiter";

function readRecruiter() {
  const fromQuery =
    new URLSearchParams(window.location.search).get("view") === "recruiter";
  const fromStore = window.localStorage.getItem("albeltran-recruiter") === "1";
  return fromQuery || fromStore;
}

function subscribeRecruiter(onChange: () => void) {
  window.addEventListener(RECRUITER_EVENT, onChange);
  window.addEventListener("storage", onChange);
  window.addEventListener("popstate", onChange);
  return () => {
    window.removeEventListener(RECRUITER_EVENT, onChange);
    window.removeEventListener("storage", onChange);
    window.removeEventListener("popstate", onChange);
  };
}

export function RecruiterProvider({ children }: { children: React.ReactNode }) {
  const recruiter = useSyncExternalStore(
    subscribeRecruiter,
    readRecruiter,
    () => false,
  );

  const setRecruiter = useCallback((value: boolean) => {
    window.localStorage.setItem("albeltran-recruiter", value ? "1" : "0");
    const url = new URL(window.location.href);
    if (value) url.searchParams.set("view", "recruiter");
    else url.searchParams.delete("view");
    window.history.replaceState({}, "", url.toString());
    document.documentElement.classList.toggle("recruiter", value);
    window.dispatchEvent(new Event(RECRUITER_EVENT));
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("recruiter", recruiter);
  }, [recruiter]);

  const value = useMemo(
    () => ({
      recruiter,
      setRecruiter,
      toggleRecruiter: () => setRecruiter(!recruiter),
    }),
    [recruiter, setRecruiter],
  );

  return (
    <RecruiterContext.Provider value={value}>{children}</RecruiterContext.Provider>
  );
}

export function useRecruiter() {
  const ctx = useContext(RecruiterContext);
  if (!ctx) {
    return {
      recruiter: false,
      setRecruiter: () => undefined,
      toggleRecruiter: () => undefined,
    };
  }
  return ctx;
}
