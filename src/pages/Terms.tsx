import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

export default function Terms() {
  const t = useTranslation();

  return (
    <Layout>
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
            {t.terms.title}
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <div className="space-y-8 text-muted-foreground leading-relaxed">
              
              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  {t.terms.general}
                </h2>
                <p>{t.terms.generalText}</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  {t.terms.definitions}
                </h2>
                <ul className="list-disc list-inside mt-4 space-y-2">
                  {t.terms.definitionsList.map((def) => (
                    <li key={def.term}>
                      <strong>"{def.term}"</strong> - {def.def}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  {t.terms.usage}
                </h2>
                <p>{t.terms.usageText}</p>
                <ul className="list-disc list-inside mt-4 space-y-2">
                  {t.terms.usageList.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  {t.terms.intellectual}
                </h2>
                <p>{t.terms.intellectualText}</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  {t.terms.liability}
                </h2>
                <p>{t.terms.liabilityText}</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  {t.terms.accessibilityTitle}
                </h2>
                <p>
                  {t.terms.accessibilityText}{" "}
                  <Link to="/accessibility" className="text-primary hover:underline">
                    {t.terms.accessibilityLink}
                  </Link>.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  {t.terms.privacyTitle}
                </h2>
                <p>
                  {t.terms.privacyText1}{" "}
                  <Link to="/privacy" className="text-primary hover:underline">
                    {t.terms.privacyLink}
                  </Link>
                  {t.terms.privacyText2}
                </p>
                <p className="mt-4">{t.terms.privacyCookies}</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  {t.terms.contactTitle}
                </h2>
                <p>{t.terms.contactText}</p>
                <ul className="list-none mt-4 space-y-2">
                  <li><strong>{t.terms.contactPhone}:</strong> <a href="tel:+972502197105" className="text-primary hover:underline">+972-50-219-7105</a></li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  {t.terms.law}
                </h2>
                <p>{t.terms.lawText}</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  {t.terms.changesTitle}
                </h2>
                <p>{t.terms.changesText}</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  {t.terms.questionsTitle}
                </h2>
                <p>{t.terms.questionsText}</p>
              </section>

              <p className="text-sm text-muted-foreground mt-8 pt-8 border-t border-border">
                {t.terms.lastUpdated}
              </p>

            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
