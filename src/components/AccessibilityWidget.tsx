import { useState, useEffect } from "react";
import { 
  Accessibility, 
  X, 
  ZoomIn, 
  ZoomOut, 
  Contrast, 
  Type, 
  MousePointer2,
  Pause,
  Link2,
  RotateCcw
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AccessibilitySettings {
  fontSize: number;
  highContrast: boolean;
  grayscale: boolean;
  bigCursor: boolean;
  highlightLinks: boolean;
  pauseAnimations: boolean;
  textSpacing: boolean;
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 100,
  highContrast: false,
  grayscale: false,
  bigCursor: false,
  highlightLinks: false,
  pauseAnimations: false,
  textSpacing: false,
};

export function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const saved = localStorage.getItem("accessibility-settings");
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem("accessibility-settings", JSON.stringify(settings));
    applySettings(settings);
  }, [settings]);

  useEffect(() => {
    applySettings(settings);
  }, []);

  const applySettings = (s: AccessibilitySettings) => {
    const html = document.documentElement;
    const body = document.body;

    // Font size
    html.style.fontSize = `${s.fontSize}%`;

    // High contrast
    if (s.highContrast) {
      body.classList.add("accessibility-high-contrast");
    } else {
      body.classList.remove("accessibility-high-contrast");
    }

    // Grayscale
    if (s.grayscale) {
      body.classList.add("accessibility-grayscale");
    } else {
      body.classList.remove("accessibility-grayscale");
    }

    // Big cursor
    if (s.bigCursor) {
      body.classList.add("accessibility-big-cursor");
    } else {
      body.classList.remove("accessibility-big-cursor");
    }

    // Highlight links
    if (s.highlightLinks) {
      body.classList.add("accessibility-highlight-links");
    } else {
      body.classList.remove("accessibility-highlight-links");
    }

    // Pause animations
    if (s.pauseAnimations) {
      body.classList.add("accessibility-pause-animations");
    } else {
      body.classList.remove("accessibility-pause-animations");
    }

    // Text spacing
    if (s.textSpacing) {
      body.classList.add("accessibility-text-spacing");
    } else {
      body.classList.remove("accessibility-text-spacing");
    }
  };

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  const increaseFontSize = () => {
    if (settings.fontSize < 150) {
      updateSetting("fontSize", settings.fontSize + 10);
    }
  };

  const decreaseFontSize = () => {
    if (settings.fontSize > 80) {
      updateSetting("fontSize", settings.fontSize - 10);
    }
  };

  return (
    <>
      {/* Floating Accessibility Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-24 left-6 z-50 w-14 h-14 rounded-full",
          "bg-primary text-primary-foreground shadow-elegant",
          "flex items-center justify-center",
          "hover:scale-110 transition-transform duration-300",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          isOpen && "hidden"
        )}
        aria-label="פתח תפריט נגישות"
        title="נגישות"
      >
        <Accessibility className="w-7 h-7" />
      </button>

      {/* Accessibility Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Panel */}
          <div
            className={cn(
              "fixed left-6 bottom-6 z-50 w-80 max-h-[80vh] overflow-y-auto",
              "bg-background border border-border rounded-2xl shadow-2xl",
              "animate-in slide-in-from-bottom-4 duration-300"
            )}
            role="dialog"
            aria-label="הגדרות נגישות"
          >
            {/* Header */}
            <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-2">
                <Accessibility className="w-5 h-5 text-primary" />
                <h2 className="font-display font-bold text-foreground">הגדרות נגישות</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-muted rounded-full transition-colors"
                aria-label="סגור תפריט נגישות"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              {/* Font Size */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">גודל טקסט</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={decreaseFontSize}
                    className="p-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
                    aria-label="הקטן גודל טקסט"
                    disabled={settings.fontSize <= 80}
                  >
                    <ZoomOut className="w-5 h-5" />
                  </button>
                  <div className="flex-1 text-center font-medium">
                    {settings.fontSize}%
                  </div>
                  <button
                    onClick={increaseFontSize}
                    className="p-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
                    aria-label="הגדל גודל טקסט"
                    disabled={settings.fontSize >= 150}
                  >
                    <ZoomIn className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Toggle Options */}
              <div className="space-y-2">
                <AccessibilityToggle
                  icon={<Contrast className="w-5 h-5" />}
                  label="ניגודיות גבוהה"
                  checked={settings.highContrast}
                  onChange={(v) => updateSetting("highContrast", v)}
                />
                <AccessibilityToggle
                  icon={<Type className="w-5 h-5" />}
                  label="גווני אפור"
                  checked={settings.grayscale}
                  onChange={(v) => updateSetting("grayscale", v)}
                />
                <AccessibilityToggle
                  icon={<MousePointer2 className="w-5 h-5" />}
                  label="סמן גדול"
                  checked={settings.bigCursor}
                  onChange={(v) => updateSetting("bigCursor", v)}
                />
                <AccessibilityToggle
                  icon={<Link2 className="w-5 h-5" />}
                  label="הדגשת קישורים"
                  checked={settings.highlightLinks}
                  onChange={(v) => updateSetting("highlightLinks", v)}
                />
                <AccessibilityToggle
                  icon={<Pause className="w-5 h-5" />}
                  label="עצירת אנימציות"
                  checked={settings.pauseAnimations}
                  onChange={(v) => updateSetting("pauseAnimations", v)}
                />
                <AccessibilityToggle
                  icon={<Type className="w-5 h-5" />}
                  label="ריווח טקסט"
                  checked={settings.textSpacing}
                  onChange={(v) => updateSetting("textSpacing", v)}
                />
              </div>

              {/* Reset Button */}
              <button
                onClick={resetSettings}
                className={cn(
                  "w-full py-3 px-4 rounded-lg",
                  "bg-muted hover:bg-muted/80 transition-colors",
                  "flex items-center justify-center gap-2",
                  "text-sm font-medium text-foreground"
                )}
              >
                <RotateCcw className="w-4 h-4" />
                איפוס הגדרות
              </button>

              {/* Compliance Note */}
              <p className="text-xs text-muted-foreground text-center leading-relaxed">
                אתר זה עומד בתקנות נגישות לאתרי אינטרנט 
                <br />
                (תקנות 5768) ותקני WCAG 2.1 AA
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

interface AccessibilityToggleProps {
  icon: React.ReactNode;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function AccessibilityToggle({ icon, label, checked, onChange }: AccessibilityToggleProps) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={cn(
        "w-full p-3 rounded-lg flex items-center gap-3 transition-all",
        checked
          ? "bg-primary text-primary-foreground"
          : "bg-muted hover:bg-muted/80 text-foreground"
      )}
      role="switch"
      aria-checked={checked}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
