import { MessageCircle } from "lucide-react";

export const WhatsAppButton = () => {
  const phoneNumber = "972502197105"; // Israeli format without leading 0
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-7 w-7 fill-current" />
    </a>
  );
};
