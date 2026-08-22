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
      <section className="relative overflow-hidden border-b border-line">
        <div className="mx-auto grid max-w-[88rem] lg:grid-cols-2">
          <div className="flex flex-col justify-end px-5 py-10 sm:px-8 lg:py-12">
            <h1 className="enter font-display text-[4.2rem] leading-[0.82] tracking-tight text-bone sm:text-7xl lg:text-[6.4rem]">
              Carolo
              <br />
              <em className="text-brass">Canis</em>
            </h1>
            <p
              className="enter mt-6 max-w-[34rem] font-text text-[1.05rem] leading-[1.65] text-mute"
              style={{ animationDelay: "90ms" }}
            >
              {hero("lede")}
            </p>
            <a
              href="#contact"
              className="enter mt-8 inline-flex w-fit items-center gap-3 font-text text-bone"
              style={{ animationDelay: "160ms" }}
            >
              <span className="h-px w-8 bg-brass" />
              {hero("cta")}
            </a>
          </div>

          <div className="relative h-64 sm:h-80 lg:h-auto lg:min-h-[28rem]">
            <Image
              src="/shepherd.png"
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-[center_35%]"
            />
            <div className="absolute inset-y-0 left-0 hidden w-28 bg-gradient-to-r from-void to-transparent lg:block" />
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-void to-transparent lg:hidden" />
          </div>
        </div>
      </section>

      <section id="services" className="scroll-mt-24 border-b border-line">
        <div className="mx-auto max-w-[88rem] px-5 py-16 sm:px-8">
          <h2 className="font-display text-5xl italic text-bone sm:text-6xl">
            {services("title")}
          </h2>
          <div className="mt-10 divide-y divide-line border-y border-line">
            {serviceKeys.map((key) => (
              <article
                key={key}
                className="grid gap-4 py-8 lg:grid-cols-12 lg:items-baseline lg:gap-10"
              >
                <h3 className="font-display text-3xl text-brass lg:col-span-4 lg:text-4xl">
                  {services(`items.${key}.title`)}
                </h3>
                <p className="font-text text-[1.05rem] leading-[1.7] text-mute lg:col-span-7 lg:col-start-6">
                  {services(`items.${key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="relative scroll-mt-24 overflow-hidden border-b border-line">
        <p
          aria-hidden
          className="pointer-events-none absolute -top-6 left-0 font-display text-[18vw] leading-none text-bone/[0.04] italic select-none"
        >
          {about("title")}
        </p>
        <div className="relative mx-auto grid max-w-[88rem] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-display text-5xl italic text-bone sm:text-6xl">
              {about("title")}
            </h2>
            <div className="mt-8 space-y-5 font-text text-[1.05rem] leading-[1.75] text-mute">
              <p>{about("p1")}</p>
              <p>{about("p2")}</p>
              <p>{about("p3")}</p>
            </div>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="border-l border-brass pl-6">
              <p className="font-text text-sm text-brass">
                {about("ownerLabel")}
              </p>
              <h3 className="font-display mt-3 text-4xl italic leading-tight text-bone">
                {about("ownerName")}
              </h3>
              <ul className="mt-6 space-y-2">
                {credentials.map((item) => (
                  <li key={item} className="font-text text-mute">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section id="method" className="scroll-mt-24 border-b border-line">
        <div className="mx-auto max-w-[88rem] px-5 py-16 sm:px-8">
          <h2 className="font-display text-5xl italic text-bone sm:text-6xl">
            {method("title")}
          </h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-3">
            {methodKeys.map((key) => (
              <p
                key={key}
                className="border-t border-brass/40 pt-5 font-text text-[1.05rem] leading-[1.7] text-mute"
              >
                {method(key)}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section id="locations" className="scroll-mt-24 border-b border-line">
        <div className="mx-auto max-w-[88rem] px-5 py-16 sm:px-8">
          <h2 className="font-display text-5xl italic text-bone sm:text-6xl">
            {locationsT("title")}
          </h2>
          <div className="mt-12">
            <LocationRoute />
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24">
        <div className="mx-auto max-w-[88rem] px-5 py-16 sm:px-8">
          <h2 className="font-display text-5xl italic text-bone sm:text-6xl">
            {contact("title")}
          </h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <a
              href={contact("phoneHref")}
              className="font-display text-4xl leading-none text-bone transition-colors hover:text-brass sm:text-6xl lg:col-span-7"
            >
              {contact("phone")}
            </a>
            <div className="space-y-6 lg:col-span-4 lg:col-start-9">
              <div>
                <p className="font-text text-sm text-brass">
                  {contact("emailLabel")}
                </p>
                <a
                  href={`mailto:${contact("email")}`}
                  className="mt-1 block font-text text-xl text-bone underline decoration-line underline-offset-4 hover:decoration-brass"
                >
                  {contact("email")}
                </a>
              </div>
              <div>
                <p className="font-text text-sm text-brass">
                  {contact("addressLabel")}
                </p>
                <p className="mt-1 font-text text-xl leading-snug text-bone">
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
