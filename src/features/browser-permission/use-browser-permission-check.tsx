import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useCallback } from "react";
import {
  type RequiredBrowserPermission,
  useBrowserPermissions,
} from "./use-browser-permission";
import { useTranslations } from "next-intl";

const redirectToPermissionAuthorizationHelpPage = () => {
  window.open("https://support.google.com/chrome/answer/114662");
};

export const useBrowserPermissionCheck = () => {
  const permissions = useBrowserPermissions();
  const { toast } = useToast();
  const t = useTranslations("Permission");

  const verify = useCallback(
    (permissionName: RequiredBrowserPermission) => {
      if (permissions[permissionName] === "denied") {
        toast({
          title: t("permission-denied"),
          description: t("permission-denied-description", {
            name: t(permissionName),
          }),
          action: (
            <ToastAction
              altText={t("how-to-authorize")}
              onClick={redirectToPermissionAuthorizationHelpPage}
            >
              {t("how-to-authorize")}
            </ToastAction>
          ),
        });
        return false;
      }
      return true;
    },
    [permissions, t, toast],
  );

  return {
    verify,
  };
};
