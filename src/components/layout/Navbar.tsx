import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";


export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const t = useTranslation();
  const { isRTL } = useLanguage();

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/services", label: t.nav.services },
    { href: "/portfolio", label: t.nav.portfolio },
    { href: "/contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white shadow-lg",
        isScrolled ? "py-3" : "py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-2xl font-bold text-gold tracking-wide">
            Sacker
          </span>
          <span className="font-display text-xl font-bold text-foreground tracking-wide">
            Manufactures
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "font-body text-sm tracking-wide transition-colors relative group",
                location.pathname === link.href
                  ? "text-gold"
                  : isScrolled
                  ? "text-foreground hover:text-gold"
                  : "text-foreground/80 hover:text-foreground"
              )}
            >
              {link.label}
              <span
                className={cn(
                  "absolute -bottom-1 h-0.5 bg-gold transition-all duration-300",
                  isRTL ? "right-0" : "left-0",
                  location.pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                )}
              />
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <LanguageSwitcher />
          <Button variant="hero" size="sm" asChild>
            <Link to="/contact">{t.nav.getQuote}</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 z-50 relative"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-foreground" />
          ) : (
            <Menu className={cn(
              "w-6 h-6 transition-colors",
              isScrolled ? "text-foreground" : "text-foreground"
            )} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-200 transition-all duration-300 overflow-hidden",
          isMobileMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "font-body text-lg py-2 transition-colors border-b border-gray-100",
                location.pathname === link.href
                  ? "text-gold font-semibold"
                  : "text-foreground hover:text-gold"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-gray-200">
            <LanguageSwitcher />
          </div>
          <Button variant="hero" size="sm" className="mt-4" asChild>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              {t.nav.getQuote}
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}