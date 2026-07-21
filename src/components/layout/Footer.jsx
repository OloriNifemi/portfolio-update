import React from "react";
import Container from "../ui/Container";

const Footer = () => {
  return (
    <footer className="border-t border-[var(--border)] py-8">
      <Container className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <p className="text-[13px] text-[var(--muted)]">
          © {new Date().getFullYear()} Precious Obafemi. All rights reserved.
        </p>
        <p className="text-[13px] text-[var(--muted)]">
          Designed &amp; Developed by <span className="text-[var(--text)]"><a href="https://gravatar.com/gloriousdelectably1f143b5226?utm_source=qr">Precious Obafemi.</a></span>
        </p>
      </Container>
    </footer>
  );
};

export default Footer;