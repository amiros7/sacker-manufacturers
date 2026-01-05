import { Layout } from "@/components/layout/Layout";
import { useTranslation } from "@/hooks/useTranslation";

export default function AccessibilityStatement() {
  const t = useTranslation();

  return (
    <Layout>
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
            {t.accessibility.title}
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <div className="space-y-8 text-muted-foreground leading-relaxed">
              
              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  {t.accessibility.commitment}
                </h2>
                <p>{t.accessibility.commitmentText1}</p>
                <p className="mt-4">{t.accessibility.commitmentText2}</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  {t.accessibility.features}
                </h2>
                <p>{t.accessibility.featuresText}</p>
                <ul className="list-disc list-inside mt-4 space-y-2">
                  {t.accessibility.featuresList.map((feature) => (
                    <li key={feature.name}>
                      <strong>{feature.name}</strong> - {feature.desc}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  {t.accessibility.howToUse}
                </h2>
                <p>{t.accessibility.howToUseText}</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  {t.accessibility.browsers}
                </h2>
                <p>{t.accessibility.browsersText}</p>
                <ul className="list-disc list-inside mt-4 space-y-2">
                  {t.accessibility.browsersList.map((browser) => (
                    <li key={browser}>{browser}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  {t.accessibility.contact}
                </h2>
                <p>{t.accessibility.contactText}</p>
                <ul className="list-none mt-4 space-y-2">
                  <li><strong>{t.accessibility.company}:</strong> Sacker Manufactures</li>
                  <li><strong>{t.accessibility.phone}:</strong> <a href="tel:+972502197105" className="text-primary hover:underline">+972-50-219-7105</a></li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  {t.accessibility.updateDate}
                </h2>
                <p>{t.accessibility.updateDateText}</p>
              </section>

              <section className="bg-muted p-6 rounded-xl">
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  {t.accessibility.notice}
                </h2>
                <p>{t.accessibility.noticeText}</p>
              </section>

            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
