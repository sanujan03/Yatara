import { FaWhatsapp } from 'react-icons/fa';

const phoneNumber = '94740136010';
const prefilledMessage = 'Hello, I want to inquire about booking a trip.';

const WhatsAppWidget = () => {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(prefilledMessage)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_24px_rgba(37,211,102,0.45)] hover:scale-105 hover:bg-[#1ebe5b] md:bottom-6 md:right-6"
    >
      <FaWhatsapp className="text-3xl" />
    </a>
  );
};

export default WhatsAppWidget;