import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LocationRoute } from "@/components/LocationRoute";

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
  const methodKeys = ["p1", "p2", "p3"] as const;
  const credentials = about.raw("credentials") as string[];

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="band relative overflow-hidden">
        <div className="hero-shadow" aria-hidden>
          <Image
            src="/shepherd-hero.png"
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 62rem, 120vw"
            className="object-contain object-left"
          />
        </div>

        <div className="wrap relative">
          <div className="max-w-[46rem]">
            <h1 className="enter font-display text-[clamp(3.4rem,8vw,5.6rem)] font-extrabold leading-[0.9] tracking-[-0.03em] text-bone">
              Carolo
              <br />
              <span className="text-brass">Canis</span>
            </h1>

            <p
              className="enter lede mt-8 text-[1.06rem] leading-[1.75] text-mute"
              style={{ animationDelay: "120ms" }}
            >
              {hero("lede")}
            </p>

            <div className="enter mt-10" style={{ animationDelay: "220ms" }}>
              <a href="#contact" className="btn">
                {hero("cta")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ ABOUT (services merged in) ============ */}
      <section id="about" className="band border-t border-line">
        <div className="wrap">
          <h2 className="section-title reveal">{about("title")}</h2>

          <div className="copy reveal mt-10 max-w-[62rem] space-y-5 text-[1.04rem] leading-[1.8] text-mute">
            <p>{about("p1")}</p>
            <p>{about("p2")}</p>
          </div>

          <ul
            id="services"
            className="mt-14 grid scroll-mt-24 gap-x-10 gap-y-8 sm:grid-cols-3"
          >
            {serviceKeys.map((key, i) => (
              <li key={key} className="reveal border-t border-line pt-4">
                <span className="block font-display text-3xl font-extrabold leading-none tracking-[-0.03em] text-brass">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="mt-3 font-display text-lg font-semibold leading-snug text-bone">
                  {services(`items.${key}.title`)}
                </h4>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ METHOD ============ */}
      <section id="method" className="band border-t border-line">
        <div className="wrap">
          <h2 className="section-title reveal">{method("title")}</h2>

          <ol className="steps">
            {methodKeys.map((key, i) => (
              <li key={key} className="card reveal">
                <span className="card-tick card-tick-tl" aria-hidden />
                <span className="card-tick card-tick-br" aria-hidden />
                <span className="step-num">{String(i + 1).padStart(2, "0")}</span>
                <p className="copy mt-5 text-[0.98rem] leading-[1.8] text-mute">
                  {method(key)}
                </p>
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

          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* left: poster phone + owner details grouped together */}
            <div className="lg:col-span-7 space-y-12">
              <div>
                <a href={contact("phoneHref")} className="poster-phone reveal">
                  {contact("phone")}
                </a>
                <p className="reveal mt-5 font-text text-xs tracking-[0.2em] uppercase text-mute">
                  {contact("phoneLabel")}
                </p>
              </div>

              <div className="reveal grid gap-10 sm:grid-cols-2">
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

            {/* right: owner card */}
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
