import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs({ items }: { items: { name: string; path?: string }[] }) {
  const all = [{ name: "Ana Sayfa", path: "/" }, ...items];

  return (
    <nav aria-label="Sayfa yolu" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
        {all.map((item, index) => (
          <li key={item.name} className="flex items-center gap-1.5">
            {index > 0 ? <ChevronRight size={14} aria-hidden /> : null}
            {item.path && index < all.length - 1 ? (
              <Link href={item.path} className="font-semibold hover:text-accent">
                {item.name}
              </Link>
            ) : (
              <span aria-current="page" className="font-semibold text-ink">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
