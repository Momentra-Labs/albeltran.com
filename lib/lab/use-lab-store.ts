"use client";

import { useSyncExternalStore } from "react";
import {
  getLabStoreSnapshot,
  getServerLabStoreSnapshot,
  subscribeLabStore,
} from "./storage";

export function useLabStore() {
  return useSyncExternalStore(
    subscribeLabStore,
    getLabStoreSnapshot,
    getServerLabStoreSnapshot,
  );
}
