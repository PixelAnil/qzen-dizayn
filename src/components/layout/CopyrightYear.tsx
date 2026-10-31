"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// The year is read only in the browser, so a prerendered page never shows a stale value.
export function CopyrightYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => null,
  );
  return <span>{year}</span>;
}
