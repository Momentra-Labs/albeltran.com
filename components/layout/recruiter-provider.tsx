"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type RecruiterContextValue = {
  recruiter: boolean;
  setRecruiter: (value: boolean) => void;
  toggleRecruiter: () => void;
};

const RecruiterContext = createContext<RecruiterContextValue | null>(null);

export function RecruiterProvider({ children }: { children: React.ReactNode }) {
  const [recruiter, setRecruiterState] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get("view") === "recruiter";
    const fromStore = window.localStorage.getItem("albeltran-recruiter") === "1";
    setRecruiterState(fromQuery || fromStore);
  }, []);

  const setRecruiter = useCallback((value: boolean) => {
    setRecruiterState(value);
    window.localStorage.setItem("albeltran-recruiter", value ? "1" : "0");
    const url = new URL(window.location.href);
    if (value) url.searchParams.set("view", "recruiter");
    else url.searchParams.delete("view");
    window.history.replaceState({}, "", url.toString());
    document.documentElement.classList.toggle("recruiter", value);
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
