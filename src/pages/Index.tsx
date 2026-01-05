import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Clock, Award, ArrowRight, Sparkles } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import heroBg from "@/assets/hero-bg.jpg";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";

const portfolioImages = [portfolio1, portfolio2, portfolio3, portfolio4];

export default function Index() {
  const t = useTranslation();

  const highlightIcons = [CheckCircle, Clock, Award];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 bg-gradient-hero opacity-80" />
        </div>

        <div className="relative z-10 container mx-auto px-6 py-32 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 rounded-full border border-gold/30 opacity-0 animate-fade-up">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-gold text-sm font-medium">{t.home.badge}</span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold leading-tight opacity-0 animate-fade-up animation-delay-200">
              <span className="text-primary-foreground">{t.home.title1}</span>
              <br />
              <span className="text-gradient-gold">{t.home.title2}</span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-up animation-delay-400">
              {t.home.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 opacity-0 animate-fade-up animation-delay-600">
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact">
                  {t.home.getStarted}
                  <ArrowRight className="w-5 h-5 ms-2" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <Link to="/portfolio">{t.home.viewWork}</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in animation-delay-600">
          <div className="w-6 h-10 border-2 border-gold/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gold rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t.home.whyChoose} <span className="text-gold">Sacker</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.home.whyChooseSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.home.highlights.map((highlight, index) => {
              const Icon = highlightIcons[index];
              return (
                <div
                  key={highlight.title}
                  className="group bg-background rounded-2xl p-8 shadow-card hover:shadow-elegant transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                    <Icon className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {highlight.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <span className="text-gold text-sm font-medium tracking-wider uppercase">
                  {t.home.ourServices}
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
                  {t.home.servicesTitle1} <span className="text-gold">{t.home.servicesTitle2}</span>
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {t.home.servicesSubtitle}
              </p>

              <div className="space-y-4">
                {t.home.services.map((service) => (
                  <div
                    key={service.title}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-display text-lg font-semibold text-foreground">
                        {service.title}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="gold" size="lg" asChild>
                <Link to="/services">
                  {t.home.exploreServices}
                  <ArrowRight className="w-4 h-4 ms-2" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {portfolioImages.slice(0, 4).map((img, index) => (
                <div
                  key={index}
                  className={`rounded-2xl overflow-hidden shadow-card hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 ${
                    index % 2 === 1 ? "mt-8" : ""
                  }`}
                >
                  <img
                    src={img}
                    alt={`Portfolio item ${index + 1}`}
                    className="w-full h-48 md:h-64 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gold rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
            {t.home.ctaTitle1} <span className="text-gold">{t.home.ctaTitle2}</span>?
          </h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto mb-10 text-lg">
            {t.home.ctaSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">
                {t.home.contactUs}
                <ArrowRight className="w-5 h-5 ms-2" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="/about">{t.home.learnMore}</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
