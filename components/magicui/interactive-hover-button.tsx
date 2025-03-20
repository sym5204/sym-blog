import React from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { reverse } from "dns";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
  direction?: 'left' | 'right';
}

export const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ children, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "overflow-hidden relative p-2 px-6 w-auto font-semibold text-center rounded-full border cursor-pointer group bg-background",
        className,
      )}
      {...props}
    >
      <div className="flex gap-2 items-center">
        <div className="h-2 w-2 rounded-full bg-primary transition-all duration-300 group-hover:scale-[100.8]"></div>
        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
          {children}
        </span>
      </div>
      <div className={`flex absolute top-0 z-10 gap-2 justify-center items-center w-full h-full opacity-0 transition-all duration-300 translate-x-12 text-primary-foreground ${props.direction === "left" ? 'group-hover:-translate-x-7' : 'group-hover:-translate-x-5'} group-hover:opacity-100`} style={{flexDirection: props.direction === "left" ? 'row-reverse' : 'row'}}>
        <span>{children}</span>
        {props.direction === "left" ? <ArrowLeft /> : <ArrowRight />}
      </div>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";
