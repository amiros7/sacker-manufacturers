import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Scissors, Factory, CheckSquare, Zap } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const serviceIcons = [Scissors, Factory, CheckSquare, Zap];

export default function Services() {
  const t = useTranslation();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-gold text-sm font-medium tracking-wider uppercase">
              {t.nav.services}
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6">
              {t.services.title1}{" "}
              <span className="text-gold">{t.services.title2}</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t.services.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="space-y-16">
            {t.services.servicesList.map((service, index) => {
              const Icon = serviceIcons[index];
              return (
                <div
                  key={service.title}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mb-6">
                      <Icon className="w-8 h-8 text-gold" />
                    </div>
                    <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                      {service.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-8">
                      {service.description}
                    </p>
                    <ul className="space-y-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-gold" />
                          <span className="text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    className={`bg-muted rounded-2xl p-12 flex items-center justify-center ${
                      index % 2 === 1 ? "lg:order-1" : ""
                    }`}
                  >
                    <div className="w-32 h-32 rounded-full bg-gold/10 flex items-center justify-center">
                      <Icon className="w-16 h-16 text-gold" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-gold text-sm font-medium tracking-wider uppercase">
              {t.services.ourProcess}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
              {t.services.howWeWork1} <span className="text-gold">{t.services.howWeWork2}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {t.services.steps.map((item, index) => (
              <div key={item.step} className="relative">
                <div className="bg-background rounded-2xl p-8 text-center shadow-card hover:shadow-elegant transition-all duration-500">
                  <div className="font-display text-5xl font-bold text-gold/20 mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -end-4 w-8 h-0.5 bg-gold/30 rtl:rotate-180" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-charcoal">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              {t.services.ctaTitle1}{" "}
              <span className="text-gold">{t.services.ctaTitle2}</span>
            </h2>
            <p className="text-primary-foreground/70 text-lg leading-relaxed mb-10">
              {t.services.ctaSubtitle}
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">
                {t.services.contactUs}
                <ArrowRight className="w-5 h-5 ms-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
