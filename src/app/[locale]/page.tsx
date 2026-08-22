import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
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

  const serviceKeys = ["training", "shop", "advice"] as const;
  const credentials = about.raw("credentials") as string[];

  return (
    <>
      <section className="border-b border-rule">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-12 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:py-16">
          <div className="lg:col-span-7">
            <h1 className="rise font-display text-5xl leading-none text-ivory sm:text-6xl">
              {hero("title")}
            </h1>
            <p
              className="rise mt-6 max-w-xl text-[16px] leading-relaxed text-ink-soft"
              style={{ animationDelay: "80ms" }}
            >
              {hero("lede")}
            </p>
            <a
              href="#contact"
              className="rise mt-8 inline-flex items-center gap-3 text-[12px] tracking-[0.2em] uppercase text-ivory"
              style={{ animationDelay: "140ms" }}
            >
              <span className="h-px w-8 bg-rust" />
              {hero("cta")}
            </a>
          </div>
          <div className="relative lg:col-span-5">
            <Image
              src="/shepherd.png"
              alt=""
              width={768}
              height={512}
              priority
              className="h-auto w-full object-contain object-bottom"
            />
          </div>
        </div>
      </section>

      <section id="services" className="scroll-mt-24 border-b border-rule">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <h2 className="font-display text-4xl text-ivory">{services("title")}</h2>
          <div className="mt-10 grid gap-px bg-rule sm:grid-cols-3">
            {serviceKeys.map((key) => (
              <article key={key} className="bg-paper px-6 py-8">
                <h3 className="font-display text-2xl text-ivory">
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

      <section id="about" className="scroll-mt-24 border-b border-rule">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-display text-4xl text-ivory">{about("title")}</h2>
            <div className="mt-8 space-y-5 text-[16px] leading-[1.75] text-ink-soft">
              <p>{about("p1")}</p>
              <p>{about("p2")}</p>
              <p>{about("p3")}</p>
            </div>
          </div>
          <aside className="lg:col-span-5">
            <div className="border border-rule bg-paper-deep p-7">
              <p className="text-[11px] tracking-[0.16em] uppercase text-rust">
                {about("ownerLabel")}
              </p>
              <h3 className="font-display mt-3 text-3xl text-ivory">
                {about("ownerName")}
              </h3>
              <ul className="mt-6 space-y-3 border-t border-rule pt-6">
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

      <section id="method" className="scroll-mt-24 border-b border-rule">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <h2 className="font-display text-4xl text-ivory">{method("title")}</h2>
          <div className="mt-8 max-w-3xl space-y-5 text-[16px] leading-[1.75] text-ink-soft">
            <p>{method("p1")}</p>
            <p>{method("p2")}</p>
            <p>{method("p3")}</p>
          </div>
        </div>
      </section>

      <section id="locations" className="scroll-mt-24 border-b border-rule">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <h2 className="font-display text-4xl text-ivory">
            {locationsT("title")}
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {locations.map((location) => (
              <LocationPlate key={location.id} location={location} />
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="font-display text-4xl text-ivory">
              {contact("title")}
            </h2>
          </div>
          <div className="space-y-8 lg:col-span-8">
            <ContactRow label={contact("phoneLabel")}>
              <a
                href={contact("phoneHref")}
                className="font-display text-3xl text-ivory transition-colors hover:text-rust sm:text-4xl"
              >
                {contact("phone")}
              </a>
            </ContactRow>
            <ContactRow label={contact("emailLabel")}>
              <a
                href={`mailto:${contact("email")}`}
                className="text-lg text-straw underline decoration-rule underline-offset-4 hover:decoration-rust"
              >
                {contact("email")}
              </a>
            </ContactRow>
            <ContactRow label={contact("addressLabel")}>
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

function ContactRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-rule pt-5">
      <p className="text-[11px] tracking-[0.2em] uppercase text-ink-soft">
        {label}
      </p>
      <div className="mt-2">{children}</div>
    </div>
  );
}
