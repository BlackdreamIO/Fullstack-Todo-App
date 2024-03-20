// Typography.js

import React from 'react';
import cn from '@/utils/utis';

export const Typography = ({ variant, children, className }) => {
    
    const defaultTypographyStyle1 = `text-4xl font-bold text-theme-textPrimary`;
    const defaultTypographyStyle2 = `text-3xl font-semibold text-theme-textPrimary`;
    const defaultTypographyStyle3 = `text-xl font-medium text-theme-textPrimary`;
    const defaultTypographyStyle4 = `text-lg font-medium text-theme-textPrimary`;
    const defaultTypographyStyle5 = `text-base font-medium text-theme-textPrimary`;
    const defaultTypographyStyle6 = `text-base font-normal text-theme-textPrimary`;

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
            case 'p':
                return <p className={cn(defaultTypographyStyle6, className)}>{children}</p>;
            default:
                return <p className={cn(defaultTypographyStyle6, className)}>{children}</p>;
        }
    };

     return <Heading>{children}</Heading>;
}
