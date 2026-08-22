import { getTranslations, setRequestLocale } from "next-intl/server";
import { FieldShepherd } from "@/components/FieldShepherd";
import {
  AdviceMark,
  ShopMark,
  TrainingMark,
} from "@/components/KennelMarks";
import { LocationPlate } from "@/components/LocationPlate";
import { locations } from "@/data/locations";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const hero = await getTranslations("hero");
  const services = await getTranslations("services");
  const about = await getTranslations("about");
  const method = await getTranslations("method");
  const locationsT = await getTranslations("locations");
  const contact = await getTranslations("contact");

  const serviceItems = [
    { key: "training" as const, Mark: TrainingMark },
    { key: "shop" as const, Mark: ShopMark },
    { key: "advice" as const, Mark: AdviceMark },
  ];
  const methodKeys = ["individual", "open", "exam", "pay"] as const;
  const credentials = about.raw("credentials") as string[];

  return (
    <>
      <section className="relative isolate overflow-hidden bg-dusk text-ivory">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_78%_42%,rgba(196,90,46,0.28),transparent_58%),radial-gradient(70%_50%_at_20%_80%,rgba(237,215,174,0.08),transparent_50%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-dusk to-transparent" />

        <div className="relative mx-auto grid min-h-[calc(100svh-4.25rem)] max-w-6xl items-end px-5 pb-14 pt-16 sm:px-8 lg:grid-cols-12 lg:pb-16">
          <div className="z-10 lg:col-span-6 lg:pb-10">
            <p className="rise text-[11px] tracking-[0.26em] uppercase text-rust">
              {hero("eyebrow")}
            </p>
            <h1 className="rise font-display mt-6 max-w-xl text-[3.4rem] leading-[0.92] sm:text-7xl">
              {hero("titleLead")}
              <br />
              <em className="font-display font-light italic text-straw">
                {hero("titleEm")}
              </em>
            </h1>
            <p
              className="rise mt-7 max-w-md text-lg leading-relaxed text-straw/80"
              style={{ animationDelay: "110ms" }}
            >
              {hero("lede")}
            </p>
            <a
              href="#contact"
              className="rise mt-10 inline-flex items-center gap-3 text-[12px] tracking-[0.22em] uppercase text-ivory"
              style={{ animationDelay: "200ms" }}
            >
              <span className="h-px w-10 bg-rust" />
              {hero("cta")}
            </a>
            <div
              className="rise mt-12 max-w-[13rem] border-t border-straw/20 pt-5"
              style={{ animationDelay: "260ms" }}
            >
              <p className="font-display text-5xl leading-none text-rust">
                {hero("statValue")}
              </p>
              <p className="mt-2 text-sm leading-snug text-straw/70">
                {hero("statLabel")}
              </p>
            </div>
          </div>

          <div className="pointer-events-none relative lg:col-span-6">
            <FieldShepherd className="field-drift mx-auto w-[min(46rem,118%)] text-straw drop-shadow-[0_30px_40px_rgba(0,0,0,0.35)] lg:absolute lg:-right-16 lg:bottom-[-2rem] lg:w-[52rem]" />
          </div>
        </div>

        <GrassLine />
      </section>

      <section id="services" className="scroll-mt-24 border-b border-rule/80">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-24">
          <SectionHead eyebrow={services("eyebrow")} title={services("title")} />
          <div className="mt-14 grid gap-px bg-rule/80 sm:grid-cols-3">
            {serviceItems.map(({ key, Mark }, index) => (
              <article
                key={key}
                className="bg-paper px-6 py-10 transition-colors hover:bg-paper-deep/55"
              >
                <Mark className="h-12 w-[4.4rem] text-rust" />
                <p className="font-display mt-6 text-3xl text-rust/70">
                  0{index + 1}
                </p>
                <h3 className="font-display mt-3 text-2xl text-ink">
                  {services(`items.${key}.title`)}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                  {services(`items.${key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="about"
        className="relative scroll-mt-24 overflow-hidden border-b border-rule/80"
      >
        <FieldShepherd className="pointer-events-none absolute -right-24 bottom-[-4rem] hidden w-[28rem] text-ink/[0.05] lg:block" />
        <div className="relative mx-auto grid max-w-6xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-7">
            <SectionHead eyebrow={about("eyebrow")} title={about("title")} />
            <div className="mt-10 space-y-5 text-[16px] leading-[1.75] text-ink-soft">
              <p>{about("p1")}</p>
              <p>{about("p2")}</p>
              <p>{about("p3")}</p>
            </div>
          </div>

          <aside className="lg:col-span-5 lg:pt-16">
            <div className="border border-rule bg-paper-deep/40 p-7">
              <p className="text-[11px] tracking-[0.2em] uppercase text-rust">
                {about("ownerLabel")}
              </p>
              <h3 className="font-display mt-3 text-3xl text-ink">
                {about("ownerName")}
              </h3>
              <ul className="mt-6 space-y-3 border-t border-rule/80 pt-6">
                {credentials.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-snug text-ink-soft"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-rust" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section id="method" className="scroll-mt-24 border-b border-rule/80">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-24">
          <SectionHead
            eyebrow={method("eyebrow")}
            title={method("title")}
            intro={method("intro")}
          />
          <div className="mt-14 grid gap-10 md:grid-cols-2">
            {methodKeys.map((key, index) => (
              <article key={key} className="border-t border-rule pt-6">
                <p className="text-[11px] tracking-[0.2em] uppercase text-indigo">
                  0{index + 1}
                </p>
                <h3 className="font-display mt-3 text-2xl text-ink">
                  {method(`points.${key}.title`)}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                  {method(`points.${key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="locations" className="scroll-mt-24 border-b border-rule/80">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-24">
          <SectionHead
            eyebrow={locationsT("eyebrow")}
            title={locationsT("title")}
            intro={locationsT("intro")}
          />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {locations.map((location) => (
              <LocationPlate key={location.id} location={location} />
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 bg-dusk text-ivory">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-5">
            <p className="text-[12px] tracking-[0.22em] uppercase text-rust">
              {contact("eyebrow")}
            </p>
            <h2 className="font-display mt-3 text-4xl leading-tight text-ivory sm:text-5xl">
              {contact("title")}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-straw/75">
              {contact("intro")}
            </p>
          </div>
          <div className="space-y-8 lg:col-span-7 lg:pt-2">
            <ContactRow label={contact("phoneLabel")} dark>
              <a
                href={contact("phoneHref")}
                className="font-display text-3xl text-ivory transition-colors hover:text-rust sm:text-4xl"
              >
                {contact("phone")}
              </a>
            </ContactRow>
            <ContactRow label={contact("emailLabel")} dark>
              <a
                href={`mailto:${contact("email")}`}
                className="text-lg text-straw underline decoration-straw/30 underline-offset-4 transition-colors hover:decoration-rust"
              >
                {contact("email")}
              </a>
            </ContactRow>
            <ContactRow label={contact("addressLabel")} dark>
              <p className="text-lg leading-snug text-ivory">
                {contact("address")}
                <br />
                {contact("city")}
              </p>
            </ContactRow>
          </div>
        </div>
      </section>
    </>
  );
}

function GrassLine() {
  return (
    <svg
      viewBox="0 0 1440 48"
      className="relative block w-full text-paper"
      aria-hidden
      preserveAspectRatio="none"
    >
      <path
        fill="currentColor"
        d="M0 48V22c48 10 72-12 120-6s84 18 132 6 90-16 140 2 96 14 148-8 110-4 160 10 100 16 148-4 90-18 140 6 96 12 140-6 72 8 112 14v12H0z"
      />
    </svg>
  );
}

function SectionHead({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-[12px] tracking-[0.22em] uppercase text-rust">
        {eyebrow}
      </p>
      <h2 className="font-display mt-3 text-4xl leading-tight text-ink sm:text-5xl">
        {title}
      </h2>
      {intro ? (
        <p className="mt-5 text-base leading-relaxed text-ink-soft">{intro}</p>
      ) : null}
    </div>
  );
}

function ContactRow({
  label,
  children,
  dark = false,
}: {
  label: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div
      className={`border-t pt-5 ${dark ? "border-straw/20" : "border-rule/80"}`}
    >
      <p
        className={`text-[11px] tracking-[0.2em] uppercase ${
          dark ? "text-straw/55" : "text-ink-soft"
        }`}
      >
        {label}
      </p>
      <div className="mt-2">{children}</div>
    </div>
  );
}
