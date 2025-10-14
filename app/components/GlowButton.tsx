/******** app/components/GlowButton.tsx ********/
import * as React from "react";
import {motion} from "framer-motion";

type GlowButtonProps = {
  asChild?: boolean;
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const baseClasses = "rounded-lg bg-glyph px-5 py-2 font-medium text-white shadow-glow focus:outline-none accent-ring";

export default function GlowButton({children, asChild = false, className = "", ...rest}: GlowButtonProps) {
  const sharedProps = {
    whileHover: {scale: 1.03},
    whileTap: {scale: 0.98},
  } as const;

  if (asChild && React.isValidElement(children)) {
    const childClass = (children.props as {className?: string}).className ?? "";
    return (
      <motion.span {...sharedProps} className="inline-flex" {...rest}>
        {React.cloneElement(children, {
          className: `${baseClasses} ${className} ${childClass}`.trim(),
        })}
      </motion.span>
    );
  }

  return (
    <motion.button
      {...sharedProps}
      className={`${baseClasses} ${className}`.trim()}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
