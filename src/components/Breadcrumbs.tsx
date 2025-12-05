import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href: string;
};

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-sm text-gray-500 mb-6">
      <ol className="flex items-center gap-2">
        <li>
          <Link href="/" className="hover:text-primary-600 transition">خانه</Link>
        </li>
        
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-2">
            <span className="text-gray-300">/</span>
            {index === items.length - 1 ? (
              <span className="font-bold text-surface-900" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="hover:text-primary-600 transition">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}