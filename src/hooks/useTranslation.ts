import { useLanguage } from "@/contexts/LanguageContext";
import { translations, TranslationKeys } from "@/translations";

export function useTranslation(): TranslationKeys {
  const { language } = useLanguage();
  return translations[language];
}
