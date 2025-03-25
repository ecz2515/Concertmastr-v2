"use client";

import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Floating Navigation Menu */}
      <nav className="fixed top-4 right-4 z-50">
        <div className="bg-black/40 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-white/10">
          <div className="flex space-x-6">
            <button
              onClick={() => scrollToSection('features')}
              className="text-gray-300 hover:text-white transition-colors text-sm"
            >
              Product
            </button>
            <button
              onClick={() => scrollToSection('process')}
              className="text-gray-300 hover:text-white transition-colors text-sm"
            >
              Process
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-gray-300 hover:text-white transition-colors text-sm"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-300 hover:text-white transition-colors text-sm"
            >
              Contact
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center px-6">
        <div className="absolute inset-0">
          <Image
            src="/assets/images/default_event-image.jpg"
            alt="Concert Background"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative z-10 text-center max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Concertmastr
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Seamless programs, sustainable concerts
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 text-lg font-semibold bg-indigo-600 rounded-md hover:bg-indigo-500 transition-all shadow-lg"
          >
            Get Started
          </Link>
        </div>
        {/* Scroll Indicator */}
        <button
          onClick={() => scrollToSection('features')}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-white transition-colors"
        >
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2">Scroll</span>
            <svg
              className="w-6 h-6 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </button>
      </section>

      {/* Problem Statement */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Orchestras spend up to $500,000 per season on printing concert programs, resulting in hundreds of tons of paper wasted annually
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-indigo-400 mb-2">$400,000</h3>
              <p>The National Philharmonic Orchestra's annual cost for printing physical concert programs</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-indigo-400 mb-2">250 Tons</h3>
              <p>The amount of paper The Kennedy Center produces per season for concert programs, most of which is wasted immediately</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-indigo-400 mb-2">70 Days</h3>
              <p>The average lead time required to have a 3rd party print concert program materials</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Introducing Concertmastr</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Silent",
                description: "Too many concerts have been interrupted by phones — Concertmastr reminds audience members to set their phones to silent mode"
              },
              {
                title: "Online",
                description: "Concertmastr operates entirely on the web, allowing your custom program URL to be easily sent along with other promotional materials ahead of time"
              },
              {
                title: "Discreet",
                description: "Everyone hates being distracted by a bright phone in a dim space — Concertmastr uses a dark mode interface that's friendly to your eyes and those around you"
              },
              {
                title: "Accessible",
                description: "No need to grab your glasses — Concertmastr offers adjustable font sizes, true tone, and blue light options, making our programs accessible to all"
              },
              {
                title: "Creative",
                description: "Regular QR codes look ugly and boring — Concertmastr uses custom classical-themed QR codes for a more exciting and on-brand appeal"
              },
              {
                title: "Analytical",
                description: "Concertmastr tracks analytics like unique visitors per concert and average screen time, giving you an estimate of how many physical programs to print"
              },
              {
                title: "Scannable",
                description: "Don't like the idea of putting up a giant QR code at your venue? Concertmastr also offers NFC tags for audiences to scan at a touch"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-900 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Pricing Plans</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Essentials",
                features: ["Up to 100 viewers at a time"]
              },
              {
                name: "Pro",
                features: ["Up to 500 viewers at a time", "Classical-themed QR codes"]
              },
              {
                name: "Premium",
                features: [
                  "Up to 1000 viewers at a time",
                  "Classical-themed QR codes",
                  "Engagement metrics",
                  "Archive for up to 1 year"
                ]
              },
              {
                name: "Enterprise",
                features: [
                  "Unlimited viewers at a time",
                  "Classical-themed QR codes",
                  "Sponsor integration",
                  "Engagement metrics",
                  "Archive for up to 5 years",
                  "Multilingual support",
                  "Collaborative design process"
                ]
              }
            ].map((plan, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-indigo-400 mr-2 text-sm">•</span>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">What working with us looks like</h2>
          <p className="text-lg text-gray-300 text-center">
            From uploading your program materials all the way until up to 5 years after your concert, we have you covered. For our premium and enterprise clients, you'll also get to work with us to develop a custom Concertmastr that fits your brand. You'll have a say in the design process and can ask for revisions if needed, ensuring that your Concertmastr fits your theme and showcases your sponsors to your liking
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gray-900">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Contact Us for a demo</h2>
          <p className="text-center text-gray-300 mb-8">
            Interested in working together or hearing more? Fill out this form to request a demo, a quote, or more information.
          </p>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2">First Name</label>
                <input type="text" className="w-full p-3 rounded bg-gray-800" required />
              </div>
              <div>
                <label className="block mb-2">Last Name</label>
                <input type="text" className="w-full p-3 rounded bg-gray-800" required />
              </div>
            </div>
            <div>
              <label className="block mb-2">Email</label>
              <input type="email" className="w-full p-3 rounded bg-gray-800" required />
            </div>
            <div>
              <label className="block mb-2">Organisation</label>
              <input type="text" className="w-full p-3 rounded bg-gray-800" />
            </div>
            <div>
              <label className="block mb-2">Message</label>
              <textarea className="w-full p-3 rounded bg-gray-800 h-32" required></textarea>
            </div>
            <button type="submit" className="w-full py-3 bg-indigo-600 rounded hover:bg-indigo-500 transition-all">
              SEND
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Image
              src="/assets/images/CM_logo.png"
              width={32}
              height={32}
              alt="Concertmastr Logo"
              className="w-8 h-8"
            />
            <span className="text-xl font-semibold">Concertmastr</span>
          </div>
          <p className="text-gray-400 text-sm">
            Image Credits: Concert Hall: Photo by Manuel Nägeli on Unsplash; Cellist Cover: Photo by Manuel Nägeli on Unsplash; Cellist Profile: Photo by Nikolay Liubenko on Unsplash
          </p>
        </div>
      </footer>
    </main>
  );
}
