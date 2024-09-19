import { atomEffect } from "jotai-effect";
import { atom, useAtomValue } from "jotai";
import { atomFamily } from "jotai/utils";

const REQUIRED_BROWSER_PERMISSIONS = ["clipboard-read"] as const;

export type RequiredBrowserPermission =
  (typeof REQUIRED_BROWSER_PERMISSIONS)[number];
type ExpandedPermissionState = PermissionState | "unknown" | "unsupported";

const browserPermissionAtomFamily = atomFamily((permission: string) => {
  const permissionAtom = atom<ExpandedPermissionState>("unknown");

  const effect = atomEffect((_, set) => {
    let permissionStatus: PermissionStatus | undefined;
    const listener = () => {
      if (permissionStatus) {
        set(permissionAtom, permissionStatus.state);
      }
    };

    navigator.permissions
      .query({ name: permission as PermissionName })
      .then((value) => {
        set(permissionAtom, value.state);
        permissionStatus = value;
        permissionStatus.addEventListener("change", listener);
      })
      .catch(() => {
        set(permissionAtom, "unsupported");
      });

    return () => {
      if (permissionStatus) {
        permissionStatus.removeEventListener("change", listener);
      }
    };
  });

  return atom((get) => {
    get(effect);
    return get(permissionAtom);
  });
});

const requiredBrowserPermissionsAtom = atom((get) =>
  Object.fromEntries(
    REQUIRED_BROWSER_PERMISSIONS.map((permission) => [
      permission,
      get(browserPermissionAtomFamily(permission)),
    ]),
  ),
);

export const useBrowserPermissions = () => {
  return useAtomValue(requiredBrowserPermissionsAtom);
};

export const useBrowserPermission = (permission: RequiredBrowserPermission) => {
  const permissions = useBrowserPermissions();
  return permissions[permission];
};
