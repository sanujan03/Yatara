
import { FaWhatsapp, FaEnvelope, FaInstagram, FaTiktok, FaGlobe } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="mt-10 border-t border-[#10B981]/25 bg-transparent text-[#E6F4F1]">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="glass-surface p-5">
            <h3 className="mb-4 text-lg font-semibold">Contact Information</h3>
            <p className="mb-2 text-[#E6F4F1]/85">123 Tourism Road, Colombo 02, Sri Lanka</p>
            <div className="mb-2 flex items-center gap-2 text-[#E6F4F1]/85">
              <FaWhatsapp className="text-green-600" />
              <span>+94 70 423 9802</span>
            </div>
            <p className="mb-2 text-sm text-[#E6F4F1]/75">Average response time: within 2 hours</p>
            <div className="flex items-center gap-2 text-[#E6F4F1]/85">
              <FaEnvelope className="text-[#E6F4F1]/75" />
              <span>info@yataraceylon.me</span>
            </div>
          </div>

          <div className="glass-surface p-5">
            <h3 className="mb-4 text-lg font-semibold">Business Hours</h3>
            <p className="text-[#E6F4F1]/85">Mon - Fri: 9:00 AM - 6:00 PM</p>
            <p className="text-[#E6F4F1]/85">Sat: 9:00 AM - 1:00 PM</p>
            <p className="mt-2 text-[#E6F4F1]/85">24/7 support via WhatsApp</p>
          </div>

          <div className="glass-surface p-5">
            <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
            <div className="flex gap-4 text-2xl">
              <FaInstagram className="cursor-pointer text-[#E6F4F1]/85 transition hover:text-[#10B981]" />
              <FaTiktok className="cursor-pointer text-[#E6F4F1]/85 transition hover:text-[#10B981]" />
              <FaGlobe className="cursor-pointer text-[#E6F4F1]/85 transition hover:text-[#10B981]" />
            </div>

            <div className="mt-6 rounded-[20px] border border-[#10B981]/25 bg-[#052E2B]/55 p-4 backdrop-blur">
              <h4 className="mb-2 font-medium">Craft Your Journey</h4>
              <input
                type="text"
                placeholder="Full Name"
                className="mb-2 w-full rounded-[20px] border border-[#10B981]/35 bg-[#064E3B]/60 p-2 text-[#E6F4F1] placeholder:text-[#E6F4F1]/55"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="mb-2 w-full rounded-[20px] border border-[#10B981]/35 bg-[#064E3B]/60 p-2 text-[#E6F4F1] placeholder:text-[#E6F4F1]/55"
              />
              <input
                type="text"
                placeholder="Subject"
                className="mb-2 w-full rounded-[20px] border border-[#10B981]/35 bg-[#064E3B]/60 p-2 text-[#E6F4F1] placeholder:text-[#E6F4F1]/55"
              />
              <textarea
                placeholder="Message"
                rows="3"
                className="mb-2 w-full rounded-[20px] border border-[#10B981]/35 bg-[#064E3B]/60 p-2 text-[#E6F4F1] placeholder:text-[#E6F4F1]/55"
              />
              <button className="rounded-[20px] border border-[#10B981]/45 bg-[#064E3B]/70 px-4 py-2 text-[#E6F4F1] shadow-[0_0_20px_rgba(16,185,129,0.2)] transition hover:bg-[#064E3B]/95">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;