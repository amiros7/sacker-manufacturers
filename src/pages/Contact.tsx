import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Clock, MapPin } from "lucide-react";
import { useState } from "react";
import { toast, Toaster } from "sonner";
import { useTranslation } from "@/hooks/useTranslation";
import emailjs from "@emailjs/browser";

const contactIcons = [Phone, Clock, MapPin];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslation();
  const [formData, setFormData] = useState({
    from_name: "",
    company_name: "",
    from_email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        "service_gjaaryo",      // Service ID
        "template_av1tcog",     // Template ID
        {
          from_name: formData.from_name,
          company_name: formData.company_name,
          from_email: formData.from_email,
          phone: formData.phone,
          message: formData.message
        },
        "S9Il73om1Uaj0aeui"     // Public Key
      );

      toast.success(t.contact.successMessage);
      setFormData({
        from_name: "",
        company_name: "",
        from_email: "",
        phone: "",
        message: ""
      });
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("שגיאה בשליחת המייל:", error);
      toast.error("אירעה שגיאה בשליחת ההודעה. אנא נסה שוב.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <Toaster position="top-center" richColors closeButton expand={false} />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-gold text-sm font-medium tracking-wider uppercase">
              {t.nav.contact}
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6">
              {t.contact.title1}{" "}
              <span className="text-gold">{t.contact.title2}</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t.contact.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-muted rounded-2xl p-8 md:p-12">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                {t.contact.sendMessage}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      {t.contact.yourName}
                    </label>
                    <Input
                      type="text"
                      placeholder="John Doe"
                      required
                      value={formData.from_name}
                      onChange={(e) => setFormData({ ...formData, from_name: e.target.value })}
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      {t.contact.companyName}
                    </label>
                    <Input
                      type="text"
                      placeholder="Your Brand"
                      value={formData.company_name}
                      onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                      className="bg-background border-border"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    {t.contact.email}
                  </label>
                  <Input
                    type="email"
                    placeholder="john@yourbrand.com"
                    required
                    value={formData.from_email}
                    onChange={(e) => setFormData({ ...formData, from_email: e.target.value })}
                    className="bg-background border-border"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    {t.contact.phone}
                  </label>
                  <Input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-background border-border"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    {t.contact.projectDetails}
                  </label>
                  <Textarea
                    placeholder={t.contact.projectPlaceholder}
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-background border-border resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="xl"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t.contact.submitting : t.contact.submit}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-12">
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                  {t.contact.getInTouch}
                </h2>
                <p className="text-muted-foreground">
                  {t.contact.getInTouchSubtitle}
                </p>
              </div>

              <div className="space-y-6">
                {t.contact.contactInfo.map((item, index) => {
                  const Icon = contactIcons[index];
                  const href = index === 0 ? "tel:0502197105" : null;
                  return (
                    <div
                      key={item.title}
                      className="flex items-start gap-4 p-6 bg-muted rounded-xl"
                    >
                      <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-gold" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-semibold text-foreground">
                          {item.title}
                        </h3>
                        {href ? (
                          <a
                            href={href}
                            className="text-muted-foreground hover:text-gold transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-muted-foreground">{item.value}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CEO Card */}
              <div className="bg-charcoal rounded-2xl p-8">
                <h3 className="font-display text-xl font-semibold text-primary-foreground mb-2">
                  {t.contact.ceoTitle}
                </h3>
                <p className="text-primary-foreground/70 mb-6">
                  {t.contact.ceoSubtitle}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center">
                    <span className="font-display text-2xl font-bold text-gold">IS</span>
                  </div>
                  <div>
                    <div className="font-display text-lg font-semibold text-primary-foreground">
                      {t.contact.ceoName}
                    </div>
                    <div className="text-gold text-sm">{t.contact.ceoRole}</div>
                    <a
                      href="tel:0502197105"
                      className="text-primary-foreground/70 text-sm hover:text-gold transition-colors"
                    >
                      050-2197105
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}