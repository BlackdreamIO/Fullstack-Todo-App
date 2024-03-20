// Typography.js

import React from 'react';
import cn from '@/utils/utis';

export const Typography = ({ variant, children, className }) => {
    
    const defaultTypographyStyle1 = `text-4xl font-bold dark-theme:text-white light-theme:text-black`;
    const defaultTypographyStyle2 = `text-3xl font-semibold dark-theme:text-white light-theme:text-black`;
    const defaultTypographyStyle3 = `text-xl font-medium dark-theme:text-white light-theme:text-black`;
    const defaultTypographyStyle4 = `text-lg font-medium dark-theme:text-white light-theme:text-black`;
    const defaultTypographyStyle5 = `text-base font-medium dark-theme:text-white light-theme:text-black`;
    const defaultTypographyStyle6 = `text-base font-normal dark-theme:text-white light-theme:text-black`;

    const Heading = ({ children }) => {
        switch (variant) 
        {
            case 'h1':
                return <h1 className={cn(defaultTypographyStyle1, className)}>{children}</h1>;
            case 'h2':
                return <h2 className={cn(defaultTypographyStyle2, className)}>{children}</h2>;
            case 'h3':
                return <h3 className={cn(defaultTypographyStyle3, className)}>{children}</h3>;
            case 'h4':
                return <h4 className={cn(defaultTypographyStyle4, className)}>{children}</h4>;
            case 'h5':
                return <h5 className={cn(defaultTypographyStyle5, className)}>{children}</h5>;
            case 'h6':
                return <h6 className={cn(defaultTypographyStyle6, className)}>{children}</h6>;
            default:
                return <p className={cn(defaultTypographyStyle6, className)}>{children}</p>;
        }
    };

     return <Heading>{children}</Heading>;
}
