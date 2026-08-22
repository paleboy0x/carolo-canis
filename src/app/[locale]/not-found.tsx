import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[88rem] px-5 py-20 sm:px-8">
      <h1 className="font-display text-5xl italic text-bone">Carolo Canis</h1>
      <Link href="/" className="mt-6 inline-block text-mute">
        ←
      </Link>
    </div>
  );
}
