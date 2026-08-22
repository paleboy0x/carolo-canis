import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <h1 className="font-display text-4xl text-ivory">Carolo Canis</h1>
      <Link href="/" className="mt-6 inline-block text-ink-soft">
        ←
      </Link>
    </div>
  );
}
