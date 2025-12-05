import Link from "next/link";

// Using simple emojis or you can use Lucide-react icons later for a cleaner look
const ICONS: Record<string, string> = {
  crypto: "💎",
  food: "🍕",
  shopping: "🛍️",
  taxi: "🚖",
  neobanks: "🏦",
  streaming: "🎬",
  "ai-tools": "🤖"
};

export default function CategoryBar({ categories }: { categories: any[] }) {
  return (
    <div className="w-full overflow-x-auto pb-2 no-scrollbar">
      <div className="flex justify-start md:justify-center gap-6 min-w-max px-4">
        {categories.map((cat) => (
          <Link 
            key={cat.id} 
            href={`/${cat.slug}`}
            className="flex flex-col items-center gap-2 group min-w-[70px]"
          >
            {/* Circle Icon Container - Familiar 'Story' style */}
            <div className="w-16 h-16 rounded-full bg-white border border-surface-200 flex items-center justify-center text-2xl group-hover:border-primary-500 group-hover:bg-primary-50 transition-colors duration-200 shadow-sm">
              {ICONS[cat.slug] || "📂"}
            </div>
            <span className="text-xs font-bold text-gray-600 group-hover:text-primary-600 transition">
              {cat.name_farsi}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}