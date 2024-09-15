import { SiWikipedia } from "@icons-pack/react-simple-icons";

interface RelatedLinkInfo {
  icon?: React.ReactNode;
  label: string;
  href: string;
}

const LINKS: RelatedLinkInfo[] = [
  {
    icon: <SiWikipedia size={16} />,
    label: "Unix time",
    href: "https://en.wikipedia.org/wiki/Unix_time",
  },
  {
    icon: <SiWikipedia size={16} />,
    label: "Timezone database",
    href: "https://en.wikipedia.org/wiki/List_of_tz_database_time_zones",
  },
];

export function References() {
  return (
    <div>
      <h2 className="mb-1 font-medium">References</h2>
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
              <span>{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
