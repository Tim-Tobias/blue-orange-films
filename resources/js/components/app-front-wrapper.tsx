import { cn } from '@/lib/utils';
import * as React from 'react';

export function AppFrontWrapper({ children, className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div className={cn('mx-auto max-w-[1570px] overflow-hidden px-15 py-5', className)} {...props}>
            {children}
        </div>
    );
}
