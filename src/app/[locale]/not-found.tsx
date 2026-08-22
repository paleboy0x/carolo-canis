import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-start px-5 py-28 sm:px-8">
      <p className="text-[12px] tracking-[0.22em] uppercase text-rust">404</p>
      <h1 className="font-display mt-4 text-5xl text-ink">Carolo Canis</h1>
      <Link
        href="/"
        className="mt-8 text-[12px] tracking-[0.2em] uppercase text-ink"
      >
        ←
      </Link>
    </div>
  );
}
