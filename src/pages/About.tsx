import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Users, Globe, Heart } from "lucide-react";
import portfolio3 from "@/assets/portfolio-3.jpg";
import { useTranslation } from "@/hooks/useTranslation";

const valueIcons = [Shield, Users, Globe, Heart];

export default function About() {
  const t = useTranslation();
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-gold text-sm font-medium tracking-wider uppercase">
              {t.nav.about}
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6">
              {t.about.title1}{" "}
              <span className="text-gold">{t.about.title2}</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t.about.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden shadow-elegant">
                <img
                  src={portfolio3}
                  alt="Sacker Manufactures at work"
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                {t.about.storyTitle1} <span className="text-gold">{t.about.storyTitle2}</span>
              </h2>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>{t.about.storyP1}</p>
                <p>{t.about.storyP2}</p>
                <p>{t.about.storyP3}</p>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="font-display text-4xl font-bold text-gold">30+</div>
                  <div className="text-muted-foreground text-sm">{t.about.yearsExp}</div>
                </div>
                <div className="w-px h-16 bg-border" />
                <div>
                  <div className="font-display text-4xl font-bold text-gold">500+</div>
                  <div className="text-muted-foreground text-sm">{t.about.brandsServed}</div>
                </div>
                <div className="w-px h-16 bg-border" />
                <div>
                  <div className="font-display text-4xl font-bold text-gold">100%</div>
                  <div className="text-muted-foreground text-sm">{t.about.qualityFocus}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-gold text-sm font-medium tracking-wider uppercase">
              {t.about.ourValues}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
              {t.about.valuesTitle1} <span className="text-gold">{t.about.valuesTitle2}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.about.values.map((value, index) => {
              const Icon = valueIcons[index];
              return (
                <div
                  key={value.title}
                  className="group bg-background rounded-2xl p-8 shadow-card hover:shadow-elegant transition-all duration-500"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                      <Icon className="w-7 h-7 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Legacy Section */}
      <section className="py-24 bg-charcoal">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              {t.about.legacyTitle1} <span className="text-gold">{t.about.legacyTitle2}</span>
            </h2>
            <p className="text-primary-foreground/70 text-lg leading-relaxed mb-10">
              {t.about.legacyText}
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">
                {t.about.startJourney}
                <ArrowRight className="w-5 h-5 ms-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
