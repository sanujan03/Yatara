import { createElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaArrowRight,
  FaChevronDown,
  FaCrown,
  FaFacebookF,
  FaGem,
  FaInstagram,
  FaLeaf,
  FaRegCompass,
  FaRegLifeRing,
  FaRegStar,
  FaXTwitter,
} from 'react-icons/fa6';
import { FaTripadvisor } from 'react-icons/fa';
import {
  MdOutlineBeachAccess,
  MdOutlineTempleBuddhist,
  MdOutlineSupportAgent,
  MdOutlineTravelExplore,
  MdOutlineWbSunny,
  MdOutlineYard,
} from 'react-icons/md';
import { GiElephant, GiMountainRoad, GiSpotedFlower } from 'react-icons/gi';
import { sriLankaCdnAssets } from '../assets/sriLankaCdnAssets';

const heroSlides = sriLankaCdnAssets.hero;

const experiences = [
  { title: 'Beach Escapes', icon: MdOutlineBeachAccess, text: 'Private coastlines, sunset catamarans, and secluded villas in Mirissa and Tangalle.' },
  { title: 'Heritage Journeys', icon: MdOutlineTempleBuddhist, text: 'Curated access to ancient kingdoms, UNESCO landmarks, and cultural rituals.' },
  { title: 'Tea Country Retreats', icon: MdOutlineYard, text: 'Boutique bungalows in emerald tea valleys with scenic rail and spa rituals.' },
  { title: 'Wildlife Safaris', icon: GiElephant, text: 'Bespoke game drives with naturalists through Yala and Wilpattu at dawn.' },
  { title: 'Adventure Trails', icon: GiMountainRoad, text: 'Helicopter viewpoints, waterfall trekking, and highland discoveries in style.' },
  { title: 'Luxury Honeymoons', icon: GiSpotedFlower, text: 'Intimate suites, candlelit dining, and island-crafted moments for two.' },
];

const destinations = [
  {
    title: 'Ella',
    image: sriLankaCdnAssets.destinations.Ella,
    desc: 'Misty ridges, iconic rail journeys, and dramatic viewpoints in Sri Lanka\'s hill country.',
  },
  {
    title: 'Sigiriya',
    image: sriLankaCdnAssets.destinations.Sigiriya,
    desc: 'Ancient rock citadel splendor blended with refined jungle lodges and private guides.',
  },
  {
    title: 'Kandy',
    image: sriLankaCdnAssets.destinations.Kandy,
    desc: 'Sacred temples, lakefront elegance, and handcrafted cultural immersion.',
  },
  {
    title: 'Nuwara Eliya',
    image: sriLankaCdnAssets.destinations['Nuwara Eliya'],
    desc: 'Colonial charm, tea estates, and cool-climate luxury in the clouds.',
  },
  {
    title: 'Mirissa',
    image: sriLankaCdnAssets.destinations.Mirissa,
    desc: 'Golden shores, marine encounters, and barefoot sophistication by the sea.',
  },
  {
    title: 'Yala',
    image: sriLankaCdnAssets.destinations.Yala,
    desc: 'Exclusive wildlife safaris, leopard territory, and signature bush luxury.',
  },
];

const reasons = [
  { title: 'Tailor-Made Journeys', icon: FaRegCompass, text: 'Every itinerary is custom-built around your pace, style, and aspirations.' },
  { title: 'Trusted Local Expertise', icon: FaLeaf, text: 'Our island specialists unlock places and moments beyond ordinary travel.' },
  { title: 'Luxury Accommodations', icon: FaGem, text: 'From cliffside sanctuaries to tea-country manors, every stay is exceptional.' },
  { title: 'Seamless Planning', icon: MdOutlineTravelExplore, text: 'From airport arrivals to private transfers, every detail is orchestrated.' },
  { title: 'Premium Support', icon: MdOutlineSupportAgent, text: 'Dedicated concierge assistance before and throughout your journey.' },
  { title: 'Memorable Experiences', icon: FaRegStar, text: 'Authentic, elevated moments designed to become lifelong memories.' },
];

const testimonials = [
  {
    quote:
      'From the tea trails to the southern coast, every detail felt effortless, elegant, and deeply personal.',
    name: 'Charlotte Moreau',
    country: 'France',
    initials: 'CM',
  },
  {
    quote:
      'A world-class itinerary with flawless service. We discovered Sri Lanka in a way we could never have planned ourselves.',
    name: 'Ethan Walker',
    country: 'United Kingdom',
    initials: 'EW',
  },
  {
    quote:
      'The safari, cultural immersion, and boutique stays were extraordinary. Truly a five-star travel experience.',
    name: 'Ava Fernandez',
    country: 'Spain',
    initials: 'AF',
  },
];

const navItems = ['Home', 'Destinations', 'Experiences', 'Tours', 'About', 'Contact'];

function SectionHeading({ eyebrow, title, text, align = 'text-center' }) {
  return (
    <div className={`reveal mx-auto mb-12 max-w-3xl ${align}`}>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.34em] text-[#D4AF37]">{eyebrow}</p>
      <h2 className="font-display text-3xl font-semibold leading-tight text-[#F8F3E9] md:text-5xl">{title}</h2>
      <p className="mt-4 text-sm leading-relaxed text-[#F8F3E9]/75 md:text-base">{text}</p>
    </div>
  );
}

function Welcome() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHero, setActiveHero] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const nextY = window.scrollY;
      setIsScrolled(nextY > 30);
      setScrollY(nextY);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHero((prev) => (prev + 1) % heroSlides.length);
    }, 5200);
    return () => clearInterval(timer);
  }, []);

  const heroParallaxY = Math.min(scrollY * 0.2, 110);
  const heroOverlayShift = Math.min(scrollY * 0.1, 60);

  useEffect(() => {
    const observed = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    observed.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#071224] text-[#F8F3E9]">
      {/* Transparent Luxury Navbar */}
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
          isScrolled
            ? 'border-[#D4AF37]/25 bg-[#071224]/72 backdrop-blur-2xl'
            : 'border-[#F8F3E9]/10 bg-[#071224]/28 backdrop-blur-xl'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-[20px] px-5 py-4 shadow-[0_10px_30px_rgba(212,175,55,0.12)] md:px-8">
          <a href="#hero" className="flex items-center gap-3">
            <div>
              <p className="font-display text-4xl leading-none tracking-[0.12em] text-[#D4AF37]">YATARA</p>
            </div>
          </a>

          <ul className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="text-sm tracking-wide text-[#F8F3E9]/85 transition hover:text-[#D4AF37]"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Link
              to="/signin"
              className="hidden rounded-full border border-[#F8F3E9]/25 px-5 py-2 text-sm font-medium text-[#F8F3E9] hover:border-[#D4AF37]/40 hover:text-[#D4AF37] md:inline-flex"
            >
              Sign In
            </Link>
            <a
              href="#contact"
              className="rounded-[20px] border border-[#D4AF37]/35 bg-[#D4AF37] px-6 py-2 text-sm font-semibold text-[#0E1A2F] shadow-[0_10px_28px_rgba(212,175,55,0.34)] transition hover:-translate-y-0.5 hover:bg-[#E2BF52]"
            >
              Book Your Journey
            </a>
          </div>
        </nav>
      </header>

      {/* Full-screen Hero Section */}
      <section id="hero" className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          {heroSlides.map((slide, i) => (
            <div
              key={slide}
              className={`absolute inset-0 bg-cover bg-center transition-[opacity,transform] duration-1000 ${
                i === activeHero ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url(${slide})`,
                transform: `scale(1.06) translate3d(0, ${heroParallaxY * (i === activeHero ? 1 : 0.35)}px, 0)`,
              }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-[#030A16]/30 via-[#071224]/65 to-[#071224]" />
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(212,175,55,0.22),transparent_38%),radial-gradient(circle_at_18%_78%,rgba(16,125,95,0.25),transparent_35%)]"
            style={{ transform: `translate3d(0, ${heroOverlayShift}px, 0)` }}
          />
        </div>

        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 pt-28 md:px-8">
          <p
            className="reveal mb-6 inline-flex w-fit rounded-full border border-[#F8F3E9]/30 bg-[#F8F3E9]/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-[#F8F3E9] backdrop-blur-xl"
            style={{ '--reveal-delay': '80ms' }}
          >
            Luxury Island Journeys
          </p>
          <h1
            className="reveal font-display max-w-4xl text-4xl font-semibold leading-tight text-[#F8F3E9] md:text-7xl"
            style={{ '--reveal-delay': '180ms' }}
          >
            Discover the Soul of Sri Lanka
          </h1>
          <p
            className="reveal mt-6 max-w-2xl text-base leading-relaxed text-[#F8F3E9]/80 md:text-lg"
            style={{ '--reveal-delay': '280ms' }}
          >
            From golden shores to mist-covered mountains, experience handcrafted luxury journeys across the Pearl of the Indian Ocean.
          </p>
          <div className="reveal mt-10 flex flex-wrap gap-4" style={{ '--reveal-delay': '360ms' }}>
            <a
              href="#destinations"
              className="inline-flex items-center gap-2 rounded-[20px] bg-[#D4AF37] px-8 py-3 text-sm font-semibold text-[#0E1A2F] shadow-[0_12px_32px_rgba(212,175,55,0.32)] transition hover:-translate-y-0.5"
            >
              Explore Destinations <FaArrowRight className="text-xs" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-[20px] border border-[#F8F3E9]/35 bg-[#F8F3E9]/10 px-8 py-3 text-sm font-semibold text-[#F8F3E9] shadow-[0_10px_24px_rgba(2,6,23,0.3)] backdrop-blur-xl transition hover:border-[#D4AF37]/60 hover:text-[#D4AF37]"
            >
              Plan Luxury Tour
            </a>
          </div>
        </div>

        <a
          href="#home"
          className="absolute bottom-8 left-1/2 grid -translate-x-1/2 place-items-center text-[#F8F3E9]/70 transition hover:text-[#D4AF37]"
        >
          <span className="text-[10px] uppercase tracking-[0.32em]">Scroll</span>
          <FaChevronDown className="mt-2 animate-bounce text-sm" />
        </a>
      </section>

      {/* Elegant Intro / About Sri Lanka */}
      <section id="home" className="relative overflow-hidden px-5 py-24 md:px-8">
        <div className="absolute -left-20 top-12 h-64 w-64 rounded-full bg-[#D4AF37]/10 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-[#14866A]/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="reveal overflow-hidden rounded-[2rem] border border-[#F8F3E9]/10 shadow-[0_26px_60px_rgba(0,0,0,0.35)]">
            <img
              src={sriLankaCdnAssets.intro}
              alt="Luxury Sri Lanka travel"
              className="h-full w-full object-cover"
              style={{ transform: `translate3d(0, ${Math.min(scrollY * 0.07, 26)}px, 0) scale(1.04)` }}
            />
          </div>

          <div className="reveal">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-[#D4AF37]">About Sri Lanka</p>
            <h2 className="font-display text-3xl font-semibold leading-tight md:text-5xl">
              An Island of Tropical Grandeur and Timeless Sophistication
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-[#F8F3E9]/80 md:text-base">
              Sri Lanka offers a rare blend of tropical beaches, rolling hill country, sacred cultural heritage, and untamed wildlife adventures. From sunrise over tea estates to private coastal escapes and designer wellness retreats, every moment can be elevated into a luxurious, deeply personal experience.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {['Tropical Beaches', 'Hill Country', 'Cultural Heritage', 'Wildlife Adventures', 'Luxury Stays', 'Curated Experiences'].map((item, idx) => (
                <div
                  key={item}
                  className="reveal rounded-2xl border border-[#F8F3E9]/12 bg-[#F8F3E9]/5 px-4 py-3 text-sm text-[#F8F3E9]/85 backdrop-blur-md"
                  style={{ '--reveal-delay': `${idx * 70}ms` }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Signature Experiences Section */}
      <section id="experiences" className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <SectionHeading
          eyebrow="Signature Experiences"
          title="Handcrafted Moments Beyond the Ordinary"
          text="Every itinerary is designed with elevated detail, balancing Sri Lanka's most iconic highlights with private, meaningful, and luxurious experiences."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {experiences.map(({ title, icon, text }, idx) => (
            <article
              key={title}
              className="reveal group rounded-2xl border border-[#F8F3E9]/10 bg-[#F8F3E9]/5 p-6 shadow-[0_16px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-[#D4AF37]/45"
              style={{ '--reveal-delay': `${idx * 90}ms` }}
            >
              <div className="mb-5 inline-flex rounded-xl border border-[#D4AF37]/35 bg-[#D4AF37]/10 p-3 text-xl text-[#D4AF37]">
                {createElement(icon)}
              </div>
              <h3 className="font-display text-2xl text-[#F8F3E9]">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#F8F3E9]/75">{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Featured Destinations Section */}
      <section id="destinations" className="bg-[#F7F3EA] px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="reveal mx-auto mb-12 max-w-3xl text-center" style={{ '--reveal-delay': '40ms' }}>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.34em] text-[#D4AF37]">Featured Destinations</p>
            <h2 className="font-display text-3xl font-semibold leading-tight text-[#11233F] md:text-6xl">
              Iconic Places to <span className="text-[#D4AF37]">Explore</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#31496B]/80 md:text-base">
              From ancient wonders to untouched wilderness, discover the destinations that define Sri Lanka.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[230px]">
            {destinations.map((place, idx) => (
            <article
              key={place.title}
              className={`reveal group relative overflow-hidden rounded-[20px] border border-white/35 bg-white/10 shadow-[0_16px_38px_rgba(15,30,52,0.24)] backdrop-blur-lg ${
                idx === 0 ? 'sm:col-span-2' : ''
              } ${idx === 5 ? 'sm:col-span-2' : ''}`}
              style={{ '--reveal-delay': `${idx * 90}ms` }}
            >
              <img
                src={place.image}
                alt={place.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040A16]/72 via-[#040A16]/25 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <h3 className="font-display text-4xl text-[#F8F3E9]">{place.title}</h3>
                <p className="mt-1 max-w-sm text-sm leading-relaxed text-[#F8F3E9]/85">{place.desc}</p>
              </div>
            </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why Travel With Us Section */}
      <section id="tours" className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <SectionHeading
          eyebrow="Why Travel With Us"
          title="Crafted for Travelers Who Expect the Exceptional"
          text="We blend local mastery, luxury standards, and thoughtful service to create journeys that feel effortless and unforgettable."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {reasons.map(({ title, icon, text }, idx) => (
            <div
              key={title}
              className="reveal rounded-2xl border border-[#F8F3E9]/10 bg-gradient-to-br from-[#F8F3E9]/8 to-[#14866A]/10 p-6 shadow-[0_16px_34px_rgba(0,0,0,0.25)] transition hover:-translate-y-0.5 hover:border-[#D4AF37]/40"
              style={{ '--reveal-delay': `${idx * 85}ms` }}
            >
              {createElement(icon, { className: 'text-2xl text-[#D4AF37]' })}
              <h3 className="mt-4 font-display text-2xl">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#F8F3E9]/75">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Luxury Showcase Banner */}
      <section className="px-5 py-8 md:px-8">
        <div className="reveal relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-[#D4AF37]/30 bg-[linear-gradient(135deg,#0A1A33_0%,#0E2344_45%,#136B58_100%)] px-8 py-16 shadow-[0_24px_48px_rgba(0,0,0,0.35)] md:px-16">
          <div className="absolute -right-8 -top-12 h-44 w-44 rounded-full border border-[#F8F3E9]/20" />
          <p className="text-xs uppercase tracking-[0.32em] text-[#D4AF37]">Luxury Showcase</p>
          <h3 className="mt-4 max-w-4xl font-display text-3xl leading-tight md:text-5xl">
            Curated journeys, timeless memories, and the finest experiences Sri Lanka has to offer.
          </h3>
          <a
            href="#contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-7 py-3 text-sm font-semibold text-[#0E1A2F] transition hover:-translate-y-0.5"
          >
            Design My Itinerary <FaArrowRight className="text-xs" />
          </a>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="about" className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <SectionHeading
          eyebrow="Testimonials"
          title="Trusted by Global Travelers"
          text="Our guests choose us for seamless execution, refined details, and meaningful island experiences crafted with care."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((item, idx) => (
            <article
              key={item.name}
              className="reveal rounded-2xl border border-[#F8F3E9]/14 bg-[#F8F3E9]/6 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.3)] backdrop-blur-lg"
              style={{ '--reveal-delay': `${idx * 110}ms` }}
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/12 font-semibold text-[#D4AF37]">
                  {item.initials}
                </div>
                <div>
                  <p className="font-semibold text-[#F8F3E9]">{item.name}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#F8F3E9]/60">{item.country}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-[#F8F3E9]/80">“{item.quote}”</p>
            </article>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="contact" className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="reveal rounded-[2rem] border border-[#F8F3E9]/14 bg-[#F8F3E9]/6 px-6 py-14 text-center shadow-[0_22px_42px_rgba(0,0,0,0.28)] backdrop-blur-md md:px-10">
          <p className="text-xs uppercase tracking-[0.32em] text-[#D4AF37]">Start Today</p>
          <h2 className="mt-4 font-display text-3xl md:text-5xl">Begin Your Sri Lankan Escape</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#F8F3E9]/75 md:text-base">
            Let us craft a journey filled with elegance, discovery, and unforgettable beauty.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-7 py-3 text-sm font-semibold text-[#0E1A2F] transition hover:-translate-y-0.5"
            >
              Start Your Journey <FaArrowRight className="text-xs" />
            </Link>
            <Link
              to="/signin"
              className="rounded-full border border-[#F8F3E9]/30 bg-transparent px-7 py-3 text-sm font-semibold text-[#F8F3E9] transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Luxury Footer */}
      <footer className="border-t border-[#F8F3E9]/10 bg-[#040A15] px-5 pb-10 pt-16 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl border border-[#D4AF37]/35 bg-[#D4AF37]/12 text-[#D4AF37]">
                <FaCrown />
              </div>
              <div>
                <p className="font-display text-3xl tracking-[0.1em]">YATARA</p>
                <p className="text-[11px] uppercase tracking-[0.3em] text-[#D4AF37]">Sri Lanka</p>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[#F8F3E9]/70">
              Bespoke Sri Lankan journeys designed with refined detail, authentic insight, and luxury hospitality.
            </p>
            <div className="mt-6 flex items-center gap-3 text-[#F8F3E9]/70">
              {[FaInstagram, FaFacebookF, FaXTwitter, FaTripadvisor].map((socialIcon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-full border border-[#F8F3E9]/15 bg-[#F8F3E9]/5 transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
                >
                  {createElement(socialIcon)}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#D4AF37]">Quick Links</p>
            <ul className="space-y-2 text-sm text-[#F8F3E9]/75">
              <li><a href="#home">Home</a></li>
              <li><a href="#experiences">Experiences</a></li>
              <li><a href="#destinations">Destinations</a></li>
              <li><a href="#tours">Tours</a></li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#D4AF37]">Top Destinations</p>
            <ul className="space-y-2 text-sm text-[#F8F3E9]/75">
              <li>Ella</li>
              <li>Sigiriya</li>
              <li>Kandy</li>
              <li>Mirissa</li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#D4AF37]">Contact</p>
            <ul className="space-y-2 text-sm text-[#F8F3E9]/75">
              <li>+94 11 245 7788</li>
              <li>journeys@yataraluxe.com</li>
              <li>Colombo, Sri Lanka</li>
              <li className="inline-flex items-center gap-2"><FaRegLifeRing /> 24/7 Concierge</li>
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-7xl border-t border-[#F8F3E9]/10 pt-6 text-xs uppercase tracking-[0.26em] text-[#F8F3E9]/45">
          © {new Date().getFullYear()} Yatara Luxe. Crafted for extraordinary island travel.
        </div>
      </footer>

      <button
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF37]/45 bg-[#071224]/70 text-[#D4AF37] shadow-[0_10px_22px_rgba(0,0,0,0.35)] backdrop-blur-md transition hover:-translate-y-0.5"
      >
        <MdOutlineWbSunny />
      </button>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#071224] to-transparent" />
      <div className="pointer-events-none fixed inset-x-0 top-0 h-24 bg-gradient-to-b from-[#071224]/65 to-transparent" />
    </div>
  );
}

export default Welcome;
