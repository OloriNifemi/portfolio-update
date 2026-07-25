import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const TYPE_SPEED_MS = 65;
const DELETE_SPEED_MS = 35;
const PAUSE_AFTER_TYPE_MS = 2500;
const PAUSE_AFTER_DELETE_MS = 600;

function Typewriter({ text }) {
  const shouldReduceMotion = useReducedMotion();
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    if (shouldReduceMotion) {
      setTypedText(text);
      return;
    }

    let timeout;
    let index = 0;
    let deleting = false;

    const animate = () => {
      if (!deleting) {
        setTypedText(text.slice(0, index + 1));
        index++;

        if (index === text.length) {
          timeout = setTimeout(() => {
            deleting = true;
            animate();
          }, PAUSE_AFTER_TYPE_MS);
          return;
        }

        timeout = setTimeout(animate, TYPE_SPEED_MS);
      } else {
        setTypedText(text.slice(0, index - 1));
        index--;

        if (index === 0) {
          deleting = false;
          timeout = setTimeout(animate, PAUSE_AFTER_DELETE_MS);
          return;
        }

        timeout = setTimeout(animate, DELETE_SPEED_MS);
      }
    };

    animate();

    return () => clearTimeout(timeout);
  }, [text, shouldReduceMotion]);

  return (
    <>
      <span aria-hidden="true">
        {typedText}

        {!shouldReduceMotion && (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            |
          </motion.span>
        )}
      </span>

      <span className="sr-only">{text}</span>
    </>
  );
}
export default React.memo(Typewriter);