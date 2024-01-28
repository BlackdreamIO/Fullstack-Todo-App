import React, { useEffect } from "react";
import cn from "../../utils/utis"
import { TabTrigger } from "./TabTrigger";

export const TabTriggerList = ({children, className, onTabSelected, ...rest}) => {

    const defaultStyle = `flex flex-row items-center justify-start gap-2`

    const onPropsChange = (value) => {
        if(onTabSelected != null) {
            onTabSelected(value);
        }
    }

    return (
        <div className={cn(defaultStyle, className)} {...rest}>
            {
                React.Children.map(children, (child) => {
                   return child.type === TabTrigger ? React.cloneElement(child, { onClick : onPropsChange }) : child
                })
            }
        </div>
    )
}