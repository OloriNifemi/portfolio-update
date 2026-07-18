import React, { useState } from "react";
import { PiGithubLogoFill } from "react-icons/pi";
import { TfiLinkedin } from "react-icons/tfi";
import { BiLogoGmail } from "react-icons/bi";
import Container from "../ui/Container";
import SectionHeading from "../ui/Sectionheading";
import Reveal from "../ui/Reveal";


const LINKS = [
  { icon: <PiGithubLogoFill />, href: "https://github.com/OloriNifemi", label: "GitHub" },
  { icon: <TfiLinkedin />, href: "https://www.linkedin.com/in/obafemi-ayomipo", label: "LinkedIn" },
  { icon: <BiLogoGmail />, href: "mailto:ayomipoobafemi@gmail.com", label: "Email" },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || "Website Visitor"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:ayomipoobafemi@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-28 md:py-36 border-t border-[#EAEAEA]">
      <Container>
        <SectionHeading eyebrow="Get In Touch" title="Let's work together." align="left" />

        <div className="grid lg:grid-cols-12 gap-16 mt-16">
          <Reveal delay={0.05} className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-[11px] uppercase tracking-[0.15em] text-[#666666]">Name</label>
                  <input
                    id="name" name="name" type="text" required value={form.name} onChange={handleChange}
                    placeholder="Your name"
                    className="border-b border-[#EAEAEA] py-3 text-[#111111] text-[15px] bg-transparent
                      focus:outline-none focus:border-[#111111] transition-colors duration-300"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-[11px] uppercase tracking-[0.15em] text-[#666666]">Email</label>
                  <input
                    id="email" name="email" type="email" required value={form.email} onChange={handleChange}
                    placeholder="you@example.com"
                    className="border-b border-[#EAEAEA] py-3 text-[#111111] text-[15px] bg-transparent
                      focus:outline-none focus:border-[#111111] transition-colors duration-300"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-[11px] uppercase tracking-[0.15em] text-[#666666]">Message</label>
                <textarea
                  id="message" name="message" required value={form.message} onChange={handleChange} rows={4}
                  placeholder="Tell me about your project"
                  className="border-b border-[#EAEAEA] py-3 text-[#111111] text-[15px] bg-transparent resize-none
                    focus:outline-none focus:border-[#111111] transition-colors duration-300"
                />
              </div>
              <button
                type="submit"
                className="w-fit px-8 py-3.5 bg-[#111111] text-white text-[13px] uppercase tracking-[0.1em]
                  transition-all duration-300 hover:bg-black hover:-translate-y-0.5"
              >
                Send Message
              </button>
            </form>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-5 flex flex-col justify-between">
            <p className="text-[#666666] text-[15px] leading-relaxed">
              Prefer to reach out directly? I'm always happy to hear about new
              projects, ideas, or opportunities — and I usually reply within a day.
            </p>
            <div className="flex flex-col gap-4 mt-10">
              {LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 text-[#111111] text-[15px] w-fit border-b border-transparent
                    transition-all duration-300 hover:border-[#111111]"
                >
                  <span className="text-[18px]">{l.icon}</span>
                  {l.label}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};

export default Contact;