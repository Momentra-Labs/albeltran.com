export const BOOT_STORAGE_KEY = "albeltran-boot";
export const BOOT_MAX_MS = 6500;

export type BootApi = {
  hydrate: () => void;
  skip: () => void;
};

declare global {
  interface Window {
    __alBoot?: BootApi;
  }
}
