import { useEffect, useState } from "react";

const KEY = "retailos.sidebar.open";

export function useSidebarPersistence(defaultOpen = true) {
  const [open, setOpen] = useState<boolean>(() => {
    if (typeof window === "undefined") return defaultOpen;
    const raw = window.localStorage.getItem(KEY);
    return raw === null ? defaultOpen : raw === "1";
  });
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(KEY, open ? "1" : "0");
  }, [open]);
  return [open, setOpen] as const;
}