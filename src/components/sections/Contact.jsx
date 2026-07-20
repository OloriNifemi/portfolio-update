import React, { useState } from "react";
import { PiGithubLogoFill } from "react-icons/pi";
import { TfiLinkedin } from "react-icons/tfi";
import { BiLogoGmail } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import Container from "../ui/Container";
import SectionHeading from "../ui/Sectionheading";
import Reveal from "../ui/Reveal";


const EMAILJS_SERVICE_ID = "service_0y42go6";
const EMAILJS_TEMPLATE_ID = "template_702x5zm";
const EMAILJS_PUBLIC_KEY = "D9eYyyheRdZOWgXdS";

const WHATSAPP_NUMBER = "2349116971778"; // +234 911 697 1778
const WHATSAPP_MESSAGE =
  "Prefer to reach out directly? I'm always happy to hear about new projects, ideas, or opportunities, and I usually reply within a day.";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

const LINKS = [
  { icon: <PiGithubLogoFill />, href: "https://github.com/OloriNifemi", label: "GitHub" },
  { icon: <TfiLinkedin />, href: "https://www.linkedin.com/in/obafemi-ayomipo", label: "LinkedIn" },
  { icon: <BiLogoGmail />, href: "mailto:ayomipoobafemi@gmail.com", label: "Email" },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setError(false);

    const templateParams = {
      name: form.name,
      email: form.email,
      message: form.message,
    };

    emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
      .then(
        () => {
          setSending(false);
          setSubmitted(true);
          setForm({ name: "", email: "", message: "" });
          setTimeout(() => setSubmitted(false), 3500);
        },
        (err) => {
          console.error("Email send failed:", err);
          setSending(false);
          setError(true);
        }
      );
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
                    className="pl-1  border-b border-[#EAEAEA] py-3 text-[#111111] text-[15px] bg-transparent
                      focus:outline-none focus:border-[#111111] transition-colors duration-300"
                  />
                </div>
                <div className="flex flex-col gap-2 ">
                  <label htmlFor="email" className="text-[11px] uppercase tracking-[0.15em] text-[#666666]">Email</label>
                  <input
                    id="email" name="email" type="email" required value={form.email} onChange={handleChange}
                    placeholder="you@example.com"
                    className="pl-1 border-b border-[#EAEAEA] py-3 text-[#111111] text-[15px] bg-transparent
                      focus:outline-none focus:border-[#111111] transition-colors duration-300"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2  ">
                <label htmlFor="message" className="text-[11px] uppercase tracking-[0.15em] text-[#666666]">Message</label>
                <textarea
                  id="message" name="message" required value={form.message} onChange={handleChange} rows={4}
                  placeholder="Tell me about your project"
                  className="border-b border-[#EAEAEA] py-3 text-[#111111] text-[15px] bg-transparent resize-none
                    focus:outline-none focus:border-[#111111] transition-colors duration-300"
                />
              </div>

              <p className="text-[12px] text-[#666666] -mt-2">
                Clicking "Send Message" will send this directly to my inbox.
              </p>

              <button
                type="submit"
                disabled={sending}
                className={`w-fit px-8 py-3.5 text-[13px] uppercase tracking-[0.1em] transition-all duration-500 rounded-lg ease-in-out
                  ${
                    submitted
                      ? "bg-[#111111] text-white cursor-default"
                      : "bg-[#111111] text-white hover:bg-black hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
                  }`}
              >
                {sending ? "Sending…" : submitted ? "Message Sent ✓" : "Send Message"}
              </button>

              {error && (
                <p className="text-[13px] text-[#111111] italic font-serif ">
                  Something went wrong sending that, please try again, or email me
                  directly at{" "}
                  <a href="mailto:ayomipoobafemi@gmail.com" className="not-italic underline ">
                    ayomipoobafemi@gmail.com
                  </a>
                  .
                </p>
              )}
            </form>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="text-[#666666] text-[15px] leading-relaxed">
                Prefer to reach out directly? I'm always happy to hear about new
                projects, ideas, or opportunities, and I usually reply within a day.
              </p>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 border border-[#111111] text-[#111111] text-[13px]
                  uppercase tracking-[0.1em] rounded-lg ease-in-out transition-all duration-500 hover:bg-[#111111] hover:text-white w-fit"
              >
                <FaWhatsapp size={16} />
                Message on WhatsApp
              </a>
            </div>

            <div className="flex lg:flex-col gap-4 mt-10">
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