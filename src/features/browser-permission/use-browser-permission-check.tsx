import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useCallback } from "react";
import {
  type RequiredBrowserPermission,
  useBrowserPermissions,
} from "./use-browser-permission";

const PERMISSION_NAME: Record<RequiredBrowserPermission, string> = {
  "clipboard-read": "clipboard",
};

const redirectToPermissionAuthorizationHelpPage = () => {
  window.open("https://support.google.com/chrome/answer/114662");
};

export const useBrowserPermissionCheck = () => {
  const permissions = useBrowserPermissions();
  const { toast } = useToast();

  const verify = useCallback(
    (permissionName: RequiredBrowserPermission) => {
      if (permissions[permissionName] === "denied") {
        toast({
          title: "Permission denied",
          description: `Please allow access to the ${PERMISSION_NAME[permissionName]}`,
          action: (
            <ToastAction
              altText="How to authorize"
              onClick={redirectToPermissionAuthorizationHelpPage}
            >
              How to authorize
            </ToastAction>
          ),
        });
        return false;
      }
      return true;
    },
    [permissions, toast],
  );

  return {
    verify,
  };
};
