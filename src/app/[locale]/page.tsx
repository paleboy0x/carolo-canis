import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LocationRoute } from "@/components/LocationRoute";
import { ServiceIcon, type ServiceIconType } from "@/components/marks/ServiceIcon";
import { StepIcon, type StepIconType } from "@/components/marks/StepIcon";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

const serviceKeys = [
  "training",
  "puppy",
  "obedience",
  "social",
  "exam",
  "show",
  "behavior",
  "legal",
  "education",
  "club",
  "gov",
] as const satisfies readonly ServiceIconType[];

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const hero = await getTranslations("hero");
  const about = await getTranslations("about");
  const services = await getTranslations("services");
  const method = await getTranslations("method");
  const locationsT = await getTranslations("locations");
  const gallery = await getTranslations("gallery");
  const contact = await getTranslations("contact");

  const stepKeys = ["individual", "session", "exam"] as const;
  const stepIcon: Record<(typeof stepKeys)[number], StepIconType> = {
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
            <div className="hero-shadow-glow">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/shepherd-hero.png"
                alt=""
                width={900}
                height={430}
                decoding="async"
              />
            </div>
            <div className="hero-shadow-art">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/shepherd-hero.png"
                alt=""
                width={900}
                height={430}
                decoding="async"
              />
            </div>
          </div>
          <div className="relative z-10 max-w-[min(42rem,52%)] max-lg:max-w-[42rem]">
            <h1 className="enter hero-brand text-[clamp(3rem,7vw,6rem)] leading-[0.95] tracking-[-0.02em] text-bone whitespace-nowrap">
              Carolo <span className="text-brass">Canis</span>
            </h1>

            <div
              className="enter mt-6 h-[3px] w-14 bg-brass"
              style={{ animationDelay: "80ms" }}
              aria-hidden
            />

            <p
              className="enter mt-6 text-[1.04rem] leading-[1.7] text-mute"
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

      {/* ============ SERVICES ============ */}
      <section id="services" className="band border-t border-line">
        <div className="wrap">
          <h2 className="section-title reveal">{services("title")}</h2>

          <ul className="service-list stagger">
            {serviceKeys.map((key) => (
              <li key={key} className="service-item reveal">
                <span className="service-icon" aria-hidden>
                  <ServiceIcon type={key} />
                </span>
                <p className="service-item-title">{services(`items.${key}`)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ METHOD ============ */}
      <section id="method" className="band border-t border-line">
        <div className="wrap">
          <h2 className="section-title reveal">{method("title")}</h2>

          <ol className="stagger mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

          {/* payment — highlighted, centered band */}
          <div className="payment-band card reveal mt-8">
            <span className="card-tick card-tick-tl" aria-hidden />
            <span className="card-tick card-tick-tr" aria-hidden />
            <span className="card-tick card-tick-bl" aria-hidden />
            <span className="card-tick card-tick-br" aria-hidden />

            <div className="payment-band-inner">
              <h4 className="payment-title">{method("steps.payment.title")}</h4>
              <p className="payment-body">{method("steps.payment.body")}</p>
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

          <Link href="/galerija" className="gallery-teaser card reveal mt-8 no-underline">
            <span className="card-tick card-tick-tl" aria-hidden />
            <span className="card-tick card-tick-tr" aria-hidden />
            <span className="card-tick card-tick-bl" aria-hidden />
            <span className="card-tick card-tick-br" aria-hidden />

            <div className="gallery-teaser-media">
              <Image
                src="/gallery/teaser-collage.jpg"
                alt=""
                fill
                sizes="(min-width: 1100px) 70rem, 92vw"
                className="object-cover"
                priority={false}
              />
              <div className="gallery-teaser-veil" aria-hidden />
            </div>

            <div className="gallery-teaser-copy">
              <p className="gallery-teaser-hint">{gallery("ctaHint")}</p>
              <p className="gallery-teaser-cta">
                {gallery("cta")}
                <span aria-hidden> →</span>
              </p>
              <p className="gallery-teaser-lede">{gallery("teaser")}</p>
            </div>
          </Link>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section id="contact" className="band border-t border-line">
        <div className="wrap">
          <h2 className="section-title reveal">{contact("title")}</h2>

          <div className="contact-layout mt-10">
            <div className="card reveal contact-owner">
              <p className="relative font-text text-xs tracking-[0.2em] uppercase text-brass">
                {about("ownerLabel")}
              </p>
              <h3 className="relative mt-3 font-display text-3xl font-bold leading-tight tracking-[-0.02em] text-bone">
                {about("ownerName")}
              </h3>

              <ul className="credential-list contact-credentials relative">
                {credentials.map((item) => (
                  <li key={item} className="credential">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="contact-details reveal">
              <div>
                <p className="font-text text-xs tracking-[0.2em] uppercase text-brass">
                  {contact("phoneLabel")}
                </p>
                <a href={contact("phoneHref")} className="poster-phone mt-2">
                  {contact("phone")}
                </a>
              </div>

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

              <Link
                href="/galerija#vlasnik"
                className="gallery-teaser gallery-teaser-mini card no-underline"
              >
                <div className="gallery-teaser-media">
                  <Image
                    src="/gallery/owner-collage.jpg"
                    alt=""
                    fill
                    sizes="(min-width: 900px) 40vw, 92vw"
                    className="object-cover"
                  />
                  <div className="gallery-teaser-veil" aria-hidden />
                </div>
                <div className="gallery-teaser-copy">
                  <p className="gallery-teaser-cta">
                    {gallery("ownerCta")}
                    <span aria-hidden> →</span>
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
