import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
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
  const contact = await getTranslations("contact");

  const serviceKeys = ["training", "shop", "advice"] as const;
  const stepKeys = [
    "consult",
    "individual",
    "session",
    "exam",
    "payment",
  ] as const;
  const stepIcon: Record<(typeof stepKeys)[number], StepIconType> = {
    consult: "chat",
    individual: "focus",
    session: "clock",
    exam: "award",
    payment: "scale",
  };
  const credentials = about.raw("credentials") as string[];

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="band relative overflow-hidden py-20 lg:py-28">
        <div className="hero-shadow" aria-hidden>
          <Image
            src="/shepherd-hero.png"
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 68rem, 130vw"
            className="object-contain"
          />
        </div>

        <div className="wrap relative">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
            {/* LEFT — brand + intro + CTA */}
            <div className="lg:col-span-7">
              <h1 className="enter font-display text-[clamp(2.8rem,6.5vw,4.8rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-bone whitespace-nowrap">
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
            </div>

            {/* RIGHT — three service cards */}
            <div
              className="enter space-y-3 lg:col-span-5"
              style={{ animationDelay: "220ms" }}
            >
              {serviceKeys.map((key, i) => (
                <article key={key} className="hero-card">
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

          <div className="copy reveal mt-8 max-w-[62rem] space-y-4 text-[1.04rem] leading-[1.75] text-mute">
            <p>{about("p1")}</p>
            <p>{about("p2")}</p>
          </div>
        </div>
      </section>

      {/* ============ METHOD ============ */}
      <section id="method" className="band border-t border-line">
        <div className="wrap">
          <h2 className="section-title reveal">{method("title")}</h2>

          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {stepKeys.map((key, i) => (
              <li key={key} className="step reveal">
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
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ LOCATIONS ============ */}
      <section id="locations" className="band border-t border-line">
        <div className="wrap">
          <h2 className="section-title reveal">{locationsT("title")}</h2>
          <LocationRoute />
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
