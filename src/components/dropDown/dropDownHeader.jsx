import { forwardRef } from "react";

export const DropDownHeader = forwardRef(({ children, ...rest }, ref) => {
    return <div ref={ref} {...rest}>{children}</div>;
})