import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";

const COOKIE_CONSENT_KEY = "cookie_consent";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslation();
  const { isRTL } = useLanguage();

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] bg-background/95 backdrop-blur-sm border-t border-border shadow-elegant animate-fade-in">
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className={`flex-1 ${isRTL ? 'pl-8 md:pl-4' : 'pr-8 md:pr-4'}`}>
            <h3 className="text-lg font-semibold text-foreground mb-2 font-display">
              {t.cookie.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.cookie.message}{" "}
              {t.cookie.learnMore}{" "}
              <a href="/privacy" className="text-gold hover:underline mx-1">{t.cookie.privacy}</a>
              {" & "}
              <a href="/terms" className="text-gold hover:underline mx-1">{t.cookie.terms}</a>.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDecline}
              className="text-muted-foreground hover:text-foreground"
            >
              {t.cookie.decline}
            </Button>
            <Button
              size="sm"
              onClick={handleAccept}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {t.cookie.accept}
            </Button>
          </div>
          <button
            onClick={handleDecline}
            className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} md:hidden text-muted-foreground hover:text-foreground transition-colors`}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
