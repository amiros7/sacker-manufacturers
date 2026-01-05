import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "he" : "en");
  };

  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-lg",
        "bg-gold/10 hover:bg-gold/20 transition-colors",
        "text-gold text-sm font-medium"
      )}
      aria-label={language === "en" ? "Switch to Hebrew" : "Switch to English"}
    >
      <Globe className="w-4 h-4" />
      <span>{language === "en" ? "עברית" : "English"}</span>
    </button>
  );
}
