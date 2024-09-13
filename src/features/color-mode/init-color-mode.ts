import { LocalStorageKey } from "@/features/local-storage/local-storage-key";

export const colorModeAttribute = "data-color-mode";

export const initColorModeScript = `
(function () {
  const colorMode = localStorage.getItem("${LocalStorageKey.ColorMode}");
  if (colorMode && ["light", "dark"].includes(colorMode)) {
    document.documentElement.setAttribute("${colorModeAttribute}", colorMode);
  } else {
    document.documentElement.setAttribute(
      "${colorModeAttribute}",
      window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
    );
    localStorage.setItem("${LocalStorageKey.ColorMode}", "system");
  }
})();
`;
