/******** app/components/GlowButton.tsx ********/
import * as React from "react";
import {motion, type HTMLMotionProps} from "framer-motion";

type GlowButtonProps = {
  asChild?: boolean;
  children: React.ReactNode;
  className?: string;
} & Omit<HTMLMotionProps<"button">, "className">;

const baseClasses = "rounded-lg bg-glyph px-5 py-2 font-medium text-white shadow-glow focus:outline-none accent-ring";

export default function GlowButton({children, asChild = false, className = "", ...rest}: GlowButtonProps) {
  const sharedMotion = {
    whileHover: {scale: 1.03},
    whileTap: {scale: 0.98},
  } as const;

  if (asChild && React.isValidElement(children)) {
    const {className: childClass = ""} = (children.props as {className?: string}) ?? {};
    return (
      <motion.span {...sharedMotion} className="inline-flex">
        {React.cloneElement(children, {
          ...rest,
          className: `${baseClasses} ${className} ${childClass}`.trim(),
        })}
      </motion.span>
    );
  }

  return (
    <motion.button {...sharedMotion} {...rest} className={`${baseClasses} ${className}`.trim()}>
      {children}
    </motion.button>
  );
}
