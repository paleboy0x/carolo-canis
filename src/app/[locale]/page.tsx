import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LocationRoute } from "@/components/LocationRoute";
import { StepIcon, type StepIconType } from "@/components/marks/StepIcon";

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
  const gallery = await getTranslations("gallery");
  const contact = await getTranslations("contact");

  const serviceKeys = ["training", "shop", "advice"] as const;
  const stepKeys = ["consult", "individual", "session", "exam"] as const;
  const stepIcon: Record<(typeof stepKeys)[number], StepIconType> = {
    consult: "chat",
    individual: "focus",
    session: "clock",
    exam: "award",
  };
  const credentials = about.raw("credentials") as string[];
  const heroStats = hero.raw("stats") as string[];

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="band relative overflow-hidden py-20 lg:py-28">
        <div className="wrap relative">
          <div className="hero-shadow" aria-hidden>
            <Image
              src="/shepherd-hero.png"
              alt=""
              fill
              priority
              sizes="(min-width: 1280px) 70rem, 92vw"
              className="object-contain"
            />
          </div>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
            {/* LEFT — brand + intro + CTA + stats */}
            <div className="lg:col-span-7">
              <h1 className="enter font-display text-[clamp(3rem,7vw,6rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-bone whitespace-nowrap">
                Carolo <span className="text-brass">Canis</span>
              </h1>

              <div
                className="enter mt-6 h-[3px] w-14 bg-brass"
                style={{ animationDelay: "80ms" }}
                aria-hidden
              />

              <p
                className="enter mt-6 max-w-[38rem] text-[1.04rem] leading-[1.7] text-mute"
                style={{ animationDelay: "160ms" }}
              >
                {hero("lede")}
              </p>

              <div className="enter mt-8" style={{ animationDelay: "260ms" }}>
                <a href="#contact" className="btn">
                  {hero("cta")}
                </a>
              </div>

              <ul
                className="enter mt-10 flex flex-wrap gap-x-7 gap-y-3"
                style={{ animationDelay: "360ms" }}
              >
                {heroStats.map((stat) => (
                  <li key={stat} className="stat-item">
                    {stat}
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT — three service cards */}
            <div className="space-y-3 lg:col-span-5">
              {serviceKeys.map((key, i) => (
                <article
                  key={key}
                  className="hero-card enter"
                  style={{ animationDelay: `${240 + i * 100}ms` }}
                >
                  <span className="hero-card-num" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="hero-card-title">
                    {services(`items.${key}.title`)}
                  </h4>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <section id="about" className="band border-t border-line">
        <div className="wrap">
          <h2 className="section-title reveal">{about("title")}</h2>

          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-8">
              <p className="about-lead reveal">{about("lead")}</p>

              <div className="copy reveal mt-6 space-y-4 text-[1.04rem] leading-[1.75] text-mute">
                <p>{about("p1")}</p>
                <p>{about("p2")}</p>
              </div>
            </div>

            <aside className="reveal order-first lg:order-none lg:col-span-4 lg:self-center">
              <div className="stat-block">
                <span className="stat-value">{about("statValue")}</span>
                <span className="stat-label">{about("statLabel")}</span>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ============ METHOD ============ */}
      <section id="method" className="band border-t border-line">
        <div className="wrap">
          <h2 className="section-title reveal">{method("title")}</h2>

          <ol className="stagger mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stepKeys.map((key, i) => (
              <li key={key} className="card reveal">
                <span className="card-tick card-tick-tl" aria-hidden />
                <span className="card-tick card-tick-tr" aria-hidden />
                <span className="card-tick card-tick-bl" aria-hidden />
                <span className="card-tick card-tick-br" aria-hidden />

                <div className="relative">
                  <span className="step-icon-wrap" aria-hidden>
                    <StepIcon type={stepIcon[key]} />
                  </span>
                  <span className="step-index">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="step-title">
                    {method(`steps.${key}.title`)}
                  </h4>
                  <p className="step-body">{method(`steps.${key}.body`)}</p>
                </div>
              </li>
            ))}
          </ol>

          {/* payment — special, full-width */}
          <div className="card reveal mt-6">
            <span className="card-tick card-tick-tl" aria-hidden />
            <span className="card-tick card-tick-br" aria-hidden />

            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7">
              <span className="step-icon-wrap shrink-0" aria-hidden>
                <StepIcon type="scale" />
              </span>
              <div>
                <h4 className="step-title">{method("steps.payment.title")}</h4>
                <p className="step-body">{method("steps.payment.body")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ LOCATIONS ============ */}
      <section id="locations" className="band border-t border-line">
        <div className="wrap">
          <h2 className="section-title reveal">{locationsT("title")}</h2>
          <LocationRoute />
        </div>
      </section>

      {/* ============ GALLERY TEASER ============ */}
      <section id="gallery" className="band border-t border-line">
        <div className="wrap">
          <h2 className="section-title reveal">{gallery("title")}</h2>
          <p className="reveal mt-6 max-w-[40rem] text-[1.04rem] leading-[1.7] text-mute">
            {gallery("teaser")}{" "}
            <Link href="/galerija" className="text-brass underline decoration-line underline-offset-4 hover:decoration-brass">
              {gallery("cta")}
            </Link>
          </p>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section id="contact" className="band border-t border-line">
        <div className="wrap">
          <h2 className="section-title reveal">{contact("title")}</h2>

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="space-y-10 lg:col-span-7">
              <div>
                <a href={contact("phoneHref")} className="poster-phone reveal">
                  {contact("phone")}
                </a>
                <p className="reveal mt-5 font-text text-xs tracking-[0.2em] uppercase text-mute">
                  {contact("phoneLabel")}
                </p>
              </div>

              <div className="reveal grid gap-8 sm:grid-cols-2">
                <div>
                  <p className="font-text text-xs tracking-[0.2em] uppercase text-brass">
                    {contact("emailLabel")}
                  </p>
                  <a
                    href={`mailto:${contact("email")}`}
                    className="mt-2 block font-display text-lg font-medium text-bone underline decoration-line underline-offset-4 hover:decoration-brass"
                  >
                    {contact("email")}
                  </a>
                </div>

                <div>
                  <p className="font-text text-xs tracking-[0.2em] uppercase text-brass">
                    {contact("addressLabel")}
                  </p>
                  <p className="mt-2 font-display text-lg font-medium leading-snug text-bone">
                    {contact("address")}
                    <br />
                    {contact("city")}
                  </p>
                </div>
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div className="card reveal">
                <p className="relative font-text text-xs tracking-[0.2em] uppercase text-brass">
                  {about("ownerLabel")}
                </p>
                <h3 className="relative mt-3 font-display text-3xl font-bold leading-tight tracking-[-0.02em] text-bone">
                  {about("ownerName")}
                </h3>

                <ul className="relative mt-6 flex flex-wrap gap-2">
                  {credentials.map((item) => (
                    <li key={item} className="credential">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
