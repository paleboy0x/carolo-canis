import { getTranslations, setRequestLocale } from "next-intl/server";
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

  const serviceKeys = ["training", "shop", "advice"] as const;
  const methodKeys = ["individual", "open", "exam", "pay"] as const;
  const credentials = about.raw("credentials") as string[];

  return (
    <>
      <section className="relative overflow-hidden border-b border-rule/80">
        <div className="pointer-events-none absolute inset-y-0 left-[max(0px,calc(50%-36rem))] hidden w-px bg-rule/80 lg:block" />
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-8">
            <p className="rise text-[12px] tracking-[0.22em] uppercase text-rust">
              {hero("eyebrow")}
            </p>
            <h1 className="rise font-display mt-6 max-w-3xl text-[3.15rem] leading-[0.95] text-ink sm:text-7xl lg:text-[5.4rem]">
              {hero("titleLead")}
              <br />
              <em className="font-display font-light italic text-indigo">
                {hero("titleEm")}
              </em>
            </h1>
            <p
              className="rise mt-8 max-w-xl text-lg leading-relaxed text-ink-soft"
              style={{ animationDelay: "120ms" }}
            >
              {hero("lede")}
            </p>
            <a
              href="#contact"
              className="rise mt-10 inline-flex items-center gap-3 text-[12px] tracking-[0.2em] uppercase text-ink"
              style={{ animationDelay: "220ms" }}
            >
              <span className="h-px w-10 bg-rust" />
              {hero("cta")}
            </a>
          </div>

          <aside
            className="rise lg:col-span-4 lg:self-end"
            style={{ animationDelay: "180ms" }}
          >
            <div className="border border-rule bg-paper-deep/40 px-6 py-8">
              <p className="font-display text-6xl leading-none text-rust">
                {hero("statValue")}
              </p>
              <p className="mt-3 max-w-[12rem] text-sm leading-snug text-ink-soft">
                {hero("statLabel")}
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section id="services" className="scroll-mt-24 border-b border-rule/80">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-24">
          <SectionHead eyebrow={services("eyebrow")} title={services("title")} />
          <div className="mt-14 grid gap-px bg-rule/80 sm:grid-cols-3">
            {serviceKeys.map((key, index) => (
              <article
                key={key}
                className="bg-paper px-6 py-10 transition-colors hover:bg-paper-deep/50"
              >
                <p className="font-display text-3xl text-rust/80">
                  0{index + 1}
                </p>
                <h3 className="font-display mt-6 text-2xl text-ink">
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

      <section id="about" className="scroll-mt-24 border-b border-rule/80">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-7">
            <SectionHead eyebrow={about("eyebrow")} title={about("title")} />
            <div className="mt-10 space-y-5 text-[16px] leading-[1.75] text-ink-soft">
              <p>{about("p1")}</p>
              <p>{about("p2")}</p>
              <p>{about("p3")}</p>
            </div>
          </div>

          <aside className="lg:col-span-5 lg:pt-16">
            <div className="border border-rule bg-paper-deep/30 p-7">
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
            {locations.map((location) => {
              const coming = location.status === "coming";
              return (
                <article
                  key={location.id}
                  className={`min-h-[14rem] border px-6 py-7 ${
                    coming
                      ? "border-dashed border-rule bg-transparent"
                      : "border-rule bg-paper-deep/35"
                  }`}
                >
                  <p className="text-[11px] tracking-[0.18em] uppercase text-rust">
                    {coming
                      ? locationsT("coming")
                      : location.noteKey
                        ? locationsT(location.noteKey)
                        : null}
                  </p>
                  <h3 className="font-display mt-4 text-3xl text-ink">
                    {location.city || locationsT("tba")}
                  </h3>
                  {location.address ? (
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                      {location.address}
                    </p>
                  ) : (
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                      {locationsT("tbaHint")}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-5">
            <SectionHead
              eyebrow={contact("eyebrow")}
              title={contact("title")}
              intro={contact("intro")}
            />
          </div>
          <div className="space-y-8 lg:col-span-7 lg:pt-2">
            <ContactRow label={contact("phoneLabel")}>
              <a
                href={contact("phoneHref")}
                className="font-display text-3xl text-ink transition-colors hover:text-rust sm:text-4xl"
              >
                {contact("phone")}
              </a>
            </ContactRow>
            <ContactRow label={contact("emailLabel")}>
              <a
                href={`mailto:${contact("email")}`}
                className="text-lg text-ink underline decoration-rule underline-offset-4 transition-colors hover:decoration-rust"
              >
                {contact("email")}
              </a>
            </ContactRow>
            <ContactRow label={contact("addressLabel")}>
              <p className="text-lg leading-snug text-ink">
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
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-rule/80 pt-5">
      <p className="text-[11px] tracking-[0.2em] uppercase text-ink-soft">
        {label}
      </p>
      <div className="mt-2">{children}</div>
    </div>
  );
}
