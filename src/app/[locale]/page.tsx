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
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="relative h-full w-[min(40rem,78%)]">
            <Image
              src="/shepherd-print.png"
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 40rem, 78vw"
              className="dog-mark object-contain object-center"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void" />
        </div>

        <div className="relative mx-auto max-w-[88rem] px-5 py-10 sm:px-8 sm:py-12">
          <h1 className="enter font-display max-w-[12ch] text-6xl leading-[0.84] tracking-tight text-bone sm:text-7xl">
            Carolo
            <br />
            <em className="text-brass">Canis</em>
          </h1>
          <p
            className="enter copy mt-5 max-w-[36rem] font-text text-[1.05rem] leading-[1.65] text-mute"
            style={{ animationDelay: "90ms" }}
          >
            {hero("lede")}
          </p>
          <a
            href="#contact"
            className="enter mt-6 inline-flex w-fit items-center gap-3 font-text text-bone"
            style={{ animationDelay: "160ms" }}
          >
            <span className="h-px w-8 bg-brass" />
            {hero("cta")}
          </a>
        </div>
      </section>

      <section id="services" className="scroll-mt-24 border-b border-line">
        <div className="mx-auto max-w-[88rem] px-5 py-10 sm:px-8">
          <h2 className="font-display text-4xl italic text-bone">
            {services("title")}
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {serviceKeys.map((key) => (
              <article key={key} className="card px-5 py-5">
                <h3 className="font-display text-2xl text-brass">
                  {services(`items.${key}.title`)}
                </h3>
                <p className="copy mt-3 font-text text-[0.98rem] leading-[1.65] text-mute">
                  {services(`items.${key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-24 border-b border-line">
        <div className="mx-auto grid max-w-[88rem] gap-8 px-5 py-10 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-display text-4xl italic text-bone">
              {about("title")}
            </h2>
            <div className="copy mt-5 space-y-4 font-text text-[1.02rem] leading-[1.7] text-mute">
              <p>{about("p1")}</p>
              <p>{about("p2")}</p>
              <p>{about("p3")}</p>
            </div>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="card px-5 py-5">
              <p className="font-text text-sm text-brass">
                {about("ownerLabel")}
              </p>
              <h3 className="font-display mt-2 text-3xl italic leading-tight text-bone">
                {about("ownerName")}
              </h3>
              <ul className="mt-4 space-y-1.5">
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

      <section id="method" className="scroll-mt-24 border-b border-line">
        <div className="mx-auto max-w-[88rem] px-5 py-10 sm:px-8">
          <h2 className="font-display text-4xl italic text-bone">
            {method("title")}
          </h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {methodKeys.map((key) => (
              <p
                key={key}
                className="card copy px-5 py-5 font-text text-[0.98rem] leading-[1.65] text-mute"
              >
                {method(key)}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section id="locations" className="scroll-mt-24 border-b border-line">
        <div className="mx-auto max-w-[88rem] px-5 py-10 sm:px-8">
          <h2 className="font-display text-4xl italic text-bone">
            {locationsT("title")}
          </h2>
          <div className="mt-6">
            <LocationRoute />
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24">
        <div className="mx-auto max-w-[88rem] px-5 py-10 sm:px-8">
          <h2 className="font-display text-4xl italic text-bone">
            {contact("title")}
          </h2>
          <div className="mt-6 grid gap-8 lg:grid-cols-12">
            <a
              href={contact("phoneHref")}
              className="font-display text-4xl leading-none text-bone transition-colors hover:text-brass sm:text-5xl lg:col-span-7"
            >
              {contact("phone")}
            </a>
            <div className="space-y-5 lg:col-span-4 lg:col-start-9">
              <div>
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
              <div>
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
