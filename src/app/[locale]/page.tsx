import { getTranslations, setRequestLocale } from "next-intl/server";
import { LocationRoute } from "@/components/LocationRoute";
import { locations } from "@/data/locations";
import { PawMark } from "@/components/marks/PawMark";
import { Seal } from "@/components/marks/Seal";
import { ShepherdPlate } from "@/components/marks/ShepherdPlate";
import { RuleOrnament } from "@/components/marks/RuleOrnament";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

const roman = ["I", "II", "III", "IV", "V", "VI"] as const;

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const hero = await getTranslations("hero");
  const plates = await getTranslations("plates");
  const services = await getTranslations("services");
  const about = await getTranslations("about");
  const method = await getTranslations("method");
  const locationsT = await getTranslations("locations");
  const contact = await getTranslations("contact");

  const serviceKeys = ["training", "shop", "advice"] as const;
  const methodKeys = ["p1", "p2", "p3"] as const;
  const credentials = about.raw("credentials") as string[];
  const marquee = [
    ...serviceKeys.map((key) => services(`items.${key}.title`)),
    ...locations.map((location) => location.city),
  ];

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="band relative overflow-hidden">
        <div className="wrap">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <span className="enter eyebrow trail">
                {hero("eyebrow")}
              </span>

              <h1
                className="enter font-display mt-6 text-[clamp(3.6rem,9vw,6.4rem)] leading-[0.86] tracking-tight text-bone"
                style={{ animationDelay: "60ms" }}
              >
                Carolo
                <br />
                <em className="text-brass">Canis</em>
              </h1>

              <p
                className="enter lede mt-8 max-w-[38rem] text-[1.05rem] leading-[1.7] text-mute"
                style={{ animationDelay: "140ms" }}
              >
                {hero("lede")}
              </p>

              <div
                className="enter mt-9 flex items-center gap-6"
                style={{ animationDelay: "220ms" }}
              >
                <a href="#contact" className="btn">
                  {hero("cta")}
                </a>
                <a
                  href="#services"
                  className="nav-link font-text text-sm tracking-[0.16em] uppercase text-mute"
                >
                  {hero("secondaryCta")}
                </a>
              </div>
            </div>

            <div
              className="enter lg:col-span-5"
              style={{ animationDelay: "180ms" }}
            >
              <ShepherdPlate />
            </div>
          </div>

          <RuleOrnament className="mt-16" />
        </div>
      </section>

      {/* ============ MARQUEE ============ */}
      <div className="marquee" aria-hidden>
        <div className="marquee-track">
          {[...marquee, ...marquee].map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </div>

      {/* ============ SERVICES ============ */}
      <section id="services" className="band relative">
        <PawWatermark position="right" />

        <div className="wrap relative">
          <div className="flex items-end justify-between gap-6">
            <div>
              <span className="eyebrow reveal">{plates("services")}</span>
              <h2 className="section-title reveal mt-3">
                {services("title")}
              </h2>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {serviceKeys.map((key, i) => (
              <article key={key} className="card reveal">
                <span className="card-tick card-tick-tl" aria-hidden />
                <span className="card-tick card-tick-tr" aria-hidden />
                <span className="card-tick card-tick-bl" aria-hidden />
                <span className="card-tick card-tick-br" aria-hidden />

                <span className="card-num" aria-hidden>
                  {roman[i]}.
                </span>

                <PawMark className="h-6 w-6 text-brass/80" />

                <h3 className="relative mt-4 font-display text-2xl leading-tight text-bone">
                  {services(`items.${key}.title`)}
                </h3>
                <p className="copy relative mt-3 text-[0.98rem] leading-[1.7] text-mute">
                  {services(`items.${key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <section id="about" className="band relative">
        <div className="wrap">
          <RuleOrnament className="mb-12" />

          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <span className="eyebrow reveal">{plates("about")}</span>
              <h2 className="section-title reveal mt-3">
                {about("title")}
              </h2>
              <div className="copy reveal mt-7 space-y-5 text-[1.04rem] leading-[1.8] text-mute">
                <p>{about("p1")}</p>
                <p>{about("p2")}</p>
                <p>{about("p3")}</p>
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div className="card reveal relative">
                <Seal className="seal" />

                <p className="relative font-text text-sm tracking-[0.12em] uppercase text-brass">
                  {about("ownerLabel")}
                </p>
                <h3 className="relative mt-3 font-display text-4xl italic leading-tight text-bone">
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

      {/* ============ METHOD ============ */}
      <section id="method" className="band relative border-y border-line">
        <PawWatermark position="left" />

        <div className="wrap relative">
          <span className="eyebrow reveal">{plates("method")}</span>
          <h2 className="section-title reveal mt-3">
            {method("title")}
          </h2>

          <ol className="steps">
            {methodKeys.map((key, i) => (
              <li key={key} className="card reveal">
                <span className="card-tick card-tick-tl" aria-hidden />
                <span className="card-tick card-tick-br" aria-hidden />
                <span className="step-num">{roman[i]}.</span>
                <p className="copy mt-4 text-[0.98rem] leading-[1.75] text-mute">
                  {method(key)}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ LOCATIONS ============ */}
      <section id="locations" className="band">
        <div className="wrap">
          <div className="flex items-end justify-between gap-6">
            <div>
              <span className="eyebrow reveal">{plates("locations")}</span>
              <h2 className="section-title reveal mt-3">
                {locationsT("title")}
              </h2>
            </div>
          </div>
          <LocationRoute />
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section id="contact" className="band relative border-t border-line">
        <div className="wrap">
          <RuleOrnament className="mb-14" />

          <span className="eyebrow reveal">{plates("contact")}</span>
          <h2 className="section-title reveal mt-3">
            {contact("title")}
          </h2>

          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <a
                href={contact("phoneHref")}
                className="poster-phone reveal"
              >
                {contact("phone")}
              </a>

              <p className="reveal mt-5 font-text text-sm tracking-[0.16em] uppercase text-mute">
                {contact("phoneLabel")}
              </p>
            </div>

            <div className="reveal space-y-8 lg:col-span-4 lg:pt-3">
              <div>
                <p className="font-text text-xs tracking-[0.22em] uppercase text-brass">
                  {contact("emailLabel")}
                </p>
                <a
                  href={`mailto:${contact("email")}`}
                  className="mt-2 block font-display text-xl italic text-bone underline decoration-line underline-offset-4 hover:decoration-brass"
                >
                  {contact("email")}
                </a>
              </div>

              <div>
                <p className="font-text text-xs tracking-[0.22em] uppercase text-brass">
                  {contact("addressLabel")}
                </p>
                <p className="mt-2 font-display text-xl italic leading-snug text-bone">
                  {contact("address")}
                  <br />
                  {contact("city")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function PawWatermark({ position }: { position: "left" | "right" }) {
  return (
    <div className="paw-bg" aria-hidden>
      <PawMark
        className={`absolute h-[22rem] w-[22rem] ${
          position === "right"
            ? "-right-16 top-8 rotate-12"
            : "-left-16 bottom-8 -rotate-12"
        }`}
      />
    </div>
  );
}
