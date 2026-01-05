import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import { useTranslation } from "@/hooks/useTranslation";

const portfolioImages = [portfolio1, portfolio2, portfolio3, portfolio4];

export default function Portfolio() {
  const t = useTranslation();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-gold text-sm font-medium tracking-wider uppercase">
              {t.nav.portfolio}
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6">
              {t.portfolio.title1} <span className="text-gold">{t.portfolio.title2}</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t.portfolio.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.portfolio.items.map((item, index) => (
              <div
                key={item.title}
                className="group relative rounded-2xl overflow-hidden shadow-card hover:shadow-elegant transition-all duration-500"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={portfolioImages[index]}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-gold text-sm font-medium tracking-wider uppercase">
                    {item.category}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-primary-foreground mt-1 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-primary-foreground/70 text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statement Section */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <blockquote className="font-display text-2xl md:text-3xl lg:text-4xl font-medium text-foreground italic leading-relaxed">
              "{t.portfolio.quote}{" "}
              <span className="text-gold not-italic">{t.portfolio.quoteHighlight}</span>."
            </blockquote>
            <p className="text-muted-foreground mt-8">
              {t.portfolio.quoteSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {t.portfolio.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-4xl md:text-5xl font-bold text-gold mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
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
              {t.portfolio.ctaTitle1}{" "}
              <span className="text-gold">{t.portfolio.ctaTitle2}</span>?
            </h2>
            <p className="text-primary-foreground/70 text-lg leading-relaxed mb-10">
              {t.portfolio.ctaSubtitle}
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">
                {t.portfolio.startProject}
                <ArrowRight className="w-5 h-5 ms-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
