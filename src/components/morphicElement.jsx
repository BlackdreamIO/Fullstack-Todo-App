import React, { forwardRef } from 'react';

export const MorphicElement = forwardRef(({ children, element = 'div', ...rest }, ref) => {
    return React.createElement(
        element,
        { ...rest, ref },
        children
    );
});
