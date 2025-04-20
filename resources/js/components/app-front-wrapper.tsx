import HeaderLayout from '@/layouts/client/header-layout';
import * as React from 'react';

export function AppFrontWrapper({ children, ...props }: React.ComponentProps<'div'>) {
    return (
        <div className="mx-auto max-w-[1280px] p-4" {...props}>
            <HeaderLayout />
            {children}
        </div>
    );
}
