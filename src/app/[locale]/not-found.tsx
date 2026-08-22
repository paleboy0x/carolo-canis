import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <div className="wrap py-24">
      <p className="font-text text-xs tracking-[0.2em] uppercase text-brass">
        404
      </p>
      <h1 className="mt-3 font-display text-5xl font-bold tracking-[-0.03em] text-bone">
        Stranica nije pronađena
      </h1>
      <Link
        href="/"
        className="mt-8 inline-block font-text text-mute hover:text-brass"
      >
        ← Povratak na početnu
      </Link>
    </div>
  );
}
