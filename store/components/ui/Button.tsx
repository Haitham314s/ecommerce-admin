import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, Ref, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

function Button(
  { className, children, disabled, type = "button", ...props }: ButtonProps,
  ref: Ref<HTMLButtonElement>
) {
  return (
    <button
      className={cn(
        "w-auto rounded-full bg-black border-transparent px-5 py-3 disabled:cursor-not-allowed disabled:opacity-50 font-semibold hover:opacity-75 transition"
      )}
      ref={ref}
    >
      {children}
    </button>
  );
}

Button.displayName = "Button";

export default forwardRef(Button);
