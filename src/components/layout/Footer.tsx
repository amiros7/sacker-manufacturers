import { Link } from "react-router-dom";
import { Phone, MapPin } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export function Footer() {
  const t = useTranslation();

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/services", label: t.nav.services },
    { href: "/portfolio", label: t.nav.portfolio },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <footer className="bg-charcoal text-primary-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl font-bold text-gold">
                Sacker
              </span>
              <span className="font-display text-2xl font-bold text-primary-foreground/80">
                Manufactures
              </span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              {t.footer.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-gold">
              {t.footer.quickLinks}
            </h4>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-primary-foreground/70 hover:text-gold transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-gold">
              {t.footer.ourServices}
            </h4>
            <ul className="flex flex-col gap-3 text-primary-foreground/70 text-sm">
              {t.footer.services.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-gold">
              {t.footer.contactUs}
            </h4>
            <div className="flex flex-col gap-4">
              <a
                href="tel:0502197105"
                className="flex items-center gap-3 text-primary-foreground/70 hover:text-gold transition-colors text-sm"
              >
                <Phone className="w-4 h-4 text-gold" />
                050-2197105
              </a>
              <div className="flex items-start gap-3 text-primary-foreground/70 text-sm">
                <MapPin className="w-4 h-4 text-gold mt-0.5" />
                <span>Israel</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className="border-t border-primary-foreground/10 mt-12 pt-8">
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            <Link to="/accessibility" className="text-primary-foreground/60 hover:text-gold transition-colors text-sm">
              {t.footer.accessibilityStatement}
            </Link>
            <Link to="/privacy" className="text-primary-foreground/60 hover:text-gold transition-colors text-sm">
              {t.footer.privacyPolicy}
            </Link>
            <Link to="/terms" className="text-primary-foreground/60 hover:text-gold transition-colors text-sm">
              {t.footer.termsConditions}
            </Link>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/50 text-sm">
              © {new Date().getFullYear()} Sacker Manufactures. {t.footer.allRights}
            </p>
            <p className="text-primary-foreground/50 text-sm">
              {t.footer.since}
            </p>
            <p className="text-primary-foreground/50 text-sm">
              {t.footer.developedBy} <span className="text-gold font-semibold">AM DIGITAL</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
