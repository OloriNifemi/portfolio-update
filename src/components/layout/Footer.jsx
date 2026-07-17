import React from "react";
import Container from "../ui/Container";

const Footer = () => {
  return (
    <footer className="border-t border-[#EAEAEA] py-8">
      <Container className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <p className="text-[13px] text-[#666666]">
          © {new Date().getFullYear()} Precious Obafemi. All rights reserved.
        </p>
        <p className="text-[13px] text-[#666666]">
          Designed &amp; Developed by <span className="text-[#111111]">Precious Obafemi.</span>
        </p>
      </Container>
    </footer>
  );
};

export default Footer;