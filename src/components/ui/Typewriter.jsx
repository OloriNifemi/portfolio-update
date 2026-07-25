import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const TYPE_SPEED_MS = 65;
const DELETE_SPEED_MS = 35;
const PAUSE_AFTER_TYPE_MS = 2500;
const PAUSE_AFTER_DELETE_MS = 600;

function Typewriter({ text = "" }) {
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = shouldReduceMotion ?? false;

  const [typedText, setTypedText] = useState("");
  const timeoutRef = useRef(null);
  const cancelledRef = useRef(false);

  useEffect(() => {
    cancelledRef.current = false;

    if (reduceMotion) {
      setTypedText(text);
      return;
    }

    let index = 0;
    let deleting = false;

    const step = () => {
      if (cancelledRef.current) return;

      if (!deleting) {
        index++;
        setTypedText(text.slice(0, index));

        if (index >= text.length) {
          timeoutRef.current = setTimeout(() => {
            deleting = true;
            step();
          }, PAUSE_AFTER_TYPE_MS);

          return;
        }

        timeoutRef.current = setTimeout(step, TYPE_SPEED_MS);
      } else {
        index--;
        setTypedText(text.slice(0, index));

        if (index <= 0) {
          deleting = false;

          timeoutRef.current = setTimeout(
            step,
            PAUSE_AFTER_DELETE_MS
          );

          return;
        }

        timeoutRef.current = setTimeout(step, DELETE_SPEED_MS);
      }
    };

    timeoutRef.current = setTimeout(step, 0);

    return () => {
      cancelledRef.current = true;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, reduceMotion]);

  return (
    <>
      <span aria-hidden="true">
        {typedText}
        <motion.span
          animate={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: [1, 0, 1] }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.8, repeat: Infinity }
          }
        >
          |
        </motion.span>
      </span>

      <span className="sr-only">{text}</span>
    </>
  );
}

export default React.memo(Typewriter);