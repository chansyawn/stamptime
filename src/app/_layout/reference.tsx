import { SiWikipedia } from "@icons-pack/react-simple-icons";
import { QuoteIcon } from "lucide-react";
import { useTranslations } from "next-intl";

interface RelatedLinkInfo {
  icon?: React.ReactNode;
  label: string;
  href: string;
}

const LINKS = [
  {
    icon: <SiWikipedia size={16} />,
    label: "unix-time",
    href: "https://wikipedia.org/wiki/Unix_time",
  },
  {
    icon: <SiWikipedia size={16} />,
    label: "timezone-database",
    href: "https://wikipedia.org/wiki/List_of_tz_database_time_zones",
  },
] as const satisfies RelatedLinkInfo[];

export function References() {
  const t = useTranslations("Reference");

  return (
    <div>
      <h2 className="mb-1 flex items-center gap-1 font-medium">
        <QuoteIcon className="size-4" />
        {t("reference")}
      </h2>
      <ul>
        {LINKS.map(({ label, href, icon }) => (
          <li key={label}>
            <a
              href={href}
              className="inline-flex items-center space-x-1 border-primary text-sm hover:border-b"
              target="_blank"
              rel="noopener"
            >
              {icon}
              <span>{t(label)}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
