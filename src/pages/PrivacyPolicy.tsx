import { Layout } from "@/components/layout/Layout";
import { useTranslation } from "@/hooks/useTranslation";

export default function PrivacyPolicy() {
  const t = useTranslation();

  return (
    <Layout>
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
            {t.privacy.title}
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <div className="space-y-8 text-muted-foreground leading-relaxed">
              
              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  {t.privacy.general}
                </h2>
                <p>{t.privacy.generalText1}</p>
                <p className="mt-4">{t.privacy.generalText2}</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  {t.privacy.infoCollected}
                </h2>
                <p>{t.privacy.infoCollectedText}</p>
                <ul className="list-disc list-inside mt-4 space-y-3">
                  {t.privacy.infoTypes.map((info) => (
                    <li key={info.title}>
                      <strong>{info.title}:</strong> {info.desc}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  {t.privacy.cookies}
                </h2>
                <p>{t.privacy.cookiesText}</p>
                <ul className="list-disc list-inside mt-4 space-y-2">
                  {t.privacy.cookiesPurposes.map((purpose) => (
                    <li key={purpose}>{purpose}</li>
                  ))}
                </ul>
                <p className="mt-4">{t.privacy.cookiesControl}</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  {t.privacy.useOfInfo}
                </h2>
                <p>{t.privacy.useOfInfoText}</p>
                <ul className="list-disc list-inside mt-4 space-y-2">
                  {t.privacy.useOfInfoList.map((use) => (
                    <li key={use}>{use}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  {t.privacy.sharing}
                </h2>
                <p>{t.privacy.sharingText}</p>
                <ul className="list-disc list-inside mt-4 space-y-2">
                  {t.privacy.sharingExceptions.map((exception) => (
                    <li key={exception}>{exception}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  {t.privacy.security}
                </h2>
                <p>{t.privacy.securityText}</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  {t.privacy.rights}
                </h2>
                <p>{t.privacy.rightsText}</p>
                <ul className="list-disc list-inside mt-4 space-y-2">
                  {t.privacy.rightsList.map((right) => (
                    <li key={right}>{right}</li>
                  ))}
                </ul>
                <p className="mt-4">{t.privacy.rightsContact}</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  {t.privacy.retention}
                </h2>
                <p>{t.privacy.retentionText}</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  {t.privacy.changes}
                </h2>
                <p>{t.privacy.changesText}</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  {t.privacy.contactTitle}
                </h2>
                <p>{t.privacy.contactText}</p>
                <ul className="list-none mt-4 space-y-2">
                  <li><strong>Sacker Manufactures</strong></li>
                  <li><a href="tel:+972502197105" className="text-primary hover:underline">+972-50-219-7105</a></li>
                </ul>
              </section>

              <p className="text-sm text-muted-foreground mt-8 pt-8 border-t border-border">
                {t.privacy.lastUpdated}
              </p>

            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
