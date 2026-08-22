import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LocationRoute } from "@/components/LocationRoute";
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
  const methodKeys = ["p1", "p2", "p3"] as const;
  const credentials = about.raw("credentials") as string[];
  const marquee = [
    ...serviceKeys.map((key) => services(`items.${key}.title`)),
    ...locations.map((location) => location.city),
  ];

  return (
    <>
      <section className="band relative overflow-hidden">
        <div className="wrap grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h1 className="enter font-display text-[4.4rem] leading-[0.84] tracking-tight text-bone sm:text-7xl">
              Carolo
              <br />
              <em className="text-brass">Canis</em>
            </h1>
            <p
              className="enter lede mt-6 max-w-[38rem] text-[1.05rem] leading-[1.65] text-mute"
              style={{ animationDelay: "90ms" }}
            >
              {hero("lede")}
            </p>
            <a
              href="#contact"
              className="btn enter mt-8"
              style={{ animationDelay: "160ms" }}
            >
              {hero("cta")}
            </a>
          </div>

          <div className="enter frame" style={{ animationDelay: "120ms" }}>
            <Image
              src="/shepherd-print.png"
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 520px, 90vw"
              className="object-contain object-center p-4"
            />
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden>
        <div className="marquee-track">
          {[...marquee, ...marquee].map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </div>

      <section id="services" className="band border-y border-line">
        <div className="wrap">
          <h2 className="section-title reveal">{services("title")}</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {serviceKeys.map((key) => (
              <article key={key} className="card reveal">
                <h3 className="relative font-display text-2xl text-bone">
                  {services(`items.${key}.title`)}
                </h3>
                <p className="copy relative mt-3 text-[0.98rem] leading-[1.65] text-mute">
                  {services(`items.${key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="band">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="section-title reveal">{about("title")}</h2>
            <div className="copy reveal mt-6 space-y-4 text-[1.02rem] leading-[1.7] text-mute">
              <p>{about("p1")}</p>
              <p>{about("p2")}</p>
              <p>{about("p3")}</p>
            </div>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="card reveal">
              <p className="relative font-text text-sm text-brass">
                {about("ownerLabel")}
              </p>
              <h3 className="relative font-display mt-2 text-3xl italic leading-tight text-bone">
                {about("ownerName")}
              </h3>
              <ul className="relative mt-4 space-y-1.5">
                {credentials.map((item) => (
                  <li key={item} className="font-text text-sm text-mute">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section id="method" className="band border-y border-line">
        <div className="wrap">
          <h2 className="section-title reveal">{method("title")}</h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {methodKeys.map((key) => (
              <p
                key={key}
                className="card copy reveal text-[0.98rem] leading-[1.65] text-mute"
              >
                {method(key)}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section id="locations" className="band">
        <div className="wrap">
          <h2 className="section-title reveal">{locationsT("title")}</h2>
          <LocationRoute />
        </div>
      </section>

      <section id="contact" className="band border-t border-line">
        <div className="wrap">
          <h2 className="section-title reveal">{contact("title")}</h2>
          <div className="reveal mt-8 grid gap-5 lg:grid-cols-12">
            <a
              href={contact("phoneHref")}
              className="card font-display text-4xl leading-none text-bone no-underline sm:text-5xl lg:col-span-7"
            >
              {contact("phone")}
            </a>
            <div className="card lg:col-span-5">
              <div className="relative">
                <p className="font-text text-sm text-brass">
                  {contact("emailLabel")}
                </p>
                <a
                  href={`mailto:${contact("email")}`}
                  className="mt-1 block font-text text-lg text-bone underline decoration-line underline-offset-4 hover:decoration-brass"
                >
                  {contact("email")}
                </a>
              </div>
              <div className="relative mt-5">
                <p className="font-text text-sm text-brass">
                  {contact("addressLabel")}
                </p>
                <p className="mt-1 font-text text-lg leading-snug text-bone">
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
