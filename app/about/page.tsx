import type { Metadata } from "next";
import siteData from "@/content/site.json";

export const metadata: Metadata = {
  title: "About",
  description: "Biography, exhibition history, and CV for Wesson Art.",
};

const { about } = siteData;

const exhibitions = [
  {
    year: "2024",
    items: [
      { title: "Solo Exhibition Title", venue: "Gallery Name, City, Country" },
      { title: "Group Show: Theme", venue: "Museum Name, City, Country" },
    ],
  },
  {
    year: "2023",
    items: [
      { title: "Annual Open Exhibition", venue: "Art Center, City, Country" },
      { title: "Invitational Group Show", venue: "Gallery Name, City, Country" },
    ],
  },
  {
    year: "2022",
    items: [
      { title: "Emerging Artists Prize", venue: "Foundation Name, City, Country" },
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 pt-24 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

        {/* Left: portrait + bio */}
        <div>
          {/* Portrait placeholder */}
          <div className="w-full aspect-[3/4] bg-neutral-900 mb-8 flex items-center justify-center text-white/20 text-sm tracking-widest uppercase">
            Portrait
          </div>

          <h1 className="font-[family-name:var(--font-anton)] text-[clamp(2.5rem,7vw,5rem)] leading-none tracking-widest uppercase text-white mb-6">
            {about.name}
          </h1>

          <div className="space-y-4 text-sm text-white/50 leading-relaxed">
            <p>{about.bio1}</p>
            <p>{about.bio2}</p>
            <p>{about.bio3}</p>
          </div>
        </div>

        {/* Right: CV */}
        <div className="space-y-14">

          {/* Education */}
          <section>
            <h2 className="text-xs tracking-[0.2em] uppercase text-white mb-5 pb-2 border-b border-white/10">
              Education
            </h2>
            <ul className="space-y-3 text-sm text-white/50">
              <li className="flex gap-6">
                <span className="w-12 flex-shrink-0 text-white">2018</span>
                <span>MFA, School of Art, University Name, City</span>
              </li>
              <li className="flex gap-6">
                <span className="w-12 flex-shrink-0 text-white">2015</span>
                <span>BFA, Department of Fine Arts, University Name, City</span>
              </li>
            </ul>
          </section>

          {/* Exhibitions */}
          <section>
            <h2 className="text-xs tracking-[0.2em] uppercase text-white mb-5 pb-2 border-b border-white/10">
              Selected Exhibitions
            </h2>
            <div className="space-y-6">
              {exhibitions.map(({ year, items }) => (
                <div key={year} className="flex gap-6">
                  <span className="w-12 flex-shrink-0 text-sm text-white">{year}</span>
                  <ul className="space-y-3">
                    {items.map((item) => (
                      <li key={item.title} className="text-sm text-white/50">
                        <span className="text-white">{item.title}</span>
                        <br />
                        {item.venue}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Press */}
          <section>
            <h2 className="text-xs tracking-[0.2em] uppercase text-white mb-5 pb-2 border-b border-white/10">
              Press
            </h2>
            <ul className="space-y-3 text-sm text-white/50">
              <li>
                <span className="text-white">"Article Headline Here,"</span>{" "}
                Publication Name, Month Year.
              </li>
              <li>
                <span className="text-white">"Review Title,"</span>{" "}
                Publication Name, Month Year.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
