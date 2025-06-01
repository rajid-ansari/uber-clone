import React from "react";

const Input = React.forwardRef(
    (
        { type, value, setValue, placeholder, className, name, ...props },
        ref
    ) => {
        return (
            <input
                ref={ref}
                type={type}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                name={name}
                {...props}
                className={`py-3 px-4 w-full  text-black/90 outline-none border-[1px] border-gray-300 mt-2 rounded-md ${className} `}
            />
        );
    }
);

export default Input;
