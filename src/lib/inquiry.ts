import { useSyncExternalStore } from "react";

/**
 * Inquiry list ("quote basket"): styles a buyer wants pricing for.
 * Kept in localStorage per browser; every access is guarded because storage
 * can be unavailable (private mode, blocked cookies, prerender).
 */

export interface InquiryItem {
  slug: string;
  qty?: string;
}

const KEY = "ss-inquiry-v1";
const listeners = new Set<() => void>();
let items: InquiryItem[] = read();

function read(): InquiryItem[] {
  try {
    if (typeof window === "undefined") return [];
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((x) => x && typeof x.slug === "string") : [];
  } catch {
    return [];
  }
}

function write(next: InquiryItem[]) {
  items = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable — keep in memory only */
  }
  listeners.forEach((l) => l());
}

export const inquiry = {
  has: (slug: string) => items.some((i) => i.slug === slug),
  add: (slug: string) => {
    if (!items.some((i) => i.slug === slug)) write([...items, { slug }]);
  },
  remove: (slug: string) => write(items.filter((i) => i.slug !== slug)),
  toggle: (slug: string) => (inquiry.has(slug) ? inquiry.remove(slug) : inquiry.add(slug)),
  setQty: (slug: string, qty: string) => write(items.map((i) => (i.slug === slug ? { ...i, qty } : i))),
  clear: () => write([]),
};

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function useInquiry(): InquiryItem[] {
  return useSyncExternalStore(subscribe, () => items, () => [] as InquiryItem[]);
}

/* drawer open state (shared between header button, cards and drawer) */
let drawerOpen = false;
const drawerListeners = new Set<() => void>();
export const drawer = {
  open: () => {
    drawerOpen = true;
    drawerListeners.forEach((l) => l());
  },
  close: () => {
    drawerOpen = false;
    drawerListeners.forEach((l) => l());
  },
};
export function useDrawerOpen(): boolean {
  return useSyncExternalStore(
    (cb) => {
      drawerListeners.add(cb);
      return () => drawerListeners.delete(cb);
    },
    () => drawerOpen,
    () => false
  );
}

export const WHATSAPP_NUMBER = "8613726671114";
export const whatsappLink = (text: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
