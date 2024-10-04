import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    return <input ref={ref} className={
        twMerge("bg-bgreen placeholder:text-gray-300 px-2 py-0.5 text-white rounded", props.className)
    } {...props} />
})
